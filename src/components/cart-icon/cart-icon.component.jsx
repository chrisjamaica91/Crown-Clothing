import { useContext } from 'react';

import './cart-icon.styles.jsx';
import { CartDropdownContext } from '../../contexts/cart-dropdown.context';
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles.jsx';

const CartIcon = () => {
    const { isDropdownOpen, setIsDropdownOpen, totalQuantity } = useContext(CartDropdownContext);

    const toggleCart = () => setIsDropdownOpen(!isDropdownOpen);
    return (
        <CartIconContainer onClick={toggleCart}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{totalQuantity}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;