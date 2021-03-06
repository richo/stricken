import json
import uuid
from groundstation.protocols import BaseProtocol

from groundstation.station import NonExistantChannel
from groundstation.gref import Gref, Tip

from groundstation.objects.root_object import RootObject
from groundstation.objects.update_object import UpdateObject

CHANNEL = "messages"

class ThreadFactory(object):
    def __init__(self, station, protocol):
        self.station = station
        self.protocol = protocol

    def threads(self):
        try:
            grefs = [gref.as_dict() for gref in self.station.grefs(CHANNEL)]
        except NonExistantChannel:
            return []
        return grefs

    def new(self, title, body, user):
        thread = Thread(self.station, uuid.uuid1())
        thread.protocol = self.protocol
        root = thread.write_root()

        thread.create_post(root, title, body, user)

    def from_uuid(self, uuid):
        pass


class Thread(BaseProtocol):
    def __init__(self, station, uuid):
        self.station = station
        self.uuid = uuid

    @property
    def gref(self):
        return Gref(self.station.store, CHANNEL, self.uuid)

    def _write_object(self, obj):
        return self.station.write(obj.as_object())

    def _update_gref(self, gref, tips, parents):
        self.station.update_gref(gref, tips, parents)

    def write_root(self):
        root = RootObject(str(self.uuid), CHANNEL, self.protocol)
        oid = self._write_object(root)
        self._update_gref(self.gref)
        return oid

    def create_post(self, root, title, body, user):
        _post = UpdateObject([root], title2json(title, body, user))
        return self._write_object(_post)
