'use client'
import NavBar from "@/app/dashboard/components/NavBar/NavBar";
import styles from './style.module.css'
import ModalContext from "@/context/ModalContext";
import React from "react";
import Modal from "@/app/components/Modal/Modal";
import CreateProductDialog from "@/app/dashboard/inventory/components/Dialogs/CreateProductDialog";
import EditProductDialog from "@/app/dashboard/inventory/components/Dialogs/EditProductDialog";
import DeleteProductDialog from "@/app/dashboard/inventory/components/Dialogs/DeleteProductDialog";
import ProductContext from "@/context/ProductContext";
import ToastContext from "@/context/ToastContext";
import {ProductComplete} from "@/models/Product";
import Toast from "@/app/components/Toast/Toast";

export default function DashboardLayout({children}: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [id, setId] = React.useState('')
  const [product, setProduct] = React.useState<ProductComplete | undefined>(undefined)
  const [toast, setToast] = React.useState(false)
  const [toastText, setToastText] = React.useState('')
  const [refresh, setRefresh] = React.useState(false)

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
                <DeleteProductDialog closeDialog={() => setOpen(false)} product={product}/>
              }
            </Modal>
            <Toast open={toast} onclose={() => setToast(false)} text={toastText}/>
            <body className={styles.container}>
              <aside className={styles.asideNavBar}>
                <NavBar name={'Juan Peréz'} role={'Administrador'}/>
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