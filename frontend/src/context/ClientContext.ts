import React from "react";
import {ProductComplete, ProductCompleteQ} from "@/models/Product";
import {Client} from "@/models/Client";

type ClientContextType = {
  selectedClient: Client | undefined,
  setSelectedClient: React.Dispatch<React.SetStateAction<Client | undefined>>
  clients: Client[] | undefined,
  setClients: React.Dispatch<React.SetStateAction<Client[] | undefined>>
}

const clientContextState = {
  selectedClient: undefined,
  setSelectedClient: () => {},
  clients: undefined,
  setClients: () => {}
}

const ClientContext = React.createContext<ClientContextType>(clientContextState)

export default ClientContext