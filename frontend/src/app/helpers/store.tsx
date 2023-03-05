import React from "react";

type RegisterContextType = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const userContextState = {
  open: false,
  setOpen: () => {}
}

const RegisterContext = React.createContext<RegisterContextType>(userContextState)

export default RegisterContext