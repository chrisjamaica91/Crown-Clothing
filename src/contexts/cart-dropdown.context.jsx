import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const foundProduct = cartItems.find(item => item.id === productToAdd.id);
    if (foundProduct) {
        return cartItems.map((item) => item.id === productToAdd.id ?
            {...item, quantity: item.quantity + 1} : item)
    }
    
    return [...cartItems, {...productToAdd, quantity: 1}];

}

const calculateCheckoutTotal = (cartItems) => {
    return cartItems.reduce((total, cartItem) => total + (parseInt(cartItem.price) * cartItem.quantity), 0);
}

const reduceQuantity = (modifiedItem, cartItems) => {
    return cartItems.map((item) => item.id === modifiedItem.id ?
           {...item, quantity: item.quantity - 1} : item
        ).filter(item => item.quantity !== 0);
}

const increaseQuantity = (modifiedItem, cartItems) => {
    return cartItems.map((item) => item.id === modifiedItem.id ?
        {...item, quantity: item.quantity + 1} : item)
}


// the actual value you want to access
export const CartDropdownContext = createContext({
    isDropdownOpen: false,
    setIsDropdownOpen: () => {},
    cartItems: [],
    setCartItems: () => {},
    addItemToCart: () => {},
    decrement: () => {},
    increment: () => {},
    totalQuantity: 0,
    checkoutTotal: 0,

});


// will wrap around any components that need to access the values inside
export const CartDropdownProvider = ({children}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [checkoutTotal, setCheckoutTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setTotalQuantity(newCartCount);
        setCheckoutTotal(calculateCheckoutTotal(cartItems));
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const decrement = (itemToDecrement) => {
        setCartItems(reduceQuantity(itemToDecrement, cartItems));
    }
    const deleteItem = (itemToDelete) => {
        setCartItems(cartItems.filter(item => item.id !== itemToDelete.id));
     }
    const increment = (itemToIncrement) => {
        setCartItems(increaseQuantity(itemToIncrement, cartItems));
    }
    
    const value = { 
        isDropdownOpen, 
        setIsDropdownOpen, 
        addItemToCart, 
        cartItems,
        setCartItems,
        totalQuantity,
        checkoutTotal,
        decrement,
        deleteItem,
        increment
    };

    return <CartDropdownContext.Provider value={value}>{children}</CartDropdownContext.Provider>
}