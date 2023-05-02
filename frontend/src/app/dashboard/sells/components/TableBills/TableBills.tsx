import styles from './style.module.css'
export default function TableBills({header, items}: {header: string[], items: any[]}){
    return(
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
                        return(
                            <div className={styles.table__body_row} key={item.id}>
                                <div className={styles.table__body_row_item}>{item.id}</div>
                                <div className={styles.table__body_row_item}>{item.creationDate}</div>
                                <div className={styles.table__body_row_item}>{item.clientId}</div>
                                <div className={styles.table__body_row_item}>{item.employeeId}</div>
                                <div className={styles.table__body_row_item}>{item.price}</div>
                            </div>
                        )
                    })
                    }
            </div>
        </div>
    )
}