/**
 * Created by v.shulzhytskaya on 9/6/2016.
 */

require(["lib/knockout-3.4.0.js", "AppViewModel"],function (ko, AppViewModel) {

    ko.bindingHandlers.slideVisible = {
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
    ko.applyBindings(new AppViewModel());

});