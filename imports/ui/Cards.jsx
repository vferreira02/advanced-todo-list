import {Meteor} from 'meteor/meteor';
import React, {useState} from "react";
import { TasksCollection } from "../db/TasksCollection";
import { Card, CardActionArea, Grid, CardContent} from '@material-ui/core';
import {useTracker} from 'meteor/react-meteor-data';




function Cards(){
    const user=useTracker(() => Meteor.user());

    //const [hideCompleted, setHideCompleted] = useState(false); 

   // const hideCompletedFilter = { isChecked: { $ne : true } };
    
    const userFilter = user ? {userId : user._id} : {};
    
   // const pendingOnlyFilter = {...hideCompletedFilter, ...userFilter};
    
    const {tasks, /*pendingTasksCount ,*/ isLoading} = useTracker(()=> {
      const noDataAvailable = {tasks: []/*, pendingTasksCount: 0*/};
      if(!Meteor.user()) {
        return noDataAvailable;
      }
    
      const handler = Meteor.subscribe('tasks');
    
      if(!handler.ready()){
        return {...noDataAvailable, isLoading: true};
      }
    
      const tasks = TasksCollection.find(/*hideCompleted ? pendingOnlyFilter : userFilter,
        {
          sort : {createdAt: -1},
        }*/
      ).fetch();
    
     // const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();
    
      return { tasks/*, pendingTasksCount*/};
    
    });
    
   // const pendingTasksTitle = `${pendingTasksCount ? `(${pendingTasksCount})`: ''} `;


    const tasks_total = TasksCollection.find().count();

    const concluded  = TasksCollection.find({status:"Concluded"}).count();
    const inDevelopment = TasksCollection.find({status:"In Development"}).count();
    const personalTasks = TasksCollection.find({personal:true}).count();
  

  return (
      <>
       <Grid container 
                      spacing={5} 
                      justifyContent="center"
                      margin={2}
                      className="gridContainer"
                    >
                <Grid item xs={12} sm={6} md={3}>
                    <Card className="card">
                        <CardActionArea>                
                        <CardContent>
                        <h1>
                          {tasks_total} Registered Tasks
                          </h1>
                        
                        </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            
                <Grid item xs={12} sm={6} md={3}>
                    <Card className="card">
                        <CardActionArea>                
                        <CardContent>
                        <h1>
                          {concluded} Completed Tasks
                          </h1>
                        
                        </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card className="card">
                        <CardActionArea>                
                        <CardContent>
                        <h1>
                          {inDevelopment} In Development
                          </h1>
                        
                        </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card className="card">
                        <CardActionArea>                
                        <CardContent>
                        <h1>
                         {personalTasks} My Personal Tasks
                          </h1>
                        
                        </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

            
                <Grid item xs={12} sm={6} md={3}>
                    <Card className="card"> 
                        <CardActionArea href={"/view-task"}>                
                        <CardContent>
                        <h1>See all the Tasks</h1>
                        </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                </Grid>  
      </>
  );

}

export default Cards;