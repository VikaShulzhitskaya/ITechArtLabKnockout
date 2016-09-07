/**
 * Created by v.shulzhytskaya on 9/6/2016.
 */

define(['knockout', 'User'], function (ko, User) {
    'use strict';

    function find(array, value) {
        for(var i = 0; i < array.length; i += 1){
            if(array[i].name == value) return i;
        }
        return -1;
    }
    
    function Authorize() {
        var self = this;

        self.people = ko.observableArray();
        self.people.push(new User(1, 'George', '1234567'));
        self.people.push(new User(2, 'Ivan', '1234321'));
         var appView;

        self.register = function () {
            if(self.checkLogin(self.enterLogin()) == true){
                alert('User with this login already exists');
            }
            else{
                self.people.push(new User(self.people().length, self.enterLogin(), self.enterPassword()));
                self.login();
            }
        };

        self.checkLogin = function (loginToCheck) {
            var peopleArray = self.people();
            for(var i = 0; i < peopleArray.length; i += 1){
                if(peopleArray[i].name == loginToCheck){
                    return true;
                }
            }
            return false;
        };

        self.checkRight = function (login, password) {
            var peopleArray = self.people();
            if(login == null){
                alert('Please, enter login');
                return null;
            }
            if(password == null){
                alert('Please, enter password');
                return null;
            }
            for(var i = 0; i < peopleArray.length; i += 1){
                if((peopleArray[i].name == login) && (peopleArray[i].password == password)){
                    return peopleArray[i];
                }
            }
            return null;
        };

        self.enterLogin = ko.observable(null);
        self.enterPassword = ko.observable(null);
        self.authorizedUser = ko.observable(null);
        self.availableMembers = ko.observableArray();
        self.availableRooms = ko.observableArray();

        self.login = function () {
            var checkUser = self.checkRight(self.enterLogin(), self.enterPassword());
            if(checkUser != null){
                self.authorizedUser(checkUser);
                appView = this;
                self.reloadData(appView);
            }
        };

        self.reloadData = function () {
            self.availableMembers([]);
            self.availableRooms([]);
            var user = self.authorizedUser();
            var peopleArray = self.people();
            var rooms = appView.rooms();
            for (var i = 0; i < peopleArray.length; i += 1) {
                if ((peopleArray[i].name == user.name) && (peopleArray[i].password == user.password)) {
                    for (var j = 0; j < rooms.length; j += 1) {
                        if (find(rooms[j].users(), user.name) != -1) {
                            self.availableRooms.push(rooms[j]);
                        }
                    }
                }
                else {
                    self.availableMembers.push(peopleArray[i]);
                }
            }
        };

        self.logout = function () {
            self.authorizedUser(null);
            self.enterLogin(null);
            self.enterPassword(null);
            self.availableMembers([]);
            self.availableRooms([]);
            appView.selectedRoom(null);
        };
    }

    return Authorize;
});
