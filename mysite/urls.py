from django.conf.urls import patterns, include, url
 
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'dehaze.views.dehaze'),
    url(r'^darkChannel/$', 'dehaze.views.darkChannel'),
    url(r'^admin/', include(admin.site.urls)),

)
from django.conf import settings
if settings.DEBUG:
    urlpatterns += patterns('',
            (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_PATH, 'show_indexes':True}),
            )

