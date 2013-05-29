"use strict";
/** @suppress {duplicate}*/var Stricken;
if (typeof(Stricken)=="undefined") {Stricken = {};}
if (typeof(Stricken.PB)=="undefined") {Stricken.PB = {};}
Stricken.PB._PBJ_Internal="pbj-0.0.3";

Stricken.PB.UpdateObject = PROTO.Message("Stricken.PB.UpdateObject",{
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
