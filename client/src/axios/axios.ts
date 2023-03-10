import { axiosInstance } from "./config";

class Axios {
    async sendMessage(message: string, receiverNumber: string) {
        const res = await axiosInstance.post("/sms", {
            message,
            receiverNumber,
        });

        return res;
    }
}

export default new Axios();
