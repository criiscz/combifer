import styles from './style.module.css'
import {Product} from "@/models/Product";
import Table from "../Table/Table";

export default function ProductList({products}: { products: Product[] }) {
  return (
    <div className={styles.productList__container}>
      <h1 className={styles.productList__title}>Inventario</h1>
      <Table products={products} header={['Id', 'Nombre', 'Categoría']}/>
    </div>
  )
}

