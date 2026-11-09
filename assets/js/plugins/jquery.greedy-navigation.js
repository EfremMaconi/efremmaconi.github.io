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

var breaks = [];
var phoneMode = false;
var $pageLinks = $vlinks.children(':not(.persist)');

function updateNav() {
  var phone = window.matchMedia('(max-width: 767px)').matches;
  if (phone !== phoneMode) {
    $pageLinks.detach();
    $hlinks.empty().addClass('hidden');
    $btn.removeClass('close').attr('aria-expanded', 'false');
    breaks = [];
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
    updateOverflow();
  }
  updateHeaderSpacing();
}

function updateOverflow() {

  var availableSpace = $btn.hasClass('hidden') ? $nav.width() : $nav.width() - $btn.width() - 30;

  // The visible list is overflowing the nav
  if ($vlinks.width() > availableSpace) {

    while ($vlinks.width() > availableSpace && $vlinks.children("*:not(.persist)").length > 0) {
      // Record the width of the list
      breaks.push($vlinks.width());

      // Move item to the hidden list
      $vlinks.children("*:not(.persist)").last().prependTo($hlinks);

      availableSpace = $btn.hasClass("hidden") ? $nav.width() : $nav.width() - $btn.width() - 30;

      // Show the dropdown btn
      $btn.removeClass("hidden");
    }

    // The visible list is not overflowing
  } else {

    // There is space for another item in the nav
    while (breaks.length > 0 && availableSpace > breaks[breaks.length - 1]) {
      // Move the item to the visible list
      if ($vlinks_persist_tail.children().length > 0) {
        $hlinks.children().first().insertBefore($vlinks_persist_tail);
      } else {
        $hlinks.children().first().appendTo($vlinks);
      }
      breaks.pop();
    }

    // Hide the dropdown btn if hidden list is empty
    if (breaks.length < 1) {
      $btn.addClass('hidden');
      $btn.removeClass('close');
      $hlinks.addClass('hidden');
    }
  }

  // Keep counter updated
  $btn.attr("count", breaks.length);

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