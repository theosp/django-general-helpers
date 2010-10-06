        /*
         * Modes are simply classes we add to self.elements.widget_container
         * More than one mode can be activate simultaneously
         */
        this.setMode = function (mode, args)
        {
            self.modes_element = splat(self.modes_element);

            if(typeof(self['before_set_mode_' + mode]) != 'undefined') { self['before_set_mode_' + mode](args); }
            $.each(self.modes_element, function (index, mode_element) {
                $(mode_element).addClass(self.options.classes_prefix + mode + '_mode');
            });
            if(typeof(self['after_set_mode_' + mode]) != 'undefined') { self['after_set_mode_' + mode](args); }
        }

        this.unsetMode = function (mode, args)
        {
            self.modes_element = splat(self.modes_element);

            var removed = false;
            $.each(self.modes_element, function (index, mode_element) {
                if($(mode_element).hasClass(self.options.classes_prefix + mode + '_mode'))
                {
                    // fire self['before_unset_mode_' + mode](args) if it
                    // exists.
                    // we check !removed to call it only once
                    if(!removed)
                    {
                        if(typeof(self['before_unset_mode_' + mode]) != 'undefined') { self['before_unset_mode_' + mode](args); }
                    }
                    $(mode_element).removeClass(self.options.classes_prefix + mode + '_mode');
                    removed = true;
                }
            });
            if(removed)
            {
                if(typeof(self['after_unset_mode_' + mode]) != 'undefined') { self['after_unset_mode_' + mode](args); }
            }
        }

        this.hasMode = function (mode)
        {
            self.modes_element = splat(self.modes_element);

            var has = false;
            $.each(self.modes_element, function (index, mode_element) {
                if($(mode_element).hasClass(self.options.classes_prefix + mode + '_mode'))
                {
                    has = true;
                }
                else
                {
                    has = false;
                }
            });

            return has;
        };
