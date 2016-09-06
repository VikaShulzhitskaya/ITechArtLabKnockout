/**
 * Created by v.shulzhytskaya on 9/6/2016.
 */

define(function () {
    
    function Message(sender, text) {
        var self = this;
        
        self.sender = sender;
        self.text = text;
        self.date = new Date();

        self.fromLine = ko.computed(function () {
            return self.sender + " says "+ self.date.toTimeString() ;
        });
    }

    return Message;
})



