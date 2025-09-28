import { useNavigate } from 'react-router-dom';


function HomeBtn() {
    const navigate = useNavigate();
    return (
        <div id='home-btn-container'>
            <p className='btn home-btn' onClick={() => navigate('/')}>Go To Home</p>
        </div>
        
    );
}

export default HomeBtn;