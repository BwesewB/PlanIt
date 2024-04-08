import ButtonColoured from "../mainButton";
import styles from '@/components/ButtonAndBack/ButtonAndBack.module.css'
import Image from "next/image";
import Link from "next/link";

export default function ButtonAndBack({ 
    linking, 
    buttonText, 
    buttonColorBg, 
    buttonColorPrimary, 
    onClickHandlerSecondaryMainButton, 
    handleBackClick 
}){
    return(
        <>
        <div className={styles.bothButtons}>
            <ButtonColoured
                href={linking}
                text={buttonText}
                bgColor={buttonColorBg}
                primaryColor={buttonColorPrimary}
                onClickHandler={onClickHandlerSecondaryMainButton}
            />
            <div onClick={handleBackClick} className={styles.backButton}>
                <Image 
                    src="/icons/smallArrow.svg" 
                    alt="small back arrow"
                    width={6.25} 
                    height={10} 
                />
                <p>Back</p>
            </div>
        </div>

        </>
    )
}