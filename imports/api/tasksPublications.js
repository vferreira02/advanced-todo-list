import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';


Meteor.publish('tasks', function publishTasks(){

    const personalTasks = {
        $nor: [ {$and:[{userId: {$ne: this.userId}},{personal:{$eq:true}}]}]
    }


        return TasksCollection.find(personalTasks)
            
    });

    

    


//return TasksCollection.find(/*{userId: this.userId}*/);