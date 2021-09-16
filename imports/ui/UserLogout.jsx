import { Meteor } from 'meteor/meteor';
import React, {Fragment} from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { useHistory } from 'react-router';
import { TaskForm } from './TaskForm';


export const UserLogout = () => {


    const history = useHistory();

    const user=useTracker(() => Meteor.user());

    const logout = () => Meteor.logout();

  return (
          <div className="main">
            {user ? (
              <Fragment>
                  <div className="user" onClick={logout}>
                    {user.username} 🚪
                  </div>
                      </Fragment>
            ): (
                <TaskForm/>
              )}
          </div>
      );
};
