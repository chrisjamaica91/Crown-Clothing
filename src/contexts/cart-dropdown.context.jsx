import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const foundProduct = cartItems.find(item => item.id === productToAdd.id);
    if (foundProduct) {
        return cartItems.map((item) => item.id === productToAdd.id ?
            {...item, quantity: item.quantity + 1} : item)
    }
    
    return [...cartItems, {...productToAdd, quantity: 1}];

}

const calculateTotalCartQuantity = (cartItems) => {
    let total = 0;
    cartItems.forEach(item => {
        total = total + parseInt(item.quantity);
    });
    return total;
}

// the actual value you want to access
export const CartDropdownContext = createContext({
    isDropdownOpen: false,
    setIsDropdownOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    totalQuantity: 0,
});


// will wrap around any components that need to access the values inside
export const CartDropdownProvider = ({children}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setTotalQuantity(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    
    const value = { 
        isDropdownOpen, 
        setIsDropdownOpen, 
        addItemToCart, 
        cartItems,
        totalQuantity
    };

    return <CartDropdownContext.Provider value={value}>{children}</CartDropdownContext.Provider>
}