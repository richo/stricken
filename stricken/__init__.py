import json
from flask import Flask, render_template, request
from stricken.adaptors.thread import Thread, ThreadFactory

PROTOCOL = "richo@psych0tik.net:stricken:0.0.0"

# HAX
import base64
import uuid
from groundstation.objects.root_object_pb2 import RootObject
from groundstation.objects.update_object_pb2 import UpdateObject


def make_stricken(station):
    app = Flask(__name__)
    thread_factory = ThreadFactory(station, PROTOCOL)

    @app.route("/")
    def index():
        return render_template("index.html")

    @app.route("/threads")
    def list_channels():
        return json.dumps(thread_factory.threads())

    @app.route("/hax/root_object")
    def _():
        root = RootObject()
        root.id = str(uuid.uuid1())
        root.channel = "channel"
        root.protocol = PROTOCOL

        return base64.b64encode(root.SerializeToString())

    @app.route("/hax/update_object")
    def _():
        update = UpdateObject()
        update.parents.extend(["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"])
        update.data = "data"

        return base64.b64encode(update.SerializeToString())

    @app.route("/threads/new", methods=["POST"])
    def create_thread():
        title = request.form["title"]
        body = request.form["body"]
        user = request.form["user"]

        thread = thread_factory.new(title, body, user)

    return app
