import styles from './style.module.css'
import {Icon} from "@iconify/react";
import Category from "@/models/Category";
import React, {useEffect, useState} from "react";
import {MeasureUnit} from "@/models/MeasureUnit";
import {Location} from "@/models/Location";
import {useMutation, useQuery} from "react-query";
import {getAllCategories} from "@/api/Categories";
import {BackResponse} from "@/models/BackResponse";
import {getAllMeasureUnits} from "@/api/MeasureUnits";
import {getAllLocations} from "@/api/Locations";
import {Product} from "@/models/Product";
import {createProduct} from "@/api/Products";
import {createProductLot} from "@/api/ProductLots";
import {ProductLot} from "@/models/ProductLot";
import ToastContext from "@/context/ToastContext";
import ProductContext from "@/context/ProductContext";

export default function CreateProductDialog({closeDialog}: CreateProductDialogProps) {

  // ------------------ Queries ------------------
  const {data: categories} = useQuery<BackResponse>({
    queryKey: 'categories',
    queryFn: () => getAllCategories(),
  })
  const {data: measureUnits} = useQuery<BackResponse>({
    queryKey: 'measureUnits',
    queryFn: () => getAllMeasureUnits()
  })
  const {data: locations} = useQuery<BackResponse>({
    queryKey: 'locations',
    queryFn: () => getAllLocations()
  })
  // ------------------ Contexts -------------------
  const {setToast, setText} = React.useContext(ToastContext)
  const {setRefresh} = React.useContext(ProductContext)
  // ------------------ Mutations ------------------
  const {mutate: createProductMutation, data: productCreated} = useMutation(createProduct)
  const {mutate: createProductLotMutation} = useMutation(createProductLot)
  // ------------------ States ------------------
  const [createProductFields, setCreateProductFields] = useState<CreateProductFields>()
  // ------------------ Effects ------------------
  useEffect(() => {
    setCreateProductFields({
      ...createProductFields,
      category_id: categories?.data[0].id,
      measureUnit: measureUnits?.data[0],
      location_id: locations?.data[0].id,
    })
  }, [categories, createProductFields, locations?.data, measureUnits?.data])

  useEffect(() => {
    if (productCreated) {
      createProductLotMutation({
        productId: productCreated.data.id,
        quantity: createProductFields?.quantity,
        price: createProductFields?.price,
        enterDate: createProductFields?.enterDate,
      } as ProductLot)
      closeDialog()
      setToast(true)
      setText('Producto creado correctamente')
      setRefresh(true)
    }
  }, [productCreated])
  // ------------------ Functions ------------------
  const handleChange = ({target: {name, value}}: any) => {
    setCreateProductFields({
      ...createProductFields,
      [name]: value
    })
  };
  const handleSubmit = (e: any) => {
    e.preventDefault()
    createProductMutation({
      name: createProductFields?.name,
      locationId: createProductFields?.location_id,
      categoryProductId: createProductFields?.category_id,
      measureUnit: createProductFields?.measureUnit,
      description: ""
    } as Product)
  }
  // ------------------ Render ------------------
  return (
    <div className={styles.dialog__container}>
      <div className={styles.dialog__header}>
        <h1 className={styles.dialog__title}>Agregar Producto</h1>
        <button
          className={styles.dialog__closeButton}
          onClick={() => closeDialog()}
        ><Icon icon={'ri:close-line'}/></button>
      </div>
      <div className={styles.dialog__body}>
        <form className={styles.dialog__form} onSubmit={handleSubmit}>
          <div className={styles.dialog__body_group_input}>
            <div className={styles.dialog__body_group_input_item}>
              <label htmlFor="name">Nombre</label>
              <input type="text" id={'name'} name={'name'} onChange={handleChange} required/>
            </div>
          </div>
          <div className={styles.dialog__body_group_input}>
            <div className={styles.dialog__body_group_input_item}>
              <label htmlFor="buy-date">Fecha de Compra</label>
              <input type="date" id={'buy-date'} name={'enterDate'} onChange={handleChange}
                     required/>
            </div>
            <div className={styles.dialog__body_group_input_item}>
              <label htmlFor="category">Categoría</label>
              <select name="category_id" id="category" onClick={handleChange} required>
                {
                  categories && categories.data.map((category: Category) => (
                    <option value={category.id} key={category.id}>{category.name}</option>
                  ))}
              </select>
            </div>
          </div>
          <div className={styles.dialog__body_group_input}>
            <div className={styles.dialog__body_group_input_item}>
              <label htmlFor="price">Precio</label>
              <input type="number" name={'price'} id={'price'} onChange={handleChange} required/>
            </div>
          </div>
          <div className={styles.dialog__body_group_input}>
            <div className={styles.dialog__body_group_input_item}>
              <label htmlFor="quantity">Cantidad</label>
              <input type="number" name={'quantity'} id={'quantity'} onChange={handleChange}
                     required/>
            </div>
            <div className={styles.dialog__body_group_input_item}>
              <label htmlFor="measure-unit">Unidad de Medición</label>
              <select name="measure-unit" id="measure-unit" onChange={handleChange} required>
                {
                  measureUnits && measureUnits.data.map((unit: MeasureUnit) => (
                    <option value={unit.length} key={
                      unit
                    }>{unit}</option>
                  ))
                }
              </select>
            </div>
            <div className={styles.dialog__body_group_input_item}>
              <label htmlFor="location">Ubicación</label>
              <select name="location_id" id="location" onChange={handleChange} required>
                {
                  locations && locations.data.map((location: Location) => (
                    <option value={location.id} key={location.id}>{location.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className={styles.dialog__body_group_input}>
            <button type={'submit'} className={styles.dialog__body_group_button}>
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

interface CreateProductDialogProps {
  closeDialog: () => void
}

interface CreateProductFields {
  name?: string
  enterDate?: string
  category_id?: number
  lot_id?: number
  price?: number
  quantity?: number
  measureUnit?: number
  location_id?: number
}