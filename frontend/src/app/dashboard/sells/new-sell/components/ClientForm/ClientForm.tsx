import SearchBar from "@/app/dashboard/components/SearchBar/SearchBar";
import styles from "./style.module.css";
import ClientContext from "@/context/ClientContext";
import {useContext, useEffect, useState} from "react";
import {useMutation, useQuery} from "react-query";
import cookie from "universal-cookie";
import {createClient, getAllClients} from "@/api/Clients";
import {DocumentType} from "@/models/DocumentType";
import Button from "@/app/components/Button";
import {updateProductLot} from "@/api/ProductLots";
import {ProductLot} from "@/models/ProductLot";
import {Client} from "@/models/Client";
import SellContext from "@/context/SellContext";

export default function ClientForm() {
  useEffect(() => {
  }, [])

  const documentTypes = Object.keys(DocumentType)


  const cookies = new cookie()

  const [client, setClient] = useState<Client | undefined>(undefined)

  const {
    selectedClient,
    setSelectedClient,
    clients,
    setClients
  } = useContext(ClientContext)

  const {data, refetch} = useQuery(
    'clients',
    async () => getAllClients(cookies.get('userToken'), 0, 1000)
  )

  const {mutate: clientMutation} = useMutation({
    mutationFn: () => createClient(cookies.get('userToken'), {
      name: client!.name,
      lastName: client!.lastName,
      document: client!.idDocument,
      documentType: client!.documentType || DocumentType.CC,
      phone: client!.phone,
      email: client!.email,
      personType: client!.documentType === DocumentType.NIT ? 'Juridical Person' : 'Natural Person',
    })
  })

  useEffect(() => {
    if (data !== undefined) {
      setClients(data.data)
    }
    if (selectedClient === undefined) {
      Array.from(document.getElementsByClassName(styles.row__item_value)).forEach((element) => {
        // @ts-ignore
        element.value = ''
      })
      // @ts-ignore
      document.getElementById('searchbar')!.value = ''
    }
    document.getElementById('searchbar')?.focus()
  }, [selectedClient, clients, data, setClients])

  const createnewClient = () => {
    clientMutation()
    setSelectedClient(client)
    refetch().then(() => {
      setClients(data?.data)
    })
  }


  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Cliente</h1>
      <div className={styles.content}>
        <input list={"clients"}
               className={styles.searchbar}
               id={"searchbar"}
               placeholder={"Buscar cliente"}
               onChange={(e) => {
                 setSelectedClient(clients?.find((client) => {
                   return client.idDocument === parseInt(e.target.value.split(' - ')[1])
                 }))
               }}
        />
        <datalist id={"clients"} className={styles.searchbar__datalist}>
          {
            clients?.map((client) => {
              return (
                <option value={`${client.name} ${client.lastName} - ${client.idDocument}`}
                        key={client.idDocument}
                />
              )
            })
          }
        </datalist>
        <div className={styles.clientInfo}>
          <div className={styles.row}>
            <div className={styles.row__item}>
              <div className={styles.row__item_title}>Tipo de Documento</div>
              <select className={styles.row__item_select} required
                      onChange={(e) => {
                        setClient(prev => {
                          return {...prev!, documentType: e.target.value}
                        })
                      }}
                      value={selectedClient?.documentType} disabled={
                selectedClient !== undefined
              }>
                {
                  documentTypes && documentTypes.map((key) => {
                    return (
                      // @ts-ignore
                      <option value={key} key={key}>{key}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className={styles.row__item}>
              <div className={styles.row__item_title}>Número de documento</div>
              <input className={styles.row__item_value} type="text"
                     onChange={(e) => {
                       setClient(prev => {
                         return {...prev!, idDocument: parseInt(e.target.value)}
                       })
                     }}
                     value={selectedClient?.idDocument} disabled={
                selectedClient !== undefined
              }/>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.row__item}>
              <div className={styles.row__item_title}>Nombre</div>
              <input className={styles.row__item_value} type="text" onChange={(e) => {
                setClient(prev => {
                  return {...prev!, name: e.target.value}
                })
              }}
                     value={selectedClient?.name} disabled={
                selectedClient !== undefined
              }/>
            </div>
            <div className={styles.row__item}>
              <div className={styles.row__item_title}>Apellido</div>
              <input className={styles.row__item_value} type="text" onChange={(e) => {
                setClient(prev => {
                  return {...prev!, lastName: e.target.value}
                })
              }}
                     value={selectedClient?.lastName} disabled={
                selectedClient !== undefined
              }/>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.row__item}>
              <div className={styles.row__item_title}>Telefono</div>
              <input className={styles.row__item_value} type="text" onChange={(e) => {
                setClient(prev => {
                  return {...prev!, phone: e.target.value}
                })
              }}
                     value={selectedClient?.phone} disabled={
                selectedClient !== undefined
              }/>
            </div>
            <div className={styles.row__item}>
              <div className={styles.row__item_title}>Correo Electrónico</div>
              <input className={styles.row__item_value} type="text"
                     onChange={(e) => {
                       setClient(prev => {
                         return {...prev!, email: e.target.value}
                       })
                     }}
                     value={selectedClient?.email} disabled={
                selectedClient !== undefined
              }/>
            </div>
          </div>
        </div>
        <div className={styles.createButton}>
          <button className={!selectedClient ? styles.createButton__button : styles.hide}
                  onClick={createnewClient}
                  disabled={selectedClient !== undefined}
          >Crear Cliente
          </button>
        </div>
      </div>
    </div>
  )
}