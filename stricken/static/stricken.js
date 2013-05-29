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
  $.ajax("/objects/" + name, {
    complete: function(data) {
      // TODO Get the object type from the backend
      cb(load_from_base64(Stricken.PB.UpdateObject, data.responseText));
    }
  });
}

function load_from_base64(object, text) {
    var obj = new object();
    var stream = new PROTO.Base64Stream(text);

    obj.ParseFromStream(stream);
    return obj;
}
