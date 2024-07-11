import { useContext } from 'react';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';
import { CartDropdownContext } from '../../contexts/cart-dropdown.context';

const CartIcon = () => {
    const { isDropdownOpen, setIsDropdownOpen, totalQuantity } = useContext(CartDropdownContext);

    const toggleCart = () => setIsDropdownOpen(!isDropdownOpen);
    return (
        <div onClick={toggleCart} className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{totalQuantity}</span>
        </div>
    )
}

export default CartIcon;