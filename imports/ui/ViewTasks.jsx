import React , {useState} from 'react';
import { Meteor } from 'meteor/meteor';
import {Task} from './Task';
import {TasksCollection} from '../db/TasksCollection';
import {Button} from '@material-ui/core';
import {useTracker} from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import ResponsiveDrawer from './Drawer';



// CONSTANT CREATE TO DELETE THE TASK
const deleteTask = ({ _id }) => Meteor.call('tasks.remove',_id);



export const ViewTask = () => { 
    
    const user=useTracker(() => Meteor.user());
    
    const history = useHistory();
    
   
    
    const {tasks, isLoading} = useTracker(()=> {
      const noDataAvailable = {tasks: []};
      if(!Meteor.user()) {
        return noDataAvailable;
      }
    
      const handler = Meteor.subscribe('tasks');
    
      if(!handler.ready()){
        return {...noDataAvailable, isLoading: true};
      }
    
      const tasks = TasksCollection.find(/*{},{limit:4, skip:0}*/).fetch();

    
     
    
      return { tasks };
    
    });
    
   
    return (
        <div>
              
            <h1>Tasks</h1>
            <h2>Click on the task to see more Details</h2>
            {isLoading && <div className="loading">loading...</div>}
            { tasks.map(task => <Task
                key={ task._id }
                task={ task }
                onDeleteClick={deleteTask}
                />)
                }
            <Button variant="outlined" 
            color="primary"
            onClick = {() => {history.push('/add-task')}}
            >
                
                Add Task
              
                
            </Button>

            <Button variant="contained" 
            color="default"
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
    