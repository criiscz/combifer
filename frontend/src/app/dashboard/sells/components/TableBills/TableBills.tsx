import styles from './style.module.css'
import {useQuery} from "react-query";
import cookie from "universal-cookie";
import {getSellById} from "@/api/Sells";
import {useEffect, useState} from "react";
import Sale from "@/models/Sale";

export default function TableBills({header, items, setItemSelected}: {
  header: string[],
  items: any[],
  setItemSelected: (props:any) => void,
}) {
  const cookies = new cookie()
  const [bill, setBill] = useState<Sale | undefined>()
  const [saleSelected, setSaleSelected] = useState<Sale | undefined>(undefined)
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
      <div className={styles.table__body}>
        {
          items.map((item) => {
            return (
              <div className={styles.table__body_row} key={item.id} onClick={selectRow}>
                <div className={styles.table__body_row_item}>{item.id}</div>
                <div className={styles.table__body_row_item}>{item.creationDate}</div>
                <div className={styles.table__body_row_item}>{item.clientId}</div>
                <div className={styles.table__body_row_item}>{item.employeeId}</div>
                <div className={styles.table__body_row_item}>${0}</div>
                {
                  // TODO: Calcular el total de la factura (usar un contexto?)
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}