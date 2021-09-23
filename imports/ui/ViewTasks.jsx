import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Task } from './Task';
import { TasksCollection } from '../db/TasksCollection';
import { Button, Typography, makeStyles, FormControlLabel, Checkbox, TextField } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useTracker } from 'meteor/react-meteor-data';
import { useHistory } from 'react-router';
import PersistentDrawer from './PersistentDrawer';
import { ReactiveVar } from 'meteor/reactive-var';
import { use } from 'chai';

const useStyle = makeStyles(theme => ({

  root: {

    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
      
    },

    '& .MuiInputBase-root':{
      display:'flex',
      
    }

  }

}));

// CONSTANT CREATE TO DELETE THE TASK
const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);
const total = () => Meteor.call('tasks-count').count();


export const ViewTask = () => {

  const user = useTracker(() => Meteor.user());

  const history = useHistory();

  const classes = useStyle();

  const [queryString, setQueryString] = useState('');
  //console.log(queryString);




  const [concludedTasks, setConcludedTasks] = useState(true);
  console.log(concludedTasks);

  const [page, setPage] = useState(1);
  

  const { tasks, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [] };
    if (!Meteor.user()) {
      return noDataAvailable;
    }

    const handler = Meteor.subscribe('tasks-todo', page, queryString,concludedTasks);

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }


    const tasks = TasksCollection.find().fetch();
    //const tasks = TasksCollection.find({sort: {createdAt : -1}});
    
    return { tasks };

  });
  //console.log(tasks)
  //Meteor.subscribe('pagination', page);


  return (
    <div className={classes.root}>
      <PersistentDrawer />


      <br /><br /><br /><br /><br /><br />
      <Typography
        spacing="4"
        variant="h5"
        component="h2"
        align="center"
      >Click on the task to see more Details</Typography>
      
      <FormControlLabel
        control={<Checkbox 
          //checked={state.checkedA} 
          onChange={()=>{setConcludedTasks(!concludedTasks)}}
          name="checkedA" />}
        label="Show all tasks,  included Concluded tasks "
      />
      
      <br />
      
      <TextField
        name="queryString"
        type="text"
        label="Search"
        variant="outlined"
        onChange={e => setQueryString(e.target.value)}

      />
      {isLoading && <div className="loading">loading...</div>}

      {tasks.map(task => <Task
        key={task._id}
        task={task}
        onDeleteClick={deleteTask}
      />)

      }
      <br />
      <Pagination count={total}
        onChange={(e, value) => setPage(value)}
      />
      <br />

      <Button variant="contained"
      color="primary"
      
        onClick={() => { history.push('/add-task') }}
      >

        Add Task


      </Button>

      <Button variant="contained"
       
        
        onClick={() => { history.push('/') }}
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
