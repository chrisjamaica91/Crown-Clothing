import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom"
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg';
import './navigation.styles.scss';
import { signOutUser } from "../../../utils/firebase/firebase.utils";
import { UserContext } from "../../../contexts/user.context";
import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";
import { CartDropdownContext } from "../../../contexts/cart-dropdown.context";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isDropdownOpen, setIsDropdownOpen } = useContext(CartDropdownContext);
  
    const dropdownHandler = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    return (
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <CrwnLogo className='logo'/>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>
                {
                    currentUser ? (
                        <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                    ) : (<Link className="nav-link" to='/auth'>
                        SIGN IN
                    </Link>)
                }
                <div onClick={dropdownHandler}>
                    <CartIcon />
                </div>
                
            </div>
            { isDropdownOpen && (<CartDropdown/>) }
        </div>
        <Outlet />
      </Fragment>
    )
}

export default Navigation;