'use client'
import {useRouter} from "next/navigation";
import styles from "@/app/dashboard/sells/style.module.css";
import SearchBar from "@/app/dashboard/components/SearchBar/SearchBar";
import Button from "@/app/components/Button";
import ProductList from "@/app/dashboard/inventory/components/ProductList/ProductList";
import Overview from "@/app/dashboard/inventory/components/Overview/Overview";
import Table from "@/app/dashboard/sells/new-sell/components/TableInventary/Table";
import TableBills from "@/app/dashboard/sells/components/TableBills/TableBills";
import {useQuery} from "react-query";
import Cookies from "universal-cookie";
import {getAllSells} from "@/api/Sells";
import {BackResponse} from "@/models/BackResponse";
import Bill from "./new-sell/components/Bill/Bill";
import {useState} from "react";

export default function SellPage() {
  const cookies = new Cookies()
  const router = useRouter()
  const {data: bills, isLoading} = useQuery<BackResponse>(
    'bills',
    () => getAllSells(cookies.get('userToken'))
  )

  const [billsFiltered, setBillsFiltered] = useState(bills?.data || [])

  const searchBill = (value: string) => {
    if (value.length) {
      if (value.toLowerCase().includes('id:')) {
        setBillsFiltered(bills?.data.filter((bill: any) => {
          return bill.id.toString().includes(value.split(':')[1])
        }) || [])
      } else if (value.toLowerCase().includes('cliente:')) {
        setBillsFiltered(bills?.data.filter((bill: any) => {
          return bill.clientId.toString().includes(value.split(':')[1])
        }) || [])
      } else
        setBillsFiltered(bills?.data.filter((bill: any) => {
          return bill.id.toString().includes(value) || bill.clientId.toString().includes(value)
        }) || [])
    } else {
      setBillsFiltered(bills?.data || [])
    }
  }

  return (
    <div className={styles.sells_container}>
      <section className={styles.sells__header}>
        <SearchBar onSubmit={searchBill} placeholder={'Buscar Facturas por cliente o id'}/>
        {/*<Title Title={'Lista de Productos'}/>*/}
        <Button title={'Nueva Venta'} onClick={() => {
          router.push('/dashboard/sells/new-sell')
        }} icon={'ri:add-circle-line'}/>
      </section>
      <section className={styles.sells__body}>
        <div className={styles.sells__carList}>
          {
            <TableBills
              header={['Id', 'Fecha', 'Id de Cliente', 'Id de empleado', 'Total']}
              items={billsFiltered || []}
            />
          }
        </div>
        <div className={styles.sells__bill}>
          <Bill products={[]} readonly/>
        </div>
      </section>
    </div>
  )
}