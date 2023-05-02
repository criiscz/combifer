'use client'
import styles from "@/app/dashboard/sells/new-sell/style.module.css";
import cookie from "universal-cookie";
import {useContext} from "react";
import CarList from "@/app/dashboard/sells/new-sell/components/CarList/CarList";
import Bill from "@/app/dashboard/sells/new-sell/components/Bill/Bill";
import ProductContext from "@/context/ProductContext";
import ClientForm from "@/app/dashboard/sells/new-sell/components/ClientForm/ClientForm";

export default function SellPage(){

    const { products: productsList } = useContext(ProductContext)

    return(
            <div className={styles.sells_container}>
                <section className={styles.sells__body}>
                    <div className={styles.sells__carList}>
                        <CarList products={productsList || []}/>
                        <ClientForm/>
                    </div>
                    <div className={styles.sells__bill} >
                        <Bill products={productsList || []}/>
                    </div>
                </section>
        </div>
    )
}
