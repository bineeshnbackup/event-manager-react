
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { auth } from '../../firebase';
import Card from '../UI/Card';
import './Login.css';

function Login(){

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMessage, setError] = useState('');
	const [hasAccount, setHasAccount] = useState(true);
	const [skipLogin, setSkipLogin] = useState(false);
	const navigate = useNavigate();

    const signIn = async (e) => {
		e.preventDefault();
		setError('');
		if(email && password){
			try {
				await signInWithEmailAndPassword(auth, email, password);
					clearData();
					navigate('/home');
			} catch (error) {
				setError(error.message);
			}
		}else{
			setError('Please Enter All Fields...!');
		}
	};

	const signUp = async (e) => {
		e.preventDefault();
		setError('');
		if(email && password &&confirmPassword){
			if (password === confirmPassword) {
			try {
				await createUserWithEmailAndPassword(auth, email, password);
					setHasAccount(true);
					signOut(auth);
					clearData();
			} catch (error) {
				setError(error.message);
			}
			} else {
				setError('The password confirmation does not match');
			}
		}else{
			setError('Please Enter All Fields...!');
		}
	};

    const skipLoginHandler = () => {
		setSkipLogin(true);
		navigate('/home');
	};

    const clearData = () => {
		setEmail('');
		setPassword('');
		setConfirmPassword('');
	};



    return(
        <div className='login offset-md-2 col-md-8'>
            <Card className='login__card h-100'>
                <div className='text-center'>
					{hasAccount && <h4 className='mt-1 mb-5 pb-1'>Sign In</h4>}
                   	{!hasAccount && <h4 className='mt-1 mb-5 pb-1'>Sign Up</h4>}
                </div>
                <form className='card__login__form'>
                    <div className='row error'>
                        {errorMessage && <div className='alert alert-danger alert-dismissible fade show'>{errorMessage}</div>}
                    </div>
                    <div className='form-outline mb-4'>
                        <input  type='email' id='signUpemail' className='form-control' placeholder='Email address' value={email}
                        onChange={(e)=>{
                          setEmail(e.target.value);
                        }}/>
                    </div>
                    <div className='form-outline mb-4'>
                        <input  type='password' id='signUppassword' className='form-control'  placeholder='Password'value={password}
                        onChange={(e)=>{
                          setPassword(e.target.value);
                        }}/>
                    </div>
                    {!hasAccount && <div className='form-outline mb-4'>
                        <input  type='password' id='confirmPassword' className='form-control'  placeholder='Confirm Password' value={confirmPassword}
                        onChange={(e)=>{
                          setConfirmPassword(e.target.value);
                        }}/>
                    </div>}
					{ hasAccount ?(
						<>
							<div className='text-center pt-1 mb-5 pb-1'>
								<button className='btn btn-block login__card__button mb-1' type='button' onClick={(e)=>signIn(e)}>Log in</button>
							</div>
							<div className='d-flex align-items-center justify-content-center pb-4'>
								<p className='mb-0 me-2'>Don't have an account?
								<span onClick={()=>setHasAccount(false)}>SignUp</span>
                                </p>
							</div>
						</>
					):(
						<>
							<div className='text-center pt-1 mb-5 pb-1'>
								<button className='btn btn-primary btn-block login__card__button mb-1' type='button' onClick={(e)=>signUp(e)}>Sign Up</button>
							</div>
							<div className='d-flex align-items-center justify-content-center pb-4'>
								<p className='mb-0 me-2'>Don you have an account?
                                    <span onClick={()=>setHasAccount(true)}>Sign In</span>
                                </p>
							</div>
						</>
					)}
                </form>
				<div className='text-center pt-1 mb-5 pb-1'>
					<button className='btn btn-outline-danger' type='button' onClick={()=>skipLoginHandler()}>Skip Login</button>
				</div>
            </Card>
        </div>
    )
}

export default Login;