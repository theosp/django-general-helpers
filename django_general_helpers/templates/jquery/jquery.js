{% comment %}
Load the jQuery lib and plugins passed with {{ jquery_plugins }}.
{% endcomment %}

{% for jquery_plugin in jquery_plugins %}
    {% captureas plugin_path %}jquery/plugins/{{ jquery_plugin }}.js{% endcaptureas %}
    {% include plugin_path %}
{% endfor %}

jQuery = jQuery.noConflict(true);
