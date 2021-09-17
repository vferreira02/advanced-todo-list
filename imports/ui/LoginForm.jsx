import { TextField, Typography, Button } from '@material-ui/core';
import { Meteor } from 'meteor/meteor';
import React, {useState} from 'react';
import { useHistory } from 'react-router';


export const LoginForm = () => {
    
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = e =>{
        e.preventDefault();

        Meteor.loginWithPassword(username, password)

        history.push("/");
    };


   
    return (
        <>
        <form onSubmit={submit} className="login-form">
            <Typography 
            variant="h6"
            component="h1" > 
            Welcome to you TO DO List 
            </Typography>
            <div>
            <TextField
            type="text" 
            variant="outlined"
            placeholder="Username" 
            name="username"
            required
            onChange={e => setUsername(e.target.value)}
            />
            </div>

            <div>
           
            <TextField 
            type="password"
            variant="outlined"
            placeholder="Password"
            name="password"
            required
            onChange={e => setPassword(e.target.value)}
            />
            </div>

            <div>
            <Button type="submit">Log In</Button>
            </div>
            <br/>
            <Button
            color="primary"
            variant="outlined"
            onClick={()=>history.push('/register')}
            > Register New User</Button>
           
        </form>
        
        </>
    );
};