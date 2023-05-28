import styles from './style.module.css'
import cookie from "universal-cookie";
import {useContext, useState} from "react";
import Sale from "@/models/Sale";
import SellContext from "@/context/SellContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "@/app/components/Loading/Loading";

export default function TableBills(
  {header, items, setItemSelected, fetchMoreData, hasMore, totalItems, containerRef}: {
  header: string[],
  items: any[],
  setItemSelected: (props: any) => void,
  fetchMoreData: (props:any) => void,
  hasMore: boolean,
  totalItems: any,
  containerRef: any
}) {
  const cookies = new cookie()
  const [bill, setBill] = useState<Sale | undefined>()
  const {total} = useContext(SellContext)
  const selectRow = (e: any) => {
    const row = e.target
    const rowId = row.parentElement?.children[0].innerHTML
    const bill = items.find(bill => bill.id == rowId)
    setBill(bill)
    setItemSelected(bill)
  }
  return (
    <div className={styles.table__container}>
      <div className={styles.table__header}>

        {
          header.map((item) => {
            return <div className={styles.table__header_item} key={item}>{item}</div>
          })
        }
      </div>
      <div className={styles.table__body} ref={containerRef} onScroll={e => fetchMoreData(e.target as HTMLDivElement)}>
        <InfiniteScroll
          dataLength={items ? items.length : 0}
          next={() => fetchMoreData(1)}
          hasMore={hasMore}
          loader={<Loading/>}
          initialScrollY={0}
          scrollThreshold={0.9}
          className={styles.table__body_scroll}
          style={{overflow: 'hidden'}}
        >
          <div>
            {
              items.map((item) => {
                return (
                  <div className={styles.table__body_row} key={item.id} onClick={selectRow}>
                    <div className={styles.table__body_row_item}>{item.id}</div>
                    <div className={styles.table__body_row_item}>{item.date}</div>
                    <div className={styles.table__body_row_item}>{item.clientId}</div>
                    <div className={styles.table__body_row_item}>{item.employeeId}</div>
                    <div className={styles.table__body_row_item}>${item.total}</div>
                  </div>
                )
              })
            }
          </div>
        </InfiniteScroll>
      </div>
    </div>
  )
}