// In opposed to modes, only one view can be active 
//
// Gets a view name, add a class (view_name)_view to the
// widget_container_container and remove any other view class from it
this.view = function (view_name, args)
{
    args = typeof(args) != 'undefined' ? args : {};

    $.each(self.views, function (view_id, view_object) {
        if($(self.views_element).hasClass(self.options.classes_prefix + view_id + '_view'))
        {
            if(typeof(view_object['before_deactivation']) != 'undefined') { view_object['before_deactivation'](); }
            $(self.views_element).removeClass(self.options.classes_prefix + view_id + '_view');
            if(typeof(view_object['after_deactivation']) != 'undefined') { view_object['after_deactivation'](); }
        }
    });

    if(typeof(self.views[view_name]['before_activation']) != 'undefined') { self.views[view_name]['before_activation'](args); }
    $(self.views_element).addClass(self.options.classes_prefix + view_name + '_view');
    if(typeof(self.views[view_name]['after_activation']) != 'undefined') { self.views[view_name]['after_activation'](args); }
}
