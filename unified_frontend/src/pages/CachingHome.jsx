import { useEffect, useState } from 'react';
import HomeBtn from '../components/HomeBtn';



const SERVER_URL='http://localhost:3000'

function CachingHome() {

    const [heading, setHeading] = useState('');
    const [body, setBody] = useState([]);
    const [pageImage, setPageImage] = useState({});
    const [error, setError] = useState({isError: false});


    useEffect(() => {
        fetch(SERVER_URL)
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                const err = {
                    isError: true,
                    message:"Server Response Not Okay!!"
                }
                setError(err);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .then(data => {
            setHeading(data.heading)
            setBody(data.body)
            setPageImage(data.img)
            
        })
        .catch(error => {
            const err = {
                isError: true,
                message: "Check If Server Is Running!!!"
            }
            setError(err);
            console.error(error) 
        });
    }, []);

    return (
        <main>
            <h1>{heading? heading: "Caching Demo"}</h1>
            <section>
                {
                    body.length>0 && 
                    body.map(item => <p key={item.key}>{item.val}</p>)
                }
                <div id='img-container'>
                    <img src={pageImage.url} alt={pageImage.alt} />
                </div>
            </section>

            {error.isError && <p className='error-txt'>{error.message}</p>}

        </main>
    );
}

export default CachingHome;