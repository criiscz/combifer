import {ProductComplete, ProductCompleteQ} from "@/models/Product";
import styles from './style.module.css'
import {Icon} from "@iconify/react";

export default function Table({
                                products,
                                header,
                                productSelected
                              }: TableProps) {

  const selectRow = (e: any) => {
    const row = e.target
    const rowId = row.parentElement?.children[0].innerHTML
    const product = products.find(product => product.lot.id == rowId)
    console.log("Product selected 2: ", rowId, products)
    console.log("AQUI DEBE ENTRAR")
    productSelected(product)

  }

  return (
    <div className={styles.table__container}>
      <div className={styles.table__header}>
        {header.map((item) => {
          return <div className={styles.table__header_item} key={item}>{item}</div>
        })}
      </div>
      <div className={styles.table__body} onClick={selectRow}>
        {products.map((product) => {
            return (
              <div className={styles.table__body_row} key={product.lot.id}>
                <div className={styles.table__body_row_item}>{product.lot.id}</div>
                <div className={styles.table__body_row_item}>{product.product.name}</div>
                <div className={styles.table__body_row_item}>{product.category.name}</div>
                <div className={styles.table__body_row_item}>{product.lot.price}</div>
                <div
                  className={styles.table__body_row_item}>{"quantity" in product ? product.quantity : 0}</div>
                <div className={styles.table__body_row_item}>
                  <button className={styles.table__body_row_item_button}>
                    <Icon icon={'ri:delete-bin-line'} color={'#000'} width={20} height={20}></Icon>
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
  productSelected: (product: ProductComplete | undefined) => void
}