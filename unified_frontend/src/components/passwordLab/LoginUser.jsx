import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginUser() {

    const defaultUser = {
        email: "",
        password: "",
    }

    const navigate = useNavigate();

    const style = {
        formitem: {
            'display': 'flex',
            'justifyContent': 'flex-end',
            'gap': '50px',
            'width': '80%',
        },
        formArea: {
            'width': '500px',
            'display': 'flex',
            'flex-direction': 'column',
            'justify-content': 'center',
            'gap': '10px',
            'align-items': 'center',
        }
    }
    const [user, setUser] = useState(defaultUser);
    const [loginError, setLoginError] = useState(false);
    const [loggedinUser, setLoggedInUser] = useState({
        status: false,
        name: "",
        email: "",
    });

    function handleInput(event) {
        const updatedUser = {...user}
        switch(event.target.id) {
            case 'email-input':
                updatedUser.email = event.target.value
                break;
            case 'password-input':
                updatedUser.password = event.target.value.trim()
                break;
        }
        setUser(updatedUser);
    }

    async function handleFormSubmit() {
        if(!user.email.trim() || !user.password.trim()) {
            alert("Please fill all the details!!!")
            return;
        }
        const requestOpt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        }
        try {
            console.log(requestOpt)
            const response = await fetch(
                "http://localhost:3001/api/auth/login",
                requestOpt
            )
            if(!response.ok) {
                throw new Error('HTTP error status: ' + response.status);
            }
            const data = await response.json();

            const {email, name,} = data;
            setLoggedInUser({
                status: true,
                name: name,
                email: email,
            });
        } catch(error){
            console.error("Error while creating user");
            console.error(error);
            setLoginError(true);
        }
        resetForm();
    }

    function resetForm() {
        setUser(defaultUser);
    }

    return (
        <section>
            <h3>Login</h3>
            <form style={style.formArea}>
                <div style={style.formitem} className="form-item">
                    <label for="email-input">Email:</label>
                    <input
                    type='text'
                    id="email-input"
                    className='form-input'
                    maxLength={50}
                    required
                    value={user.email}
                    onChange={handleInput}
                    />
                </div>
                <div style={style.formitem} className="form-item">
                    <label for="password-input">Password:</label>
                    <input
                    type='password'
                    id="password-input"
                    className='form-input'
                    maxLength={50}
                    required
                    value={user.password}
                    onChange={handleInput}
                    />
                </div>
                <div className="formitem form-btn-area">
                    <p style={{'align-self': 'flex-end'}} className="btn btn-secondary" onClick={() => navigate("/password_hashing_demo/register")}>Register</p>
                    <p style={{'align-self': 'flex-end'}} className="btn" onClick={handleFormSubmit}>Sign In</p>
                </div>
            </form>

            <div>
                {loginError && <p style={{'color':'red'}}>Invalid Username or Password</p>}
            </div>
            
            <div>
                {loggedinUser.status && <p>Login Successful: {loggedinUser.name}</p>}
            </div>
        </section>
    );
}

export default LoginUser;