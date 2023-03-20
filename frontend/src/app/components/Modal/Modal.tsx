import styles from './modal.module.css'

export default function Modal({children, isOpen}: ModalProps) {

  return (
    <div className={isOpen ? styles.modal : styles.modal__off}>
      {children}
    </div>
  )
}

interface ModalProps {
  children?: React.ReactNode,
  isOpen: boolean,
  onClose?: () => void,
  id?: string
  name?: string

}