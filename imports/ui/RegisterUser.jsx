import {Meteor} from 'meteor/meteor';
import { Accounts} from 'meteor/accounts-base';
import React, {useState} from 'react';
import { useHistory } from 'react-router';
import { TextField, Typography, Button, makeStyles } from '@material-ui/core';

const useStyle  = makeStyles( theme => ({
  
    root:{

    '& .MuiFormControl-root' : {
     width: '90%',

      margin: theme.spacing(2)

    },

    '& .MuiButtonBase-root' : {
      margin : theme.spacing(2),
      background: '#e4f3ff',
    },

    '&.MuiTypography-root ' :{

    }

  }

}));


export const RegisterUser = () =>{

    const classes = useStyle();
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
        <form onSubmit={handleSubmit} className={classes.root}>
          
            <Typography 
            variant="h6"
            component="h1" 
            align="center"> 
            Register New User
            </Typography>
            <br/>
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
            <br/>
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
            <br/>
            <div>
            <Button type="submit">Save</Button>
            <Button
            onClick={()=>history.push('/login-form')}
            >Go Back</Button>
            </div>
            </form>
    );
    }
