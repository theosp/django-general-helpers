from django.template.loader import render_to_string
from django.template import RequestContext
from django.http import HttpResponse

from django_general_helpers.modules.my_import import my_import
import os
settings = my_import(os.environ['DJANGO_SETTINGS_MODULE'])

from django_general_helpers.modules.jsmin import jsmin

from django.views.decorators.cache import cache_page

@cache_page(60 * 60 * 24 * 10)
def index(request, plugins):
    if plugins:
        plugins = plugins.split(',')

    jquery = render_to_string("jquery/jquery.js",
                              {'jquery_plugins': plugins},
                              context_instance=RequestContext(request)
                             )

    if settings.MINIFY_JS:
        jquery = jsmin(jquery)

    return HttpResponse(jquery, mimetype="text/javascript")
