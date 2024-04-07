import Link from "next/link"
import styles from "@/components/mainButton/mainButton.module.css"
import { useState, useEffect } from "react";

export default function ButtonColoured({
    href, 
    text,
    bgColor="var(--white)",
    primaryColor="var(--green)"
}){
    const [clicked, setClicked] = useState(false);

    const handlePress = () => {
        setClicked(true);
    };

    useEffect(() => {
        const handleMouseUp = () => {
            if (clicked) {
                setClicked(false);
            }
        };

        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [clicked]);

    return(
        <>
            <div className={styles.buttonWhole}>
                <Link href={href}>
                    <button 
                        style={{ 
                            backgroundColor: bgColor, 
                            transform: clicked ? "translateY(5px)" : "none",
                            transition: "transform 0.3s ease"
                        }} 
                        className={styles.buttonStyling} 
                        onMouseDown={handlePress}
                    >
                        <p style={{ color: primaryColor}} className={styles.buttonText}>
                            {text}
                        </p>
                    </button>
                    <div className={styles.buttonLower} style={{ backgroundColor: primaryColor}}/>
                </Link>
            </div>

        </>
    )
}