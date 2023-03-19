'use client'
import styles from './style.module.css'
import Title from "@/app/dashboard/components/Title/Title";
import SearchBar from "@/app/dashboard/components/SearchBar/SearchBar";
import cookie from "universal-cookie";
import {useQueries, useQuery} from "react-query";
import {getAllProducts, getProduct} from "@/api/Products";
import {useContext, useEffect, useState} from "react";
import ProductList from "@/app/dashboard/inventory/components/ProductList/ProductList";
import Overview from "@/app/dashboard/inventory/components/Overview/Overview";
import {Product, ProductComplete} from "@/models/Product";
import Button from "@/app/components/Button";
import {Icon} from "@iconify/react";
import {ProductLot} from "@/models/ProductLot";
import {getAllProductLots} from "@/api/ProductLots";
import ModalContext from "@/context/ModalContext";

export default function InventoryPage() {
  const cookies = new cookie()

  const [products, setProducts] = useState<ProductComplete[]>([])
  const [productsFiltered, setProductsFiltered] = useState<ProductComplete[]>(products)
  const [productSelected, setProductSelected] = useState<ProductComplete | undefined>(undefined)
  const [productLots, setProductLots] = useState<ProductLot[]>([])

  const {open, setOpen, id, setId} = useContext(ModalContext);


  const {data: productsLotData} = useQuery('productLots', () => getAllProductLots(cookies.get('token')))

  useEffect(() => {
    if (productsLotData !== undefined) {
      const products = productsLotData.data.map(async (productLot: ProductLot) => {
        return await getProduct(productLot.id)
      })
      Promise.all(products).then((products) => {
        setProducts(products as ProductComplete[])
        setProductsFiltered(products as ProductComplete[])
      })
    }
  }, [productsLotData])


  const SearchProduct = (name: string) => {
    if (name === '') setProductsFiltered(products)
    else {
      const productsFiltered = products.filter((product) => {
        return product.product.name!.toLowerCase().includes(name.toLowerCase())
      })
      setProductsFiltered(productsFiltered)
    }
  }

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
    console.log("Product selected: ", product)
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
            <ProductList products={productsFiltered} productSelected={selectProduct}/>
        }
        <Overview productSelected={productSelected!}/>
      </section>
    </div>
  )
}