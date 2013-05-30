#!/usr/bin/env python
import sys
sys.path.insert(0, "./groundstation")

# Creates a thread in the current groundstation context

import uuid

import stricken

from groundstation.node import Node
from groundstation.station import Station
from groundstation.objects.root_object import RootObject
from groundstation.objects.update_object import UpdateObject
from groundstation.gref import Gref

node = Node()
station = Station.from_env(node)

CHANNEL = "messages"

thread_id = str(uuid.uuid1())
gref = Gref(station.store, CHANNEL, thread_id)

root = RootObject(thread_id, CHANNEL, stricken.PROTOCOL)
oid = station.write(root.as_object())
print("Root id: %s" % (oid))

update = UpdateObject([oid], "Post content")
oid = station.write(update.as_object())
print("Update id: %s" % (oid))

gref.write_tip(oid, "")
