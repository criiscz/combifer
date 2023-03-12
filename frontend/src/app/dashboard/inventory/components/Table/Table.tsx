import {Product} from "@/models/Product";
import styles from './style.module.css'

export default function Table({products, header}: { products: Product[], header: string[] }) {

  const selectRow = (e: any) => {
    e.target.parentElement.children[0].checked = !e.target.parentElement.children[0].checked
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
                  <div className={styles.table__body_row_item}>{product.id}</div>
                  <div className={styles.table__body_row_item}>{product.name}</div>
                  <div className={styles.table__body_row_item}>{product.category_id}</div>
                </div>
            )
          }
        )}
      </div>
    </div>
  )
}