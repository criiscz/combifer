import {Product, ProductComplete} from "@/models/Product";
import styles from './style.module.css'
import {Dispatch, SetStateAction} from "react";

export default function Table({
                                products,
                                header,
                                productSelected
                              }: TableProps) {

  const selectRow = (e: any) => {
    const row = e.target
    const rowId = row.parentElement?.children[0].innerHTML
    const product = products.find(product => product.lot.id == rowId)
    productSelected(product)
  }

  return (
    <div className={styles.table__container}>
      <div className={styles.table__header}>
        {header.map((item, index) => {
          return <div className={styles.table__header_item} key={index}>{item}</div>
        })}
      </div>
      <div className={styles.table__body} onClick={selectRow}>
        {products.map((product, index) => {
            return (
              <div className={styles.table__body_row} key={index}>
                {/*<input type={'checkbox'} key={index} id={index+''}/>*/}
                <div className={styles.table__body_row_item}>{product.lot.id}</div>
                <div className={styles.table__body_row_item}>{product.product.name}</div>
                <div className={styles.table__body_row_item}>{product.category.name}</div>
                <div className={styles.table__body_row_item}>{product.lot.price}</div>
                <div className={styles.table__body_row_item}>{product.lot.quantity}</div>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}

interface TableProps {
  products: ProductComplete[],
  header: string[],
  productSelected: (product:ProductComplete | undefined) => void
}