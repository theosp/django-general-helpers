this.getFavicon = function (url)
{
    var domain = url.split(/\/+/g)[1];
    if(typeof(domain) == 'undefined')
        var domain = '';

    return sprintf('<img src="http://www.google.com/s2/favicons?domain=%s" />', domain, url, domain);
};
