import styles from './style.module.css'
import {Icon} from "@iconify/react";
import {Product, ProductComplete} from "@/models/Product";
import {useContext, useEffect, useState} from "react";
import Category from "@/models/Category";
import {MeasureUnit} from "@/models/MeasureUnit";
import {Location} from "@/models/Location";
import {useMutation, useQuery} from "react-query";
import {getAllCategories} from "@/api/Categories";
import {getAllMeasureUnits} from "@/api/MeasureUnits";
import {getAllLocations} from "@/api/Locations";
import {BackResponse} from "@/models/BackResponse";
import {updateProduct} from "@/api/Products";
import {updateProductLot} from "@/api/ProductLots";
import {ProductLot} from "@/models/ProductLot";
import ToastContext from "@/context/ToastContext";
import ProductContext from "@/context/ProductContext";

export default function EditProductDialog({closeDialog, product}: EditProductDialogProps) {

  const [editProductFields, setEditProductFields] = useState<EditProductFields>()

  // ------------------------------ Queries ------------------------------
  const {data: categories} = useQuery<BackResponse>({
    queryKey: 'categories',
    queryFn: () => getAllCategories(),
  })
  const {data: measureUnits} = useQuery({
    queryKey: 'measureUnits',
    queryFn: () => getAllMeasureUnits()
  })
  const {data: locations} = useQuery({
    queryKey: 'locations',
    queryFn: () => getAllLocations()
  })
  // ------------------------------ Mutations ------------------------------
  const {mutate: editProductLotMutation} = useMutation({
    mutationFn: () => updateProductLot({
      quantity: editProductFields?.quantity,
      price: editProductFields?.price,
      enterDate: editProductFields?.enterDate,
      productId: product!.product.id,
    } as ProductLot, product!.lot.id),
  })
  const {mutate: editProductMutation ,data:editedProduct} = useMutation({
    mutationFn: () => updateProduct({
      name: editProductFields?.name,
      measureUnit: editProductFields?.measureUnit,
      categoryProductId: editProductFields?.categoryProductId,
      locationId: editProductFields?.locationId,
      description: ""
    } as Product, product!.product.id as number),
  })
  // ------------------------------ Effects ------------------------------
  useEffect(() => {
    setEditProductFields({
      price: product?.lot.price,
      quantity: product?.lot.quantity,
      enterDate: product?.lot.enterDate,
      categoryProductId: product?.category.id,
      measureUnit: product!.product.measureUnit,
      locationId: product?.location.id,
      name: product?.product.name,
    })
  }, [product])


  // ------------------------------ Context ------------------------------
  const { setToast,  setText} = useContext(ToastContext)
  const { setRefresh } = useContext(ProductContext)

  useEffect(() => {
    if (editedProduct) {
      editProductLotMutation()
      closeDialog()
      setToast(true)
      setText('Producto editado correctamente')
      setTimeout(() => {
        setRefresh(true)
      }, 1000)
    }
  }, [editedProduct])
  // ------------------------------ Functions ------------------------------
  const handleChange = ({target: {name, value}}: any) => {
    setEditProductFields({
      ...editProductFields,
      [name]: value
    })
  };
  const handleSubmit = (e: any) => {
    e.preventDefault()
    editProductMutation()
  }

  return (
    <div className={styles.dialog__container}>
      <div className={styles.dialog__header}>
        <h1 className={styles.dialog__title}>Editar producto</h1>
        <button className={styles.dialog__closeButton}
                onClick={() => closeDialog()}
        >
          <Icon icon={'ri:close-line'}/>
        </button>
      </div>
      <div className={styles.dialog__body}>
        <form onSubmit={handleSubmit} className={styles.dialog__form}>
          <div className={styles.dialog__body_group_input}>
            <div className={styles.dialog__body_group_input_item}>
              <label htmlFor="name">Nombre</label>
              <input type="text" id={'name'} name={'name'} value={editProductFields?.name}
                     onChange={handleChange} required/>
            </div>
          </div>
          <div className={styles.dialog__body_group_input}>
            <div className={styles.dialog__body_group_input_item}>
              <label htmlFor="buy-date">Fecha de Compra</label>
              <input type="date" id={'buy-date'} name={'enterDate'}
                     value={editProductFields?.enterDate} onChange={handleChange}
                     required/>
            </div>
            <div className={styles.dialog__body_group_input_item}>
              <label htmlFor="category">Categoría</label>
              <select name="categoryProductId" id="category" onChange={handleChange} required
                      value={editProductFields?.categoryProductId}
              >
                {
                  categories && categories!.data.map((category: Category) => (
                    <option value={category.id} key={category.id}>{category.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className={styles.dialog__body_group_input}>
            <div className={styles.dialog__body_group_input_item}>
              <label htmlFor="price">Precio</label>
              <input type="number" id={'price'} name={'price'} onChange={handleChange} required
                     value={editProductFields?.price}
              />
            </div>
            <div className={styles.dialog__body_group_input_item}>
              <label htmlFor="measure-unit">Unidad de Medida</label>
              <select name="measureUnit" id="measure-unit" onChange={handleChange} required
                      value={editProductFields?.measureUnit}
              >
                {
                  measureUnits && measureUnits!.data.map((measureUnit: MeasureUnit) => (
                    <option value={measureUnit} key={measureUnit}>{measureUnit}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className={styles.dialog__body_group_input}>
            <div className={styles.dialog__body_group_input_item}>
              <label htmlFor="location">Ubicación</label>
              <select name="locationId" id="location" onChange={handleChange} required
                      value={editProductFields?.locationId}
              >
                {
                  locations && locations!.data.map((location: Location) => (
                    <option value={location.id} key={location.id}>{location.name}</option>
                  ))
                }
              </select>
            </div>
            <div className={styles.dialog__body_group_input_item}>
              <label htmlFor="quantity">Cantidad</label>
              <input type="number" id={'quantity'} name={'quantity'} onChange={handleChange}
                     required
                     value={editProductFields?.quantity}
              />
            </div>
          </div>
          <button type={'submit'} className={styles.dialog__body_group_button}>Guardar</button>
        </form>
      </div>
    </div>
  )
}

interface EditProductDialogProps {
  closeDialog: () => void
  product: ProductComplete | undefined
}

interface EditProductFields {
  name?: string
  enterDate?: string
  categoryProductId?: number
  price?: number
  measureUnit?: string
  locationId?: number
  quantity?: number
  description?: string
}