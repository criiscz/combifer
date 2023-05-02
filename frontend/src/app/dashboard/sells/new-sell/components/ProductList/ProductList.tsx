import styles from './style.module.css'
import {ProductComplete, ProductCompleteQ} from "@/models/Product";
import Table from "../TableInventary/Table";

export default function ProductList({products, productSelected}: ProductListProps) {
  return (
    <div className={styles.productList__container}>
      <h1 className={styles.productList__title}>Lista De Productos</h1>
      <Table products={products} header={['Id', 'Nombre', 'Categoría', 'Precio', 'Cantidad' +
      ' Disponible','Cantidad']} productSelected={productSelected}/>
    </div>
  )
}

interface ProductListProps {
  products: ProductComplete[]
  productSelected: (product: ProductCompleteQ[] | undefined) => void
}
