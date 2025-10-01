import { Outlet } from "react-router-dom";

function Rbac() {
    return (
        <main>
            <h1>Role Based Access Control Demo</h1>
            <Outlet />
        </main>
    );
}

export default Rbac;