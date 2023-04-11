'use client'
import styles from "@/app/dashboard/sells/style.module.css";
import cookie from "universal-cookie";
import {useState} from "react";
import {ProductComplete} from "@/models/Product";
import CarList from "@/app/dashboard/sells/components/CarList/CarList";
import Bill from "@/app/dashboard/sells/components/Bill/Bill";

export default function SellPage(){
    const cookies = new cookie()

    const [products, setProducts] = useState<ProductComplete[]>([])
    const [productSelected, setProductSelected] = useState<ProductComplete | undefined>(undefined)


    const selectProduct = (product: ProductComplete | undefined) => {
        setProductSelected(product)
        console.log("Product selected: ", product)
    }

    return(
            <div className={styles.sells_container}>
                <section className={styles.sells__body}>
                    <div className={styles.sells__carList}>
                        <CarList products={[]} productSelected={selectProduct}/>
                    </div>
                    <div className={styles.sells__bill} >
                        <Bill/>
                    </div>
                </section>
        </div>
    )
}