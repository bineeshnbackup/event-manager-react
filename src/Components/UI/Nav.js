import {useState, useEffect} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import {signOut} from 'firebase/auth';
import './Nav.css'

function NavBar(){
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    const logOut = async () => {
		try {
			await signOut(auth);
				navigate('/');
		} catch (error) {
		}
	};
    const authListner = () => {
        onAuthStateChanged(auth, (currentuser) => {
            if (currentuser) {
                setUser(currentuser);
            } else {
                setUser(currentuser);
                setUser('');
            }
        });
    };
    
    useEffect(() => {
        authListner();
    }, []);

    return(
        <div className='nav mb-4'>
            <div className='nav__contents'> 
                <h4>Event Manager</h4>
                {user&&<button type='button' className='btn btn-block' onClick={()=>logOut()}>LogOut</button>}
            </div>
        </div>
    )
}

export default NavBar;