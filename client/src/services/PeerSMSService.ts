import { axiosInstance } from "./config";

class PeerSMS {
    async sendMessage(message: string, receiverNumber: string) {
        // const res = await axiosInstance.post("/sms", {
        //     message,
        //     receiverNumber,
        // });

        // return res;
        return "hey";
    }
}

export default new PeerSMS();
