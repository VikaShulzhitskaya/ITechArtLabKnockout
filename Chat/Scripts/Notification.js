/**
 * Created by v.shulzhytskaya on 9/6/2016.
 */

define(function () {
    'use strict';

    function Notification(user) {
        var self = this;
        self.user = user;
        self.countOfNotification = 0;

        self.addNotification = function () {
            self.countOfNotification ++;
        };

        self.removeNotification = function () {
            self.countOfNotification = 0;
        };
    };

    return Notification;

});
