
window.onload = function() {
  currentYear();
};

function currentYear(){
  const date = new Date();
  const autoDate = document.querySelector('#autoDate');
  autoDate.textContent = date.getFullYear();
};

$(document).ready(function () {
    $('div.hidden').fadeIn(1800).removeClass('hidden');
});
