import './Profile.css';
import Navbar from '../Navbar/Navbar';
import Plans from '../Plans/Plans';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { auth } from '../../firebase';

const Profile = () => {
    const user = useSelector(selectUser);
    
    return (
        <div className="profile">
            <Navbar />
            <div className='profile__body'>
                <h1>Edit Profile</h1>
                <div className="profile__info">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Netflix Icon" />
                    <div className="profile__details">
                        <h2>{user.email}</h2>
                        <div className="profile__plans">
                            <h3>Plans</h3>
                            <Plans />
                            <p>Renewal Date</p>
                            <button onClick={() => auth.signOut()} className="profile__signOut">Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile