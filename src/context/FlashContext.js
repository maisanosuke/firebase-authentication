import React from 'react';

const FlashContext = React.createContext();
export const useFlashContext = () => React.useContext(FlashContext);

export function FlashProvider({children}){
    const [flash, setFlash] = React.useState(null);
    const value = {
        flash: flash,
        setFlash: setFlash
    }

    return(
        <FlashContext.Provider value={value}>
            {children}
        </FlashContext.Provider>
    )
}