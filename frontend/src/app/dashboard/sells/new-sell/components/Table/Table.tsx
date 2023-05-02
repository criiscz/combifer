import {ProductComplete, ProductCompleteQ} from "@/models/Product";
import styles from './style.module.css'
import {Icon} from "@iconify/react";
import {useContext} from "react";
import ProductContext from "@/context/ProductContext";

export default function Table({products, header, deleteButton}: TableProps) {

  // const [productSelected, setProductSelected] = useState<ProductCompleteQ[] | undefined>(undefined)

  const {
    setProducts: setProductsSel,
    setProductsSelected
  } = useContext(ProductContext)


  const handleDelete = (id: number) => {
    const updateProducts = products.filter((products) => products.lot.id !== id)
    setProductsSelected(updateProducts)
    setProductsSel(updateProducts)
  }

  return (
    <div className={styles.table__container}>
      <div className={styles.table__header}>
        {header.map((item) => {
          return <div className={styles.table__header_item} key={item}>{item}</div>
        })}
      </div>
      <div className={styles.table__body}>
        {/*<div className={styles.table__body} onClick={selectRow}>*/}
        {products.map((product:ProductCompleteQ) => {
            return (
              <div className={styles.table__body_row} key={product.lot.id}>
                <div className={styles.table__body_row_item}>{product.lot.id}</div>
                <div className={styles.table__body_row_item}>{product.product.name}</div>
                <div className={styles.table__body_row_item}>${product.lot.price}</div>
                <div className={styles.table__body_row_item}>{product.quantity}</div>
                <div
                  className={styles.table__body_row_item}>${product.quantity! * product.lot.price!}</div>
                {deleteButton && <div className={styles.table__body_row_item}>
                  <button className={styles.table__body_row_item_button}
                          onClick={() => handleDelete(product.lot.id as number)}>
                    <Icon icon={'ri:close-line'}></Icon>
                  </button>
                </div>}
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
  deleteButton?: boolean
}