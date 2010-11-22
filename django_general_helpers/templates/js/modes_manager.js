/*
RERUIRES: Node.js's EventEmitter
          Daniel Chcouri's theosp_common_js (theosp.js)
*/
(function ($) {
    // I precede this constructor with $. to make it clear it depends on jQuery
    $.ModesManager = function (options) {
        var self = this;

        if (typeof options === 'undefined') {
            options = {};
        }

        self.options = {};
        $.extend(self.options, self.default_options, options);

        // jQuery objects with the elements to which we add the modes classes
        self.modes_elements = [];
        self.modes = {};
    };

    $.ModesManager.prototype = new EventEmitter();
    $.ModesManager.prototype.constructor = $.ModesManager;

    $.ModesManager.prototype.default_options = {
        modes_prefix: 'mode-',
        modes_suffix: '-mode'
    };

    $.ModesManager.prototype.modes_classes_template = function (mode) {
        var self = this;

        return self.options.modes_prefix + mode + self.options.modes_suffix;
    };

    $.ModesManager.prototype.setMode = function (mode) {
        var self = this;

        if (typeof mode === 'undefined') {
            return;
        }

        // If mode is set already
        if (self.hasMode(mode)) {
            return;
        }

        self.modes[mode] = true;

        var args_for_events = Array.prototype.slice.call(arguments, 1),
            args_for_before_set_mode = args_for_events.slice(0),
            args_for_after_set_mode = args_for_events.slice(0);

        args_for_before_set_mode.unshift('before_set_mode_' + mode);
        args_for_after_set_mode.unshift('after_set_mode_' + mode);

        // call 'before_set_mode_' + mode event
        self.emit.apply(this, args_for_before_set_mode);
        for (var jQueryObj in self.modes_elements) {
            if (self.modes_elements.hasOwnProperty(jQueryObj)) {
                self.modes_elements[jQueryObj]
                    .addClass(self.modes_classes_template(mode));
            }
        }
        // call 'after_set_mode_' + mode event
        self.emit.apply(this, args_for_after_set_mode);
    };

    $.ModesManager.prototype.unsetMode = function (mode) {
        var self = this;

        if (typeof mode === 'undefined') {
            return;
        }

        // If mode isn't set do nothing
        if (!self.hasMode(mode)) {
            return;
        }

        delete self.modes[mode];

        var args_for_events = Array.prototype.slice.call(arguments, 1),
            args_for_before_unset_mode = args_for_events.slice(0),
            args_for_after_unset_mode = args_for_events.slice(0);

        args_for_before_unset_mode.unshift('before_unset_mode_' + mode);
        args_for_after_unset_mode.unshift('after_unset_mode_' + mode);

        // call 'before_unset_mode_' + mode event
        self.emit.apply(this, args_for_before_unset_mode);
        for (var jQueryObj in self.modes_elements) {
            if (self.modes_elements.hasOwnProperty(jQueryObj)) {
                self.modes_elements[jQueryObj]
                    .removeClass(self.modes_classes_template(mode));
            }
        }
        // call 'after_unset_mode_' + mode event
        self.emit.apply(this, args_for_after_unset_mode);
    };

    $.ModesManager.prototype.hasMode = function (mode) {
        var self = this;

        if (mode in self.modes) {
            return true;
        }

        return false;
    };

    $.ModesManager.prototype.addModesElement = function () {
        var self = this;

        for (var i = 0; i < arguments.length; i++) {
            self.modes_elements.push(arguments[i]);
        }
    };
})(jQuery);
