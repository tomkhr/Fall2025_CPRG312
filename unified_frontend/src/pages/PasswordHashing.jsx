import { Outlet } from "react-router-dom";
import HomeBtn from "../components/HomeBtn";
import LoginUser from "../components/passwordLab/LoginUser";
import RegisterUserForm from "../components/passwordLab/RegisterUserForm";

function PasswordHashing() {
    return (
        <main>
            <h1>Password Hashing Demo</h1>
            <Outlet/>
        </main>
    );
}

export default PasswordHashing;