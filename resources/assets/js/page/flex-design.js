var attachClickToExpandHeight = function(selectorClick, selectorExpand, duration) {
  jQuery(selectorClick.toString()).click(function() {
    var elementExpand = jQuery(this).siblings(selectorExpand.toString());
    if (elementExpand.height() === 0) {
      jQuery(this).addClass("open");
      autoHeightAnimate(elementExpand, duration);
    } else {
      jQuery(this).removeClass("open");
      elementExpand.stop().animate({height: "0"}, duration, "linear", function() {
        elementExpand.removeClass("open");
      });
    }
  });
};

var autoHeightAnimate = function(element, time) {
  var curHeight = element.height(); // Get Default Height
  var autoHeight = element.css("height", "auto").height(); // Get Auto Height
  element.height(curHeight); // Reset to Default Height
  element.stop().animate({height: autoHeight}, time, "linear", function() {
    element.css("height", "auto");
    element.addClass("open");
  }); // Animate to Auto Height
};
