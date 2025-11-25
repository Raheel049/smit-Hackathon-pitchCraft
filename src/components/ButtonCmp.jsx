import React from 'react'
import styles from "./ButtonCmp.module.css"

function ButtonCmp({onClick, style, title} ) {
  return (
    <>
        <button onClick={onClick} className={styles.btn} style={{...style}}>{title || "Button"}</button>
    </>
  )
}

export default ButtonCmp