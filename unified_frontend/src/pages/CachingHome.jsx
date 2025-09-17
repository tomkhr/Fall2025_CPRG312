import { useEffect, useState } from 'react';
import HomeBtn from '../components/HomeBtn';



const SERVER_URL='http://localhost:3000'

function CachingHome() {

    const [heading, setHeading] = useState('');
    const [body, setBody] = useState([]);
    const [pageImage, setPageImage] = useState({});


    useEffect(() => {
        fetch(SERVER_URL)
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .then(data => {
            setHeading(data.heading)
            setBody(data.body)
            setPageImage(data.img)
            
        })
        .catch(error => console.error(error));
    }, []);

    return (
        <main>
            <HomeBtn />
            <h1>{heading}</h1>
            <section>
                {
                    body.length>0 && 
                    body.map(item => <p key={item.key}>{item.val}</p>)
                }
                <div id='img-container'>
                    <img src={pageImage.url} alt={pageImage.alt} />
                </div>
            </section>

        </main>
    );
}

export default CachingHome;