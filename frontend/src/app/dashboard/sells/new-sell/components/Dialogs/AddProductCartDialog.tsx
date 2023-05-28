import styles from './style.module.css'
import {ProductComplete, ProductCompleteQ} from "@/models/Product";
import {useCallback, useContext, useEffect, useState} from "react";
import SearchBar from "@/app/dashboard/components/SearchBar/SearchBar";
import ProductList from "@/app/dashboard/sells/new-sell/components/ProductList/ProductList";
import {useQuery} from "react-query";
import {getAllProductLots, getProductRecommendation} from "@/api/ProductLots";
import ProductContext from "@/context/ProductContext";
import {ProductLot} from "@/models/ProductLot";
import {getProduct} from "@/api/Products";
import cookie from "universal-cookie";
import SellContext from "@/context/SellContext";
import ClientContext from "@/context/ClientContext";
import {Icon} from "@iconify/react";

export default function AddProductCartDialog({
                                               closeDialog,
                                             }: AddProductCartDialogProps) {
  const cookies = new cookie()

  const [products, setProducts] = useState<ProductComplete[]>([])
  const [productsFiltered, setProductsFiltered] = useState<ProductComplete[]>(products)
  const [update, setUpdate] = useState(false)

  const [productRecommendation, setProductRecommendation] = useState([])

  const {selectedClient} = useContext(ClientContext)

  const {isFetching: fetchingAI} = useQuery(
    'smart-system-get-product',
    () => getProductRecommendation(selectedClient!.idDocument),
    {
      enabled: selectedClient !== undefined,
      onSuccess: (data) => {
        setProductRecommendation(data.products)
      }
    }
  )


  const {
    data: productsLotData,
    isFetching,
    refetch
  } = useQuery(
    'productLots',
    () => getAllProductLots(cookies.get('token')),
    {
      onSuccess: (data) => {
        setProducts(data.data.filter((product: any) => product.lot.quantity > 0))
        setProductsFiltered(data.data.filter((product: any) => product.lot.quantity > 0))

      },
      cacheTime: 0,
    }
  )

  const {
    refresh,
    setRefresh,
    setProducts: setProductsSel,
    productsSelected,
    setProductsSelected
  } = useContext(ProductContext)


  useEffect(() => {
    if (refresh) {
      refetch()
      setProductsSelected(undefined!)
      setRefresh(false)
      setTimeout(() => {
        setUpdate(true)
      }, 1000)
    }
  }, [refetch, refresh, setProductsSelected, setRefresh])

  useEffect(() => {
    document.getElementById('searchbar')?.focus()
  }, [])


  const SearchProduct = (name: string) => {
    if (name === '') setProductsFiltered(products)
    else {
      const productsFiltered = products.filter((product) => {
        return product.product.name!.toLowerCase().includes(name.toLowerCase())
      })
      setProductsFiltered(productsFiltered)
    }
  }

  const selectProducts = useCallback((product: ProductCompleteQ[] | undefined) => {
    setProductsSelected(product!)
    setProductsSel(product)
    console.log("Product selected: (DIALOG)", product)
  }, [setProductsSelected, setProductsSel])

  const fillCar = () => {
    closeDialog()
  }

  const selectSuggestion = (name: string) => {
    SearchProduct(name)
  }

  return (
    <div className={styles.AddProductCart__container}>
      <div className={styles.AddProductCart__header}>
        <SearchBar onSubmit={SearchProduct} id={"searchbar"}/>
      </div>
      <div className={styles.ddProductCart__body}>
        {
          selectedClient === undefined ? <></> :
          fetchingAI ? <p>Cargando...</p> :

          <div className={styles.smart_system_OH_YEAH_EGG_BTW_I_24_HOURS_CODING_HAPPY_NOT_HAPPY}>
            {productRecommendation.map((product: any) => {
              return (
                <div className={styles.smart__top} key={product.recommendation.id}>
                  <div className={styles.smart__name} onClick={() => selectSuggestion(product.product.name)}>
                    <Icon icon={'ri:bard-fill'}/>
                    {product.product.name}
                  </div>
                  <div className={styles.smart__exit} onClick={() => SearchProduct('')}>
                    <Icon icon={'ri:close-line'}/>
                    {product.product.price}
                  </div>
                </div>
              )
            })}
          </div>
        }

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
  productsCar?: (product: ProductCompleteQ[] | undefined) => void
}

