from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('scripts/', views.scripts, name='scripts'),
    path('analytics/graph-all-sec/', views.analytics_graph_all_sec, name='graph-all-sec'),
    path('analytics/graph-all-sec/<int:bucket>/', views.analytics_graph_all_sec, name='graph-all-sec-bucket'),
    path('analytics/chart-timeline-market-lists/', views.analytics_chart_timeline_market_lists, name='chart-timeline-market-lists'),
    path('analytics/chart-timeline-market-lists/<int:market_id>/', views.analytics_chart_timeline_market_lists, name='chart-timeline-market-lists-market-id'),
]