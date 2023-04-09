import styles from './style.module.css'
import {ProductComplete} from "@/models/Product";
import {useContext, useEffect, useState} from "react";
import SearchBar from "@/app/dashboard/components/SearchBar/SearchBar";
import ProductList from "@/app/dashboard/sells/components/ProductList/ProductList";
import {useQuery} from "react-query";
import {getAllProductLots} from "@/api/ProductLots";
import ProductContext from "@/context/ProductContext";
import {ProductLot} from "@/models/ProductLot";
import {getProduct} from "@/api/Products";
import cookie from "universal-cookie";

export default function AddProductCartDialog({
                                               closeDialog,
                                               productsCar
                                             }: AddProductCartDialogProps) {
  const cookies = new cookie()

  const [products, setProducts] = useState<ProductComplete[]>([])
  const [productsFiltered, setProductsFiltered] = useState<ProductComplete[]>(products)
  const [productSelected, setProductSelected] = useState<ProductComplete [] | undefined>(undefined)
  const [update, setUpdate] = useState(false)


  const {
    data: productsLotData,
    refetch
  } = useQuery('productLots', () => getAllProductLots(cookies.get('token')))
  const {refresh, setRefresh} = useContext(ProductContext)

  useEffect(() => {
    if (productsLotData !== undefined) {
      console.log('Entro a refrescar')
      const products = productsLotData.data.map(async (productLot: ProductLot) => {
        return await getProduct(productLot.id)
      })
      Promise.all(products).then((products) => {
        setProducts(products as ProductComplete[])
        setProductsFiltered(products as ProductComplete[])
      })
      setUpdate(false)
    }
  }, [productsLotData, refetch, update])

  useEffect(() => {
    if (refresh) {
      refetch()
      setProductSelected(undefined)
      setRefresh(false)
      setTimeout(() => {
        setUpdate(true)
      }, 1000)
    }
  }, [refresh])


  const SearchProduct = (name: string) => {
    if (name === '') setProductsFiltered(products)
    else {
      const productsFiltered = products.filter((product) => {
        return product.product.name!.toLowerCase().includes(name.toLowerCase())
      })
      setProductsFiltered(productsFiltered)
    }
  }

  const selectProducts = (product: ProductComplete [] | undefined) => {
    setProductSelected(product)
    console.log("Product selected: ", product)
  }

  const fillCar = () => {
    closeDialog()
    // productsCar(productSelected)
  }

  return (
    <div className={styles.AddProductCart__container}>
      <div className={styles.AddProductCart__header}>
        <SearchBar onSubmit={SearchProduct}/>
      </div>
      <div className={styles.ddProductCart__body}>
        {
          products === undefined ?
            <ProductList products={[]} productSelected={selectProducts}/> :
            <ProductList products={productsFiltered} productSelected={selectProducts}/>
        }
      </div>
      <div className={styles.addProductCart__footer}>
        <button className={styles.addProductCart__footer_button_add}
                onClick={fillCar}
        >Agregar
        </button>

        <button className={styles.addProductCart__footer_button_cancel}
                onClick={closeDialog}
        >Cancelar
        </button>
      </div>
    </div>
  )
}

interface AddProductCartDialogProps {
  closeDialog: () => void
  productsCar?: (product: ProductComplete[] | undefined) => void
}

