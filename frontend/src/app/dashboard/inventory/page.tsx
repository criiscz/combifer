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

  const [products, setProducts] = useState<any[]>(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('products-items') || '[]') : [])
  const [productsFiltered, setProductsFiltered] = useState<any[]>(products)
  const [productSelected, setProductSelected] = useState<ProductComplete | undefined>(undefined)
  const {setOpen, setId} = useContext(ModalContext);
  const [update, setUpdate] = useState(false)
  const [pageToFetch, setPageToFetch] = useState(0)

  const tableContainerRef = useRef<HTMLDivElement>(null)

  const {
    data: productsLotData,
    isFetching,
  } = useQuery(
    'productLots',
    () => getAllProductLots(cookies.get('token')),
    {
      onSuccess: (data) => {
        setProducts(data.data.filter((product:any) => product.lot.quantity > 0))
        setProductsFiltered(products)
        localStorage.setItem('products-items', JSON.stringify(products))
      },
      cacheTime: 0,
    }
  )


  // const productsItem = useMemo(() => productsLotData?.pages.reduce((prev, page) => {
  //   return {
  //     meta: page.meta,
  //     data: [...prev.data, ...page.data]
  //   }
  // }), [productsLotData])


  const SearchProduct = (name: string) => {
    if (name === '') setProductsFiltered(products)
    else {
      const productsFiltered = products.filter((product) => {
        return product.product.name!.toLowerCase().includes(name.toLowerCase())
      })
      setProductsFiltered(productsFiltered)
    }
  }


  // const fetchMoreData = (containerRefElement?: HTMLDivElement | null) => {
  //   fetchMoreOnBottomReached(containerRefElement)
  // }

  // const fetchMoreOnBottomReached = useCallback(
  //   (containerRefElement?: HTMLDivElement | null) => {
  //     if (containerRefElement) {
  //       const {scrollHeight, scrollTop, clientHeight} = containerRefElement
  //       //once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
  //       if (
  //         scrollHeight - scrollTop - clientHeight < 300 &&
  //         !isFetching &&
  //         hasNextPage
  //       ) {
  //         fetchNextPage()
  //       }
  //     }
  //   },
  //   [fetchNextPage, hasNextPage, isFetching]
  // )

  // useEffect(() => {
  //   fetchMoreOnBottomReached(tableContainerRef.current)
  // }, [fetchMoreOnBottomReached])

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
        <Button title={'Agregar Producto'} onClick={AddProduct} icon={'ri:add-circle-line'}/>
      </section>
      <section className={styles.inventory__body}>
        {
          <ProductList products={productsFiltered ?? []}
                       productSelected={selectProduct}
                       fetchMoreData={() => {}}
                       hasMore={false}
                       productsTotal={[]}
                       ref={tableContainerRef}
          />
        }
        <Overview productSelected={productSelected!}/>
      </section>
    </div>
  )
}