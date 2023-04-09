import {ProductComplete} from "@/models/Product";
import styles from './style.module.css'
import {useState} from "react";

export default function Table({
                                products,
                                header,
                                productSelected
                              }: TableProps) {

    const [selectedProducts , setSelectedProducts ] = useState<ProductComplete[]>([])
    const [inputValue, setInputValue] = useState('');

    const selectRow = (e: any) => {
        const row = e.target
        const rowId = row.parentElement?.children[1].innerHTML
        const product = products.find(product => product.lot.id == rowId)
        const isChecked = e.target.checked
        // @ts-ignore
            if (isChecked) {
                // @ts-ignore
                setSelectedProducts([...selectedProducts, product])
            } else {
                // @ts-ignore
                setSelectedProducts(selectedProducts.filter(p => p.lot.id !== product.lot.id))
            }
        // @ts-ignore

        productSelected(isChecked ? product : undefined)
    }

    // @ts-ignore
    productSelected(selectedProducts);

    const handleInputChange = (e : any) => {
        setInputValue(e.target.value)
        console.log(e.target.value)
    }

    return (
    <div className={styles.table__container}>
      <div className={styles.table__header}>
        {header.map((item, index) => {
          return <div className={styles.table__header_item} key={index}>{item}</div>
        })}
      </div>
      <div className={styles.table__body}>
        {products.map((product, index) => {
            return (
              <div className={styles.table__body_row} key={index}>
                {<input type={'checkbox'} id ={`checkbox-${product.lot.id}`} onClick={selectRow}/>}
                <div className={styles.table__body_row_item}>{product.lot.id}</div>
                <div className={styles.table__body_row_item}>{product.product.name}</div>
                <div className={styles.table__body_row_item}>{product.category.name}</div>
                <div className={styles.table__body_row_item}>{product.lot.price}</div>
                  <div className={styles.table__body_row_item}>{product.lot.quantity}</div>
                  <input className={styles.table__body_row_item}  type={'number'} onChange={handleInputChange} />
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
    productSelected: (product:ProductComplete [] | undefined) => void
}