import {Meteor} from 'meteor/meteor';
import { Accounts} from 'meteor/accounts-base';
import React, {useState} from 'react';
import { useHistory } from 'react-router';




export const RegisterUser = () =>{
    
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
   
    const handleSubmit = e => {
        Meteor.startup(() => {
  
        e.preventDefault();
            Accounts.createUser({
                username:username,
                password:password,


                profile : {
                        name: null,
                        email: null,
                        birthday:null,
                        sex:null,
                        company:null,
                        picture:null
                }

                

            
            });

           
        }

        
    )
    history.push('/');
        };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <div>
            <label htmlFor="username">Username</label>
            <input
            type="text" 
            placeholder="Username" 
            name="username"
            required
            onChange={e => setUsername(e.target.value)}
            />
            </div>

            <div>
            <label htmlFor="password">Password</label>

            <input 
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={e => setPassword(e.target.value)}
            />
            </div>

            <div>
            <button type="submit">Save</button>
            </div>
            </form>
    );
    }
