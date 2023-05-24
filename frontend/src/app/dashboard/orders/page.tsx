"use client"
import styles from './style.module.css'
import SearchBar from "@/app/dashboard/components/SearchBar/SearchBar";
import Button from "@/app/components/Button";
import Table from "@/app/dashboard/components/Table/Table";
import UserDetails from "@/app/dashboard/users/components/UserDetails/UserDetails";
import {useRouter} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import {useQuery} from "react-query";
import {BackResponse} from "@/models/BackResponse";
import {getAllSells, getSellById} from "@/api/Sells";
import {getClient} from "@/api/Clients";
import Cookie from "universal-cookie";
import {getAllOrders, getOrderByid} from "@/api/Orders";
import {Order, OrderData} from "@/models/Order";
import Sale, {SaleComplete} from "@/models/Sale";
import OrderDetails from './components/OrderDetails/OrderDetails';
import {useLoginStatus} from "@/hooks/useLoginStatus";

export default function SettingsPage() {

  const router = useRouter()
  const cookies = useMemo(() => new Cookie(), [])
  const { isAdmin } = useLoginStatus()

  const [ordersFiltered, setOrdersFiltered] = useState<any>([])
  const [orderSelected, setOrderSelected] = useState<any>(undefined)
  const [allOrders, setOrders] = useState<OrderData[]>([])


  const {data: orders} = useQuery<BackResponse>(
    'orders',
    () => getAllOrders(cookies.get('userToken'))
  )

  useEffect(() => {
    const ordersFetch = orders?.data.map(async (order: Order) => {
      return await getOrderByid(cookies.get('userToken'), order.id)
    })
    Promise.all(ordersFetch).then((orders) => {
      setOrdersFiltered(orders as OrderData[] || [])
      setOrders(orders as OrderData[])
    })
  }, [orders, cookies])

  const searchOrder = (value: string) => {
    if (value.length) {
      if (value.toLowerCase().includes('id:')) {
        const id = parseInt(value.split(':')[1])
        const order = allOrders.find((order) => order.order.id === id)
        setOrdersFiltered(order ? [order] : [])
      } else {
        const orders = allOrders.filter((order) => {
          return (
            order.employee.name.toLowerCase().includes(value.toLowerCase()) ||
            order.order.id.toString().toLowerCase().includes(value.toLowerCase())
            || order.order.createDate.toLowerCase().includes(value.toLowerCase())
          )
        })
        setOrdersFiltered(orders)
      }
    } else {
      setOrdersFiltered(allOrders)
    }
  }

  const selectOrder = (order: any) => {
    console.log(order)
    setOrderSelected(order)
  }

  return isAdmin && (
    <div className={styles.container}>
      <section className={styles.header}>
        <SearchBar onSubmit={searchOrder} placeholder={'Buscar Ordenes'}/>
        <Button title={'Agregar Orden'} onClick={() => {
          router.push('/dashboard/orders/new-order')
        }}/>
      </section>
      <section className={styles.body}>
        <div className={styles.body__orderList}>
          <Table header={['ID', 'Fecha de Creación', 'Empleado', 'Total']}
                 itemsToDisplay={4}
                 items={ordersFiltered.map((order: OrderData) => {
                   return {
                     id: order.order.id,
                     date: order.order.createDate,
                     employee: order.employee.idDocument,
                     total: 0, // TODO: Calcular total
                     products: order.products,
                     name: order.employee.name,
                     lastName: order.employee.lastName,
                     phone: order.employee.phone,
                     email: order.employee.email,
                   }
                 })}
                 setItemSelected={selectOrder}
          />
        </div>
        <div className={styles.body__orderDetails}>
          <OrderDetails orderSelected={orderSelected}/>
        </div>
      </section>
    </div>
  )
}