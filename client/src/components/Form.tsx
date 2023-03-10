import React, { useState, MouseEvent, useRef } from "react";
import styles from "../stylesheets/main.module.scss";
import { toast } from "react-toastify";
import { parsePhoneNumber } from "awesome-phonenumber";
import moment from "moment";

import { IForm } from "../types/IForm";
import { validate } from "../validations/validate";
import { useStateContext } from "../context/Context";

import PeerSMS from "../services/PeerSMSService";
import PeerCall from "../services/PeerCallService";

const Form: React.FC<IForm> = ({ limit }) => {
    // states
    const [receiverNumber, setReceiverNumber] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { logs, setLogs } = useStateContext();

    // character count
    const maxCharacterCount = 100 as number;
    const remainingCharacter = maxCharacterCount - message.length;
    const options = { color: limit >= remainingCharacter ? "red" : "" };

    // parsing phone number
    const pn = parsePhoneNumber(receiverNumber, { regionCode: "PH" });
    const parsedNumber = (pn.number && pn.number.e164) as string;
    const typeIsMobile = (pn.number && pn.typeIsMobile) as boolean;
    const phonePossibility = (pn.number && pn.possibility) as string;

    const logger = (message: string) => {
        try {
            const messageObj = {
                message: message,
                date: moment().format("LLLL"),
            };
            setLogs((prevState: Array<object>) => [...prevState, messageObj]);
        } catch (error) {
            console.log(error);
        }
        return Promise.resolve();
    };

    const handleSendMessage = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        validate(parsedNumber, message, phonePossibility, typeIsMobile, false)
            ?.then(() => {
                PeerSMS.sendMessage(message, pn.number?.e164 as string)
                    .then((res) => {
                        logger(`Sent message to ${parsedNumber}`).then(() => {
                            console.log(res);
                            // toast.success(res.data.message);
                            setReceiverNumber("");
                            setMessage("");
                        });
                    })
                    .catch((err) => {
                        toast.error(err);
                    });
            })
            .catch((err) => {
                toast.error(err);
            });
    };

    const handleCall = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        validate(parsedNumber, message, phonePossibility, typeIsMobile, true)
            ?.then(() => {
                PeerCall.getToken(pn.number?.e164 as string)
                    .then((res) => {
                        toast.success(res);
                    })
                    .catch((err) => {
                        toast.error(err);
                    });
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
                    <button onClick={handleCall}>Call</button>
                </div>
            </form>
        </div>
    );
};

export default Form;
