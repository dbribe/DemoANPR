from django.shortcuts import render
from establishment.webapp.state import State
from establishment.webapp.base_views import single_page_app, global_renderer
from establishment.funnel.redis_stream import RedisStreamPublisher
from establishment.webapp.base_views import login_required_ajax
from .errors import StorageError
from django.http import HttpResponse
from .models import TextTranslation
import os
import subprocess
import mimetypes
from .translate import getTranslatedLines
from ANPR.code.compute_roi import show_compute_roi


def render_single_page_app(request):
    return render(request, "translifyapp/app.html", {})


global_renderer.render_single_page_app = render_single_page_app


@single_page_app
def index(request):
    state = State()
    state.add_all(TextTranslation.objects.filter(user=request.user))
    return state


def publish(event, user):
    stream_name = "global-" + str(user.id) + "-events"
    RedisStreamPublisher.publish_to_stream(stream_name, event, persistence=True)

INDEX = 0

def create_anpr(image, title):
    global INDEX

    noext, ext = os.path.splitext(image.name)

    subprocess.call("mkdir -p uploads", shell=True)
    INDEX += 1
    filename = os.path.join("uploads/", str(INDEX) + ext)
    image_file = open(filename, "wb")

    for chunk in image.chunks():
        image_file.write(chunk)

    return show_compute_roi(filename, show=False)

    # RedisStreamPublisher.publish_to_stream("anpr-" + noext + ext, compute_roi(filename, True), persistence=True)

def recognize(request):
    if not request.FILES or len(request.FILES) == 0:
        return StorageError.NO_FILES

    files = list(request.FILES.items())
    title = request.POST['title']

    state = State()
    for name, image in files:
        data = create_anpr(image, title)
        return state.to_response(extra={"success": True, "response": data})

