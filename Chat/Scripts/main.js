/**
 * Created by v.shulzhytskaya on 9/6/2016.
 */


    require.config({
        paths: {
            'knockout': 'lib/knockout-3.4.0'
        }
    });

    require(['knockout', 'AppViewModel'],function (ko, AppViewModel) {
        ko.components.register('click', {
            viewModel: function (params) {
                self = this;
                this.a = params.a;
                this.b = params.b;

                this.callback = function (num) {
                    self.b(parseInt(num));
                    self.a(self.a() + parseInt(num));
                };
            },
            template: '<div data-bind="text: a"></div><button class="btn" data-bind="click:function(){callback(1)}">Increase</button><button class="btn" data-bind="click:function(){callback(-1)}">Decrease</button>'
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

