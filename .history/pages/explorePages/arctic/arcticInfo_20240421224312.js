import styles from "@/pages/explorePages/rainforest/Rainforest.module.css"
import ExplorePageInfo from "@/components/MainPageComponents/ExplorePageInfo"
import DoubleLineGraph from "@/components/ExplorePageInfoComponents/Graph/DoubleLineGraph"

export default function arcticInfo(){
    return(
        <>
            <DoubleLineGraph/>
            <ExplorePageInfo sectionTitle="ARCTIC"/>
        </>
    )
}