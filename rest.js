Books = new Mongo.Collection("books");

if (Meteor.isClient) {
  console.log("running client");
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function() {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function() {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
    console.log("Hello i am starting");
  });

  // Global API configuration
  var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
  });

  // Generates: GET, POST on /api/items and GET, PUT, DELETE on
  // /api/items/:id for the Items collection
  Api.addCollection(Books);
  Api.addCollection(Meteor.users);

  console.log("Done adding collections");

  Api.addRoute('countme', {authRequired: true}, {
    get: function () {
      return Books.find().count();
    }
  });
}
