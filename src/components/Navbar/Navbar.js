import { useState, useEffect } from "react";
import "./Navbar.css";
import { useHistory } from "react-router-dom";

const Navbar = () => {
    const [show, handleShow] = useState(false);
    const history = useHistory();

    const transitionNavbar = () => {
        if (window.scrollY > 100) {
            handleShow(true)
        } else {
            handleShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavbar)
        return () => window.removeEventListener("scroll", transitionNavbar);
    }, []);
       
    return (
        <div className={`navbar ${show && "navbar__black"}`}> 
            <div className="navbar__contents">
                <img 
                    onClick={() => history.push('/')}
                    className="navbar__logo" 
                    src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" 
                    alt="Netflix Logo"
                />
                <img 
                    onClick={() => history.push('/profile')}
                    className="navbar__avatar" 
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                    alt ="Netflix Avatar"
                />
            </div>
        </div>
    )
}

export default Navbar