import React, { useState, MouseEvent, useRef } from "react";
import styles from "../stylesheets/main.module.scss";
import { toast } from "react-toastify";
import { parsePhoneNumber } from "awesome-phonenumber";

import { IForm } from "../types/IForm";

import Axios from "../axios/axios";

const Form: React.FC<IForm> = ({ limit }) => {
    const [receiverNumber, setReceiverNumber] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const maxCharacterCount = 100 as number;
    const remainingCharacter = maxCharacterCount - message.length;
    const options = { color: limit >= remainingCharacter ? "red" : "" };

    const handleSendMessage = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const pn = parsePhoneNumber(receiverNumber, { regionCode: "PH" });

        // validations
        if (!pn || !message)
            return toast.error(
                "Incomplete input, please enter phone number and message."
            );

        if (pn && (pn.typeIsMobile as boolean) === false) {
            return toast.error("Invalid phone number.");
        }

        Axios.sendMessage(message, pn.number?.e164 as string)
            .then((res) => {
                toast.success(res.data.message);
                setReceiverNumber("");
                setMessage("");
            })
            .catch((err) => {
                toast.error(err);
            });
    };

    const handleChangeCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log("change");

        if ((e as any).key === "Backspace") {
            console.log("hey");
            // e.preventDefault();
            // textareaRef.current.disabled = false;
        }
    };

    return (
        <div className={styles.form__container}>
            <form>
                <div className={styles.details__box}>
                    <div className={styles.label__container}>
                        <label htmlFor="">Phone Number</label>
                        <label htmlFor="">Message</label>
                    </div>
                    <div className={styles.input__container}>
                        <input
                            type="text"
                            placeholder="09991234789"
                            autoComplete="false"
                            spellCheck="false"
                            value={receiverNumber}
                            onChange={(e) => setReceiverNumber(e.target.value)}
                        />
                        <textarea
                            id="text-area"
                            rows={10}
                            cols={40}
                            placeholder="Something funny..."
                            autoComplete="false"
                            spellCheck="false"
                            value={message}
                            disabled={remainingCharacter === 0}
                            ref={textareaRef}
                            onChange={(e) => {
                                setMessage(e.target.value);
                                handleChangeCount(e);
                            }}
                        />
                    </div>
                </div>
                <p>
                    <span style={options}>{remainingCharacter}</span> out of 100
                    characters left.
                </p>
                <div className={styles.button__container}>
                    <button onClick={handleSendMessage}>Send</button>
                    <button>Call</button>
                </div>
            </form>
        </div>
    );
};

export default Form;
