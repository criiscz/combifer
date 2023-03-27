'use client'
import styles from "./style.module.css";
import {ProductComplete} from "@/models/Product";
import {Icon} from "@iconify/react";
import ModalContext from "@/context/ModalContext";
import {useContext, useEffect} from "react";
import ProductContext from "@/context/ProductContext";
import {render} from "react-dom";

export default function Overview(props: OverviewProps) {

  const {open , setOpen, id, setId} = useContext(ModalContext);
  const {product, setProduct, refresh} = useContext(ProductContext);

  const openModal = (id:string, product: ProductComplete) => {
    if (setId) {
      setId(id)
    }
    setOpen(true)
    if (setProduct) {
      setProduct(product)
    }
  }


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
          <h2 className={styles.overview__title_product_name}>{props.productSelected.product.name}</h2>
          <h2
            className={styles.overview__title_product_price}>${props.productSelected.lot.price} c/u</h2>
        </div>
        <div className={styles.overview__data}>
          <div className={styles.overview__data_item}>
            <h2 className={styles.overview__data_item_header}>Ubicación</h2>
            <h2
              className={styles.overview__data_item_value}>{props.productSelected.location.name}</h2>
          </div>
          <div className={styles.overview__data_item}>
            <h2 className={styles.overview__data_item_header}>Cantidad</h2>
            <h2
              className={styles.overview__data_item_value}>{props.productSelected.lot.quantity}</h2>
          </div>
          <div className={styles.overview__data_item}>
            <h2 className={styles.overview__data_item_header}>Lote</h2>
            <h2
              className={styles.overview__data_item_value}>{props.productSelected.lot.id}</h2>
          </div>
          <div className={styles.overview__data_item}>
            <h2 className={styles.overview__data_item_header}>Fecha de Compra</h2>
            <h2
              className={styles.overview__data_item_value}>{props.productSelected.lot.enterDate}</h2>
          </div>
        </div>
        <div className={styles.overview__actionButtons}>
          <button title={'Editar'}
                  className={styles.overview__actionButtons_button_edit}
                  onClick={() => openModal('edit-product', props.productSelected)}
          >
            <Icon icon={'ri:edit-line'}/>
          </button>
          <button title={'Eliminar'}
                  className={styles.overview__actionButtons_button_delete}
                  onClick={() => openModal('delete-product', props.productSelected)}
          >
            <Icon icon={'ri:delete-bin-line'}/>
          </button>
          <button title={'Agregar Stock'}
                  className={styles.overview__actionButtons_button_addStock}>
            <Icon icon={'ri:add-box-line'}/>
          </button>
        </div>
        {/*<div className={styles.overview__total_description}>*/}
        {/*  <div className={styles.overview__total_item}>*/}
        {/*    <h2 className={styles.overview__total_item_header}>Ganancias Netas</h2>*/}
        {/*    <h2*/}
        {/*      className={styles.overview__total_item_value}>{props.productSelected.product.id}</h2>*/}
        {/*  </div>*/}
        {/*  <div className={styles.overview__total_item}>*/}
        {/*    <h2 className={styles.overview__total_item_header}>Total Cantidad Vendido</h2>*/}
        {/*    <h2*/}
        {/*      className={styles.overview__total_item_value}>{props.productSelected.product.id}</h2>*/}
        {/*  </div>*/}
        {/*  <div className={styles.overview__total_item}>*/}
        {/*    <h2 className={styles.overview__total_item_header}>Última venta</h2>*/}
        {/*    <h2*/}
        {/*      className={styles.overview__total_item_value}>{props.productSelected.product.id}</h2>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  )
}

interface OverviewProps {
  productSelected: ProductComplete
}

