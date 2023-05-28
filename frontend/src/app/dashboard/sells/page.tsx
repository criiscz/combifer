'use client'
import {useRouter} from "next/navigation";
import styles from "@/app/dashboard/sells/style.module.css";
import SearchBar from "@/app/dashboard/components/SearchBar/SearchBar";
import Button from "@/app/components/Button";
import TableBills from "@/app/dashboard/sells/components/TableBills/TableBills";
import {useInfiniteQuery, useQuery} from "react-query";
import Cookies from "universal-cookie";
import {getAllSells, getSellById} from "@/api/Sells";
import {BackResponse} from "@/models/BackResponse";
import Bill from "./new-sell/components/Bill/Bill";
import {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import Sale, {SaleComplete} from "@/models/Sale";
import {ProductCompleteQ} from "@/models/Product";
import {getClient} from "@/api/Clients";
import SellContext from "@/context/SellContext";

export default function SellPage() {
  const cookies = useMemo(() => new Cookies(), [])
  const [clientId, setClientId] = useState<number>(0)

  const router = useRouter()

  const {selectedClient, setSelectedClient} = useContext(SellContext)

  const tableContainerRef = useRef<HTMLDivElement>(null)

  const {
    data: billsQuery,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery<BackResponse>(
    'bills',
    ({pageParam}) => getAllSells(cookies.get('userToken'), pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.data.length < 20) return undefined
        return lastPage.meta.currentPage + 1
      },
    }
  )

  const {data: clientsQuery, refetch: refetchClients} = useQuery<BackResponse>(
    'clients',
    () => getClient(cookies.get('userToken'), clientId),
    {
      enabled: !!clientId && clientId !== 0
    }
  )

  const [bills, setBills] = useState<Sale[]>(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('bills-items') || '[]') : [])
  const [billsFiltered, setBillsFiltered] = useState(bills)
  const [saleSelected, setSaleSelected] = useState<SaleComplete | undefined>(undefined)
  const [saleSelectedComplete, setSaleSelectedComplete] = useState<ProductCompleteQ[] | undefined>(undefined)
  const [sales, setSales] = useState<SaleComplete[]>(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('sales-items') || '[]') : [])
  const [clients, setClients] = useState(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('clients-items') || '[]') : [])

  useEffect(() => {
    setBillsFiltered(billsQuery?.pages.map((page) => page.data).flat() || [])
    setBills(billsQuery?.pages.map((page) => page.data).flat() || [])
    const sal = billsQuery?.pages.map(async (sale) => {
      return await sale.data.map(async (sale:any) => {
        if (sales.find(s => s.sale.id == sale.id)) return sales.find(s => s.sale.id == sale.id)
        return await getSellById(cookies.get('userToken'), sale.id)
      })
    })
    // @ts-ignore
    Promise.all(sal).then((sales) => {
      Promise.all(sales.flat()).then((sales) => {
        setSales(sales as SaleComplete[])
        localStorage.setItem('sales-items', JSON.stringify(sales))
      } )
    })
  }, [billsQuery?.pages, cookies]) // Toco hacer esto porque no se actualizaba el estado (no se porque)

  useEffect(() => {
    refetchClients().then(() => {
      setClients(clientsQuery?.data)
      setSelectedClient(clients)
      if (clients)
        localStorage.setItem('clients-items', JSON.stringify(clients))
    })
  }, [clientId, clients, clientsQuery?.data, refetchClients, setSelectedClient])
  const searchBill = (value: string) => {
    if (value.length) {
      if (value.toLowerCase().includes('id:')) {
        setBillsFiltered(bills.filter((bill: any) => {
          return bill.id.toString().includes(value.split(':')[1])
        }) || [])
      } else if (value.toLowerCase().includes('cliente:')) {
        setBillsFiltered(bills.filter((bill: any) => {
          return bill.clientId.toString().includes(value.split(':')[1])
        }) || [])
      } else
        setBillsFiltered(bills.filter((bill: any) => {
          return bill.id.toString().includes(value) || bill.clientId.toString().includes(value)
        }) || [])
    } else {
      setBillsFiltered(bills || [])
    }
  }

  const setItemSelected = (bill: any) => {
    setSaleSelected(sales.find(sale => sale.sale.id == bill.id))
    setClientId(bill.clientId)
  }

  const totalItems = useMemo(() => billsQuery?.pages.reduce((prev, page) => {
    return {
      meta: page.meta,
      data: [...prev.data, ...page.data]
    }
  }), [billsQuery?.pages])

  const fetchMoreData = (containerRefElement?: HTMLDivElement | null) => {
    fetchMoreOnBottomReached(containerRefElement)
  }

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const {scrollHeight, scrollTop, clientHeight} = containerRefElement
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
              items={
                billsFiltered.map((bill: any) => {
                  return {
                    id: bill.id,
                    date: bill.creationDate,
                    clientId: bill.clientId,
                    employeeId: bill.employeeId,
                    total: sales.find(sale => sale.sale.id == bill.id)?.products.map((product) => {
                      return product.productQuantity * product.productUnitPrice
                    }).reduce((a, b) => a + b, 0)
                  }
                })
              }
              setItemSelected={setItemSelected}
              fetchMoreData={fetchMoreData}
              hasMore={!!hasNextPage}
              totalItems={totalItems}
              containerRef={tableContainerRef}
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