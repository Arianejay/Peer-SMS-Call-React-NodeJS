import { createContext, useContext, useState } from "react";
import { IContext } from "../types/IContext";

const Context = createContext({} as IContext);

export const useStateContext = () => useContext(Context);

export const StateContext = ({ children }: any) => {
    const [logs, setLogs] = useState<Array<object>>([]);

    return (
        <Context.Provider value={{ logs, setLogs }}>
            {children}
        </Context.Provider>
    );
};
