/**
 * Created by v.shulzhytskaya on 9/6/2016.
 */

define(["knockout-3.4.0"], function (ko) {

    function User(id, name, password) {
        var self = this;
        self.id = id;
        self.name = name;
        self.password = password;

        /*    self.subscribedRooms = ko.observableArray();
         self.subscribeToRoom = function (room) {
         self.subscribedRooms.push(room);
         };*/
    }

    return User;
});
