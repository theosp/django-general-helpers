        /*
         * Modes are simply classes we add to self.elements.widget_container
         * More than one mode can be activate simultaneously
         */
        this.setMode = function (mode, args)
        {
            if(typeof(self['before_set_mode_' + mode]) != 'undefined') { self['before_set_mode_' + mode](args); }
            $(self.modes_element).addClass(self.options.classes_prefix + mode + '_mode');
            if(typeof(self['after_set_mode_' + mode]) != 'undefined') { self['after_set_mode_' + mode](args); }
        }

        this.unsetMode = function (mode, args)
        {
            if($(self.modes_element).hasClass(self.options.classes_prefix + mode + '_mode'))
            {
                if(typeof(self['before_unset_mode_' + mode]) != 'undefined') { self['before_unset_mode_' + mode](args); }
                $(self.modes_element).removeClass(self.options.classes_prefix + mode + '_mode');
                if(typeof(self['after_unset_mode_' + mode]) != 'undefined') { self['after_unset_mode_' + mode](args); }
            }
        }

