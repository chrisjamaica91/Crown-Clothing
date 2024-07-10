import { createContext, useState } from "react";
import SHOP_DATA from '../shop-data.json';

// the actual value you want to access
export const ProductsContext = createContext({
    products: [],
    setProducts: () => [],
});

// will wrap around any components that need to access the values inside
export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState(SHOP_DATA);
    const value = { products };

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}