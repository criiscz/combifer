import styles
    from "./style.module.css";
import {Icon} from "@iconify/react";
import Table from "@/app/dashboard/sells/new-sell/components/Table/Table";
import Button from "@/app/components/Button";
import RegisterForm from "@/app/register/components/RegisterForm";

export default function CreateNewUserDialog(props: CreateNewUserDialogProps) {
    const close = () => {
        props.closeDialog()
    }

    return(
      <div className={styles.container}>
          <div className={styles.header}>
              <h2 className={styles.title}>Nuevo usuario</h2>
              <button className={styles.closeButton} onClick={close}>
                  <Icon icon="ri:close-line" width={30}/>
              </button>
          </div>
          <div className={styles.content}>
              <div className={styles.row}>
                <RegisterForm typeForm={"new-user"}/>
              </div>
          </div>
      </div>
    )
}



interface CreateNewUserDialogProps {
    closeDialog: () => void,
}