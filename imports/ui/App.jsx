import { Meteor } from 'meteor/meteor';
import React, {Fragment, useState} from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { LoginForm } from './LoginForm';
import SuperDrawer from './SuperDrawer';

//Verificar se a tarefa foi marcada
const toggleChecked = ({_id, isChecked}) => 
  Meteor.call('tasks.setIsChecked',_id,!isChecked);


// Cria uma constante (função anônima) para deletar a Task
const deleteTask = ({_id}) => Meteor.call('tasks.remove',_id);



export const App = () => {

const user=useTracker(() => Meteor.user());

const [hideCompleted, setHideCompleted] = useState(false); 

const hideCompletedFilter = { isChecked: { $ne : true } };

const userFilter = user ? {userId : user._id} : {};

const pendingOnlyFilter = {...hideCompletedFilter, ...userFilter};

const {tasks, pendingTasksCount, isLoading} = useTracker(()=> {
  const noDataAvailable = {tasks: [], pendingTasksCount: 0};
  if(!Meteor.user()) {
    return noDataAvailable;
  }

  const handler = Meteor.subscribe('tasks');

  if(!handler.ready()){
    return {...noDataAvailable, isLoading: true};
  }

  const tasks = TasksCollection.find(hideCompleted ? pendingOnlyFilter : userFilter,
    {
      sort : {createdAt: -1},
    }
  ).fetch();

  const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

  return { tasks, pendingTasksCount};

});

const pendingTasksTitle = `${pendingTasksCount ? `(${pendingTasksCount})`: ''} `;

  const logout = () => Meteor.logout();


  const tasks_total = TasksCollection.find().count();

  const concluded  = TasksCollection.find({status:"Concluded"}).count();
  const inDevelopment = TasksCollection.find({status:"In Development"}).count();
  
  const myTasks = TasksCollection.find(({personal:true})).count();

  console.log(myTasks);

  return (
    <>
          <div className="main">
            {user ? (
              <Fragment>
                <br/>
                  <SuperDrawer/>
                      </Fragment>
            ): (
              <LoginForm/>
              )}
          </div>
       </>
      );
};


/*                      <ul className="tasks">
                            {tasks.map(task => (
                            <Task 
                            key={task._id} 
                            task={ task } 
                            onCheckboxClick={toggleChecked}
                            onDeleteClick={deleteTask}
                            />
                          ))}
                      </ul>*/




/*

=================================== SHOW AND HIDE ==========================================

                <div className="filter">
                      <button onClick={()=>setHideCompleted(!hideCompleted)}>
                        {hideCompleted ? 'Show All':'Hide Completed'}
                      </button>
                </div>

                  {isLoading && <div className="loading">loading...</div>}
                    

*/