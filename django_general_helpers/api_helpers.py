#!/usr/bin/env python

from django.http import HttpResponse

try:
    import json
except ImportError:
    try:
        import simplejson as json
    except ImportError:
        # For Google AppEngine
        from django.utils import simplejson as json

def sha1(string):
    import hashlib

    h = hashlib.new('sha1')
    h.update(string)
    return h.hexdigest()

import re
from datetime import datetime, date
__jsdateregexp__ = re.compile(r'"\*\*(new Date\([0-9,]+\))"')
class JsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return '**new Date(%i,%i,%i,%i,%i,%i)' % (obj.year,
                                                      obj.month-1,
                                                      obj.day,
                                                      obj.hour,
                                                      obj.minute,
                                                      obj.second)

        if isinstance(obj, date):
            return '**new Date(%i,%i,%i)' % (obj.year,
                                             obj.month-1,
                                             obj.day)

        return obj.__dict__

def json_response(response_obj):
    response = json.dumps(response_obj, cls=JsonEncoder)
    return HttpResponse(response, mimetype="application/json")

def string_response(string):
    return HttpResponse(string)

def error_response(error, description="", status_code=200):
    """The general structure for error responses"""

    from django.http import HttpResponseBadRequest

    response_obj = json.dumps({'error': error, 'description': description})

    if status_code == 200:
        return HttpResponse(response_obj, mimetype="application/json")
    elif status_code == 400:
        return HttpResponseBadRequest(response_obj, mimetype="application/json")

def require_get_request(view):
    """Decorator for views that returns HttpResponseNotAllowed(['GET']) if
    the http method of the request isn't GET.

    Otherwise we simply call the decorated view.
    """

    def check_get_request(request, *args, **kwargs):
        if request.method != 'GET':
            from django.http import HttpResponseNotAllowed

            return HttpResponseNotAllowed(['GET'])

        return view(request, *args, **kwargs)

    return check_get_request

def require_post_request(view):
    """Decorator for views that returns HttpResponseNotAllowed(['POST']) if
    the http method of the request isn't POST.

    Otherwise we simply call the decorated view.
    """

    def check_post_request(request, *args, **kwargs):
        if request.method != 'POST':
            from django.http import HttpResponseNotAllowed

            return HttpResponseNotAllowed(['POST'])

        return view(request, *args, **kwargs)

    return check_post_request

def get_name_identifier(name):
    import re
    return re.sub('\s+', '.', name.lower())
