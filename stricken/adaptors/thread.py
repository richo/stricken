import json
import uuid
from groundstation.protocols import BaseProtocol

from groundstation.gref import Gref, Tip

from groundstation.objects.root_object import RootObject
from groundstation.objects.update_object import UpdateObject

CHANNEL = "messages"

class ThreadFactory(object):
    def __init__(self, station, protocol):
        self.station = station
        self.protocol = protocol

    def new(self, title, body, user)
        thread = Thread(self.station, uuid.uuid1())
        thread.protocol = self.protocol
        root = thread.write_root()

        thread.create_post(root, title, body, user)

    def from_uuid(self, uuid):
        pass


def title2json(title, body, user):
    return json.dumps({
        "type": "title",
        "title": title,
        "body": body,
        "user": user
        })


def reply2json(body, user):
    return json.dumps({
        "type": "reply",
        "body": body,
        "user": user
        })


class Thread(BaseProtocol):
    def __init__(self, station, uuid):
        self.station = station
        self.uuid = uuid

    @property
    def gref(self):
        gref = Gref(station.store, CHANNEL, self.uuid)

    def _write_object(obj):
        return self.station.write(obj.as_object())

    def _update_gref(gref, tips, parents):
        station.update_gref(gref, tips, parents)

    def write_root(self):
        root = RootObject(str(self.uuid), CHANNEL, self.protocol)
        oid = self._write_object(root)
        self._update_gref(self.gref)
        return oid

    def create_post(self, root, title, body, user):
        _post = UpdateObject([root], title2json(title, body, user))
        return self._write_object(_post)
