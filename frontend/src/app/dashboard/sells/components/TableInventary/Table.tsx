import {ProductComplete} from "@/models/Product";
import styles from './style.module.css'
import {useEffect, useState} from "react";

export default function Table({
                                products,
                                header,
                                productSelected
                              }: TableProps) {

  const [selectedProducts, setSelectedProducts] = useState<ProductCompleteQ[]>([])
  const [inputValue, setInputValue] = useState<InputValue[]>([]);
  const [rowSelected, setRowSelected] = useState<RowSelected[]>([])

  const selectRow = (e: any) => {
    const row = e.target
    const rowId = row.parentElement?.children[1].innerHTML
    const product = products.find(product => product.lot.id == rowId)
    const isChecked = e.target.checked
    if (isChecked) {
      // @ts-ignore
      setSelectedProducts([...selectedProducts, {...product, quantity: inputValue.find(i => i.id == product.lot.id)?.value}])
      setRowSelected([...rowSelected, {
        id: rowId,
        checked: isChecked
      }])
    } else {
      setSelectedProducts(selectedProducts.filter(p => product?.lot.id !== p.lot.id))
      setRowSelected(rowSelected.filter(r => r.id != rowId))
    }
    console.log()
    console.log("rows:", rowSelected)
    // @ts-ignore

    productSelected(isChecked ? product : undefined)
  }

  // @ts-ignore
  productSelected(selectedProducts);

  const handleInputChange = (e: any, id: number) => {
    if(inputValue.find(i => i.id == id)){
      setInputValue(inputValue.map(i => i.id == id ? {...i, value: e.target.value} : i))
    } else {
      setInputValue([...inputValue, {id: id, value: e.target.value}])
    }
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
                {<input type={'checkbox'} id={`${product.lot.id}`} onClick={selectRow} checked={
                  rowSelected.find(r => r.id == product.lot.id)?.checked
                } disabled={
                  inputValue.find(i => i.id == product.lot.id) === undefined
                  || inputValue.find(i => i.id == product.lot.id)?.value == 0
                  || inputValue.find(i => i.id == product.lot.id)!.value > product.lot.quantity!
                }/>}
                <div className={styles.table__body_row_item}>{product.lot.id}</div>
                <div className={styles.table__body_row_item}>{product.product.name}</div>
                <div className={styles.table__body_row_item}>{product.category.name}</div>
                <div className={styles.table__body_row_item}>{product.lot.price}</div>
                <div className={styles.table__body_row_item}>{product.lot.quantity}</div>
                <input className={styles.table__body_row_item} type={'number'}
                       disabled={rowSelected.find(r => r.id == product.lot.id)?.checked !== undefined}
                       max={product.lot.quantity}
                       value={inputValue.find(i => i.id == product.lot.id)?.value || ''}
                       onChange={(e) => handleInputChange(e, product.lot.id as number)}/>
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
  productSelected: (product: ProductComplete [] | undefined) => void
}

interface ProductCompleteQ {
  lot: {
    id: number,
    price: number,
    quantity: number
  },
  product: {
    id: number,
    name: string
  },
  category: {
    id: number,
    name: string
  },
  selectedQuantity: number
}

interface RowSelected {
  id: number,
  checked: boolean
}

interface InputValue {
  id: number,
  value: number
}