import React from "react";

type RegisterContextType = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  id?: string,
  setId?: React.Dispatch<React.SetStateAction<string>>
}

const userContextState = {
  open: false,
  setOpen: () => {}
}

const ModalContext = React.createContext<RegisterContextType>(userContextState)

export default ModalContext