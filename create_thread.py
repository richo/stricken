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

node = Node()
station = Station.from_env(node)

root = RootObject(str(uuid.uuid1()), "messages", stricken.PROTOCOL)
oid = station.write(root.as_object())
print("Root id: %s" % (oid))

update = UpdateObject([oid], "Post content")
oid = station.write(update.as_object())
print("Update id: %s" % (oid))
