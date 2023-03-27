'use client'
import Modal from "@/app/components/Modal/Modal";
import styles from './style.module.css'
import React from "react";
import ModalContext from "@/context/ModalContext";

export default function InventoryLayout({children}: { children: React.ReactNode }) {
  return (
    <div>
        {children}
    </div>
  )
}