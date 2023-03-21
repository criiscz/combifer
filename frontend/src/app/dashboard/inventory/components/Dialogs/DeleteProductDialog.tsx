import styles from './style.module.css'
import {Icon} from "@iconify/react";
import {ProductComplete} from "@/models/Product";
import {useMutation} from "react-query";
import {deleteProduct} from "@/api/Products";
import {useContext, useEffect} from "react";
import {deleteProductLot} from "@/api/ProductLots";
import ToastContext from "@/context/ToastContext";
import ProductContext from "@/context/ProductContext";

export default function DeleteProductDialog({closeDialog, product}: DeleteProductDialogProps) {

  // ----------------------------- Mutations --------------------------
  const {mutate: removeProductLot, data: deletedProductLot} = useMutation(deleteProductLot)
  const {mutate: removeProduct} = useMutation(deleteProduct)
  // ----------------------------- Effects ---------------------------
  useEffect(() => {
    if (deletedProductLot) {
      removeProduct(deletedProductLot.data.productId)
      closeDialog()
      setToast(true)
      setText('Producto eliminado correctamente')
      refresh()
    }
  }, [deletedProductLot])
  // ----------------------------- Contexts ----------------------------
  const {toast, setToast, setText} = useContext(ToastContext)
  const {setRefresh} = useContext(ProductContext)
  // ----------------------------- Functions --------------------------
  const handleDelete = () => {
    if (product) {
      removeProductLot(product.lot.id)
    }
  }
  const refresh = () => {
    setRefresh(true)
  }
  // ----------------------------- Render -----------------------------
  return (
    <div className={styles.dialog__container}>
      <div className={styles.dialog__header}>
        <h1 className={styles.dialog__title}>Eliminar producto</h1>
        <button className={styles.dialog__closeButton}
                onClick={closeDialog}
        >
          <Icon icon={'mdi:close'} width={20} height={20}/>
        </button>
      </div>
      <div className={styles.dialog__body}>
        <h2 className={styles.dialog__body_title}>¿Está seguro que desea
          eliminar {product?.product.name}?</h2>
        <h2 className={styles.dialog__body_subtitle}>Esta acción no se puede deshacer</h2>
      </div>
      <div className={styles.dialog__footer}>
        <button className={styles.dialog__footer_button_cancel}
                onClick={closeDialog}
        >Cancelar</button>
        <button className={styles.dialog__footer_button_delete}
                onClick={handleDelete}
        >Eliminar</button>
      </div>
    </div>
  )
}

interface DeleteProductDialogProps {
  closeDialog: () => void,
  product: ProductComplete | undefined
}