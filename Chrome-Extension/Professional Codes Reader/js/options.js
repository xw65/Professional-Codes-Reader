function loadOptions() {
  // Set default options as p
  chrome.storage.sync.get({
    element: ['p', 'br'],
    paragraph: 2
  }, function(items) {
    var select = document.getElementById('element');
    var options = select && select.options;
    for (var i = 0; i < options.length; i++) {
      if (items.element.indexOf(options[i].value) != -1)
        options[i].selected = true;
    }
    $('select').material_select();
    document.getElementById('paragraph').value = items.paragraph;
    console.log('Load element options : ' + items.element);
    console.log('Load paragraph options : ' + items.paragraph);
  });
}

function saveOptions() {
  var paragraph = document.getElementById('paragraph').value;
  var select = document.getElementById('element');
  var options = select && select.options;
  var element = [];
  for (var i = 0; i < options.length; i++) {
    if (options[i].selected)
      element.push(options[i].value);
  }
  chrome.storage.sync.set({
    element: element,
    paragraph: paragraph
  }, function() {
    // Update status to let user know options were saved.
    console.log('Set element options as ' + element);
    console.log('Set paragraph options as ' + paragraph);
    Materialize.toast('Options saved.', 4000, 'status');
  });
}

function clearOptions() {
  chrome.storage.sync.clear();
  location.reload();
}

document.addEventListener('DOMContentLoaded', function() {
  loadOptions();
  document.getElementById('save').addEventListener('click', saveOptions);
  document.getElementById('clear').addEventListener('click', clearOptions);
});
