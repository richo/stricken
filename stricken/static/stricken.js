function create_message(thread) {
  // el should be a uuid - name pair
  var li = document.createElement("li");
  $(li).text(thread.identifier).on('click', function(evt) {
    console.log("Someone clicked on " + thread.toString());
  }).addClass("child");
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

function get_object(name, cb) {
  var types = {
    "update": Stricken.PB.UpdateObject,
    "root": Stricken.PB.RootObject
  };

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
}
