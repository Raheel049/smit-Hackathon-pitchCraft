import React from "react";
import styles from "./InputField.module.css";

function InputField({ type = "text", placeholder, value, onChange }) {
  return (
    <>
      <input
        type={type}
        className={styles.inputField}
        placeholder={placeholder}
        value={value}
        onChange={onChange}

      />
    </>
  );
}

export default InputField;
