import {Meteor} from 'meteor/meteor';
import React, {useState } from 'react';
import { useHistory } from 'react-router';
import {useTracker} from 'meteor/react-meteor-data';
import { Button, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';


export const TaskForm = () => {

    const user=useTracker(() => Meteor.user());

    let username_db = user.username;
    

    const history = useHistory();
    
    const [text, setText] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState("Registered");
    const [personal, setPersonal]=useState(false);
 
    const username = username_db;
    
    
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
        <form className="task-form" onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder="Type to add new tasks"
            value={text}
            onChange={e => setText(e.target.value)}
            />
            <input
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
            
           
        <Button type="submit">Add Task</Button>
        </form>
    );
};

