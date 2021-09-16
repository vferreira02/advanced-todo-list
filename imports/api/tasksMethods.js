import { check } from 'meteor/check';
import { TasksCollection} from '/imports/db/TasksCollection';

Meteor.methods({
    'tasks.insert'(text,username,description,status,personal){
        check(text, String);
        check(username, String);
        check(description, String);
        check(status, String);
        check(personal, Boolean);

    
    if(!this.userId){
        throw new Meteor.Error('Not authorized.');
    }
    TasksCollection.insert({
        text,
        username,
        description,
        status,
        personal,
        createdAt : new Date(),
        userId : this.userId,
    })
    },

    'tasks.update'(text, description, taskId){
        /*check(text, String);
        check(description, String);
        check(taskId, String);
        */
        console.log( typeof text, typeof description, typeof status, typeof taskId);
        console.log(text);


        if(!this.userId){
            throw new Meteor.Error('Not Authorized');
        }

        const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
        
        if (!task){
            throw new Meteor.Error('Access Denied.');
        }
            TasksCollection.update(taskId, {
                $set : {
                    text:text,
                    description: description,
                    createdAt : new Date(),
                    userId : this.userId,
                }
    })
    },
    /*
    'tasks.update'(text, description,status,personal, taskId){
        check(taskId, String);
        check(text, String);
        check(description, String);
       

        if(!this.userId){
            throw new Meteor.Error('Not Authorized');
        }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
        
    if (!task){
            throw new Meteor.Error('Access Denied.');
        }
        TasksCollection.update(taskId,
            {
            text,
            description,
            status,
            personal,
            createdAt : new Date(),
            userId : this.userId,
        });
    },
*/
    'tasks.remove'(taskId){
        check(taskId, String);

        if(!this.userId){
            throw new Meteor.Error('Not Authorized');
        }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
        
    if (!task){
            throw new Meteor.Error('Access Denied.');
        }
        TasksCollection.remove(taskId);
    },


    'tasks.setIsChecked'(taskId, isChecked){
        check(taskId, String);
        check(isChecked, Boolean);

        if(!this.userId){
            throw new Meteor.Error('Not authorized.');
        }

        const task = TasksCollection.findOne({_id: taskId, userId: this.userId});

        if(!task){
            throw new Meteor.Error('Access Denied.');
        }

    TasksCollection.update(taskId, {
        $set : {
            isChecked,
        }
    });     
    },
});