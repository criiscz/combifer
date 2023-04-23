'use client'
import styles from "@/app/dashboard/sells/style.module.css";
import cookie from "universal-cookie";
import {useContext, useState} from "react";
import {ProductComplete, ProductCompleteQ} from "@/models/Product";
import CarList from "@/app/dashboard/sells/components/CarList/CarList";
import Bill from "@/app/dashboard/sells/components/Bill/Bill";
import ProductContext from "@/context/ProductContext";

export default function SellPage(){
    const cookies = new cookie()

    const { products: productsList } = useContext(ProductContext)

    return(
            <div className={styles.sells_container}>
                <section className={styles.sells__body}>
                    <div className={styles.sells__carList}>
                        <CarList products={productsList || []}/>
                    </div>
                    <div className={styles.sells__bill} >
                        <Bill/>
                    </div>
                </section>
        </div>
    )
}
