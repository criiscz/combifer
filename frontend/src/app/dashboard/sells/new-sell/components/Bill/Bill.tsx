import styles from './style.module.css'
import {Icon} from "@iconify/react";
import {useContext, useEffect} from "react";
import ModalContext from "@/context/ModalContext";
import {ProductComplete, ProductCompleteQ} from "@/models/Product";
import {useQuery} from "react-query";
import cookie from "universal-cookie";
import {getIVA} from "@/api/Taxes";
import SellContext from "@/context/SellContext";
import {SaleComplete} from "@/models/Sale";


export default function CarList({products, readonly}: BillProps) {

  const cookies = new cookie()


  const {setOpen, setId} = useContext(ModalContext);
  const {data} = useQuery('iva', () => getIVA(cookies.get('userToken')))
  const {
    setProducts,
    setProductTotal,
    setTotal,
    setIva,
    setTaxId
  } = useContext(SellContext)

  useEffect(() => {
    setProducts(products)
    console.log(products)
  }, [products])

  const openModal = (id: string) => {
    if (setId) {
      setId(id)
    }
    setOpen(true)
  }

  const calculateIVA = (price: number) => {
    if (data === undefined) return 0
    setTaxId(data.data[0].id)
    return price * data.data[0].value
  }
  const getTotal = () => {
    let total = 0
    products.forEach((product) => {
      if (product.quantity === undefined) return
      total += product.quantity * (product.lot.price! - calculateIVA(product.lot.price!))
    })
    setTotal(total)
    return parseFloat(total.toFixed(2))
  }

  const getTotalIVA = () => {
    let total = 0
    products.forEach((product) => {
      if (product.quantity === undefined) return
      total += product.quantity * calculateIVA(product.lot.price!)
    })
    setIva(total)
    return parseFloat(total.toFixed(2))
  }

  const getTotalPrice = () => {
    let total = 0
    products.forEach((product) => {
      if (product.quantity === undefined) return
      total += product.quantity * product.lot.price!
    })
    setProductTotal(total)
    return parseFloat(total.toFixed(2))
  }

  return (
    <div className={styles.bill__container}>
      <h1 className={styles.bill__title}>Resumen de compra</h1>
      <div className={styles.bill__body}>
        <div className={styles.bill__of_sale_title}>
          <h2>Factura</h2>
        </div>
        <div>
          <div className={styles.bill__data_item}>
            <h2 className={styles.bill__data_item_header}>Cantidad de productos</h2>
            <h2
              className={styles.bill__data_item_value}>{products.length}</h2>
          </div>
          <div className={styles.bill__data_item}>
            <h2 className={styles.bill__data_item_header}>Total</h2>
            <h2
              className={styles.bill__data_item_value}>{getTotal()}
            </h2>
          </div>
          <div className={styles.bill__data_item}>
            <h2 className={styles.bill__data_item_header}>IVA</h2>
            <h2
              className={styles.bill__data_item_value}>{getTotalIVA()}</h2>
          </div>
          <div className={styles.bill__data_item}>
            <h2 className={styles.bill__data_item_header}>Precio Total</h2>
            <h2
              className={styles.bill__data_item_value}>{getTotalPrice()}</h2>
          </div>
        </div>
        <div className={styles.bill__actionButtons}>
          <button title={'Abrir Carrito'}
                  className={!readonly ? styles.bill__actionButtons_button_buy : styles.no_show}
                  onClick={() => openModal('buy-bill')}
          >
            <Icon icon={'icons8:buy'}/>
          </button>
          <button title={'Crear Factura'}
                  className={!readonly ? styles.bill__actionButtons_button_create_bill : styles.no_show}
                  onClick={() => openModal('create-bill')}
          >
            <Icon icon={'ri:add-line'}/>
          </button>
          <button title={'Mas detalles'}
                  className={readonly ? styles.bill__actionButtons_button_edit : styles.no_show}
                  onClick={() => openModal('view-bill')}
          >
            <Icon icon={'ri:more-line'}/>
          </button>
        </div>
      </div>
    </div>
  )
}

interface BillProps {
  products: ProductCompleteQ[]
  readonly?: boolean
}