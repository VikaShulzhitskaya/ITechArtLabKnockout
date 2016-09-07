/**
 * Created by v.shulzhytskaya on 9/2/2016.
 */

define(['knockout', 'User', 'Room', 'Authorize'], function (ko, User, Room, Authorize) {
    'use strict';

    function AppViewModel() {
        var self = this;
        
        self.rooms = ko.observableArray();

        self.authorize = new Authorize();

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
            room.readMessage(self.authorize.authorizedUser());
        };
        
        self.slideForm = ko.observable(false);
        self.newRoomName = ko.observable(null);
        self.selectedUsers = ko.observableArray();
        
        self.createRoom = function () {
            var room = new Room(self.newRoomName());
            for(var i = 0; i < self.selectedUsers().length; i += 1){
                room.addUser(self.selectedUsers()[i]);
            }
            room.addUser(self.authorize.authorizedUser());
            self.rooms.push(room);
            self.authorize.availableRooms.push(room);
        };
        
        self.enterMessage = ko.observable(null);
        
        self.addNewMessage = function (room) {
            room.addMessage(self.authorize.authorizedUser().name,self.enterMessage());
            self.enterMessage(null);
        };

        self.unsubscribeFromRoom = function (room) {
            room.deleteUser(self.authorize.authorizedUser());
            self.authorize.reloadData();
        };

        self.a = ko.observable(2);
        self.b = ko.observable(0);
        
        self.search = ko.observable();
        self.filteredArray = ko.computed(function () {
            var filter = self.search();
            if(!filter){
                return;
            }
            else {
                return ko.utils.arrayFilter(self.authorize.availableRooms(), function (item) {
                    return stringStartsWith(item.name.toLowerCase(), filter.toLowerCase());
                });
            }
        });

        var stringStartsWith = function (string, startsWith) {
            string = string || "";
            if (startsWith.length > string.length)
                return false;
            return string.substring(0, startsWith.length) === startsWith;
        };

    }

    return AppViewModel;

});

