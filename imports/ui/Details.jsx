import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router';
import { TasksCollection } from '../db/TasksCollection';
import {useTracker} from 'meteor/react-meteor-data';
import { Button, FormControl,  Select, TextField, Typography} from '@material-ui/core';
import PersistentDrawer from './PersistentDrawer';




export const Details = () => {



    const {id} = useParams();

    const history = useHistory();

    let  disable_concluded = true;
    console.log(disable_concluded);

    const {task, isLoading} = useTracker(()=> {
        const noDataAvailable = {task: {}};
        if(!Meteor.user()) {
          return noDataAvailable;
        }
      
        const handler = Meteor.subscribe('tasks');
      
        if(!handler.ready()){
          return {...noDataAvailable, isLoading: true};
        }
      
        const task = TasksCollection.findOne({_id:id});
      
       
      
        return { task };
      
      });
    
      const result  = task.personal ? "yes " : " no";

     


      const [status, setStatus] = useState('');
      const [value, setValue] = useState('');
     
      console.log(value);

      if(task.status === "In Development"){
        disable_concluded = false;
        console.log(disable_concluded);
      }

      const submit = e =>{
        e.preventDefault();
        setStatus(value);

        

        console.log(status);
        Meteor.call('tasks.status', status,task._id,(e, r) =>{console.log(e, r)});
      }

    return (
        <>

        <PersistentDrawer/>
        <br/><br/><br/><br/><br/><br/>
        
            <Typography>
              <Typography>{task.text}</Typography>
            </Typography>
                
           
          

            <fieldset>
                <legend>User:  </legend>
            <p>{task.username}</p>
            </fieldset>

            <fieldset>
                <legend>Details:  </legend>
            <p>{task.description}</p>
            </fieldset>

            <fieldset>
                <legend>Status:  </legend>
            <p>{task.status}</p>
            </fieldset>

            <form onSubmit={submit}>
            <fieldset>
              <legend>Change Status</legend>
            <FormControl variant="outlined">
                     
                     <Select
                        native
                        value={value}
                        onChange={(e) =>{
                          const state = e.target.value;
                          setValue(state);

                        }}
                                >
                                <option aria-label="None" value=""/>
                                <option value="Registered">Registered</option>
                                <option value="In Development">In Development</option>
                                <option value="Concluded"
                                disabled={disable_concluded}
                                id="concluded"
                                >Concluded</option>
                    </Select>
                    <br/>
                    <Typography>Click 2 times to confirm! </Typography>
                    <Button
            type="submit"
            variant="contained"
            color="primary"
            >
              Change
            </Button>
            </FormControl>
            
            </fieldset>

            </form>
            <fieldset>
                <legend>Personal:  </legend>
            <p>{result}</p>
            </fieldset>

            

            <Button 
            style={{margin: 10,}}
            variant="contained"
            color = "primary"
            onClick = {() => {history.push("/view-task")}}
            > 
               
                Back
                
            </Button>

            <Button
            variant="contained"
            color = "secondary"
            onClick = {() => history.push(`/edit-task/${task._id}`)}
            >
               Edit
                
            </Button>


        </>
    );
};