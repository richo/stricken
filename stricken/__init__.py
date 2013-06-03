import json
import base64
from flask import Flask, render_template, request
from stricken.adaptors.thread import Thread, ThreadFactory, CHANNEL

import groundstation.objects.object_factory as object_factory
from groundstation.objects.root_object import RootObject
from groundstation.objects.update_object import UpdateObject

from groundstation.gref import Gref

PROTOCOL = "richo@psych0tik.net:stricken:0.0.0"


def make_stricken(station):
    app = Flask(__name__)
    thread_factory = ThreadFactory(station, PROTOCOL)

    @app.route("/")
    def index():
        return render_template("index.html")

    @app.route("/threads")
    def list_channels():
        return json.dumps(thread_factory.threads())

    @app.route("/objects/<object_id>")
    def fetch_object(object_id):
        try:
            obj = station[object_id]
            hydrated_obj = object_factory.hydrate_object(station[object_id].data)
        except:
            raise

        if isinstance(hydrated_obj, UpdateObject):
            t = "update"
        elif isinstance(hydrated_obj, RootObject):
            t = "root"
        else:
            raise Exception("Unhandled object type")

        return json.dumps({
            "type": t,
            "object": base64.b64encode(obj.data)
        })

    @app.route("/objects", methods=['PUT'])
    def create_object():
        # XXX Requests must be made with
        # Content-Type: application/octet-stream
        oid = station.write(request.data)
        return oid

    @app.route("/grefs/<gref:identifier>", methods=['PUT'])
    def update_gref(gref_name):
        # XXX Requests must be made with
        # Content-Type: application/octet-stream
        tip = request.data
        gref = Gref(station.store, CHANNEL, gref_name)
        station.update_gref(gref, [tip])

    @app.route("/threads/new", methods=["POST"])
    def create_thread():
        title = request.form["title"]
        body = request.form["body"]
        user = request.form["user"]

        thread = thread_factory.new(title, body, user)

    return app
