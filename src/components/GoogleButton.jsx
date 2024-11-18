import React from "react";
import styles from "../styles/GoogleButton.module.css";
import {FcGoogle} from "react-icons/fc";

function GoogleButton({onClick, name}) {
    return (
        <button onClick={onClick} className={styles.googleButton}>
            <FcGoogle className={styles.icon}/>
            <span className={styles.text}>{name} 계정으로 로그인</span>
        </button>
    );
}

export default GoogleButton;
