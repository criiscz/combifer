'use client'
import NavBar from "@/app/dashboard/components/NavBar/NavBar";
import styles from './style.module.css'
import ModalContext from "@/context/ModalContext";
import React, {useEffect, useMemo, useState} from "react";
import Modal from "@/app/components/Modal/Modal";
import CreateProductDialog from "@/app/dashboard/inventory/components/Dialogs/CreateProductDialog";
import EditProductDialog from "@/app/dashboard/inventory/components/Dialogs/EditProductDialog";
import DeleteProductDialog from "@/app/dashboard/inventory/components/Dialogs/DeleteProductDialog";
import ProductContext from "@/context/ProductContext";
import ToastContext from "@/context/ToastContext";
import {ProductComplete} from "@/models/Product";
import Toast from "@/app/components/Toast/Toast";
import AddProductCartDialog from "@/app/dashboard/sells/components/Dialogs/AddProductCartDialog";
import ProductList from "@/app/dashboard/inventory/components/ProductList/ProductList";
import {useRouter} from "next/navigation";
import Cookies from "universal-cookie";
import {useQuery} from "react-query";
import {sessionInfo} from "@/api/Login";
import {BackResponse} from "@/models/BackResponse";
import {getAllCategories} from "@/api/Categories";


export default function DashboardLayout({children}: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [id, setId] = React.useState('')
  const [product, setProduct] = React.useState<ProductComplete | undefined>(undefined)
  const [toast, setToast] = React.useState(false)
  const [toastText, setToastText] = React.useState('')
  const [refresh, setRefresh] = React.useState(false)


  const cookies = useMemo(() => new Cookies(), []);

  const {data} = useQuery({
    queryKey: 'session-info',
    queryFn: () => sessionInfo(cookies.get('userToken')),
  })
  
  return (
    <div>
      <ToastContext.Provider value={{toast, setToast, text: toastText, setText: setToastText}}>
        <ProductContext.Provider value={{product, setProduct, refresh, setRefresh}}>
          <ModalContext.Provider value={{open, setOpen, id, setId}}>
            <Modal isOpen={open} id={id} onClose={() => setOpen(false)}>
              {

                id === 'create-product' &&
                <CreateProductDialog closeDialog={() => setOpen(false)}/> ||
                id === 'edit-product' &&
                <EditProductDialog closeDialog={() => setOpen(false)} product={product}/> ||
                id === 'delete-product' &&
                <DeleteProductDialog closeDialog={() => setOpen(false)} product={product}/> ||
                id === 'buy-bill' &&
                <AddProductCartDialog closeDialog={() => setOpen(false)}/>
              }
            </Modal>
            <Toast open={toast} onclose={() => setToast(false)} text={toastText}/>
            <body className={styles.container}>
              <aside className={styles.asideNavBar}>
                <NavBar name={data?.username || 'Nombre'} role={data?.roles[0].name || 'Rol'}/>
              </aside>
              <main className={styles.body}>
                {children}
              </main>
            </body>
          </ModalContext.Provider>
        </ProductContext.Provider>
      </ToastContext.Provider>
    </div>
  )
}

