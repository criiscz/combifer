import {ProductComplete, ProductCompleteQ} from "@/models/Product";
import styles from './style.module.css'
import {useContext, useEffect, useState} from "react";
import ProductContext from "@/context/ProductContext";
import ModalContext from "@/context/ModalContext";


export default function Table({
                                products,
                                header,
                                productSelected
                              }: TableProps) {

  // const [selectedProducts, setSelectedProducts] = useState<ProductCompleteQ[]>([])
  const [inputValue, setInputValue] = useState<InputValue[]>([]);
  const [rowSelected, setRowSelected] = useState<RowSelected[]>([])

  const {
    productsSelected,
    setProductsSelected,
  } = useContext(ProductContext)

  const {
    open
  } = useContext(ModalContext)

  useEffect(() => {
    productSelected(productsSelected)
  }, [productSelected, productsSelected])

  useEffect(() => {
    clearSelectedProducts()
  }, [open])


  const clearSelectedProducts = () => {
    console.log("rowSelected: ", rowSelected)
    console.log("productsSelected: ", productsSelected)
    const rows = rowSelected.map(r => ({
      id: r.id,
      checked: !!productsSelected.find(p => p.lot.id == r.id)
    }));
    console.log("rows: ", rows)
    setRowSelected(rows);
    const inputs = inputValue.map(i => ({
      id: i.id,
      value: !!productsSelected.find(p => p.lot.id === i.id) ? i.value : ''
    }));
    setInputValue(inputs as InputValue[]);
  }

  const selectRow = (e: any) => {
    const row = e.target
    const rowId = row.parentElement?.children[1].innerHTML
    const product = products.find(product => product.lot.id == rowId) as ProductCompleteQ
    const isChecked = e.target.checked
    if (isChecked) {
      setProductsSelected(prevState => [...prevState, {
        ...product,
        quantity: inputValue.find(i => i.id == product.lot.id)?.value
      }])
      setRowSelected(prevState => [...prevState, {
        id: rowId,
        checked: isChecked
      }])
    } else {
      setProductsSelected(productsSelected.filter(p => product?.lot.id !== p.lot.id))
      setRowSelected(rowSelected.filter(r => r.id != rowId))
    }
  }
  const handleInputChange = (e: any, id: number) => {
    if (inputValue.find(i => i.id == id)) {
      setInputValue(inputValue.map(i => i.id == id ? {...i, value: e.target.value} : i))
    } else {
      setInputValue([...inputValue, {id: id, value: e.target.value}])
    }
  }
  const enterPressed = (e: any) => {
    // Cuando se presiona enter, se debe seleccionar el producto y hacer check en la fila
    const row = e.target.parentElement?.children[0]
    if (e.key === 'Enter') {
      row.click()
      const rowIndex = e.target.parentElement?.children[1].innerHTML
      const rowId = e.target.parentElement?.parentElement?.children
      const htmlCollection = Array.from(rowId as HTMLCollectionOf<HTMLElement>)
      let idx = -1;
      for (let i = 0; i < htmlCollection.length; i++) {
        if (htmlCollection[i].querySelector(':nth-child(2)')?.innerHTML === rowIndex) {
          idx = i;
          break;
        }
      }
      const input = htmlCollection[idx + 1].children[6] as HTMLInputElement
      if (!input.disabled) {
        input.focus()
      } else return;
    }
  }

  const focusText = (e: any) => {
    const rowId = e.target.parentElement?.children[1].innerHTML
    const input = document.getElementById(rowId + 'input')
    input?.focus()
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
              <div className={styles.table__body_row} key={index} onClick={focusText}>
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
                       id={`${product.lot.id}input`}
                       disabled={
                         rowSelected.find(r => r.id == product.lot.id)?.checked !== undefined &&
                         rowSelected.find(r => r.id == product.lot.id)?.checked}
                       max={product.lot.quantity}
                       value={inputValue.find(i => i.id == product.lot.id)?.value || ''}
                       onChange={(e) => handleInputChange(e, product.lot.id as number)}
                  // add event when enter is pressed to add product to the list
                       onKeyDown={enterPressed}
                />
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
  productSelected: (product: ProductCompleteQ[] | undefined) => void
}

interface RowSelected {
  id: number,
  checked: boolean
}

interface InputValue {
  id: number,
  value: number
}