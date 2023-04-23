import {ProductComplete, ProductCompleteQ} from "@/models/Product";
import styles from './style.module.css'
import {Icon} from "@iconify/react";
import {useContext, useEffect, useState} from "react";
import ProductContext from "@/context/ProductContext";

export default function Table({products, header}: TableProps) {

    const [productSelected, setProductSelected] = useState<ProductCompleteQ[] | undefined>(undefined)

    //   const selectRow = (e: any) => {
  //   const row = e.target
  //   const rowId = row.parentElement?.children[0].innerHTML
  //   const product = products.find(product => product.lot.id == rowId)
  //   productSelected(product)
  // }

      const {
          setProducts: setProductsSel
      } = useContext(ProductContext)


    const handleDelete = (id : number) => {
        const updateProducts = products.filter((products)=> products.lot.id !== id)
        setProductSelected(updateProducts)
        setProductsSel(updateProducts)
        console.log("los productos restantes son: " ,updateProducts)

    } //NO SE ELIMINAN DEL PROPS PRODUCTO, SE VUELVE A ACTUALIZAR

    return (
    <div className={styles.table__container}>
      <div className={styles.table__header}>
        {header.map((item) => {
          return <div className={styles.table__header_item} key={item}>{item}</div>
        })}
      </div>
        <div className={styles.table__body}>
      {/*<div className={styles.table__body} onClick={selectRow}>*/}
        {products.map((product) => {
            return (
              <div className={styles.table__body_row} key={product.lot.id}>
                <div className={styles.table__body_row_item}>{product.lot.id}</div>
                <div className={styles.table__body_row_item}>{product.product.name}</div>
                <div className={styles.table__body_row_item}>{product.category.name}</div>
                <div className={styles.table__body_row_item}>{product.lot.price}</div>
                <div className={styles.table__body_row_item}>{"quantity" in product ? product.quantity : 0}</div>
                <div className={styles.table__body_row_item}>
                  <button className={styles.table__body_row_item_button} onClick={() => handleDelete(product.lot.id as number)}>
                    <Icon icon={'mdi:alpha-x-circle-outline'} ></Icon>
                  </button>
                </div>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}

interface TableProps {
  products: ProductComplete[] | ProductCompleteQ[],
  header: string[],

}