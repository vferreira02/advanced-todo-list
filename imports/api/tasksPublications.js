import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';


Meteor.publish('tasks-count', function publishTasks() {

    const personalTasks = {
        $nor: [{ $and: [{ userId: { $ne: this.userId } }, { personal: { $eq: true } }] }]
    }

    return TasksCollection.find(personalTasks).count().fetch();

});

Meteor.publish('tasks', function publishTasks() {

    const personalTasks = {
        $nor: [{ $and: [{ userId: { $ne: this.userId } }, { personal: { $eq: true } }] }]
    }

    return TasksCollection.find(personalTasks)

});

Meteor.publish('tasks-todo', function publishTasks(page, queryString = "", concludedTasks=false){

    let limit = 4;
    let skip = (page - 1) * limit;
    console.log(concludedTasks)
 
    if(concludedTasks == true){
        console.log('Works');
        return TasksCollection.find({
        $nor: [{ $and: [{ userId: { $ne: this.userId } }, { personal: { $eq: true } }] }],
        $and: [{status : {$ne : "Concluded" }}]
    }, 
    {skip: skip, limit : limit})
}

    if (page && queryString) {
        return TasksCollection.find({
            $nor: [{ $and: [{ userId: { $ne: this.userId } }, { personal: { $eq: true } }] }],
            $and: [{ text: queryString }]

        },
        { skip: skip, limit: limit }

       
        );
    }

    

    if (page) {
        return TasksCollection.find({
            $nor: [{ $and: [{ userId: { $ne: this.userId } }, { personal: { $eq: true } }] }],

        },
            { skip: skip, limit: limit }
        );
    }



    
    }
    
    
);
/*
    const personalTasks = {
        $nor: [ {$and:[{userId: {$ne: this.userId}},{personal:{$eq:true}}]}]
    }
    const pagination = {
        $nor: [{$and:[{limit:6,skip:((page-1)*4)}]}]
    }


   // const q_tasks = TasksCollection.find().count()
    //console.log(q_tasks);

        //return TasksCollection.find(personalTasks,pagination)

        return TasksCollection.find(personalTasks,{ skip:skip})

        /*
       1, 4, 0
       2, 4, 4
       3, 4, 8



    });

/*
Meteor.publish('pagination', function pagination(page){
    console.log(page);
    return TasksCollection.find({},{limit:3, skip:(page-1)*4})

})



Meteor.publish('query', function queryString(){

    return TasksCollection.find({
        queryString : {
            $regex : queryString

        }


    });
});




//return TasksCollection.find(/*{userId: this.userId});

if(checked){
        checked = new ReactiveVar(true);
        console.log(checked);
            return TasksCollection.find({
                $nor: [{ $and: [{ userId: { $ne: this.userId } }, { personal: { $eq: true } }] }],
                $and: [{status:"Concluded"}]
            })
        } else{
            return TasksCollection.find({
                $nor: [{ $and: [{ userId: { $ne: this.userId } }, { personal: { $eq: true } }] }],
                $and: [{status:"Registered"},{status:"In Development"}]
            })
        }


*/