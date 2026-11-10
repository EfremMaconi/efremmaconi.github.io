/*
* Greedy Navigation
*
* http://codepen.io/lukejacksonn/pen/PwmwWV
*
*/

var $nav = $('#site-nav');
var $btn = $('#site-nav button');
var $vlinks = $('#site-nav .visible-links');
var $vlinks_persist_tail = $vlinks.children("*.persist.tail");
var $hlinks = $('#site-nav .hidden-links');


var phoneMode = false;
var $pageLinks = $vlinks.children(':not(.persist)');

function updateNav() {
  var phone = window.matchMedia('(max-width: 767px)').matches;
  if (phone !== phoneMode) {
    $pageLinks.detach();
    $hlinks.empty().addClass('hidden');
    $btn.removeClass('close').attr('aria-expanded', 'false');
    if (phone) {
      $hlinks.append(document.getElementById('phone-menu-items').content.cloneNode(true));
    } else {
      $pageLinks.insertBefore($vlinks_persist_tail);
    }
    phoneMode = phone;
  }
  if (phone) {
    $btn.removeClass('hidden');
  } else {
    $btn.addClass('hidden');
  }
  updateHeaderSpacing();
}

function updateHeaderSpacing() {
  // update masthead height and the body/sidebar top padding
  var mastheadHeight = $('.masthead').height();
  $('body').css('padding-top', mastheadHeight + 'px');
  if ($(".author__urls-wrapper button").is(":visible")) {
    $(".sidebar").css("padding-top", "");
  } else {
    $(".sidebar").css("padding-top", mastheadHeight + "px");
  }

}

// Window listeners

$(window).on('resize', function () {
  updateNav();
});
window.addEventListener("orientationchange", function () {
  updateNav();
});

$btn.on('click', function () {
  $hlinks.toggleClass('hidden');
  $(this).toggleClass('close').attr('aria-expanded', !$hlinks.hasClass('hidden'));
});

updateNav();