from rest_framework import renderers
import json

class UserRenderer(renderers.JSONRenderer):
  charset='utf-8'
  def render(self, data, accepted_media_type=None, renderer_context=None):
    response = ''
    if 'ErrorDetail' in str(data):
      # if there is errror then pass respnse with -> {errors : response}
      response = json.dumps({'errors':data})
    else:
      # if there is no errror then pass respnse with -> {data : response}
      response = json.dumps({'data':data})
    
    return response