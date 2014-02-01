"use strict";
/** @suppress {duplicate}*/var Stricken;
if (typeof(Stricken)=="undefined") {Stricken = {};}
if (typeof(Stricken.PB)=="undefined") {Stricken.PB = {};}
Stricken.PB._PBJ_Internal="pbj-0.0.3";

Stricken.PB.RootObject = PROTO.Message("Stricken.PB.RootObject",{
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
