import styles from './style.module.css'
import {ProductComplete, ProductCompleteQ} from "@/models/Product";
import {useContext, useEffect, useState} from "react";
import {useQuery} from "react-query";
import {getAllProducts} from "@/api/Products";
import cookie from "universal-cookie";
import orderContext from "@/context/OrderContext";

export default function AddProductOrder({
                                          closeDialog,
                                        }: AddProductCartDialogProps) {
  const cookies = new cookie()

  const [products, setProducts] = useState(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('products')!) : [])
  const [productsFiltered, setProductsFiltered] = useState(products)

  const [product, setProduct] = useState({
    name: '',
    quantity: 1,
    sell_price: 0,
    buy_price: 0,
    id: -1,
  })

  const {productsAdded, setProductsAdded} = useContext(orderContext)


  const {
    data: product_list,
  } = useQuery('productLots', () => getAllProducts(cookies.get('token')),
    {
      onSuccess: () => {
        setProducts(product_list!.data)
        setProductsFiltered(product_list!.data)
        localStorage.setItem('products', JSON.stringify(product_list!.data))
      }
    })


  useEffect(() => {
    document.getElementById('products-input')?.focus()
  }, [])


  const fillCar = () => {
    if (productsAdded.find((productAdded) => productAdded.name === product.name)) {
      setProductsAdded(productsAdded.map((productAdded) => {
        if (productAdded.name === product.name) {
          return {
            ...productAdded,
            quantity: Number(productAdded.quantity) + Number(product.quantity)
          }
        }
        return productAdded
      }))
    } else setProductsAdded([...productsAdded, product])
    setProduct({
      name: '',
      quantity: 1,
      sell_price: 0,
      buy_price: 0,
      id: -1,
    })
    closeDialog()
  }

  const handleChange = (e: any, id?: number) => {
    if (e.target.name === 'name') {
      console.log('name', e.target.value)
      setProduct({
        ...product,
        [e.target.name]: e.target.value.split(' - ')[1],
        id: Number(e.target.value.split(' - ')[0])
      })
      return
    }
    if (e.target.name === 'buy_price') {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
        sell_price: e.target.value * 1.3
      })
      return
    }
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal__container}>
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>Agregar Productos</h2>
          <button className={styles.modal__close} onClick={closeDialog}>
            <span className={styles.modal__close__icon}>&times;</span>
          </button>
        </div>
        <div className={styles.modal__body}>
          <div className={styles.modal__body__table}>
            <div className={styles.modal__body__table_form}>
              <div className={styles.modal__formGroup}>
                <label htmlFor="products" className={styles.modal__label}>Buscar Producto</label>
                <datalist id="products">
                  {
                    productsFiltered && productsFiltered.map((product:any) => (
                      <option
                        key={product.id}
                        value={product.id + ' - ' + product.name}
                      />
                    ))}
                </datalist>
                <input name='name' autoComplete="on" list="products" id='products-input'
                       onChange={e => handleChange(e)}
                       disabled={!products}
                       placeholder={!products ? 'Obteniendo Productos...' : ''}/>
              </div>
              <div className={styles.modal__formGroup}>
                <label htmlFor="buy-price" className={styles.modal__label}>Valor de Compra</label>
                <input type="number" id="buy-price" name={'buy_price'} className={styles.modal__input}
                       placeholder="Valor de Compra" value={product.buy_price} onChange={handleChange}/>
              </div>
              <div className={styles.modal__formGroup}>
                <label htmlFor="sell-price" className={styles.modal__label}>Valor de Venta</label>
                <input type="number" id="sell-price" name={'sell_price'} className={styles.modal__input}
                       placeholder="Valor de Venta" value={product.sell_price} onChange={handleChange}/>
              </div>
              <div className={styles.modal__formGroup}>
                <label htmlFor="quantity" className={styles.modal__label}>Cantidad</label>
                <input type="number" id="quantity" name={'quantity'} className={styles.modal__input}
                       placeholder="Cantidad" value={product.quantity} onChange={handleChange}/>
              </div>
              <div className={styles.modal__formGroup}>
                <button className={styles.modal__btn} onClick={fillCar}>Agregar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

interface AddProductCartDialogProps {
  closeDialog: () => void
  productsCar?: (product: ProductCompleteQ[] | undefined) => void
}

