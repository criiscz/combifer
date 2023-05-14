import styles from "./style.module.css";
import SearchBar from "@/app/dashboard/components/SearchBar/SearchBar";
import ProductList from "@/app/dashboard/sells/new-sell/components/ProductList/ProductList";
import {Icon} from "@iconify/react";
import Table from "@/app/dashboard/sells/new-sell/components/Table/Table";
import {useContext} from "react";
import ProductContext from "@/context/ProductContext";
import Button from "@/app/components/Button";
import {ProductCompleteQ} from "@/models/Product";
import SellContext from "@/context/SellContext";
import ToastContext from "@/context/ToastContext";
import {useMutation} from "react-query";
import {createClient} from "@/api/Clients";
import {DocumentType} from "@/models/DocumentType";
import {createNewSell, SellCreate} from "@/api/Sells";
import Cookies from "universal-cookie";

export default function CreateNewSellDialog({closeDialog, readonly}: CreateNewSellDialogProps) {

  const {productsSelected} = useContext(ProductContext)
  const {setToast, setText} = useContext(ToastContext)
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

  const {mutate: clientMutation} = useMutation({
    mutationFn: (sell: SellCreate) => createNewSell(cookies.get('userToken'), sell),
    onSuccess: () => {
      closeDialog()
      setToast(true)
      setText('Venta creada con éxito')
      clearSell()
    }
  })

  const close = () => {
    if (readonly) {
      clearSell()
    }
    closeDialog()
  }

  const createSell = () => {
    if (productsSelected.length && selectedClient) {
      const products = productsSelected.map((product: ProductCompleteQ) => {
        return {
          lotId: product.lot.id,
          quantity: product.quantity,
          discount: 0,
          taxId: taxId
        }
      })
      const sell = {
        client: selectedClient.idDocument,
      }
      clientMutation({
        description: 'Venta',
        products: products,
        clientId: sell.client,
      })
    } else {
      setToast(true)
      setText('No hay productos o cliente seleccionado')
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
                productsSelected.length
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
          <ItemComponent title="Cliente">
            <div className={styles.item__row}>
              <div className={styles.item__title}>Tipo de Documento</div>
              <div className={styles.title__value}>{selectedClient?.documentType}</div>
            </div>
            <div className={styles.item__row}>
              <div className={styles.item__title}>Documento</div>
              <div className={styles.title__value}>{selectedClient?.idDocument}</div>
            </div>
            <div className={styles.item__row}>
              <div className={styles.item__title}>Nombre</div>
              <div className={styles.title__value}>{selectedClient?.name}</div>
            </div>
            <div className={styles.item__row}>
              <div className={styles.item__title}>Apellido</div>
              <div className={styles.title__value}>{selectedClient?.lastName}</div>
            </div>
            <div className={styles.item__row}>
              <div className={styles.item__title}>Telefono</div>
              <div className={styles.title__value}>{selectedClient?.phone}</div>
            </div>
            <div className={styles.item__row}>
              <div className={styles.item__title}>Correo</div>
              <div className={styles.title__value}>{selectedClient?.email}</div>
            </div>
          </ItemComponent>
        </div>
        <div className={styles.row}>
          <ItemComponent title="Resumen">
            <Table products={productsSelected} header={[
              'Id',
              'Nombre',
              'Precio',
              'Cantidad',
              'Total'
            ]}

            />
          </ItemComponent>
        </div>
        <div className={!readonly ? styles.row : styles.no_show}>
          <Button title={'Realizar Venta'} onClick={createSell}/>
        </div>
      </div>
    </div>
  )
}

function ItemComponent({
                         title, children
                       }: {
  title: string, children?: any
}) {
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