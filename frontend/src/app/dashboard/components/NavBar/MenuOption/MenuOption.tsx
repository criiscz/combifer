'use client'
import {Icon, IconifyIcon} from "@iconify/react";
import Link from "next/link";
import React from "react";

export default function MenuOption({icon, text, link}: MenuOptionProps) {
  return (
    <>
      <Icon icon={icon}/>
      <Link href={link}>
        {text}
      </Link>
    </>
  )
}

interface MenuOptionProps {
  icon: string | IconifyIcon;
  text: string;
  link: string;

}