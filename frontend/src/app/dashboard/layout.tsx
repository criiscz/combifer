'use client'
import NavBar from "@/app/dashboard/components/NavBar/NavBar";
import styles from './style.module.css'
import ModalContext from "@/context/ModalContext";
import React, {useMemo, useState} from "react";
import Modal from "@/app/components/Modal/Modal";
import CreateProductDialog from "@/app/dashboard/inventory/components/Dialogs/CreateProductDialog";
import EditProductDialog from "@/app/dashboard/inventory/components/Dialogs/EditProductDialog";
import DeleteProductDialog from "@/app/dashboard/inventory/components/Dialogs/DeleteProductDialog";
import ProductContext from "@/context/ProductContext";
import ToastContext from "@/context/ToastContext";
import {ProductComplete, ProductCompleteQ} from "@/models/Product";
import Toast from "@/app/components/Toast/Toast";
import AddProductCartDialog from "@/app/dashboard/sells/components/Dialogs/AddProductCartDialog";

export default function DashboardLayout({children}: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [id, setId] = React.useState('')
  const [product, setProduct] = React.useState<ProductComplete | undefined>(undefined)
  const [toast, setToast] = React.useState(false)
  const [toastText, setToastText] = React.useState('')
  const [refresh, setRefresh] = React.useState(false)

  // const [products, setProducts] = useState<ProductComplete[]>([])
  // const [productsFiltered, setProductsFiltered] = useState<ProductComplete[]>(products)
  const [productSelected, setProductSelected] = useState<ProductComplete[] | ProductCompleteQ[]  >([])
  const [productsSelected, setProductsSelected] = useState<ProductComplete[] | ProductCompleteQ[] | undefined >([])

  const productContext = useMemo(() => ({
    product,
    setProduct,
    refresh,
    setRefresh,
    products: productsSelected,
    setProducts: setProductsSelected,
    productsSelected: productSelected,
    setProductsSelected: setProductSelected
  }), [product, productSelected, productsSelected, refresh])

  const toastContext = useMemo(() => ({
    toast,
    setToast,
    text: toastText,
    setText: setToastText
  }), [toast, toastText])

  const modalContext = useMemo(() => ({
    open,
    setOpen,
    id,
    setId
  }), [open, id])

  return (
    <div>
      <ToastContext.Provider value={toastContext}>
        <ProductContext.Provider value={productContext}>
          <ModalContext.Provider value={modalContext}>
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
            <div className={styles.container}>
              <aside className={styles.asideNavBar}>
                <NavBar name={'Juan Peréz'} role={'Administrador'}/>
              </aside>
              <main className={styles.body}>
                {children}
              </main>
            </div>
          </ModalContext.Provider>
        </ProductContext.Provider>
      </ToastContext.Provider>
    </div>
  )
}

