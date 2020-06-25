#!/usr/bin/env python
# -*- coding: cp1251 -*-

from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from django.template import loader

def analytics_chart_timeline_market_lists(request, market_id = -1):
    context = {
      'market_id': market_id,
    }
    template = loader.get_template('moex/analytics/chart-timeline-market-lists.html')
    return HttpResponse(template.render(context, request))

def analytics_graph_all_sec(request, bucket = -1):
    context = {
      'bucket': bucket,
    }
    template = loader.get_template('moex/analytics/graph-all-sec.html')
    return HttpResponse(template.render(context, request))

def scripts(request):
    context = {}
    template = loader.get_template('moex/scripts.html')
    return HttpResponse(template.render(context, request))

def index(request):
    context = {}
    template = loader.get_template('moex/index.html')
    return HttpResponse(template.render(context, request))