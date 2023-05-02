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
import AddProductCartDialog from "@/app/dashboard/sells/new-sell/components/Dialogs/AddProductCartDialog";
import ClientContext from "@/context/ClientContext";
import {Client} from "@/models/Client";
import CreateNewSellDialog
  from "@/app/dashboard/sells/new-sell/components/Dialogs/CreateNewSellDialog/CreateNewSellDialog";
import SellContext from "@/context/SellContext";
import {useQuery} from "react-query";
import {sessionInfo} from "@/api/Login";
import Cookies from "universal-cookie";

export default function DashboardLayout({children}: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [id, setId] = React.useState('')
  const [product, setProduct] = React.useState<ProductComplete | undefined>(undefined)
  const [toast, setToast] = React.useState(false)
  const [toastText, setToastText] = React.useState('')
  const [refresh, setRefresh] = React.useState(false)
  const [selectedClient, setSelectedClient] = React.useState<Client>()
  const [clients, setClients] = React.useState<Client[] | undefined>([])
  const [productTotal, setProductTotal] = React.useState(0)
  const [iva, setIva] = React.useState(0)
  const [total, setTotal] = React.useState(0)
  const [discount, setDiscount] = React.useState(0)
  const [taxId, setTaxId] = React.useState(0)

  // const [products, setProducts] = useState<ProductComplete[]>([])
  // const [productsFiltered, setProductsFiltered] = useState<ProductComplete[]>(products)
  const [productSelected, setProductSelected] = useState<ProductComplete[] | ProductCompleteQ[]>([])
  const [productsSelected, setProductsSelected] = useState<ProductComplete[] | ProductCompleteQ[] | undefined>([])

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

  const clientContext = useMemo(() => ({
    selectedClient,
    setSelectedClient,
    clients,
    setClients
  }), [selectedClient, clients])

  const sellContext = useMemo(() => ({
    products: productSelected,
    setProducts: setProductSelected,
    productsSelected,
    setProductsSelected,
    selectedClient,
    setSelectedClient,
    productTotal,
    setProductTotal,
    iva,
    setIva,
    total,
    setTotal,
    discount,
    setDiscount,
    taxId,
    setTaxId
  }), [productsSelected, selectedClient, productTotal, iva, total])



  const cookies = useMemo(() => new Cookies(), []);

  const {data} = useQuery({
    queryKey: 'session-info',
    queryFn: () => sessionInfo(cookies.get('userToken')),
  })
  
  return (
    <div>
      <ToastContext.Provider value={toastContext}>
        <SellContext.Provider value={sellContext}>
          <ClientContext.Provider value={clientContext}>
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
                    <AddProductCartDialog closeDialog={() => setOpen(false)}/> ||
                    id === 'create-bill' &&
                    <CreateNewSellDialog closeDialog={() => setOpen(false)}/> ||
                    id === 'view-bill' &&
                    <CreateNewSellDialog closeDialog={() => setOpen(false)} readonly={true}/>

                  }
                </Modal>
                <Toast open={toast} onclose={() => setToast(false)} text={toastText}/>
                <div className={styles.container}>
                  <aside className={styles.asideNavBar}>
                    <NavBar name={data?.name + ' ' + data?.lastname || 'Nombre'} role={data && data.roles[0] && data.roles[0].name || 'Rol'}/>
                  </aside>
                  <main className={styles.body}>
                    {children}
                  </main>
                </div>
              </ModalContext.Provider>
            </ProductContext.Provider>
          </ClientContext.Provider>
        </SellContext.Provider>
      </ToastContext.Provider>
    </div>
  )
}

