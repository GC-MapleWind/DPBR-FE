import React from "react";
import styles from "../styles/LogoutButton.module.css";
import {FiLogOut} from "react-icons/fi";

function LogoutButton({onClick}) {
    return (
        <button onClick={onClick} className={styles.logoutButton}>
            <FiLogOut className={styles.icon}/>
            <span className={styles.text}>로그아웃</span>
        </button>
    );
}

export default LogoutButton;
