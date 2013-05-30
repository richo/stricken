function create_message(el) {
  // el should be a uuid - name pair
  var li = document.createElement("li");
  li.text(el[1]);
  li.setAttribute
}

load_messages = (function() {
  var messages_url = '/threads';

  return function() {
    var messages = $('#messages');
    $.ajax(messages_url, {
      dataType: "json",
      success: function(data, stat, xhr) {
        _.each(data, function(el) {
          messages.append(create_message(el));
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
