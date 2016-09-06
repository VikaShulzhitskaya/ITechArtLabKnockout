/**
 * Created by v.shulzhytskaya on 9/2/2016.
 */

define(["knockout-3.4.0", "User", "Room", "Authorize"], function (ko, User, Room, Authorize) {

    function AppViewModel() {
        var self = this;

        self.people = ko.observableArray();
        self.people.push(new User(1, 'George', '1234567'));

        self.people.push(new User(2, 'Ivan', '1234321'));


        self.availableMembers = ko.observableArray();
        self.selectedUsers = ko.observableArray();

        self.addPerson = function (userName, password) {
            self.people.push(new User(this.people().length, userName, password));
        };

        self.rooms = ko.observableArray();
        self.availableRooms = ko.observableArray();
        self.roomName = ko.observable(null);
        self.sender = ko.observable(null);
        self.user = ko.observable(null);



        self.selectedRoom = ko.observable(null);

        self.clickRoom = function (room) {
            self.selectedRoom(room);
        };
        self.slideForm = ko.observable(false);



        self.createRoom = function () {
            var room = new Room(self.roomName());
            for(var i = 0; i < self.selectedUsers().length; i += 1){
                room.addUser(self.selectedUsers()[i]);
            }
            room.addUser(this.user());
            self.rooms.push(room);
            self.availableRooms.push(room);
        };

        self.authorize = new Authorize(self);


    }


    return AppViewModel;

});

