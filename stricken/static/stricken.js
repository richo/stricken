function create_message(el) {
  // TODO
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
