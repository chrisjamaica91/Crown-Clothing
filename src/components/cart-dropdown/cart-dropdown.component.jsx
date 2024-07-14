import Button from '../button/button.component';
import './cart-dropdown.styles.jsx';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartDropdownContext } from '../../contexts/cart-dropdown.context';
import { useNavigate } from 'react-router-dom';
import { CardDropdownContainer, CartItemsContainer, EmptyMessage } from './cart-dropdown.styles.jsx';

const CartDropdown = () => {
    const {cartItems} = useContext(CartDropdownContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <CardDropdownContainer>
            <CartItemsContainer>
                {
                    cartItems.length ? 
                    cartItems.map(item => <CartItem key={item.id} cartItem={item}/>) :
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                }
            </CartItemsContainer>
            <Button onClick = {goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CardDropdownContainer>
    )
}

export default CartDropdown;