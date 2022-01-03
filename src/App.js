import { Routes, Route } from 'react-router-dom';
import Nav from "./Components/UI/Nav";
import Login from './Components/Pages/Login';
import Home from './Components/Pages/Home';
import './App.css';


function App() {
	return (
		<div className='App'>
			<Nav/>
			<Routes>
				<Route path='/home' element={<Home/>}/>
				<Route path='/' element={<Login/>}/>
			</Routes>
		</div>
	);
}

export default App;
