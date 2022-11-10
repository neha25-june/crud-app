import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebaseConfig'
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from 'firebase/auth';

const Navbar = () => {
    const [user] = useAuthState(auth);
  return (
      <>
    <div className='fixed-top border' style={{ backgroundColor: "whitesmoke", height: "50px" }}>
        <nav className="navbar">
            <div>
                <img src='logo192.png' width={30} height={30} alt="logo" className='ms-5' />
            </div>
            <Link className='nav-link' to="/">Home</Link>
            <div>
                {user && (
                    <>
                    <span className='pe-4'>
                        <b>Signed In as {user.displayName || user.email} </b>
                    </span>
                    <button className='btn btn-primary btn-sm me-3' onClick={() => {signOut(auth)}}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    </div>
    </>
  )
}

export default Navbar