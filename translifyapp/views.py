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

    # RedisStreamPublisher.publish_to_stream("anpr-" + noext + ext, compute_roi(filename, True), persistence=True)




def create_translation(user, image, title):
    noext, ext = os.path.splitext(image.name)

    translation = TextTranslation()
    translation.ext = ext
    translation.user = user
    translation.title = title
    translation.save()

    subprocess.call("mkdir -p uploads", shell=True)

    filename = os.path.join("uploads/", str(translation.id) + translation.ext)
    image_file = open(filename, "wb")

    for chunk in image.chunks():
        image_file.write(chunk)

    translation.translation = getTranslatedLines(filename)

    translation.save()

    publish(translation.make_create_event(), user)

    return translation


@login_required_ajax
def user_state(request):
    state = State()
    state.add_all(TextTranslation.objects.filter(user=request.user))
    return state.to_response(extra={"success": True})


@login_required_ajax
def translate(request):
    if not request.FILES or len(request.FILES) == 0:
        return StorageError.NO_FILES

    files = list(request.FILES.items())
    title = request.POST['title']

    state = State()
    for name, image in files:
        public_storage_file = create_translation(request.user, image, title)
        public_storage_file.add_to_state(state)
    return state.to_response(extra={"success": True})

def recognize(request):
    if not request.FILES or len(request.FILES) == 0:
        return StorageError.NO_FILES

    files = list(request.FILES.items())
    title = request.POST['title']

    state = State()
    for name, image in files:
        public_storage_file = create_anpr(image, title)
        # state.add(public_storage_file)

    return state.to_response(extra={"success": True, "bbox": [1, 2, 3]})


def translation_image(request, translation_id):
    translation = TextTranslation.objects.get(id=translation_id)
    filename = str(translation.id) + translation.ext
    file_full_path = "uploads/" + filename

    with open(file_full_path, 'rb') as f:
        data = f.read()

    response = HttpResponse(data, content_type=mimetypes.guess_type(file_full_path)[0])
    response['Content-Disposition'] = "attachment; filename={0}".format(filename)
    response['Content-Length'] = os.path.getsize(file_full_path)
    return response
