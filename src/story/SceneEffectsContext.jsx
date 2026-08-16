import { createContext, useContext, useState } from "react";

const SceneEffectsContext = createContext();

export function SceneEffectsProvider({ children }) {

    const [bloomPulse, setBloomPulse] = useState(0);
    const [galaxyPulse, setGalaxyPulse] = useState(0);

    return (

        <SceneEffectsContext.Provider
            value={{
                bloomPulse,
                setBloomPulse,
                galaxyPulse,
                setGalaxyPulse,
            }}
        >

            {children}

        </SceneEffectsContext.Provider>

    );

}

export function useSceneEffects() {

    return useContext(SceneEffectsContext);

}