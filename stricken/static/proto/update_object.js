"use strict";
.UpdateObject = PROTO.Message(".UpdateObject",{
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
