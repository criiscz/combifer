import styles from './style.module.css'
import {ProductComplete, ProductCompleteQ} from "@/models/Product";
import Table from "../Table/Table";

export default function CarList({products}: ProductListProps) {
    return (
        <div className={styles.carList__container}>
            <h1 className={styles.carList__title}>Lista de Productos</h1>
            <Table products={products} header={['Id', 'Nombre', 'Categoría', 'Precio', 'Cantidad','Opciones']} deleteButton={true}/>
        </div>
    )
}

interface ProductListProps {
    products: ProductCompleteQ[]
}