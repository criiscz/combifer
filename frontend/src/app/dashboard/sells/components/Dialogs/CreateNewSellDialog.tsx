import styles from "@/app/dashboard/sells/components/Dialogs/style.module.css";
import SearchBar from "@/app/dashboard/components/SearchBar/SearchBar";
import ProductList from "@/app/dashboard/sells/components/ProductList/ProductList";
import {Icon} from "@iconify/react";

export default function AddProductCartDialog({closeDialog}: CreateNewSellDialogProps) {
  return (
    <div className={styles.AddProductCart__container}>
      <div className={styles.AddProductCart__header}>
        <button className={styles.dialog__closeButton}
                onClick={() => closeDialog()}
        >
          <Icon icon={'ri:close-line'}/>
        </button>
      </div>
      <div className={styles.ddProductCart__body}>
        {
        }
      </div>
      <div className={styles.addProductCart__footer}>
        <button className={styles.addProductCart__footer_button_add}
        >Agregar
        </button>

        <button className={styles.addProductCart__footer_button_cancel}
                onClick={closeDialog}
        >Cancelar
        </button>
      </div>
    </div>
  )
}

interface CreateNewSellDialogProps {
  closeDialog: () => void
}