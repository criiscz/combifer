import styles from './style.module.css'
export default function ReportPage(){
    return(
        <div className={styles.container}>
          <div className={styles.reports}>
            <h1 className={styles.reports__title}>Reportes</h1>
            <div className={styles.reports__body}>
              <div className={styles.reports__body_item}>
                <h2 className={styles.reports__body_item_title}>Reporte de ventas</h2>
                <p className={styles.reports__body_item_description}>Reporte de ventas por día, semana, mes y año</p>
              </div>
              <div className={styles.reports__body_item}>
                <h2 className={styles.reports__body_item_title}>Reporte de compras</h2>
                <p className={styles.reports__body_item_description}>Reporte de compras </p>

              </div>
              <div className={styles.reports__body_item}>
                <h2 className={styles.reports__body_item_title}>Productos más vendidos</h2>
                <p className={styles.reports__body_item_description}>Reporte de productos mas vendidos</p>
              </div>
              <div className={styles.reports__body_item}>
                <h2 className={styles.reports__body_item_title}>Finanzas</h2>
                <p className={styles.reports__body_item_description}>Reporte de finanzas</p>
              </div>
            </div>
          </div>
        </div>
    )
}