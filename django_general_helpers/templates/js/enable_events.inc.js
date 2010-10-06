var self = this;
this.events = {};

this.splat = function(a){ return $.isArray(a) ? a : [a]; };

this.addEvent = function(type, fn){
    if (self.events[type] == undefined) self.events[type] = [];

    // Check whether the event exists already
    var exists = false;
    $.each(self.events[type], function(f){
        if (f === fn){
            exists = true;
            return;
        };
    });

    // Add the event, if it isn't exist already
    if (!exists) self.events[type].push(fn);

    return self;
};

this.fireEvent = function(type, args, delay){
    if (!self.events || !self.events[type]) return self;

    $.each(self.events[type], function(i, fn){		
        (function(){
            args = (args != undefined) ? self.splat(args) : Array.prototype.slice.call(arguments);
            var returns = function(){
                return fn.apply(self || null, args);
            };
            if (delay) return setTimeout(returns, delay);
            return returns();
        })();
    });

    return self;
};

this.removeEvent = function(type, fn){
    // If called without fn remove all type's events
    if (typeof(type) == 'undefined')
    {
        self.events = {};
    }

    if (self.events[type]){
        // If called without fn remove all type's events
        if (typeof(fn) == 'undefined')
        {
            self.events[type] = [];
        }
        else
        {
            for (var i = self.events[type].length; i--; i)
            {
                if (self.events[type][i] === fn) self.events[type].splice(i, 1);
            }
        }
    } 

    return self;
};
