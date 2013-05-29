"use strict";
/** @suppress {duplicate}*/var ProtoJSTest;
if (typeof(ProtoJSTest)=="undefined") {ProtoJSTest = {};}
if (typeof(ProtoJSTest.PB)=="undefined") {ProtoJSTest.PB = {};}
ProtoJSTest.PB._PBJ_Internal="pbj-0.0.3";

ProtoJSTest.PB.UpdateObject = PROTO.Message("ProtoJSTest.PB.UpdateObject",{
	parents: {
		options: {},
		multiplicity: PROTO.repeated,
		type: function(){return PROTO.bytes;},
		id: 1
	},
	data: {
		options: {},
		multiplicity: PROTO.required,
		type: function(){return PROTO.bytes;},
		id: 2
	}});
