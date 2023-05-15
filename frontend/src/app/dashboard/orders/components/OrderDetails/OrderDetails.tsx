import styles from './style.module.css'
import {Icon} from "@iconify/react";
import ToolTipPermissions
  from "@/app/dashboard/users/components/TooltipPermissions/ToolTipPermissions";
import {useContext} from "react";
import ModalContext from "@/context/ModalContext";
import ProductContext from "@/context/ProductContext";
import {ProductComplete} from "@/models/Product";
import {OrderData} from "@/models/Order";

export default function OrderDetails(props: OrderDetailsProps) {

  const {open, setOpen, id, setId} = useContext(ModalContext);
  const openModal = (id: string, user: any) => {
    if (setId) {
      setId(id)
    }
    setOpen(true)
  }

  if (!props.orderSelected) return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalles de Orden</h1>
      <div className={styles.body}>
        <div className={styles.body__data}>
          <h1 className={styles.body__data_noUser}>
            No hay orden seleccionada
          </h1>
        </div>
      </div>
    </div>
  )

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalles de Orden</h1>
      <div className={styles.body}>
        <div className={styles.body__data}>
          <div className={styles.body__data_item}>
            <h2 className={styles.body__data_item_header}>Nombre Empleado</h2>
            <h2 className={styles.body__data_item_value}>{
              props.orderSelected.name + ' ' + props.orderSelected.lastName}
            </h2>
          </div>
          <div className={styles.body__data_item}>
            <h2 className={styles.body__data_item_header}>Teléfono</h2>
            <h2 className={styles.body__data_item_value}>{props.orderSelected.phone}</h2>
          </div>
          <div className={styles.body__data_item}>
            <h2 className={styles.body__data_item_header}>Correo</h2>
            <h2 className={styles.body__data_item_value}>{props.orderSelected.email}</h2>
          </div>
          <div className={styles.body__data_item}>
            <h2 className={styles.body__data_item_header}>Cantidad de products</h2>
            <h2 className={styles.body__data_item_value}>{props.orderSelected.products.length}</h2>
          </div>
        </div>
        <div className={styles.body__actionButtons}>
          <button title={'Editar'} className={styles.body__actionButtons_edit}
                  onClick={() => openModal('edit-user', props.orderSelected.order.id)}
          >
            <Icon icon={'ri:edit-line'}/>
          </button>
          <button title={'Eliminar'} className={styles.body__actionButtons_delete}
                  onClick={() => openModal('delete-user', props.orderSelected.order.id)}
          >
            <Icon icon={'ri:delete-bin-line'}/>
          </button>
        </div>
      </div>

    </div>
  )
}


interface OrderDetailsProps {
  orderSelected: any
}