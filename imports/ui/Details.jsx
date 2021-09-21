import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router';
import { TasksCollection } from '../db/TasksCollection';
import {useTracker} from 'meteor/react-meteor-data';
import { Button, FormControl,  Select} from '@material-ui/core';





export const Details = () => {

    const {id} = useParams();

    const history = useHistory();

    
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

      useEffect(()=>{
        setStatus(task.status);
      },[])
   
      const handleChange = (e) => {
        setValue(e.target.value);
        
        console.log(value);

        Meteor.call('tasks.status', status,task._id,(e, r) =>{console.log(e, r)});

      };

    return (
        <>

        
            <fieldset>
                <legend>Name:  </legend>
           <p>{task.text}</p> 
            </fieldset>

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

            <FormControl variant="outlined">
                     <Select
                        native
                        value={value}
                        onChange={handleChange}
                                >
                                <option aria-label="None" value=""/>
                                <option value="Registered">Registered</option>
                                <option value="In Development">In Development</option>
                                <option value="Concluded">Concluded</option>
                    </Select>
            </FormControl>



            </fieldset>

            <fieldset>
                <legend>Personal:  </legend>
            <p>{result}</p>
            </fieldset>

            

            <Button 
            onClick = {() => {history.push("/view-task")}}
            > 
               
                Back
                
            </Button>

            <Button
            onClick = {() => history.push(`/edit-task/${task._id}`)}
            >
               Edit
                
            </Button>


        </>
    );
};