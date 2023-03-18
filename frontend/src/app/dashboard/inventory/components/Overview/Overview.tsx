'use client'
import styles from "./style.module.css";
import {Product} from "@/models/Product";
import {Icon} from "@iconify/react";
import {useEffect, useState} from "react";
import {ProductLot} from "@/models/ProductLot";
import {useQuery} from "react-query";
import Cookies from "universal-cookie";
import {getProductLot} from "@/api/ProductLots";

export default function Overview(props: OverviewProps) {

  const defaultProductLot: ProductLot = {
    id: 0,
    product_id: 0,
    quantity: 0,
    price: 0,
    enter_date: '',
    emptyness_date: '',
  }

  const [productLot, setProductLot] = useState<ProductLot>(defaultProductLot)

  const cookies = new Cookies()

  const {data} = useQuery(
    `products/${props.productSelected?.id}/productLot`,
    () => getProductLot(cookies.get('token'), props.productSelected?.id),
    {enabled: props.productSelected !== undefined}
  )

  useEffect(() => {
    if (data) setProductLot(data[0] as ProductLot)
  }, [data])

  if (!props.productSelected) {
    return (
      <div className={styles.overview__container}>
        <h1 className={styles.overview__title}>Vista de producto</h1>
        <div className={styles.overview__body}>
          <div className={styles.overview__title_product}>
            <h2 className={styles.overview__title_product_name}>No hay producto seleccionado</h2>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.overview__container}>
      <h1 className={styles.overview__title}>Vista de producto</h1>
      <div className={styles.overview__body}>
        <div className={styles.overview__title_product}>
          <h2 className={styles.overview__title_product_name}>{props.productSelected.name}</h2>
          <h2
            className={styles.overview__title_product_price}>${productLot.price} c/u</h2>
        </div>
        <div className={styles.overview__data}>
          <div className={styles.overview__data_item}>
            <h2 className={styles.overview__data_item_header}>Ubicación</h2>
            <h2
              className={styles.overview__data_item_value}>{props.productSelected.location_id}</h2>
          </div>
          <div className={styles.overview__data_item}>
            <h2 className={styles.overview__data_item_header}>Cantidad</h2>
            <h2
              className={styles.overview__data_item_value}>{productLot.quantity}</h2>
          </div>
          <div className={styles.overview__data_item}>
            <h2 className={styles.overview__data_item_header}>Lote</h2>
            <h2
              className={styles.overview__data_item_value}>{productLot.id}</h2>
          </div>
          <div className={styles.overview__data_item}>
            <h2 className={styles.overview__data_item_header}>Fecha de Compra</h2>
            <h2
              className={styles.overview__data_item_value}>{productLot.enter_date}</h2>
          </div>
        </div>
        <div className={styles.overview__actionButtons}>
          <button title={'Editar'} className={styles.overview__actionButtons_button_edit}>
            <Icon icon={'ri:edit-line'}/>
          </button>
          <button title={'Eliminar'} className={styles.overview__actionButtons_button_delete}>
            <Icon icon={'ri:delete-bin-line'}/>
          </button>
          <button title={'Agregar Stock'}
                  className={styles.overview__actionButtons_button_addStock}>
            <Icon icon={'ri:add-box-line'}/>
          </button>
        </div>
        <div className={styles.overview__total_description}>
          <div className={styles.overview__total_item}>
            <h2 className={styles.overview__total_item_header}>Ganancias Netas</h2>
            <h2
              className={styles.overview__total_item_value}>{props.productSelected.location_id}</h2>
          </div>
          <div className={styles.overview__total_item}>
            <h2 className={styles.overview__total_item_header}>Total Cantidad Vendido</h2>
            <h2
              className={styles.overview__total_item_value}>{props.productSelected.location_id}</h2>
          </div>
          <div className={styles.overview__total_item}>
            <h2 className={styles.overview__total_item_header}>Última venta</h2>
            <h2
              className={styles.overview__total_item_value}>{props.productSelected.location_id}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

interface OverviewProps {
  productSelected: Product
}

