import React from "react";
import styles from "../stylesheets/main.module.scss";

const Form: React.FC = () => {
    return (
        <div className={styles.form__container}>
            <form>
                <div className={styles.details__box}>
                    <div className={styles.label__container}>
                        <label htmlFor="">Phone Number</label>
                        <label htmlFor="">Message</label>
                    </div>
                    <div className={styles.input__container}>
                        <input type="text" placeholder="09991234789" />
                        <textarea
                            rows={10}
                            cols={40}
                            placeholder="Something funny..."
                        />
                    </div>
                </div>
                <p>1 out of 100 characters left.</p>
                <div className={styles.button__container}>
                    <button>Send</button>
                    <button>Call</button>
                </div>
            </form>
        </div>
    );
};

export default Form;
