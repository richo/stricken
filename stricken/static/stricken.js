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
