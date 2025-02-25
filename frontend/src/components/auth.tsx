import React, {ChangeEvent, FormEvent, useState} from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import '../assets/css/auth.css'


function Auth(){

    const navigate = useNavigate()

    const [authData, setAuthData] = useState({username: "", password: ""});

    function handleInputChange(event:ChangeEvent<HTMLInputElement|HTMLSelectElement>) {
        const {name, value} = event.target;

        switch (name){
            case 'username':
                setAuthData((prevAuthData) => ({...prevAuthData, [name]: value}))
                console.log(authData['username'])
                break;
            case 'password':
                setAuthData((prevAuthData) => ({...prevAuthData, [name]: value}))
                console.log(authData['password'])
                break;
        }
    }


    // Need to use Axios to POST to api that is hosted by python server that
    // will check is combination of username and password is within the database
    // then return the log in page if it is there or display message saying
    // wrong username/password
    async function authenticate(event: FormEvent){
        event.preventDefault()
        console.log("authenticate is called")
        
        try{
            const response = await axios.post('http://127.0.0.1:5000/login', {
                username: authData.username,
                password: authData.password,
            });

            console.log('Response: ', response.data);

            if (response.data.success) {
                console.log('Login successful!');
                navigate('/search')
              } else {
                alert('Invalid credentials');
              }
            } catch (error) {
              alert(error + 'An error occurred while logging in');
            }
        }
    

    return (
        <div className="auth-page">
            <section className="background">

                <section className="title">
                    <h1>MentorList ai</h1>
                </section>

                <section className="auth-popup">
                    <form>
                        <label className="auth-subtitle">Username</label>
                        <input type="text" className="auth-input" name='username' value={authData.username} onChange={handleInputChange}/>
                        <label className="auth-subtitle">Password</label>
                        <input type="password" className="auth-input" name='password' value={authData.password} onChange={handleInputChange}></input>
                        <input type="submit" className="submit" onClick={authenticate}></input>
                    </form>
                </section>
            </section>
        </div>

    )
};

export default Auth;