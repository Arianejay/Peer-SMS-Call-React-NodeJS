import { axiosInstance } from "./config";

import { Device } from "@twilio/voice-sdk";

class PeerCall {
    async callbackCall(to: string) {
        await axiosInstance.post("/call/callback", { to });
    }

    async getToken(to: string) {
        await this.callbackCall(to);
        const res = await axiosInstance.get("/call/token");

        const device = await new Device(res.data, {
            codecPreferences: ["opus", "pcmu"] as any,
            fakeLocalDTMF: true,
            enableRingingState: true,
            logLevel: 1,
        });

        if (device) {
            let call = (await device.connect({ params: { To: to } })) as any;

            call.on("disconnect", () => {
                console.log("disconnecteeeeed");
                return Promise.reject("Call Disconnect");
            });

            return Promise.resolve(`Calling ${to}`);
        } else {
            return Promise.reject("Error on call, please try again.");
        }
    }
}

export default new PeerCall();
