import { Link } from 'react-router-dom';
function Home() {
    return (
        <main>
            <h1>Home</h1>
            <nav>
                <Link className='btn' to="/caching_demo">Caching Demo</Link>
                <Link className='btn' to="/password_hashing_demo/login">Password Hashing Demo</Link>
                <Link className='btn' to="/rbac/login">RBAC Demo</Link>
            </nav>
        </main>
    );
}

export default Home;