/**
 * Created by v.shulzhytskaya on 9/6/2016.
 */

define(['knockout'], function (ko) {
    'use strict';

    function Notification(user) {
        var self = this;
        self.user = user;
        self.countOfNotification = ko.observable(0);

        self.addNotification = function () {
            var n = self.countOfNotification();
            self.countOfNotification(n +1);
        };

        self.removeNotification = function () {
            self.countOfNotification(0);
        };
    };

    return Notification;

});
