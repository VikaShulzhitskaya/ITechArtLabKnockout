/**
 * Created by v.shulzhytskaya on 9/6/2016.
 */

define(['knockout-3.4.0'], function (ko) {
    function Instance() {
        var self = this;
        
        self.people = ko.observableArray();
        self.user = ko.observable(null);
        self.sender = ko.observable(null);
        
        self.selectedRoom = ko.observable(null);
        
        self.availableMembers = ko.observableArray();
        self.availableRooms = ko.observableArray();
        self.slideForm = ko.observable(false);
        self.rooms = ko.observableArray();

        self.clickRoom = function (room) {
            self.selectedRoom(room);
        };
    }

    return Instance;
})