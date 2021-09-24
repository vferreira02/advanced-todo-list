import {Meteor} from 'meteor/meteor';
import React, {useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {useTracker} from 'meteor/react-meteor-data';
import { Button, Checkbox, FormGroup, FormControlLabel, TextField, Grid, List, makeStyles} from '@material-ui/core';
import PersistentDrawer from './PersistentDrawer';

const useStyle  = makeStyles( theme => ({
  
    root:{

    '& .MuiFormControl-root' : {
     width: '90%',

      margin: theme.spacing(2)

    },

    '& .MuiButtonBase-root' : {
      margin : theme.spacing(2),
     
    }

  }

}));





export const TaskForm = () => {

    const classes = useStyle();

    const user=useTracker(() => Meteor.user());


    //const username_db = user.username;
    

    const history = useHistory();
    
    const [init, setInit] = useState(false);
    const [text, setText] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState("Registered");
    const [personal, setPersonal]=useState(false);
    const [username, setUsername] = useState('');
    //const username = username_db;
    
    useEffect(()=>{
        if(user && !init){
        setUsername(user.username);
        }
    },[user])
    
    const handleSubmit = e => {
        e.preventDefault();
    

    if(!text) return;
    
    Meteor.call('tasks.insert',text,username,description,status,personal);

    history.push("/view-task")

    setText('');
    setDescription('No Description Registred');
    setPersonal('');
    
   

    };

    return (
        <>
        <PersistentDrawer/>
        <br/> <br/> <br/> <br/>  <br/>  <br/>
        <form className={classes.root} onSubmit={handleSubmit}>
            <Grid>
                <List>
                    <TextField 
                    type="text" 
                    placeholder="Type to add new tasks"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    />
                    <TextField
                    type="textarea"
                    placeholder="Type here the description"
                    value={description}
                    onChange={e=>setDescription(e.target.value)}           
                    />

                    <FormGroup row>
                        <FormControlLabel
                                control={
                        
                                    <Checkbox
                                            defaultChecked={false}
                                            name="personal"
                                            onClick={e => setPersonal(true)}
                                    />
                                    }
                            label="Personal"
                    />
                    </FormGroup>
            
           
        <Button type="submit"
        color="primary"
        variant="contained"
        >Add Task</Button>
        <Button
          onClick={ () => history.push("/view-task") }
          >
          
          Back

          </Button>
        </List>
        </Grid>
        </form>
        </>
    );
};

