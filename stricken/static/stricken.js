/* Load a thread into the content frame */
function message_clicked_cb(thread) {
  return function(evt) {
    // create an object cache. This can eventually be global.
    var threads = {};
    var object, callback;

    _.each(thread.tips, function(tip) {
      threads[tip] = threads[tip] || []; // TODO Throw errors

      function callback(obj) {
        threads[tip].push(obj);

        if (obj.message_type_ === "Stricken.PB.UpdateObject") {
          _.each(obj.parents, function(par) {
            get_object(par, callback);
          });
        } else { // We're a root object
          console.log("Found the root object " + obj.toString());
          // TODO Work out if we're the last one, draw some stuff on the DOM
        }
      }

      object = get_object(tip, callback);
    });
    console.log("Someone clicked on " + thread.toString());
  };
}

/* end Load a thread into the content frame */
/* Message Loading */
function create_message(thread) {
  // el should be a uuid - name pair
  var li = document.createElement("li");
  $(li).text(thread.identifier)
    .on('click', message_clicked_cb(thread))
    .addClass("child");
  return li;
}

load_messages = (function() {
  var messages_url = '/threads';

  return function() {
    var messages = $('#messages');
    messages.find(".child").remove()
    $.ajax(messages_url, {
      dataType: "json",
      success: function(data, stat, xhr) {
        _.each(data, function(thread) {
          messages.append(create_message(thread));
        });
      }
    });
  };
})();
/* end Message Loading */

/* Object Loading */
function get_object(name, cb) {
  var types = {
    "update": Stricken.PB.UpdateObject,
    "root": Stricken.PB.RootObject
  };

  if (typeof name !== "string") {
    name = _.map(name, function(c) { return String.fromCharCode(c); }).join("");
  }

  $.ajax("/objects/" + name, {
    success: function(data) {
      var type = types[data.type];

      cb(load_from_base64(type, data.object));
    },
    dataType: "json"
  });
}

function load_from_base64(object, text) {
    var obj = new object();
    var stream = new PROTO.Base64Stream(text);

    obj.ParseFromStream(stream);
    return obj;


    var ostream = new PROTO.Base64Stream();
    obj.SerializeToStream(ostream);
    $.ajax('foo', ostream.getString());
}
/* end Object Loading */
