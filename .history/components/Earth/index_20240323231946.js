import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function Earth() {
  const containerRef = useRef();
  const earthRef = useRef();

  useEffect(() => {
    // Create a new scene
    const scene = new THREE.Scene();

    // Create a new camera with a higher view distance
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0, 0, 2000); // Set camera position to be farther from the earth

    // Create a renderer with a black background
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000); // Black background
    containerRef.current.appendChild(renderer.domElement);

    // Create lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 0, 500);
    scene.add(directionalLight);

    // Load the earth model
    const loader = new GLTFLoader();
    loader.load(
      '/EarthTwoTryGLB.glb',
      function (gltf) {
        const earth = gltf.scene;
        earthRef.current = earth;
        scene.add(earth);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      function (error) {
        console.error(error);
      }
    );

    // Enable user control to rotate the earth
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping for smooth dragging
    controls.dampingFactor = 0.25; // Adjust damping factor
    controls.enableZoom = false; // Disable zooming
    controls.enableRotate = false; // Disable rotation of the camera

    let isDragging = false;
    let previousMousePosition = {
      x: 0,
      y: 0
    };

    containerRef.current.addEventListener('mousedown', event => {
      isDragging = true;
      previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    }, false);

    containerRef.current.addEventListener('mousemove', event => {
      if (isDragging) {
        const deltaMove = {
          x: event.clientX - previousMousePosition.x,
          y: event.clientY - previousMousePosition.y
        };

        const earth = earthRef.current;
        if (earth) {
          earth.rotation.y += deltaMove.x * 0.01;
        }

        previousMousePosition = {
          x: event.clientX,
          y: event.clientY
        };
      }
    }, false);

    containerRef.current.addEventListener('mouseup', () => {
      isDragging = false;
    }, false);

    // Render the scene
    const animate = function () {
      requestAnimationFrame(animate);

      // Rotate the earth slowly from left to right
      scene.traverse(function (child) {
        if (child.isMesh) {
          child.rotation.y += 0.001;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Adjust camera aspect ratio and renderer size on window resize
    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Cleanup
    return () => {
      window.removeEventListener("resize", null);
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
}