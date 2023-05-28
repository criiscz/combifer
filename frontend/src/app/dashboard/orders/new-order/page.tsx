'use client'
import styles from "@/app/dashboard/orders/new-order/style.module.css";
import Bill from "@/app/dashboard/orders/new-order/components/Bill/Bill";
import Table from "@/app/dashboard/components/Table/Table";
import {useContext} from "react";
import orderContext from "@/context/OrderContext";
import {Icon} from "@iconify/react";

export default function OrderPage() {

  const {productsAdded, setProductsAdded} = useContext(orderContext)

  const deleteItem = (e:any) => {
    const id = e.target.parentNode.parentNode.parentNode.childNodes[0].innerText
    const newProducts = productsAdded.filter(product => product.id != id)
    setProductsAdded(newProducts)
  }

  return (
    <div className={styles.order_container}>
      <section className={styles.order__header}>
        <h3 className={styles.order__title}>Nueva Orden</h3>
      </section>
      <section className={styles.order__body}>
        <div className={styles.order__carList}>
          <Table
            header={['Id', 'Nombre', 'Precio Compra', 'Precio Venta', 'Cantidad', 'Opciones']}
            itemsToDisplay={6}
            items={productsAdded.map((product) => {
              return {
                id: product.id,
                name: product.name,
                buy_price: product.buy_price,
                sell_price: product.sell_price,
                quantity: product.quantity,
                options: <button className={styles.order__button_delete} onClick={deleteItem}>
                  <Icon icon={'ri:delete-bin-line'} width={20}/>
                </button>,
              }
            })
            }
            setItemSelected={() => {
            }}
          />
        </div>
        <div className={styles.order__bill}>
          <Bill products={productsAdded}/>
        </div>
      </section>
    </div>
  )
}
