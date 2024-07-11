import { useContext } from 'react';
import './checkout-item.styles.scss';
import { CartDropdownContext } from '../../contexts/cart-dropdown.context';

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const {
        decrement,
        deleteItem,
        increment
    } = useContext(CartDropdownContext);

    const clearItemHandler = (cartItem) => deleteItem(cartItem);
    const incrementHandler = (cartItem) => increment(cartItem);
    const decrementHandler = (cartItem) => decrement(cartItem);
    
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div onClick={() => decrementHandler(cartItem)} className='arrow'>
                    &#10094;
                </div>
                <span className='value'> {quantity} </span>
                <div onClick={() => incrementHandler(cartItem)} className='arrow'>
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={() => clearItemHandler(cartItem)}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;