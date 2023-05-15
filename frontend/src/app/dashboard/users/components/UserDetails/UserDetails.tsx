import styles from './style.module.css'
import {Icon} from "@iconify/react";
import ToolTipPermissions
  from "@/app/dashboard/users/components/TooltipPermissions/ToolTipPermissions";
import {useContext} from "react";
import ModalContext from "@/context/ModalContext";
import ProductContext from "@/context/ProductContext";
import {ProductComplete} from "@/models/Product";

export default function UserDetails(props: UserDetailsProps) {

  const {open , setOpen, id, setId} = useContext(ModalContext);
  const openModal = (id:string, user:any) => {
    if (setId) {
      setId(id)
    }
    setOpen(true)
  }

  if (!props.userSelected) return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalles de Usuario</h1>
      <div className={styles.body}>
        <div className={styles.body__data}>
          <h1 className={styles.body__data_noUser}>
            No hay usuario seleccionado
          </h1>
        </div>
      </div>
    </div>
  )

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalles de Usuario</h1>
      <div className={styles.body}>
        <div className={styles.body__data}>
          <div className={styles.body__data_item}>
            <h2 className={styles.body__data_item_header}>Correo</h2>
            <h2 className={styles.body__data_item_value}>{props.userSelected.email}</h2>
          </div>
          <div className={styles.body__data_item}>
            <h2 className={styles.body__data_item_header}>Nombre de Usuario</h2>
            <h2 className={styles.body__data_item_value}>{props.userSelected.username}</h2>
          </div>
          <div className={styles.body__data_item}>
            <h2 className={styles.body__data_item_header}>Tipo de documento</h2>
            <h2 className={styles.body__data_item_value}>{props.userSelected.documentType}</h2>
          </div>
          <div className={styles.body__data_item}>
            <h2 className={styles.body__data_item_header}>Rol</h2>
            <h2 className={styles.body__data_item_value}>{props.userSelected.role}</h2>
          </div>
          <div className={styles.body__data_item}>
            <h2 className={styles.body__data_item_header}>Nivel de permiso</h2>
            <div className={styles.body__data_item_value}>
              <ToolTipPermissions/>
              <PermissionLevel permissions={props.userSelected.permissions}/>
            </div>
          </div>
        </div>
        <div className={styles.body__actionButtons}>
          <button title={'Editar'} className={styles.body__actionButtons_edit}
                  onClick={() => openModal('edit-user', props.userSelected.user.id)}
          >
            <Icon icon={'ri:edit-line'}/>
          </button>
          <button title={'Eliminar'} className={styles.body__actionButtons_delete}
                  onClick={() => openModal('delete-user', props.userSelected.user.id)}
          >
            <Icon icon={'ri:delete-bin-line'}/>
          </button>
        </div>
      </div>

    </div>
  )
}

const PermissionLevel = (props: PermissionLevelProps) => {
  return (
    <div className={styles.permissionLevel}>
      <span className={
        props.permissions.includes(1)
          ? styles.permissionLevel__item_active
          : styles.permissionLevel__item
      }/>
      <span className={
        props.permissions.includes(2)
          ? styles.permissionLevel__item_active
          : styles.permissionLevel__item
      }/>
      <span className={
        props.permissions.includes(3)
          ? styles.permissionLevel__item_active
          : styles.permissionLevel__item
      }/>
      <span className={
        props.permissions.includes(4)
          ? styles.permissionLevel__item_active
          : styles.permissionLevel__item
      }/>
      <span className={
        props.permissions.includes(5)
          ? styles.permissionLevel__item_active
          : styles.permissionLevel__item
      }/>
      <span className={
        props.permissions.includes(6)
          ? styles.permissionLevel__item_active
          : styles.permissionLevel__item
      }/>
    </div>
  )
}

interface PermissionLevelProps {
  permissions: number[]
}

interface UserDetailsProps {
  userSelected: any
}