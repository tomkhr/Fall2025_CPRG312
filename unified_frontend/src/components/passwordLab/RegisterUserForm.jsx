import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterUserForm() {
    const defaultUser = {
            email: "",
            password: "",
            name: "",
        }

    const navigate = useNavigate();
    
    const RegistrationState = Object.freeze({
        INIT: 0,
        PROCESSING: 1,
        SUCCESS: 2,
        FAILED: 3,
    })
        
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
    const [state, setState] = useState(RegistrationState.INIT);
    
    function handleInput(event) {
        const updatedUser = {...user}
        switch(event.target.id) {
            case 'name-input':
                updatedUser.name = event.target.value
                break;
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
        if(!user.name.trim() || !user.email.trim() || !user.password.trim()) {
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
            // console.log(requestOpt)
            setState(RegistrationState.PROCESSING);
            const response = await fetch(
                "http://localhost:3001/api/auth/register",
                requestOpt
            )
            if(!response.ok) {
                throw new Error(
                    'HTTP error status: ' + response.status
                )
            }
            setState(RegistrationState.SUCCESS);
            const responseData = await response.json();

            console.log(responseData);
            // TODO: Show message on UI

        } catch(error){
            console.error("Error while creating user");
            console.error(error);
            setState(RegistrationState.FAILED);
        }
        // alert(`name: ${user.name}, email: ${user.email}, password: ${user.password}`);
        resetForm();
    }
    
    function resetForm() {
        setUser(defaultUser);
    }
    
    const UI_LIST = [
        <section>
            <h3>Register New User</h3>
            <form style={style.formArea}>
                <div style={style.formitem} className="form-item">
                    <label htmlFor="name-input">Name:</label>
                    <input
                    type='text'
                    id="name-input"
                    className='form-input'
                    maxLength={50}
                    required
                    value={user.name}
                    onChange={handleInput}
                    />
                </div>
                <div style={style.formitem} className="form-item">
                    <label htmlFor="email-input">Email:</label>
                    <input
                    type='email'
                    id="email-input"
                    className='form-input'
                    maxLength={50}
                    required
                    value={user.email}
                    onChange={handleInput}
                    />
                </div>
                <div style={style.formitem} className="form-item">
                    <label htmlFor="password-input">Password:</label>
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
                    <p style={{'align-self': 'flex-end'}} className="btn btn-secondary" onClick={() => navigate("/password_hashing_demo/login")}>Login</p>
                    <p style={{'align-self': 'flex-end'}} className="btn" onClick={handleFormSubmit}>Submit</p>
                </div>
            </form>
            
        </section>,
        <section>
            <p>Loading...</p>
        </section>,
        <section>
            <p>User Registered Successfully !!!</p>
            <p style={{'align-self': 'flex-end'}} className="btn btn-secondary" onClick={() => navigate("/password_hashing_demo/login")}>Login</p>
        </section>,
        <section>
            <p>Error while registering !!! Please try again</p>
            <p style={{'align-self': 'flex-end'}} className="btn btn-secondary" onClick={() => navigate("/password_hashing_demo/register")}>Retry</p>
        </section>

    ]
    return (
        UI_LIST[state]
    );
}

export default RegisterUserForm;