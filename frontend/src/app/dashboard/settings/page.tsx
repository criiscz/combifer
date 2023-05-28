"use client"
import Image from "next/image";
import styles from './style.module.css'
import Link from "next/link";
import {Icon} from "@iconify/react";
import {useEffect, useMemo} from "react";
import cookie from "universal-cookie"
import {useRouter} from "next/navigation";
import {useLoginStatus} from "@/hooks/useLoginStatus";

export default function SettingsPage() {
  const { isAdmin } = useLoginStatus()
  return isAdmin && (
    <div className={styles.container}>
      <div className={styles.title}>Configuración</div>
      <div className={styles.content}>
        <div className={styles.settings__cards}>
          <Link className={styles.settings__card_item} href={'/dashboard/settings/categories'}>
            <Icon icon={'mdi:format-list-bulleted'} className={styles.settings__card}/>
            Categorías
          </Link>
          <Link className={styles.settings__card_item} href={'/dashboard/settings/locations'}>
            <Icon icon={'mdi:map-marker'} className={styles.settings__card}/>
            Locations
          </Link>
          <Link className={styles.settings__card_item} href={'/dashboard/settings/roles'}>
            <Icon icon={'mdi:account-group'} className={styles.settings__card}/>
            Roles
          </Link>
          <Link className={styles.settings__card_item} href={'/dashboard/settings/taxes'}>
            <Icon icon={'mdi:percent'} className={styles.settings__card}/>
            Impuestos
          </Link>
        </div>
      </div>
    </div>
  )
}