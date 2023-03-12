'use client'
import styles from './style.module.css'
import Title from "@/app/dashboard/components/Title/Title";
import SearchBar from "@/app/dashboard/components/SearchBar/SearchBar";
import cookie from "universal-cookie";
import {useQuery} from "react-query";
import {getAllProducts, getProduct} from "@/api/Products";
import {useEffect, useState} from "react";
import ProductList from "@/app/dashboard/inventory/components/ProductList/ProductList";
import Overview from "@/app/dashboard/inventory/components/Overview/Overview";

export default function InventoryPage() {
  const cookies = new cookie()

  const [products, setProducts] = useState<any>([])

  const {data} = useQuery('products', () => getAllProducts(cookies.get('token')))

  useEffect(() => {
    setProducts(data)
  }, [data])


  const SearchProduct = (name: string) => {
    if (name === '') setProducts(data)
    else setProducts(data!.filter((product: any) => product.name.toLowerCase().includes(name.toLowerCase())))
  }

  return (
    <div className={styles.inventory_container}>
      {/*
        Order:
        [SearchBar] - [Title]
        [Product List] - [Overview]
        */}

      <section className={styles.inventory__header}>
        <SearchBar onSubmit={SearchProduct}/>
        <Title Title={'Lista de Productos'}/>
      </section>
      <section className={styles.inventory__body}>
        {
          products === undefined ? <ProductList products={[]}/> : <ProductList products={products}/>
        }
        <Overview productSelected={[]}/>
      </section>
    </div>
  )
}