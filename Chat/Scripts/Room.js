/**
 * Created by v.shulzhytskaya on 9/6/2016.
 */

define(["lib/knockout-3.4.0.js", "Message"], function (ko, Message) {

    function Room(name) {
        var self = this;
        self.name = ko.observable(name);

        self.messages = ko.observableArray();
        self.addMessage = function (sender, message) {
            self.messages.push(new Message(sender, message));
        };

        self.users = ko.observableArray();
        self.addUser = function (user) {
            self.users.push(user);
        };

        self.deleteUser = function (user) {
            self.users.remove(user);
        }

        self.membersName = ko.computed(function () {
            var members = "";
            for (var i = 0; i < self.users().length; i +=1){
                members += self.users()[i].name + ", ";
            }
            return members;
        });
    }
    return Room;

});


