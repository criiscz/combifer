import styles from './style.module.css'
import {Product, ProductComplete} from "@/models/Product";
import Table from "../Table/Table";
import {Dispatch, SetStateAction} from "react";

export default function ProductList({products, productSelected}: ProductListProps) {
  return (
    <div className={styles.productList__container}>
      <h1 className={styles.productList__title}>Inventario</h1>
      <Table products={products} header={['Id', 'Nombre', 'Categoría', 'Precio', 'Cantidad']} productSelected={productSelected}/>
    </div>
  )
}

interface ProductListProps {
  products: ProductComplete[]
  productSelected: (product: ProductComplete | undefined) => void
}
