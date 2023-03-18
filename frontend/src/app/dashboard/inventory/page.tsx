'use client'
import styles from './style.module.css'
import Title from "@/app/dashboard/components/Title/Title";
import SearchBar from "@/app/dashboard/components/SearchBar/SearchBar";
import cookie from "universal-cookie";
import {useQueries, useQuery} from "react-query";
import {getAllProducts, getProduct} from "@/api/Products";
import {useEffect, useState} from "react";
import ProductList from "@/app/dashboard/inventory/components/ProductList/ProductList";
import Overview from "@/app/dashboard/inventory/components/Overview/Overview";
import {Product} from "@/models/Product";
import Button from "@/app/components/Button";
import {Icon} from "@iconify/react";
import {ProductLot} from "@/models/ProductLot";

export default function InventoryPage() {
  const cookies = new cookie()

  const [products, setProducts] = useState<Product[]>([])
  const [productSelected, setProductSelected] = useState<Product | undefined>(undefined)

  // Structure of the data
  // ProductLot -> Product -> [Location, Category]
  // First we get all the product lots
  // Then we get all the products from the product lots
  // Then we get all the locations and categories from the products
  // Then we combine all the data to create the final structure

  // const queryProductLots = useQuery('productLots', () => getAllProductLots(cookies.get('token')))
  // queryProductLots.data?.map((productLot: ProductLot) => {
  //   const queryProduct = useQuery('product', () => getProduct(cookies.get('token'), productLot.product_id))
  //   queryProduct.data?.map((product: Product) => {
  //     const queryLocation = useQuery('location', () => getLocation(cookies.get('token'), product.location_id))
  //     const queryCategory = useQuery('category', () => getCategory(cookies.get('token'), product.category_id))
  //   })
  // })
  //   return {
  //     productLot: productLot,
  //     product: queryProduct.data,
  //     location: queryLocation.data,
  //     category: queryCategory.data
  //   } as ProductResult

  const queryProducts = useQuery('products', () => getAllProducts(cookies.get('token')))

  const queryProducLots = useQuery('productLots', () => getAllProductLots(cookies.get('token')))
  const queryProducts = queryProducLots.data?.map((productLot: ProductLot) => {
    return useQuery('product', () => getProduct(cookies.get('token'), productLot.product_id))
  })



  // const queryLot = useQuery('productLot', () => getProduct(cookies.get('token'), productSelected.id), {enabled: productSelected !== undefined})


  useEffect(() => {
    setProducts(data as Product[])
  }, [data])


  const SearchProduct = (name: string) => {
    if (name === '') setProducts(data as Product[])
    else setProducts(data!.filter((product: any) => product.name.toLowerCase().includes(name.toLowerCase())))
  }

  const AddProduct = (product: Product) => {
    // TODO: Add product to the list
  }

  const showAddProduct = () => {

  }

  const selectProduct = (product: Product | undefined) => {
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
          products === undefined ?
            <ProductList products={[]} productSelected={selectProduct}/> :
            <ProductList products={products} productSelected={selectProduct}/>
        }
        <Overview productSelected={productSelected!}/>
      </section>
    </div>
  )
}