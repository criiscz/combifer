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
import {getAllSells, getSellById} from "@/api/Sells";
import {BackResponse} from "@/models/BackResponse";
import Bill from "./new-sell/components/Bill/Bill";
import {useContext, useEffect, useMemo, useState} from "react";
import {ProductLot} from "@/models/ProductLot";
import {getProduct} from "@/api/Products";
import Sale, {SaleComplete} from "@/models/Sale";
import {ProductCompleteQ} from "@/models/Product";
import {getClient} from "@/api/Clients";
import {Client} from "@/models/Client";
import SellContext from "@/context/SellContext";

export default function SellPage() {
  const cookies = useMemo( () => new Cookies(), [])
  const [clientId, setClientId] = useState<number>(0)

  const router = useRouter()

  const { selectedClient, setSelectedClient} = useContext(SellContext)

  const {data: bills} = useQuery<BackResponse>(
    'bills',
    () => getAllSells(cookies.get('userToken'))
  )

  const {data: clients, refetch: refetchClients} = useQuery<BackResponse>(
    'clients',
    () => getClient(cookies.get('userToken'), clientId),
    {
      enabled: !!clientId && clientId !== 0
    }
  )
  const [billsFiltered, setBillsFiltered] = useState(bills?.data || [])
  const [saleSelected, setSaleSelected] = useState<SaleComplete | undefined>(undefined)
  const [saleSelectedComplete, setSaleSelectedComplete] = useState<ProductCompleteQ[] | undefined>(undefined)
  const [sales, setSales] = useState<SaleComplete[]>([])

  useEffect(() => {
    setBillsFiltered(bills?.data || [])
    const sales = bills?.data.map(async (sale: Sale) => {
      return await getSellById(cookies.get('userToken'), sale.id)
    })
    Promise.all(sales).then((sales) => {
      setSales(sales as SaleComplete[])
    })
  }, [bills, cookies]) // Toco hacer esto porque no se actualizaba el estado (no se porque)

  useEffect(() => {
    refetchClients().then(() => {
      setSelectedClient(clients?.data)
    })
  }, [clientId, clients?.data, refetchClients, setSelectedClient])
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

  const setItemSelected = (bill: any) => {
    setSaleSelected(sales.find(sale => sale.sale.id == bill.id))
    setClientId(bill.clientId)
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
              items={billsFiltered}
              setItemSelected={setItemSelected}
            />
          }
        </div>
        <div className={styles.sells__bill}>
          <Bill products={saleSelected && saleSelected.products.map(
            (product) => {
              return {
                product: {
                  id: product.id,
                  name: product.productName,
                  description: product.productDescription,
                  measureUnit: product.productMeasureUnit,
                },
                lot: {
                  productId: product.id,
                  quantity: product.productQuantity,
                  price: product.productUnitPrice,
                  id: product.productLotId,
                },
                category: {
                  id: 1,
                  name: 'Categoria',
                },
                quantity: product.productQuantity,
              } as ProductCompleteQ
            }
          ) || []} readonly/>
        </div>
      </section>
    </div>
  )
}