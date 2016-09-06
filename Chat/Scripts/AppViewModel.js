/**
 * Created by v.shulzhytskaya on 9/2/2016.
 */
/*function find(array, value) {
    for(var i = 0; i < array.length; i += 1){
        if(array[i].name == value) return i;
    }
    return -1;
}*/
/*
function Room(name) {
    var self = this;
    self.name = ko.observable(name);
    self.message = ko.observable();
    
    self.messages = ko.observableArray();
    self.users = ko.observableArray();

    self.membersName = ko.computed(function () {
        var members = "";
        for (var i = 0; i < self.users().length; i +=1){
            members += self.users()[i].name + ", ";
        }
        return members;
    });
    
    self.addMessage = function () {
        self.messages.push(new Message(this.sender(), self.message()));
    };

    self.addUser = function (user) {
        self.users.push(user);
    };
}
*/

/*function User(id, name, password) {
    var self = this;
    self.id = id;
    self.name = name;
    self.password = password;

    self.subscribedRooms = ko.observableArray();
    self.subscribeToRoom = function (room) {
        self.subscribedRooms.push(room);
    };
}*/

/*function Message(sender, text) {
    var self = this;
    self.sender = sender;
    self.text = text;
    self.date = new Date();

    self.fromLine = ko.computed(function () {
        return self.sender + " says "+ self.date.toTimeString() ;
    });
}*/

/*function Authorize(appViewModel) {
    var self = this;

    self.authorizedUserName = ko.observable(null);
    self.enterLogin = ko.observable(null);
    self.enterPassword = ko.observable(null);
    self.shouldShowEnterForm = ko.observable(false);
    self.buttonValue = ko.observable('I want enter');

    self.register = function () {
        AppViewModel.addPerson(self.enterLogin(), self.enterPassword());
    };

    self.checkRight = function () {
        var peopleArray = AppViewModel.people();
        var rooms = AppViewModel.rooms();
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
                AppViewModel.user(peopleArray[i]);
                AppViewModel.sender(self.enterLogin());
                for(var j = 0; j < AppViewModel.rooms().length; j += 1){
                    if(find(rooms[j].users(), self.authorizedUserName())!= -1){
                        AppViewModel.availableRooms.push(rooms[j]);
                    }
                }
            }
            else{
                AppViewModel.availableMembers.push(peopleArray[i]);
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
        AppViewModel.sender(null);
        AppViewModel.selectedRoom(null);
        AppViewModel.availableRooms([]);
        AppViewModel.slideForm(false);
        AppViewModel.availableMembers([]);
    }
}*/

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
    /*var AppViewModel = {
        people : ko.observableArray([
            new User(1, 'George', '1234567'),
            new User(2, 'Ivan', '1234321')
        ]),

        availableMembers : ko.observableArray(),
        selectedUsers:ko.observableArray(),

        addPerson : function (userName, password) {
            this.people.push(new User(this.people().length, userName, password));
        },

        removePerson : function () {
            this.people.remove(this);
        },

        rooms : ko.observableArray(),
        availableRooms : ko.observableArray(),
        roomName : ko.observable(null),
        sender: ko.observable(null),
        user:ko.observable(null),



        selectedRoom : ko.observable(null),

        clickRoom : function (room) {
            AppViewModel.selectedRoom(room);
        },
        slideForm: ko.observable(false),



        createRoom : function () {
            var room = new Room(this.roomName());
            for(var i = 0; i < this.selectedUsers().length; i += 1){
                room.addUser(this.selectedUsers()[i]);
            }
            room.addUser(this.user());
            this.rooms.push(room);
            this.availableRooms.push(room);
        },

        authorize: new Authorize(AppViewModel)

        /!*authorize: {
         authorizedUserName : ko.observable(null),
         enterLogin : ko.observable(null),
         enterPassword : ko.observable(null),
         shouldShowEnterForm : ko.observable(false),
         buttonValue : ko.observable('I want enter'),

         register : function () {
         AppViewModel.addPerson(this.enterLogin(), this.enterPassword());
         },

         checkRight : function () {
         if(this.enterLogin() == null){
         alert('Please, enter login');
         return false;
         }
         if(this.enterPassword() == null){
         alert('Please, enter password');
         return false;
         }
         for(var i = 0; i < AppViewModel.people().length; i += 1){
         if((AppViewModel.people()[i].name == this.enterLogin()) && (AppViewModel.people()[i].password == this.enterPassword())){
         this.authorizedUserName(this.enterLogin());
         var p = AppViewModel.people()[i];
         AppViewModel.user(p);
         AppViewModel.sender(this.enterLogin());
         for(var j = 0; j < AppViewModel.rooms().length; j += 1){
         if(find(AppViewModel.rooms()[j].users(), this.authorizedUserName())!= -1){
         var r = AppViewModel.rooms()[j];
         AppViewModel.availableRooms.push(r);
         }
         }

         }
         else{
         var p = AppViewModel.people()[i];
         AppViewModel.availableMembers.push(p);
         }
         }
         if(AppViewModel.user) return true;
         return false;
         },

         showEnterForm : function () {
         if(this.shouldShowEnterForm() == false){
         this.shouldShowEnterForm(true);
         this.buttonValue('Hide this form');
         }
         else{
         this.shouldShowEnterForm(false);
         this.buttonValue('I want enter');
         }
         },

         logout : function () {
         this.authorizedUserName(null);
         this.enterLogin(null);
         this.enterPassword(null);
         this.shouldShowEnterForm(false);
         AppViewModel.sender(null);
         AppViewModel.selectedRoom(null);
         AppViewModel.availableRooms([]);
         AppViewModel.slideForm(false);
         AppViewModel.availableMembers([]);
         }
         }*!/
    };*/

/*    ko.bindingHandlers.slideVisible = {
        update: function(element, valueAccessor, allBindings) {
            var value = valueAccessor();
            var valueUnwrapped = ko.unwrap(value);
            var duration = allBindings.get('slideDuration') || 400;
            if (valueUnwrapped == true)
                $(element).slideDown(duration);
            else
                $(element).slideUp(duration);
        }
    };

    ko.applyBindings(AppViewModel);*/
});

