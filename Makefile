all: proto

.PHONY: proto

proto: stricken/static/proto/root_object.js \
	stricken/static/proto/update_object.js


stricken/static/proto/root_object.js:
	pbj stricken/proto/root_object.proto stricken/static/proto/root_object.js

stricken/static/proto/update_object.js:
	pbj stricken/proto/update_object.proto stricken/static/proto/update_object.js
