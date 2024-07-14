import { useNavigate } from 'react-router-dom';
import './directory-item.styles.jsx';
import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles.jsx';


const DirectoryItem = ({category: {title, imageUrl, route}}) => {
    const navigate = useNavigate();
    const onNavigateHandler = () => navigate(route);
    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl}/>
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    )

}

export default DirectoryItem;