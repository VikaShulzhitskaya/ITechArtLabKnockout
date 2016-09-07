/**
 * Created by v.shulzhytskaya on 9/6/2016.
 */

define(function () {
    'use strict';

    function User(id, name, password) {
        var self = this;
        self.id = id;
        self.name = name;
        self.password = password;
    }

    return User;
});
