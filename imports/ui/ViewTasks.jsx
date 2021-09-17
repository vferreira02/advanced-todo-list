import React , {useState} from 'react';
import { Meteor } from 'meteor/meteor';
import {Task} from './Task';
import {TasksCollection} from '../db/TasksCollection';
import {Button, Typography, makeStyles} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import {useTracker} from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import ResponsiveDrawer from './Drawer';

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

// CONSTANT CREATE TO DELETE THE TASK
const deleteTask = ({ _id }) => Meteor.call('tasks.remove',_id);



export const ViewTask = () => { 
    
    const user=useTracker(() => Meteor.user());
    
    const history = useHistory();
    
    const classes = useStyle();

    let i = 1;
    const q_tasks = TasksCollection.find().count()
    console.log(q_tasks);
    const pages_float = q_tasks/4;
    console.log(pages_float);
    const page = parseInt(pages_float);
    console.log(page+1);

    
    const {tasks, isLoading} = useTracker(()=> {
      const noDataAvailable = {tasks: []};
      if(!Meteor.user()) {
        return noDataAvailable;
      }
    
      const handler = Meteor.subscribe('tasks');
    
      if(!handler.ready()){
        return {...noDataAvailable, isLoading: true};
      }

     

      
      
      
      
      const limit = 4;
      const skip = (i-1)*limit;
      
      const tasks = TasksCollection.find({}, {limit:4,skip:skip}).fetch();
      
      return { tasks };
    
    });
  

    
   
    return (
        <div>
              
            <Typography
            variant="h3"
            component="h1"
            align="center"

            >Tasks
            
            </Typography>
            <Typography
            variant="h5"
            component="h2"
            align="center"
            >Click on the task to see more Details</Typography>
            {isLoading && <div className="loading">loading...</div>}
            { tasks.map(task => <Task
                key={ task._id }
                task={ task }
                onDeleteClick={deleteTask}
                />)

                }
          
              <Pagination count={page+1}/>

            <Button variant="outlined" 
            color="primary"
            className="button-space"
            onClick = {() => {history.push('/add-task')}}
            >
                
                Add Task
              
                
            </Button>

            <Button variant="contained" 
            color="default"
            className={classes.root}
            onClick = {() => {history.push('/')}}
            >
                
                Go Back
                
                
            </Button>

           
        </div>
    );

};



//First Code
/*import React from 'react';
import { Task } from './Task';
import {TasksCollection} from '../db/TasksCollection'
import {useTracker} from 'meteor/react-meteor-data';
import {useState} from 'react';
import { TaskForm } from './TaskForm';


export const ViewTasks = () =>{
    const handler = Meteor.subscribe('tasks');
    const tasks = TasksCollection.find().fetch();

    return (

        <>
        <ul className="tasks">

                {tasks.map(task => (
                <Task 
                key={task._id} 
                task={ task } 
                />
            ))}

        </ul>
        </>
    );


}
*/

/*
 <ul className="tasks">

                {tasks.map(task => (
                <Task 
                key={task._id} 
                task={ task } 
                onCheckboxClick={toggleChecked}
                onDeleteClick={deleteTask}
                />
            ))}

        </ul>
*/

 /************Teste 1 ***************************** */
   
    //const [hideCompleted, setHideCompleted] = useState(false); 
    
    //const hideCompletedFilter = { isChecked: { $ne : true } };
    
    //const userFilter = user ? {userId : user._id} : {};
    
    //const pendingOnlyFilter = {...hideCompletedFilter, ...userFilter};
    