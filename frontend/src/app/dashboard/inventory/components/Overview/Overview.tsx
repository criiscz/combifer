import styles from "./style.module.css";
import {Product} from "@/models/Product";
import {Icon} from "@iconify/react";
export default function Overview(props:OverviewProps){
    return(
        <div className={styles.overview__container}>
            <h1 className={styles.overview__title}>Vista de producto</h1>
            <div className={styles.overview__body}>
              <div className={styles.overview__title_product}>
                <h2 className={styles.overview__title_product_name}>{props.productSelected.name}</h2>
                <h2 className={styles.overview__title_product_price}>{props.productSelected.category_id}</h2>
              </div>
              <div className={styles.overview__data}>
                <div className={styles.overview__data_item}>
                  <h2 className={styles.overview__data_item_header}>Ubicación</h2>
                  <h2 className={styles.overview__data_item_value}>{props.productSelected.location_id}</h2>
                </div>
                <div className={styles.overview__data_item}>
                  <h2 className={styles.overview__data_item_header}>Cantidad</h2>
                  <h2 className={styles.overview__data_item_value}>{props.productSelected.location_id}</h2>
                </div>
                <div className={styles.overview__data_item}>
                  <h2 className={styles.overview__data_item_header}>Lote</h2>
                  <h2 className={styles.overview__data_item_value}>{props.productSelected.location_id}</h2>
                </div>
                <div className={styles.overview__data_item}>
                  <h2 className={styles.overview__data_item_header}>Fecha de Compra</h2>
                  <h2 className={styles.overview__data_item_value}>{props.productSelected.location_id}</h2>
                </div>
              </div>
              <div className={styles.overview__actionButtons}>
                <button className={styles.overview__actionButtons_button_edit}>
                  <Icon icon={'ri:edit-line'}/>
                </button>
                <button className={styles.overview__actionButtons_button_delete}>
                  <Icon icon={'ri:delete-bin-line'}/>
                </button>
                <button className={styles.overview__actionButtons_button_addStock}>
                  <Icon icon={'ri:add-box-line'}/>
                </button>
              </div>
              <div className={styles.overview__total_description}>
                <div className={styles.overview__total_item}>
                  <h2 className={styles.overview__total_item_header}>Ganancias Netas</h2>
                  <h2 className={styles.overview__total_item_value}>{props.productSelected.location_id}</h2>
                </div>
                <div className={styles.overview__total_item}>
                  <h2 className={styles.overview__total_item_header}>Total Cantidad Vendido</h2>
                  <h2 className={styles.overview__total_item_value}>{props.productSelected.location_id}</h2>
                </div>
                <div className={styles.overview__total_item}>
                  <h2 className={styles.overview__total_item_header}>Última venta</h2>
                  <h2 className={styles.overview__total_item_value}>{props.productSelected.location_id}</h2>
                </div>
              </div>
            </div>
        </div>
    )
}

interface OverviewProps {
    productSelected: Product
}