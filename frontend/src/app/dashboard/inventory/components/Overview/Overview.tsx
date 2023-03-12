import styles from "./style.module.css";
import {Product} from "@/models/Product";
export default function Overview(props:OverviewProps){
    return(
        <div className={styles.overview__container}>
            <h1 className={styles.overview__title}>Resumen</h1>
            <div className={styles.overview__body}>
                <div className={styles.overview__body_item}>
                    <h1 className={styles.overview__body_item_title}>Productos</h1>
                    <h1 className={styles.overview__body_item_value}>{props.productSelected.length}</h1>
                </div>
                <div className={styles.overview__body_item}>
                    <h1 className={styles.overview__body_item_title}>Categorías</h1>
                    <h1 className={styles.overview__body_item_value}>0</h1>
                </div>
                <div className={styles.overview__body_item}>
                    <h1 className={styles.overview__body_item_title}>Marcas</h1>
                    <h1 className={styles.overview__body_item_value}>0</h1>
                </div>
            </div>
        </div>
    )
}

interface OverviewProps {
    productSelected: Product[]
}