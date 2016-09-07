/**
 * Created by v.shulzhytskaya on 9/6/2016.
 */

define(['knockout', 'Message', 'Notification'], function (ko, Message, Notification) {
    'use strict';

    function Room(name) {
        var self = this;
        self.name = name;

        self.messages = ko.observableArray();
        self.addMessage = function (sender, message) {
            self.messages.push(new Message(sender, message));
            ko.utils.arrayForEach(self.notifyInformation(),function (item) {
                if(item.user.name != sender){
                    item.addNotification();
                }
            });
        };

        self.users = ko.observableArray();
        self.addUser = function (user) {
            self.users.push(user);
            self.notifyInformation.push(new Notification(user));
        };

        self.deleteUser = function (user) {
            self.users.remove(user);
            ko.utils.arrayForEach(self.notifyInformation(), function (item) {
                if(item.user == user){
                    self.notifyInformation.remove(item);
                }
            });
        };

        self.membersName = ko.computed(function () {
            var members = '';
            for (var i = 0; i < self.users().length; i +=1){
                members += self.users()[i].name + ', ';
            }
            return members;
        });

        self.notifyInformation = ko.observableArray();
        

        self.readMessage = function (user) {
            ko.utils.arrayForEach(self.notifyInformation(), function (item) {
                if(item.user == user){
                    item.removeNotification();
                }
            });
        };

        self.getNote = function (user) {
            
        }
        
    }
    return Room;

});


