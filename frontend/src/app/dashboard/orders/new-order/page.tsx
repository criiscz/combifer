'use client'
import styles from "@/app/dashboard/orders/new-order/style.module.css";
import Bill from "@/app/dashboard/orders/new-order/components/Bill/Bill";
import Table from "@/app/dashboard/components/Table/Table";

export default function OrderPage(){


    return(
            <div className={styles.order_container}>
                <section className={styles.order__body}>
                    <div className={styles.order__carList}>
                        <Table
                          header={['Id','Nombre','Precio Compra', 'Precio Venta', 'Cantidad', 'Opciones']}
                          itemsToDisplay={4}
                          items={[]}
                          setItemSelected={() => {}}
                        />
                    </div>
                    <div className={styles.order__bill} >
                        <Bill products={[]}/>
                    </div>
                </section>
        </div>
    )
}
