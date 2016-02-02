from django.conf.urls import include, url
from django.contrib import admin
import algoviewapp.views

urlpatterns = [
    # Examples:
    # url(r'^$', 'd3nalgorithms.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', algoviewapp.views.index),
    url(r'^sorting', algoviewapp.views.sorting),
    url(r'^contact', algoviewapp.views.contact),
]
