/**
 * Created by v.shulzhytskaya on 9/6/2016.
 */

define(["knockout-3.4.0","AppViewModel"], function (ko, AppViewModel) {


    function find(array, value) {
        for(var i = 0; i < array.length; i += 1){
            if(array[i].name == value) return i;
        }
        return -1;
    }
    
    function Authorize(app) {
        var self = this;
        self.appView = app;

        self.authorizedUserName = ko.observable(null);
        self.enterLogin = ko.observable(null);
        self.enterPassword = ko.observable(null);
        self.shouldShowEnterForm = ko.observable(false);
        self.buttonValue = ko.observable('I want enter');

        self.register = function () {
            self.appView.addPerson(self.enterLogin(), self.enterPassword());
        };

        self.checkRight = function () {
            var peopleArray = app.people();
            var rooms = app.rooms();
            if(self.enterLogin() == null){
                alert('Please, enter login');
                return false;
            }
            if(self.enterPassword() == null){
                alert('Please, enter password');
                return false;
            }
            for(var i = 0; i < peopleArray.length; i += 1){
                if((peopleArray[i].name == self.enterLogin()) && (peopleArray[i].password == self.enterPassword())){
                    self.authorizedUserName(self.enterLogin());
                    app.user(peopleArray[i]);
                    app.sender(self.enterLogin());
                    for(var j = 0; j < app.rooms().length; j += 1){
                        if(find(rooms[j].users(), self.authorizedUserName())!= -1){
                            app.availableRooms.push(rooms[j]);
                        }
                    }
                }
                else{
                    app.availableMembers.push(peopleArray[i]);
                }
            }
            if(self.authorizedUserName) return true;
            return false;
        };

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

        self.logout = function () {
            self.authorizedUserName(null);
            self.enterLogin(null);
            self.enterPassword(null);
            self.shouldShowEnterForm(false);
            app.sender(null);
            app.selectedRoom(null);
            app.availableRooms([]);
            app.slideForm(false);
            app.availableMembers([]);
        }
    }

    return Authorize;
});
