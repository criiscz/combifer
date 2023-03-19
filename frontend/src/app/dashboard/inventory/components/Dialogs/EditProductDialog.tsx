import styles from './style.module.css'
import {Icon} from "@iconify/react";
import {ProductComplete} from "@/models/Product";
import {useState} from "react";
import Category from "@/models/Category";
import {MeasureUnit} from "@/models/MeasureUnit";
import {Location} from "@/models/Location";

export default function EditProductDialog({closeDialog}: EditProductDialogProps) {

  const [editProductFields, setEditProductFields] = useState<EditProductFields>()
  const [categories, setCategories] = useState<Category[]>([])
  const [measureUnits, setMeasureUnits] = useState<MeasureUnit[]>([])
  const [locations, setLocations] = useState<Location[]>([])

  const handleChange = ({target: {name, value}}: any) => {
    setEditProductFields({

      ...editProductFields,
      [name]: value
    })
    console.log(editProductFields)
  };

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
        <div className={styles.dialog__form}>
          <div className={styles.dialog__body_group_input}>
            <div className={styles.dialog__body_group_input_item}>
              <label htmlFor="name">Nombre</label>
              <input type="text" id={'name'} name={'name'} onChange={handleChange} required/>
            </div>
          </div>
          <div className={styles.dialog__body_group_input}>
            <div className={styles.dialog__body_group_input_item}>
              <label htmlFor="buy-date">Fecha de Compra</label>
              <input type="date" id={'buy-date'} name={'buy-date'} onChange={handleChange}
                     required/>
            </div>
            <div className={styles.dialog__body_group_input_item}>
              <label htmlFor="category">Categoría</label>
              <select name="category" id="category" onClick={handleChange} required>
                {
                  categories.map(category => (
                    <option value={category.id} key={category.id}>{category.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className={styles.dialog__body_group_input}>
            <div className={styles.dialog__body_group_input_item}>
              <label htmlFor="price">Precio</label>
              <input type="number" id={'price'} name={'price'} onChange={handleChange} required/>
            </div>
            <div className={styles.dialog__body_group_input_item}>
              <label htmlFor="measure-unit">Unidad de Medida</label>
              <select name="measure-unit" id="measure-unit" onChange={handleChange} required>
                {
                  measureUnits.map(measureUnit => (
                    <option value={measureUnit} key={measureUnit.length}>{measureUnit}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className={styles.dialog__body_group_input}>
            <div className={styles.dialog__body_group_input_item}>
              <label htmlFor="location">Ubicación</label>
              <select name="location" id="location" onChange={handleChange} required>
                {
                  locations.map(location => (
                    <option value={location.id} key={location.id}>{location.name}</option>
                  ))
                }
              </select>
            </div>
            <div className={styles.dialog__body_group_input_item}>
              <label htmlFor="quantity">Cantidad</label>
              <input type="number" id={'quantity'} name={'quantity'} onChange={handleChange}
                     required/>
            </div>
          </div>
          <button className={styles.dialog__body_group_button}>Guardar</button>
        </div>
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
  buyDate?: string
  category?: number
  price?: number
  measureUnit?: number
  location?: number
  quantity?: number
}