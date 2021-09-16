import { Meteor } from 'meteor/meteor';
import { Accounts} from 'meteor/accounts-base';
import { TasksCollection } from '/imports/db/TasksCollection';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';


const insertTask = (taskText, user) => 
TasksCollection.insert({
  text:taskText,
  userId: user._id,
  createdAt : new Date()
});


const SEED_USERNAME = '123456789';
const SEED_PASSWORD = '123456789';

Meteor.startup(() => {
  if(!Accounts.findUserByUsername(SEED_USERNAME)){
    Accounts.createUser({
      username:SEED_USERNAME,
      password: SEED_PASSWORD,
        profile : {
            name: null,
            email: null,
            birthday:null,
            sex:null,
            company:null,
            picture:null
}
    });
  }
  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TasksCollection.find().count() === 0){
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(taskText => insertTask(taskText,user));
  }
});

