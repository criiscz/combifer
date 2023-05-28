import styles from './style.module.css'
import {Icon} from "@iconify/react";
import ToolTipPermissions
  from "@/app/dashboard/users/components/TooltipPermissions/ToolTipPermissions";
import {useContext} from "react";
import ModalContext from "@/context/ModalContext";
import ProductContext from "@/context/ProductContext";
import {ProductComplete} from "@/models/Product";
import {OrderData} from "@/models/Order";
import SellContext from "@/context/SellContext";
import {useQuery} from "react-query";
import {cookies} from "next/headers";
import {getOrderByid} from "@/api/Orders";
import {getToken} from "@/helpers/helpers";
import orderContext from "@/context/OrderContext";
import {getIVA} from "@/api/Taxes";

export default function OrderDetails(props: OrderDetailsProps) {

  const {open, setOpen, id, setId} = useContext(ModalContext);

  const {data:iva} = useQuery('iva',
    () => {return getIVA(getToken())},
    {
      enabled: true,
    }
  )

  const {setProductsAdded} = useContext(orderContext)
  const {
    setProductTotal,
    setIva,
    setTotal,
    setDiscount,
  } = useContext(SellContext)

  // const {data} = useQuery('order-details',
  //   () => {return getOrderByid(getToken(), props.orderSelected.id)},
  //   {
  //     enabled: !!props.orderSelected,
  //   }
  // )
  const openModal = (id: string, user: any) => {
    if (setId) {
      setId(id)
    }
    setProductsAdded(user.products.map((product: any) => {
      return {
        quantity: product.productQuantity,
        id: product.id,
        name: product.productName,
        buy_price: product.productUnitPrice,
        sell_price: product.productUnitPrice * 1.3,
      }
    }))

    setProductTotal(user.total)
    if (iva !== undefined){
      setIva(user.total * iva.data[0].value)
      setTotal(user.total - (user.total * iva.data[0].value))
    }
    setDiscount(0)

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
          <button title={'Ver detalles'} className={styles.body__actionButtons_details}
                  onClick={() => openModal('order-details', props.orderSelected)}
          >
            <Icon icon={'ri:more-line'}/>
          </button>
        </div>
      </div>

    </div>
  )
}


interface OrderDetailsProps {
  orderSelected: any
}