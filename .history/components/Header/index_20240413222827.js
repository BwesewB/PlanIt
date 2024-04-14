import styles from "@/components/Header/Header.module.css"
import Image from "next/image"

export default function Header(
    src=""
){
    return(
        <>
            <header className={styles.headerSection}>
                <div><Image src={src} width={31} height={20}  className={styles.headerSectionIconLeft}/></div>
                <div className={styles.headerSectionWords}>
                    <h1 className={styles.headerSectionH1}>PlanIt</h1>
                    <h4 className={styles.headerSectionH2}>PALCEHOLDER</h4>
                </div>
                <div><Image src="/icons/settings.svg" width={40} height={40} className={styles.headerSectionIconRight}/></div>
            </header>
        </>
    )
}