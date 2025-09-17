import { useNavigate } from 'react-router-dom';


function HomeBtn() {
    const navigate = useNavigate();
    return (
        <p className='btn' onClick={() => navigate('/')}>Go To Home</p>
    );
}

export default HomeBtn;