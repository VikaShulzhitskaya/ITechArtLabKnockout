/**
 * Created by v.shulzhytskaya on 9/2/2016.
 */

define(['knockout', 'User', 'Room', 'Authorize'], function (ko, User, Room, Authorize) {
    'use strict';

    function find(array, value) {
        for(var i = 0; i < array.length; i += 1){
            if(array[i].name == value) return i;
        }
        return -1;
    }

    function AppViewModel() {
        var self = this;
        
        self.rooms = ko.observableArray();

        self.authorize = new Authorize();

        self.enterLogin = ko.observable(null);
        self.enterPassword = ko.observable(null);
        self.authorizedUser = ko.observable(null);
        self.availableMembers = ko.observableArray();
        self.availableRooms = ko.observableArray();

        self.login = function () {
            var checkUser = self.authorize.checkRight(self.enterLogin(), self.enterPassword());
            if(checkUser != null){
                self.authorizedUser(checkUser);
                reloadData();
            }
        };

        var reloadData = function () {
            self.availableMembers([]);
            self.availableRooms([]);
            var user = self.authorizedUser();
            var peopleArray = self.authorize.people();
            var rooms = self.rooms();
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

        self.register = function () {
            self.authorize.register(self.enterLogin(), self.enterPassword());
        };
        
        self.logout = function () {
            self.authorizedUser(null);
            self.enterLogin(null);
            self.enterPassword(null);
            self.availableMembers([]);
            self.availableRooms([]);
            self.selectedRoom(null);
        };

        self.shouldShowEnterForm = ko.observable(false);
        self.buttonValue = ko.observable('I want enter');

        self.showEnterForm = function () {
            if(self.shouldShowEnterForm() == false){
                self.shouldShowEnterForm(true);
                self.buttonValue('Hide this form');
            }
            else{
                self.shouldShowEnterForm(false);
                self.buttonValue('I want enter');
            }
        };
        
        self.selectedRoom = ko.observable(null);
        
        self.clickRoom = function (room) {
            self.selectedRoom(room);
            room.readMessage(self.authorizedUser());
        };
        
        self.slideForm = ko.observable(false);
        
        self.newRoomName = ko.observable(null);

        self.selectedUsers = ko.observableArray();
        
        self.createRoom = function () {
            var room = new Room(self.newRoomName());
            for(var i = 0; i < self.selectedUsers().length; i += 1){
                room.addUser(self.selectedUsers()[i]);
            }
            room.addUser(self.authorizedUser());
            self.rooms.push(room);
            self.availableRooms.push(room);
        };
        
        self.enterMessage = ko.observable(null);
        
        self.addNewMessage = function (room) {
            room.addMessage(self.authorizedUser().name,self.enterMessage());
            self.enterMessage(null);
        };

        self.unsubscribeFromRoom = function (room) {
            room.deleteUser(self.authorizedUser());
            reloadData();
        };

        self.a = ko.observable(2);
        self.b = ko.observable(0);

    }

    return AppViewModel;

});

