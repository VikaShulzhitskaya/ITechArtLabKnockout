/**
 * Created by v.shulzhytskaya on 9/6/2016.
 */


    require.config({
        paths: {
            'knockout': 'lib/knockout-3.4.0'
        }
    });

    require(['knockout', 'AppViewModel'],function (ko, AppViewModel) {

        ko.components.register('notify', {
            viewModel: function (params) {
                self = this;
                self.model = params.model;
                self.notifyInfo = params.notify;

                self.getNotificationCount = function (user) {
                    var t;
                    var u = self.model.authorize.authorizedUser();

                    ko.utils.arrayForEach( self.notifyInfo.notifyInformation(), function (item) {
                        if(item.user == u){
                            t = item.countOfNotification();
                        }
                    });
                    return t;
                };
            },
            template: '<p><button type="button" data-bind="text:getNotificationCount($root), valueUpdate:change" class="btn btn-warning btn-circle"></button></p>'
        });

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

