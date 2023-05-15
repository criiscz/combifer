'use client'
import styles from './style.module.css'
import SearchBar from "@/app/dashboard/components/SearchBar/SearchBar";
import cookie from "universal-cookie";
import {useInfiniteQuery, useQuery} from "react-query";
import {getProduct} from "@/api/Products";
import {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import ProductList from "@/app/dashboard/inventory/components/ProductList/ProductList";
import Overview from "@/app/dashboard/inventory/components/Overview/Overview";
import {Product, ProductComplete} from "@/models/Product";
import Button from "@/app/components/Button";
import {ProductLot} from "@/models/ProductLot";
import {getAllProductLots} from "@/api/ProductLots";
import ModalContext from "@/context/ModalContext";
import ProductContext from "@/context/ProductContext";
import {BackResponse} from "@/models/BackResponse";

export default function InventoryPage() {
  const cookies = new cookie()

  const [products, setProducts] = useState<ProductComplete[]>([])
  const [productsFiltered, setProductsFiltered] = useState<ProductComplete[]>(products)
  const [productSelected, setProductSelected] = useState<ProductComplete | undefined>(undefined)
  const {setOpen, setId} = useContext(ModalContext);
  const [update, setUpdate] = useState(false)
  const [pageToFetch, setPageToFetch] = useState(0)

  const tableContainerRef = useRef<HTMLDivElement>(null)

  // const {
  //   data: productsLotData,
  //   refetch
  // } = useQuery('productLots', () => getAllProductLots(cookies.get('token'), pageToFetch, 20))

  const {
    data: productsLotData,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(
    'productLots',
    ({pageParam = 0}) => getAllProductLots(cookies.get('token'), pageParam, 20),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.data.length < 20) return undefined
        return lastPage.meta.currentPage + 1
      }
    }
  )

  const {refresh, setRefresh} = useContext(ProductContext)

  const productsItem = useMemo(() => productsLotData?.pages.reduce((prev, page) => {
    return {
      meta: page.meta,
      data: [...prev.data, ...page.data]
    }
  }), [productsLotData])

  useEffect(() => {
    if (productsLotData !== undefined) {
      const products = productsLotData.pages.map(async (page) => {
        return await page.data.map(async (productLot: ProductLot) => {
          return await getProduct(productLot.id)
        })
      })

      Promise.all(products).then((products) => {
        products = products.flat()
        Promise.all(products).then((products) => {
          setProducts(products as ProductComplete[])
          setProductsFiltered(products as ProductComplete[])
        })
      })
      setUpdate(false)
    }
  }, [productsLotData, update])


  const SearchProduct = (name: string) => {
    if (name === '') setProductsFiltered(products)
    else {
      const productsFiltered = products.filter((product) => {
        return product.product.name!.toLowerCase().includes(name.toLowerCase())
      })
      setProductsFiltered(productsFiltered)
    }
  }



  const fetchMoreData = (containerRefElement?: HTMLDivElement | null) => {
    fetchMoreOnBottomReached(containerRefElement)
  }

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement
        //once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
        if (
          scrollHeight - scrollTop - clientHeight < 300 &&
          !isFetching &&
          hasNextPage
        ) {
          fetchNextPage()
        }
      }
    },
    [fetchNextPage, hasNextPage, isFetching]
  )

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current)
  }, [fetchMoreOnBottomReached])

  const AddProduct = (product: Product) => {
    showAddProduct()
  }

  const showAddProduct = () => {
    if (setId) {
      setId('create-product')
    }
    setOpen(true)
  }

  const selectProduct = (product: ProductComplete | undefined) => {
    setProductSelected(product)
  }

  return (
    <div className={styles.inventory_container}>
      <section className={styles.inventory__header}>
        <SearchBar onSubmit={SearchProduct}/>
        {/*<Title Title={'Lista de Productos'}/>*/}
        <Button title={'Agregar Producto'} onClick={AddProduct} icon={'ri:add-circle-line'}/>
      </section>
      <section className={styles.inventory__body}>
        {
          <ProductList products={productsFiltered ?? []}
                       productSelected={selectProduct}
                       fetchMoreData={fetchMoreData}
                       hasMore={!!hasNextPage}
                       productsTotal={productsItem}
                       ref={tableContainerRef}
          />
        }
        <Overview productSelected={productSelected!}/>
      </section>
    </div>
  )
}