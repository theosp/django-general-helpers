from django.template.loader import render_to_string
from django.template import RequestContext
from django.http import HttpResponse, HttpResponseForbidden

from django_general_helpers.modules.my_import import my_import
import os
settings = my_import(os.environ['DJANGO_SETTINGS_MODULE'])

from django_general_helpers.modules.jsmin import jsmin

from django.views.decorators.cache import cache_page

@cache_page(60 * 60)
def index(request, js_templates):
    if js_templates:
        js_templates = js_templates.split(',')
    else:
        return HttpResponseForbidden('');

    js_templates = ['js/%s.js' % js_template for
                            js_template in js_templates]

    js = render_to_string("js/loader.js",
                            {'js_templates': js_templates},
                            context_instance=RequestContext(request),
                          )

    if settings.MINIFY_JS:
        js = jsmin(js)

    return HttpResponse(js, mimetype="text/javascript")
