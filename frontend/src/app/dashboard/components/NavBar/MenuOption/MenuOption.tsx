'use client'
import {Icon, IconifyIcon} from "@iconify/react";
import Link from "next/link";
import React from "react";
import styles from "@/app/dashboard/components/NavBar/navbar.module.css";

export default function MenuOption({index, icon, text, link, active, onClick}: MenuOptionProps) {
  return (
    <li className={!active ? styles.navbar__link_1 : styles.navbar__link_1_active}>
      <Icon icon={icon}/>
      <Link href={link} onClick={() => onClick(index)}>
        {text}
      </Link>
    </li>
  )
}

interface MenuOptionProps {
  index: number;
  icon: string | IconifyIcon;
  text: string;
  link: string;
  active?: boolean;
  onClick: (index:number) => void;

}