let dropdown = $('#category');
dropdown.empty();
dropdown.append('<option selected="true" disabled>Choose category</option>');
dropdown.prop('selectedIndex', 0);

const url = 'http://localhost:3000/get/category';

// Populate dropdown with list of provinces
$.getJSON(url, function (data) {
  $.each(data, function (key, entry) {
    dropdown.append($('<option></option>').attr('value', entry.abbreviation).text(entry.name));
  })
});