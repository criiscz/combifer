import styles from "./style.module.css";
import {Icon} from "@iconify/react";
import Table from "@/app/dashboard/components/Table/Table";
import {useContext} from "react";
import Button from "@/app/components/Button";
import SellContext from "@/context/SellContext";
import ToastContext from "@/context/ToastContext";
import Cookies from "universal-cookie";
import orderContext from "@/context/OrderContext";
import {useMutation} from "react-query";
import {createOrder} from "@/api/Orders";
import {useRouter} from "next/navigation";

export default function CreateNewBuyDialog({closeDialog, readonly}: CreateNewSellDialogProps) {

  const {productsAdded} = useContext(orderContext)
  const {setToast, setText} = useContext(ToastContext)
  const router = useRouter()
  const {
    productTotal,
    iva,
    total,
    discount,
    selectedClient,
    taxId,
    setSelectedClient,
    setProductTotal,
    setIva,
    setTotal,
    setDiscount,
    setProducts,
    setProductsSelected
  } = useContext(SellContext)

  const cookies = new Cookies()

  const clearSell = () => {
    setProducts([])
    setSelectedClient(undefined)
    setProductTotal(0)
    setIva(0)
    setTotal(0)
    setDiscount(0)
    setProductsSelected([])
  }


  const {mutate: orderMutation} = useMutation({
    mutationFn: (order:any) => createOrder(cookies.get('userToken'), order),
    onSuccess: () => {
      closeDialog()
      setToast(true)
      setText('Orden creada con éxito')
      clearSell()
      router.push('/dashboard/orders')
    }
  })

  const close = () => {
    if (readonly) {
      clearSell()
    }
    closeDialog()
  }

  const createBuy = () => {
    if (productsAdded.length ) {
      const products = productsAdded.map((product: any) => {
        return {
          quantity: product.quantity,
          productId: product.id,
          name: product.name,
          baseUnitPrice: product.buy_price,
          unitPrice: product.sell_price,
        }
      })

      orderMutation({
        description: 'compra',
        products: products,
      })
    } else {
      setToast(true)
      setText('no hay productos seleccionados')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Generar Factura</h2>
        <button className={styles.closeButton} onClick={close}>
          <Icon icon="ri:close-line" width={30}/>
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.row}>
          <ItemComponent title="Buscar Producto">
            <div className={styles.item__row}>
              <div className={styles.item_title}>Cantidad de productos</div>
              <div className={styles.title__value}>{
                productsAdded.length
              }</div>
            </div>
            <div className={styles.item__row}>
              <div className={styles.item__title}>Total</div>
              <div className={styles.title__value}>${total.toFixed(2)}</div>
            </div>
            <div className={styles.item__row}>
              <div className={styles.item__title}>Descuento</div>
              <div className={styles.title__value}>${discount.toFixed(2)}</div>
            </div>
            <div className={styles.item__row}>
              <div className={styles.item__title}>IVA</div>
              <div className={styles.title__value}>${iva.toFixed(2)}</div>
            </div>
            <div className={styles.item__row}>
              <div className={styles.item__title}>Precio Total</div>
              <div className={styles.title__value}>${productTotal.toFixed(2)}</div>
            </div>
          </ItemComponent>
        </div>
        <div className={styles.row}>
          <ItemComponent title="Resumen">
            <Table items={productsAdded.map(
              (product: any) => {
                return {
                  name: product.name,
                  buy_price: '$'+product.buy_price,
                  sell_price: '$'+product.sell_price,
                  quantity: product.quantity,
                  total: '$'+(product.quantity * product.buy_price),
                  id: product.id,
                }
              }
            )} itemsToDisplay={5} header={[
              'Nombre',
              'Precio Compra',
              'Precio Venta',
              'Cantidad',
              'Total'
            ]}
                   setItemSelected={() => {
                   }}
            />
          </ItemComponent>
        </div>
        <div className={!readonly ? styles.row : styles.no_show}>
          <Button title={'Realizar Compra'} onClick={() => {
            createBuy()
          }}/>
        </div>
      </div>
    </div>
  )
}

function ItemComponent({title, children}: { title: string, children?: any }) {
  return (
    <div className={styles.rowItem}>
      <h3 className={styles.rowItem__title}>{title}</h3>
      <div className={styles.rowItem__content}>
        {children}
      </div>
    </div>
  )
}

interface CreateNewSellDialogProps {
  closeDialog: () => void,
  readonly?: boolean
}