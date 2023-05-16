import styles from './style.module.css'
import {ProductComplete} from "@/models/Product";
import Table from "../Table/Table";

export default function ProductList({
                                      products,
                                      productSelected,
                                      fetchMoreData,
                                      hasMore,
                                      productsTotal,
                                      ref
                                    }: ProductListProps) {
  return (
    <div className={styles.productList__container}>
      <h1 className={styles.productList__title}>Inventario</h1>
      <Table products={products}
             header={['Id', 'Nombre', 'Categoría', 'Precio', 'Cantidad']}
             fetchMoreData={fetchMoreData}
             productSelected={productSelected}
             hasMore={hasMore}
             productsTotal={productsTotal}
             ref={ref}
      />
    </div>
  )
}

interface ProductListProps {
  products: ProductComplete[]
  productSelected: (product: ProductComplete | undefined) => void,
  fetchMoreData: () => void,
  hasMore: boolean,
  productsTotal: any,
  ref: any
}
