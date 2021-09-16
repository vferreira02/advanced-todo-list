import {Meteor} from 'meteor/meteor';
import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router';
import { TasksCollection } from '../db/TasksCollection';
import {useTracker} from 'meteor/react-meteor-data';
//IMPORTATIONS OF MATERIAL 

import { Button, Checkbox, FormGroup, FormControlLabel, TextField, List, Grid, makeStyles } from '@material-ui/core';

const useStyle  = makeStyles( theme => ({
  
    root:{

    '& .MuiFormControl-root' : {
     width: '90%',

      margin: theme.spacing(2)

    },

    '& .MuiButtonBase-root' : {
      margin : theme.spacing(2),
      background: '#e4f3ff',
    }

  }

}));

export const EditForm = () => {

    const history = useHistory();

    const user=useTracker(() => Meteor.user());

  /*****************************************************
   * 
   * RETURNING THE PARAMETERS OF A SELECT TASK 
   * 
   */
    const {id} = useParams();

    /***************************************************
     * 
     * CREATE A VERIFICATION OF A TASK
     * 
     ***************************************************/
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

      const classes = useStyle();

      const [text, setText] = useState('');
      const [description, setDescription] = useState('');
      const [init, setInit] = useState(false);
     /* const [status, setStatus] = useState(task.status);
      const [personal, setPersonal] = useState(task.personal);
      */

      useEffect(()=>{
        if(task._id && !init){
        setInit(true);
        setText(task.text);
        setDescription(task.description);
        }
      }, [task] );

    const handleSubmit = e => {

        e.preventDefault();
        
        
        
      
       // console(text, typeof text);

        Meteor.call('tasks.update', text, description,task._id,(e, r) =>{console.log(e, r)});
        
        console.log(text, description );
        
        history.push(`/details/${task._id}`);
    
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit} >
           <Grid>
            <List>
              
            <TextField


                    type="text"
                    label="Name"
                    variant="outlined"
                    value={text}
                    type="text" 
                    onChange={e => setText( e.target.value)}

            /> 
            

           
                <TextField

                    variant="outlined"
                    label="Description"
                    type="textarea" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
            /> 
          

            

        <Button

        type="submit">
          Save Alterations
          </Button>

          <Button
          onClick={ () => history.push(`/details/${task._id}`) }
          >
          
          Back

          </Button>

          
        </List>
        </Grid>
        </form>
       
    );
};

 /*===============================START HERE=================================
 const user=useTracker(() => Meteor.user());
    
   
    
    const {tasks} = useTracker(()=> {
     
     
      const handler = Meteor.subscribe('tasks');
    
    
      const tasks = TasksCollection.find().fetch();
    
     
    
      return { tasks };
      console.log(tasks);
    
    });

 /*===============================FINISH HERE=================================*/


    