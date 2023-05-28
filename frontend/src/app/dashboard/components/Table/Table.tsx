import styles from './style.module.css'
import cookie from "universal-cookie";
import {useState} from "react";
import Sale from "@/models/Sale";

/**
 * Table component
 * @param header
 * @param itemsToDisplay - number of items to display
 * @param items - array of objects to be displayed (each object is a row), the first itemsToDisplay will be displayed
 * @param setItemSelected
 * @constructor
 */
export default function Table({header, items, itemsToDisplay = header.length, setItemSelected}: {
  header: string[],
  itemsToDisplay: number,
  items: any[],
  setItemSelected: (props: any) => void,
}) {
  const [item, setItem] = useState<Sale | undefined>()
  const selectRow = (e: any) => {
    const row = e.target
    const rowId = row.parentElement?.children[0].innerHTML
    const item = items.find(item => item.id == rowId)
    setItem(item)
    setItemSelected(item)
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
                {
                  Object.keys(item).map((key, index) => {
                    return (index < itemsToDisplay) && (
                      <div className={styles.table__body_row_item} key={key}>{item[key]}</div>
                    );
                  })
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}