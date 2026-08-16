import { createContext, useContext, useState } from "react";
import { STORY } from "./StoryState";

const StoryContext = createContext();

export function StoryProvider({ children }) {

    const [scene, setScene] = useState(STORY.INTRO);

    return (

        <StoryContext.Provider

            value={{

                scene,

                setScene

            }}

        >

            {children}

        </StoryContext.Provider>

    );

}

export function useStory() {

    return useContext(StoryContext);

}