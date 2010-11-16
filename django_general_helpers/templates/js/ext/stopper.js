(function($){
    $.stopper = function (name, custom_options) {
        var self = this;
        var default_options = {};

        this.options = $.extend(true, {}, default_options, custom_options);

        // This var holds the total time in ms this stopper was stopped
        this.paused_time = 0;

        // When paused is 0 it means the stopper isn't paused otherwise it
        // holds the stopper status when it was paused
        this.paused = 0;

        this.init = function (name)
        {
            self.name = name;
            self.begin = new Date();

            console.log('Stopper `' + self.name + '\' begun');
        };

        this.status = function () {
            var status;
            if(self.paused)
            {
                // If the stopper is paused its status is stored in self.paused
                status = self.paused;
            }
            else
            {
                status = (new Date()) - self.begin - self.paused_time;
            }
            console.log('Stopper `' + self.name + '\' status: ' + status + 'ms');
        };

        this.pause = function () {
            if(!self.paused)
            {
                self.pause_begin = new Date();
                self.paused = self.pause_begin - self.begin - self.paused_time;
                console.log('Stopper `' + self.name + '\' paused at: ' + self.paused + 'ms');
            }
            else
            {
                console.log('Stopper `' + self.name + '\' already paused');
            }
        };

        this.resume = function () {
            if(self.paused)
            {
                self.paused_time += (new Date()) - self.pause_begin;
                self.paused = 0;

                console.log('Stopper `' + self.name + '\' resumed');
            }
            else
            {
                console.log('Stopper `' + self.name + '\' already running');
            }
        };

        this.init(name);

        return this;
    };
})(jQuery);
