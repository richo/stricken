import json
from flask import Flask, render_template, request
from stricken.thread import Thread, ThreadFactory

PROTOCOL = "richo@psych0tik.net:stricken:0.0.0"


def threads_json(station, channel, escaped=False):
    grefs = [gref.as_dict() for gref in station.grefs(channel)]
    return json.dumps(grefs)


def make_stricken(station):
    app = Flask(__name__)
    thread_factory = ThreadFactory(station, PROTOCOL)

    @app.route("/")
    def index():
        return render_template("index.html")

    @app.route("/threads")
    def list_channels():
        return channels_json(station)

    @app.route("/threads/new", methods=["POST"])
    def create_thread():
        title = request.form["title"]
        body = request.form["body"]
        user = request.form["user"]

        thread = thread_factory.new(title, body, user)

    return app
