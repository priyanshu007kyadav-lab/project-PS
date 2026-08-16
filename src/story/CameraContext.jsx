import { createContext, useContext, useState } from "react";

const CameraContext = createContext();

export function CameraProvider({ children }) {

    const [target, setTarget] = useState("INTRO");

    return (

        <CameraContext.Provider

            value={{

                target,

                setTarget

            }}

        >

            {children}

        </CameraContext.Provider>

    );

}

export function useCameraTarget() {

    return useContext(CameraContext);

}