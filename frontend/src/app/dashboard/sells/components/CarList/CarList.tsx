import styles from './style.module.css'
import {ProductComplete, ProductCompleteQ} from "@/models/Product";
import Table from "../Table/Table";

export default function CarList({products, productSelected}: ProductListProps) {
    return (
        <div className={styles.carList__container}>
            <h1 className={styles.carList__title}>Lista de Productos</h1>
            <Table products={products} header={['Id', 'Nombre', 'Categoría', 'Precio', 'Cantidad','Opciones']} productSelected={productSelected}/>
        </div>
    )
}

interface ProductListProps {
    products: ProductComplete[]
    productSelected: (product: ProductCompleteQ | undefined) => void
}