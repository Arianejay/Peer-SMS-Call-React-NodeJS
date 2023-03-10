export const validate = (
    pn: string,
    message: string,
    phonePossibility: string,
    typeIsMobile: boolean,
    call = false
) => {
    const incomplete =
        "Incomplete input, please enter phone number and message.";
    const invalidPhoneNumber = "Invalid phone number.";

    if (!call && (!pn || !message)) {
        return Promise.reject(incomplete);
    } else if (!call && !pn && message && phonePossibility === "unknown") {
        return Promise.reject(invalidPhoneNumber);
    } else if (pn && !typeIsMobile) {
        return Promise.reject(invalidPhoneNumber);
    }

    return Promise.resolve();
};
