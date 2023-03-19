import styles from './style.module.css'
import {Icon} from "@iconify/react";
import {ProductComplete} from "@/models/Product";

export default function DeleteProductDialog({ closeDialog, product } : DeleteProductDialogProps) {
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
        <h2 className={styles.dialog__body_title}>¿Está seguro que desea eliminar {product?.product.name}?</h2>
        <h2 className={styles.dialog__body_subtitle}>Esta acción no se puede deshacer</h2>
      </div>
      <div className={styles.dialog__footer}>
        <button className={styles.dialog__footer_button_cancel}>Cancelar</button>
        <button className={styles.dialog__footer_button_delete}>Eliminar</button>
      </div>
    </div>
  )
}

interface DeleteProductDialogProps {
  closeDialog: () => void,
  product: ProductComplete | undefined
}