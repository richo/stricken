import json
from flask import Flask, render_template, request
from stricken.adaptors.thread import Thread, ThreadFactory

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

    @app.route("/threads/new", methods=["POST"])
    def create_thread():
        title = request.form["title"]
        body = request.form["body"]
        user = request.form["user"]

        thread = thread_factory.new(title, body, user)

    return app
