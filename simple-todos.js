// simple-todos.js
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .new-task": function(e, t){
      var text = e.target.text.value;

      Tasks.insert({
        text: text,
        createdAt: new Date()
      });

      e.target.text.value = "";
      return false;
    }
  });

  Template.task.events({
    "click .toggle-checked": function(e, t){
        Tasks.update({_id:this._id}, {$set:{
          checked: !this.checked
        }});
    },
    "click .delete": function () {
      Tasks.remove({_id:this._id});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
