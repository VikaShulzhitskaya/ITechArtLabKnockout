/**
 * Created by v.shulzhytskaya on 9/6/2016.
 */

define(["lib/knockout-3.4.0.js", "User"], function (ko, User) {

    function Authorize() {
        var self = this;

        self.people = ko.observableArray();
        self.people.push(new User(1, 'George', '1234567'));
        self.people.push(new User(2, 'Ivan', '1234321'));

        self.register = function (login, password) {
            self.people.push(new User(self.people().length, login, password));
        };

        self.checkRight = function (login, password) {
            var peopleArray = self.people();
            if(login == null){
                alert('Please, enter login');
                return false;
            }
            if(password == null){
                alert('Please, enter password');
                return false;
            }
            for(var i = 0; i < peopleArray.length; i += 1){
                if((peopleArray[i].name == login) && (peopleArray[i].password == password)){
                    return peopleArray[i];
                }
            }
            return null;
        };
    }

    return Authorize;
});
