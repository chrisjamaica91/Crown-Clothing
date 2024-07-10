import { createContext, useState } from "react";

// the actual value you want to access
export const CartDropdownContext = createContext({
    isDropdownOpen: false,
    setIsDropdownOpen: () => false,
});

// will wrap around any components that need to access the values inside
export const CartDropdownProvider = ({children}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const value = { isDropdownOpen, setIsDropdownOpen };

    return <CartDropdownContext.Provider value={value}>{children}</CartDropdownContext.Provider>
}