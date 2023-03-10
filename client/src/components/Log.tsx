import React from "react";
import styles from "../stylesheets/main.module.scss";

import { useStateContext } from "../context/Context";

const Log: React.FC = () => {
    const { logs } = useStateContext();
    console.log(logs);

    return (
        <div className={styles.log__container}>
            <div className={styles.log__box}>
                <h4>Logs</h4>
                <div>
                    <p>Send message to 092795532 at Feb 21, 2023 12:05PM</p>
                    <p>Send message to 092795532 at Feb 21, 2023 12:05PM</p>
                    <p>Send message to 092795532 at Feb 21, 2023 12:05PM</p>
                    <p>Send message to 092795532 at Feb 21, 2023 12:05PM</p>
                    <p>Send message to 092795532</p>
                    <p>Send message to 092795532</p>
                    <p>Send message to 092795532</p>
                    <p>Send message to 092795532</p>
                    <p>Send message to 092795532</p>
                    <p>Send message to 092795532</p>
                </div>
            </div>
        </div>
    );
};

export default Log;
