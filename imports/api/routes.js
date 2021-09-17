import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

  import { render } from 'react-dom';
  import {App} from '../ui/App';
  import { ViewTask } from '../ui/ViewTasks';
  import { EditForm } from '../ui/EditForm';
  import { TaskForm } from '../ui/TaskForm';
  import { Details } from '../ui/Details';
  import { LoginForm } from '../ui/LoginForm';
  import ResponsiveDrawer  from '../ui/Drawer';
  import { RegisterUser} from '../ui/RegisterUser';
  import { UserProfile } from '../ui/UserProfile';
import SuperDrawer from '../ui/SuperDrawer';



/*
const ProtectedRoute = () =>{

  const islogged = Meteor.userId() !==null;
  return islogged ?
  (<Component {...props}/>):
  (<Redirect to={{pathname:'/login'}, state: {from: props.location}}/>);
  
}

*/
Meteor.startup(() => {
    render(
    <Router>
      <Switch>
        <Route path="/view-task" exact component={ViewTask}/>
        <Route path="/edit-task/:id" exact component={EditForm}/>
        <Route path="/details/:id" exact component={Details}/>
        <Route path="/add-task" exact component={TaskForm}/>
        <Route path="/login-form" exact component={LoginForm}/>
        <Route path="/register" exact component={RegisterUser}/>
        <Route path="/user-profile" exact component={UserProfile}/>
        <Route path="/" exact component={App}/>


        <Route component={() =><h1>Not Found!</h1>}/>
        </Switch>
    </Router>,
    document.getElementById('react-target')
    );
  });
  


