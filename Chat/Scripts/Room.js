/**
 * Created by v.shulzhytskaya on 9/6/2016.
 */

define(["knockout-3.4.0", "Message"], function (ko, Message) {

    function Room(name) {
        var self = this;
        self.name = ko.observable(name);
        self.message = ko.observable();

        self.messages = ko.observableArray();
        self.users = ko.observableArray();

        self.membersName = ko.computed(function () {
            var members = "";
            for (var i = 0; i < self.users().length; i +=1){
                members += self.users()[i].name + ", ";
            }
            return members;
        });

        self.addMessage = function () {
            self.messages.push(new Message(this.sender(), self.message()));
        };

        self.addUser = function (user) {
            self.users.push(user);
        };
    }

    return Room;

});


