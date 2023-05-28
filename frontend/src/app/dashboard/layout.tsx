'use client'
import NavBar from "@/app/dashboard/components/NavBar/NavBar";
import styles from './style.module.css'
import ModalContext from "@/context/ModalContext";
import React, {useContext, useMemo, useState} from "react";
import Modal from "@/app/components/Modal/Modal";
import CreateProductDialog from "@/app/dashboard/inventory/components/Dialogs/CreateProductDialog";
import EditProductDialog from "@/app/dashboard/inventory/components/Dialogs/EditProductDialog";
import DeleteProductDialog from "@/app/dashboard/inventory/components/Dialogs/DeleteProductDialog";
import ProductContext from "@/context/ProductContext";
import ToastContext from "@/context/ToastContext";
import {ProductComplete, ProductCompleteQ} from "@/models/Product";
import Toast from "@/app/components/Toast/Toast";
import AddProductCartDialog
  from "@/app/dashboard/sells/new-sell/components/Dialogs/AddProductCartDialog";
import ClientContext from "@/context/ClientContext";
import {Client} from "@/models/Client";
import CreateNewSellDialog
  from "@/app/dashboard/sells/new-sell/components/Dialogs/CreateNewSellDialog/CreateNewSellDialog";
import SellContext from "@/context/SellContext";
import {useQuery} from "react-query";
import {sessionInfo} from "@/api/Login";
import Cookies from "universal-cookie";
import CreateNewUserDialog
  from "./users/components/Dialogs/CreateNewUserDialog/CreateNewUserDialog";
import EditUserDialog from "@/app/dashboard/users/components/Dialogs/EditUserDialog/EditUserDialog";
import UserContext from "@/context/UserContext";
import AddProductOrder from "@/app/dashboard/orders/new-order/components/Dialogs/AddProductOrder";
import OrderContext from "@/context/OrderContext";
import CreateNewBuyDialog
  from "@/app/dashboard/orders/new-order/components/Dialogs/CreateNewSellDialog/CreateNewSellDialog";

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

  const [productSelected, setProductSelected] = useState<ProductComplete[] | ProductCompleteQ[]>([])
  const [productsSelected, setProductsSelected] = useState<ProductComplete[] | ProductCompleteQ[] | undefined>([])

  const [productsAdded, setProductsAdded] = useState<any[]>([])

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

  const orderContext = useMemo(() => ({
    productsAdded,
    setProductsAdded
  }), [productsAdded])



  const cookies = useMemo(() => new Cookies(), []);

  const {data} = useQuery({
    queryKey: 'session-info',
    queryFn: () => sessionInfo(cookies.get('userToken')),
    enabled: !!cookies.get('userToken'),
    onSuccess: (data) => {
      if (data) {
        cookies.set('user', data.name + ' ' + data.lastname, {path: '/'})
        cookies.set('role', data.roles[0].name, {path: '/'})
        cookies.set('username', data.username, {path: '/'})
      }
    },
  })

  const {userDetails} = useContext(UserContext)

  function SelectModal() {
    return id === 'create-product' &&
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
        <CreateNewSellDialog closeDialog={() => setOpen(false)} readonly={true}/> ||
      id === 'create-user' &&
        <CreateNewUserDialog closeDialog={() => setOpen(false)}/> ||
      id === 'edit-user' &&
        <EditUserDialog closeDialog={() => setOpen(false)} user={userDetails}/> ||
      id === 'order-bill' &&
        <AddProductOrder closeDialog={() => setOpen(false)}/> ||
      id === 'order-create-bill' &&
        <CreateNewBuyDialog closeDialog={() => setOpen(false)} readonly={false}/> ||
      id === 'order-details' &&
        <CreateNewBuyDialog closeDialog={() => setOpen(false)} readonly={true}/>
  }

  return (
    <div>
      <ToastContext.Provider value={toastContext}>
        <SellContext.Provider value={sellContext}>
          <ClientContext.Provider value={clientContext}>
            <ProductContext.Provider value={productContext}>
              <ModalContext.Provider value={modalContext}>
                <OrderContext.Provider value={orderContext}>
                  <Modal isOpen={open} id={id} onClose={() => setOpen(false)}>
                    {SelectModal()}
                  </Modal>
                  <Toast open={toast} onclose={() => setToast(false)} text={toastText}/>
                  <div className={styles.container}>
                    <aside className={styles.asideNavBar}>
                      <NavBar name={data?.name + ' ' + data?.lastname || 'Nombre'}
                              role={data && data.roles[0] && data.roles[0].name || 'Rol'}/>
                    </aside>
                    <main className={styles.body}>
                      {children}
                    </main>
                  </div>
                </OrderContext.Provider>
              </ModalContext.Provider>
            </ProductContext.Provider>
          </ClientContext.Provider>
        </SellContext.Provider>
      </ToastContext.Provider>
    </div>
  )
}

