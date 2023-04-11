import styles from './style.module.css'
import {Icon} from "@iconify/react";
import {useContext} from "react";
import ModalContext from "@/context/ModalContext";


export default function CarList(props: BillProps) {

    const {setOpen, setId} = useContext(ModalContext);

    const openModal = (id:string) => {
        if (setId) {
            setId(id)
        }
        setOpen(true)
    }

    return (
        <div className={styles.bill__container}>
            <h1 className={styles.bill__title}>Resumen de compra</h1>
            <div className={styles.bill__body}>
                <div className={styles.bill__of_sale_title}>
                    <h2>Factura N</h2>
                    <h2
                        className={styles.overview__title_product_price}>666{/*props.productSelected.lot.id*/}</h2>
                </div>
                <div>
                    <div className={styles.bill__data_item}>
                        <h2 className={styles.bill__data_item_header}>Cantidad de productos</h2>
                        <h2
                            className={styles.bill__data_item_value}>{/*props.productSelected.lot.id*/}</h2>
                    </div>
                    <div className={styles.bill__data_item}>
                        <h2 className={styles.bill__data_item_header}>Total</h2>
                        <h2
                            className={styles.bill__data_item_value}>{/*props.productSelected.lot.id*/}</h2>
                    </div>
                    <div className={styles.bill__data_item}>
                        <h2 className={styles.bill__data_item_header}>IVA</h2>
                        <h2
                            className={styles.bill__data_item_value}>{/*props.productSelected.lot.id*/}</h2>
                    </div>
                    <div className={styles.bill__data_item}>
                        <h2 className={styles.bill__data_item_header}>Precio Total</h2>
                        <h2
                            className={styles.bill__data_item_value}>{/*props.productSelected.lot.id*/}</h2>
                    </div>
                </div>
                <div className={styles.bill__actionButtons}>
                    <button title={'Comprar'}
                            className={styles.bill__actionButtons_button_buy}
                            onClick={() => openModal('buy-bill')}
                    >
                        <Icon icon={'icons8:buy'}/>
                    </button>
                    <button title={'Editar Precio'}
                            className={styles.bill__actionButtons_button_edit}
                            onClick={() => openModal('edit-price')}
                    >
                        <Icon icon={'healthicons:coins'}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

interface BillProps {

}