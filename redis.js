var redisCollection = new Meteor.RedisCollection("redis");

if (Meteor.isClient) {
  Template.redisTest.helpers({
    value: function() {
      console.log("value is: " + redisCollection.get("mykey"));
      return redisCollection.get("mykey");
    }
  });
}

if (Meteor.isServer) {

}
