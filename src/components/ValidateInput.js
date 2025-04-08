import React, { useRef, useState } from "react";
import styles from "./ValidateInput.module.css";

function ValidatedInput({
    name,
    placeholder,
    register,
    trigger,
    error,
    inputClassName = "",
}) {
    const touchedRef = useRef(false);
    const [showPass, setShowPass] = useState(false);
    const [hasPass, setHasPass] = useState(false)
    const field = register(name);
    const isPassword = name === "password";
    return (
        <>
            <div className={styles.inputWrapper}>
                <input
                    {...field}
                    type={isPassword && !showPass ? "password" : "text"}
                    placeholder={placeholder}
                    className={`${inputClassName}`}
                    onChange={(e) => {
                        field.onChange(e);
                        touchedRef.current = true;
                        setHasPass(e.target.value !== "")
                    }}
                    onBlur={async () => {
                        if (touchedRef) {
                            await trigger(name);
                        }
                    }}
                />
                {isPassword && hasPass && (
                    <div
                        className={`${styles.showPass} ${showPass ? styles.active : ""}`}
                        onClick={() => setShowPass((prev) => !prev)}
                    ></div>
                )}
            </div>
            {error && <p className={styles.error}>{error.message}</p>}
        </>
    );
}

export default ValidatedInput;
