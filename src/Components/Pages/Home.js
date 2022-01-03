import { useState, useEffect} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import EventForm from './EventForm';
import EventList from './EventList';

const DUMMY_EVENT = [
    {
        id: 1,
        title: 'New Year Party',
        description: 'Vivamus ridiculus molestie, auctor semper. Adipiscing, phasellus nibh cras consectetuer praesent. Odio imperdiet ipsum senectus tellus. Venenatis, ante etiam. In.',
        location: 'Goa',
        startDate: '2022-12-31',
        endDate: '2023-01-01',
        image:'https://media.istockphoto.com/photos/dancing-in-club-picture-id504632572?k=6&m=504632572&s=170667a&w=0&h=9LwtxZcFSmODZwvdUami0bX0mjdxq8gyCHZGH-Fo_ZQ=',
        category:'Party',
        published:'Yes',
        paid:'Yes'
    },
	{
        id: 2,
        title: 'Birth Day Party',
        description: 'Vivamus ridiculus molestie, auctor semper. Adipiscing, phasellus nibh cras consectetuer praesent. Odio imperdiet ipsum senectus tellus. Venenatis, ante etiam. In.',
        location: 'Home',
        startDate: '2022-06-08',
        endDate: '2022-06-08',
        image:'https://th.bing.com/th/id/R.a4268b4e19ddc84c44d1a8e4990fbdd2?rik=JhDcA%2bhMrUYNqw&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fd%2fb%2fa%2f1261534-birthday-celebration-wallpaper-1920x1080-pc.jpg&ehk=QHjN4Y24jjax%2bh208v%2bn18eKgeR2vGb33TLTmqPuU7o%3d&risl=&pid=ImgRaw&r=0',
        category:'Birthday',
        published:'Yes',
        paid:'No'
    },
    {
        id: 3,
        title: 'New Year Party',
        description: 'Vivamus ridiculus molestie, auctor semper. Adipiscing, phasellus nibh cras consectetuer praesent. Odio imperdiet ipsum senectus tellus. Venenatis, ante etiam. In.',
        location: 'Kochi',
        startDate: '2021-12-31',
        endDate: '2022-01-01',
        image:'https://media.istockphoto.com/photos/dancing-in-club-picture-id504632572?k=6&m=504632572&s=170667a&w=0&h=9LwtxZcFSmODZwvdUami0bX0mjdxq8gyCHZGH-Fo_ZQ=',
        category:'Party',
        published:'Yes',
        paid:'Yes'
    }
];

function Home(props){
    
	const [user, setUser] = useState('');
    const [events,setEvents] = useState(DUMMY_EVENT);
    const navigate = useNavigate();

    const newEvent = (event)=> {
        setEvents((prevData)=> {
          	return[event, ...prevData];
        })
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
	let sortedEvents = events.sort((a, b) => new Date(...a.startDate.split('-').join('')) - new Date(...b.startDate.split('-').join('')));
    
    useEffect(() => {
        authListner();
    }, []);
	return(
		<>
			{user?(<EventForm submitEvent={newEvent}/>):
            (<button type='button' className='btn btn-primary btn-block offsei-md-8'onClick={()=>(navigate('/'))}>Back To Login</button>)}
			<EventList events={sortedEvents}/>
		</>
    )
}

export default Home;