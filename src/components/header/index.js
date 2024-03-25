import { Link,Outlet } from "react-router-dom";
export const Header = () => {
    return (
        <div>
            <nav>
                <Link to="/home">Home</Link>
                <Link to="/user" className='ms-2'>User</Link>
                <Link to="/login" className='ms-2'>Login</Link>
                <Link to="/dashboard" className='ms-2'>Dashboard</Link>
                <Link to="/userList" className='ms-2'>User List</Link>
                <Link to="/card" className='ms-2'>Card</Link>
            </nav>
            <h1>Header</h1>
            <Outlet/>
        </div>


    )
}