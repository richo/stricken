"use strict";
/** @suppress {duplicate}*/var ProtoJSTest;
if (typeof(ProtoJSTest)=="undefined") {ProtoJSTest = {};}
if (typeof(ProtoJSTest.PB)=="undefined") {ProtoJSTest.PB = {};}
ProtoJSTest.PB._PBJ_Internal="pbj-0.0.3";

ProtoJSTest.PB.RootObject = PROTO.Message("ProtoJSTest.PB.RootObject",{
	id: {
		options: {},
		multiplicity: PROTO.required,
		type: function(){return PROTO.string;},
		id: 1
	},
	channel: {
		options: {},
		multiplicity: PROTO.required,
		type: function(){return PROTO.string;},
		id: 2
	},
	protocol: {
		options: {},
		multiplicity: PROTO.required,
		type: function(){return PROTO.string;},
		id: 3
	}});
