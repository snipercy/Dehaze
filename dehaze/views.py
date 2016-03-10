from django.shortcuts import render
import os
import json
from django.http import HttpResponse
from django.shortcuts import render_to_response,render

def dehaze(request):
    return render(request, 'index.html')

def darkChannel(request):
    matlab = '/Applications/MATLAB_R2014b.app/bin/matlab -nodesktop -nosplash  -r '
    func = request.GET.get('func')
    image = './static/image/' + request.GET.get('image')
    path_d = './static/image/dark/' + request.GET.get('path_d')
    path_t = './static/image/transimission/' + request.GET.get('path_t')
    path_gt = './static/image/transimission/' + request.GET.get('path_gt')
    path_res = './static/image/res/' + request.GET.get('path_res')
    cmd = matlab + '"' + func + ' ' + image + ' ' + path_d + " " + path_t + " " + path_gt + " " + path_res + '"'
    print cmd
    os.system(cmd)
    return HttpResponse()


## for debug

# def index2(req):
#     context = {}
#     return render(req, 'index2.html', context)
#
#
# def index3(req):
#     context = {}
#     return render(req, 'index3.html', context)
#
# def get_pic(request):
#     color = request.GET.get('color')
#     number = request.GET.get('number')
#     name = '{}_{}'.format(color, number)
#
#     PICS = ''
#     result_list = filter(lambda x: x.startswith(name), PICS)
#
#     print 'result_list', result_list
#
#     return HttpResponse(
#         json.dumps(result_list),
#         content_type='application/json')
#
#
# def showImg(request):
#     imgName = request.GET.get('imgName')
#     # print 'python : imgName', imgName
#     return HttpResponse(
#         json.dumps(imgName),
#         content_type='application/json'
#     )

# matlab = '/Applications/MATLAB_R2014b.app/bin/matlab -nodesktop -nosplash -r '
