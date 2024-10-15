jQuery(document)
  .ready(function() {
  // fix for safari browser back button behaviour
    jQuery(window).bind("pageshow", function(event) {
      if (event.originalEvent.persisted) {
        window.location.reload();
      }
    });

    jQuery("#btn-begin").prop("disabled", true);

    checkCLC();

    var documentLoad = Date.now();
    var selectedPrinterModel = "";
    var selectedPrinterSKU = "";
    var printerModel = "";
    var localePath = document.getElementById("localePath").value;
    var openCLC = window.location.search.replace(/.*openCLC=/, "");
    var printerImageUrl = document.getElementById("printers-image").src;
    var printerSetupUrl = document.getElementById("printerSetupUrl").value;
    var hpsmartUrl={
      "123-test.hpoobe.com": "https://www.hpsmartpie.com/setup/",
      "123-stage.hpoobe.com": "https://www.hpsmartstage.com/setup/"
    }[window.location.hostname]||"https://www.hpsmart.com/setup/";
    var hpstartUrl={
      "123-test.hpoobe.com": "https://onboardingcenter.pie.portalshell.int.hp.com/",
      "123-stage.hpoobe.com": "https://onboardingcenter.stage.portalshell.int.hp.com/"
    }[window.location.hostname]||"https://start.hp.com/";

    if (navigator.userAgent.toLowerCase().indexOf("trident") != -1) {
      jQuery("#printer-searchlist").val("");
    }

    var redirectPage = function(url) {
      selectedPrinterModel = "";
      selectedPrinterSKU = "";
    //   window.location.href = url;
    };

    var invokePrinterUrl = function() {
    //   var url = localePath + "/devices/" + selectedPrinterModel;

      // UDL tracking.
      dataLayer.push({
        event: "e_linkClick",
        linkPlacement: "body",
        linkID: "click_begin_button_" + selectedPrinterModel
      });
      setTimeout(redirectPage(url), 500);
    };

    var otherPrinterDownloadingSW = function() {
    // UDL tracking.
      dataLayer.push({
        event: "e_linkClick",
        linkPlacement: "body",
        linkID: "click_begin_button_" + selectedPrinterModel
      });
      var url = localePath + "/devices/" + selectedPrinterModel + "/downloading";
      setTimeout(redirectPage(url), 500);
    };

    // Redirect to HP Smart Page
    var hpSmartRedirect = function() {
    // UDL tracking.
      dataLayer.push({
        event: "e_linkClick",
        linkPlacement: "body",
        linkID: "click_begin_button_" + selectedPrinterModel
      });
      setTimeout(redirectPage(hpsmartUrl), 500);
    };

    // Redirect to HP start Page
    var hpStartRedirect = function(sku) {
      // UDL tracking.
      dataLayer.push({
        event: "e_linkClick",
        linkPlacement: "body",
        linkID: "click_begin_button_" + selectedPrinterModel
      });
      setTimeout(redirectPage(hpstartUrl + sku), 500);
    };

    jQuery("#support-url").on("click", function() {
      this.target = "_blank";
      this.href = printerSetupUrl;
    });

    jQuery("#btn-begin-link").on("click", function() {
      var timeSinceLoad = Date.now();
      if (typeof (performance) !== "undefined" && typeof (performance.now) !== "undefined") {
        timeSinceLoad = Math.ceil(performance.now());
      } else {
        timeSinceLoad -= documentLoad;
      }
      /* TODO replace GA timing with UDL equivalent, once identified.
    ga('send','timing','Search Page','search button interaction', timeSinceLoad);
    */

      if (selectedPrinterModel.indexOf("other") !== -1) {
        otherPrinterDownloadingSW();
      } else if (MarconiPrintersDeviceIDs.indexOf(selectedPrinterModel.toUpperCase()) !== -1) {
        hpStartRedirect(selectedPrinterSKU);
      } else if (SMBPrintersDeviceIDs.indexOf(selectedPrinterModel.toUpperCase()) !== -1
          || MarconiPDLPrintersDeviceIDs.indexOf(selectedPrinterModel.toUpperCase()) !== -1) {
        hpSmartRedirect();
      } else if (selectedPrinterModel !== "") {
        invokePrinterUrl();
      }
    });

    function matchFound(item, query) {
      var inputTokens = query.split(" ");

      for (i = 0; i < inputTokens.length; i++) {
        if (item.toLowerCase().indexOf(inputTokens[i].toLowerCase()) == -1) {
          return false;
        }
      }
      return true;
    }

    var deviceNamesList = deviceNamesJson["data"];
    var series = [];
    var derivatives = [];

    for (i = 0; i < deviceNamesList.length; i++) {
      if (deviceNamesList[i].toLowerCase().indexOf("series") > -1) {
        series.push(deviceNamesList[i]);
      } else {
        if (deviceNamesList[i] != "HP LaserJet Printers") {
          derivatives.push(deviceNamesList[i]);
        }
      }
    }

    jQuery.typeahead({
      input: "#printer-searchlist",
      searchOnFocus: true,
      debug: false,
      maxItem: 10,
      highlight: true,
      order: "asc",
      cancelButton: false,
      groupOrder: ["series", "derivatives"],
      source: {
        series: {
          data: function() {
            return series;
          }
        }, derivatives: {
          data: function() {
            return derivatives;
          }
        }
      },
      filter: function(item, displayKey) {
        return matchFound(displayKey, this.query);
      },
      callback: {
        onSubmit: function(node, form, item, event) {
          if (selectedPrinterModel.indexOf("other") != -1) {
            otherPrinterDownloadingSW();
            return false;
          } else if (MarconiPrintersDeviceIDs.indexOf(selectedPrinterModel.toUpperCase()) !== -1) {
            hpStartRedirect(selectedPrinterSKU);
          } else if (SMBPrintersDeviceIDs.indexOf(selectedPrinterModel.toUpperCase()) !== -1
              || MarconiPDLPrintersDeviceIDs.indexOf(selectedPrinterModel.toUpperCase()) !== -1) {
            hpSmartRedirect();
            return false;
          } else if (selectedPrinterModel != "") {
            invokePrinterUrl();
            return false;
          } else {
            var searchField = jQuery("#printer-searchlist");
            searchField.focus();
            searchField.trigger("input.typeahead");
            return false;
          }
        }, onClick: function(node, a, item, event) {
          var deviceIndex = -1;
          printerModel = item.display;
          var deviceNamesList = deviceNamesJson["data"];
          for (var i = 0; i < deviceNamesList.length; i++) {
            if (printerModel == deviceNamesList[i]) {
              deviceIndex = i;
              break;
            }
          }

          if (printerModel.indexOf("*") >= 0) {
            printerModel = printerModel.substring(0, printerModel.indexOf("*"));
          }
          jQuery(".printer-model").html(printerModel);
          selectedPrinterModel = deviceIds[deviceIndex].toLowerCase();
          selectedPrinterSKU = deviceSKUs[deviceIndex];

          jQuery.ajax({
            type: "GET", url: "/dev/api/v1/devices/" + selectedPrinterModel, data: {
              "rURL": window.location.href
            }, dataType: "json"
          }).done(function(data) {
            jQuery("#btn-begin").prop("disabled", false);
            if (MarconiPrintersDeviceIDs.indexOf(selectedPrinterModel.toUpperCase()) !== -1
            || MarconiPDLPrintersDeviceIDs.indexOf(selectedPrinterModel.toUpperCase()) !== -1) {
              jQuery(".welcome-selected-printer").attr("src", "./resources/assets/img/printer_icon_gray.png");
            } else {
              jQuery(".welcome-selected-printer").attr("src", data.imageUrl);
            }
            if (selectedPrinterModel.indexOf("pagewide") != -1 || selectedPrinterModel.indexOf(
              "other") != -1) {
              jQuery("#ljAlertMessage").html("*" + data.deviceText);
            } else {
              jQuery("#ljAlertMessage").html("&nbsp;");
            }
          }).fail(function() {
          // Error handling
          });
        }, onResult: function(node, query, result, resultCount) {
          function enableSubmit() {
            jQuery.ajax({
              type: "GET", url: "/dev/api/v1/devices/" + selectedPrinterModel, data: {
                "rURL": window.location.href
              }, dataType: "json"
            }).done(function(data) {
              jQuery("#btn-begin").prop("disabled", false);
              if (MarconiPrintersDeviceIDs.indexOf(selectedPrinterModel.toUpperCase()) !== -1
              || MarconiPDLPrintersDeviceIDs.indexOf(selectedPrinterModel.toUpperCase()) !== -1) {
                jQuery(".welcome-selected-printer").attr("src", "./resources/assets/img/printer_icon_gray.png");
              } else {
                jQuery(".welcome-selected-printer").attr("src", data.imageUrl);
              }
              if (selectedPrinterModel.indexOf("pagewide") != -1 || selectedPrinterModel.indexOf(
                "other") != -1) {
                jQuery("#ljAlertMessage").html("*" + data.deviceText);
              } else {
                jQuery("#ljAlertMessage").html("&nbsp;");
              }
            }).fail(function() {
            // Error handling
            });
          }

          if (resultCount == 1) {
            printerModel = result[0].display;
            var deviceIndex = -1;
            var deviceNamesList = deviceNamesJson["data"];

            for (var i = 0; i < deviceNamesList.length; i++) {
              if (printerModel == deviceNamesList[i]) {
                deviceIndex = i;
                break;
              }
            }

            if (printerModel.indexOf("*") >= 0) {
              printerModel = printerModel.substring(0, printerModel.indexOf("*"));
            }
            jQuery(".printer-model").html(printerModel);
            selectedPrinterModel = deviceIds[deviceIndex].toLowerCase();
            selectedPrinterSKU = deviceSKUs[deviceIndex];
            enableSubmit();
          } else {
            var bigOid = null;
            var isSingleSeries = true;
            var deviceNamesList = deviceNamesJson["data"];

            (function() {
              if (resultCount == 0) {
                isSingleSeries = false;
                return;
              }
              for (var i = 0; i < resultCount; i++) {
                for (var j = 0; j < deviceNamesList.length; j++) {
                  if (result[i].display == deviceNamesList[j]) {
                    if (bigOid == null) {
                      selectedPrinterModel = deviceIds[j].toLowerCase();
                      selectedPrinterSKU = deviceIds[j];
                      bigOid = bigOids[j];
                    } else if (bigOid != bigOids[j]) {
                      isSingleSeries = false;
                      return;
                    }
                  }
                }
              }
            })();

            if (isSingleSeries) {
              enableSubmit();
            } else {
              jQuery("#btn-begin").prop("disabled", true);
              jQuery("#ljAlertMessage").html("&nbsp;");
              jQuery(".welcome-selected-printer").attr("src", printerImageUrl);
              selectedPrinterModel = "";
              selectedPrinterSKU = "";
            }
          }
        }
      }
    });
    $(".input-cancel").click(function(event) {
      $("input#printer-searchlist").val("");
      $(".input-cancel").css("visibility", "hidden");
      jQuery("#ljAlertMessage").html("&nbsp;");
      jQuery(".welcome-selected-printer").attr("src",
        "./resources/assets/img/defaultPrinterSetup.png");
      jQuery("#btn-begin").prop("disabled", true);
    });
    $(window).click(function() {
      $("input#printer-searchlist").css("border-radius", "12px");
      $("input#printer-searchlist").click(function(event) {
        event.stopPropagation();
      });
    });
    $("input#printer-searchlist").keyup(function() {
      if ($(this).val().length) {
        $(".input-cancel").css("visibility", "visible");
      } else {
        $(".input-cancel").css("visibility", "hidden");
      }

      if ($(".typeahead__list").length) {
        if ($(".typeahead__list").css("display") !== "none") {
          $("input#printer-searchlist").css("border-radius", "12px 12px 0 0");
        } else {
          $("input#printer-searchlist").css("border-radius", "12px");
        }
      }
    });

    setUpCarousel();

    jQuery("#device-not-listed").on("click", "a", function() {
    // UDL tracking.
      dataLayer.push({
        event: "e_linkClick", linkPlacement: "body", linkID: "click_other-printers"
      });
    });

    function arrayFrom(arr, callbackFn, thisArg) {
      var arNew = []; var k = []; // used for convert Set to an Array
      var i = 0;

      for (; i < arr.length; i++) {
        arNew[i] = callbackFn ? callbackFn.call(thisArg, arr[i], i, arr) : arr[i];
      }

      return arNew;
    }

    Array.from = Array.from || arrayFrom; // We set it as polyfill

    // List of DeviceIDs of SMB Printers will be re-directed to hpsmart.com
    var SMBPrintersDeviceIDs = ["LJ4002DWE", "LJ4003DN", "LJ4003DW", "LJ4003N", "LJ4004D", "LJ4004DN",
      "LJ4004DW", "LJ4102FDNE", "LJ4103DW", "LJ4103FDN", "LJ4103FDW", "LJ4104DW", "LJ4104FDN",
      "LJ4104FDW", "LJ4001SERIES", "LJ4101SERIES", "LJ4001NE", "LJ4001N", "LJ4001DNE", "LJ4001DN",
      "LJ4001DWE", "LJ4001DW", "LJ4002NE", "LJ4002N", "LJ4002DNE", "LJ4002DN", "LJ4002DW", "LJ4002D",
      "LJ4101FDNE", "LJ4101FDN", "LJ4101FDWE", "LJ4101FDW", "LJ4101DWE", "LJ4101DW", "LJ4102DWE",
      "LJ4102DW", "LJ4102FDN", "LJ4102FDWE", "LJ4102FDW", "LJ3001DW", "LJ3001DWE", "LJ3001SERIES",
      "LJ3002DN", "LJ3002DW", "LJ3002DWE", "LJ3101FDW", "LJ3101FDWE", "LJ3101SERIES", "LJ3003DN", "LJ3003DW",
      "LJ3004DN", "LJ3004DW", "LJ3103FDW", "LJ3102FDN", "LJ3102FDW", "LJ3103FDN", "LJ3104FDN", "LJ3104FDW",
      "LJP3102FDWE"];

    // List of DeviceIDs of Marconi Printers will be re-directed to start.hp.com/[PrinterSKU]
    var MarconiPrintersDeviceIDs = ["OJPRO9110E", "OJPRO9120", "OJPRO9123", "OJPRO9120E", "OJPRO9122E", "OJPRO9125E",
      "OJPRO9128E", "OJPRO9130", "OJPRO9133", "OJPRO9135E", "OJPRO9720", "OJPRO9720E", "OJPRO9730", "OJPRO9730E",
      "OJET8122E", "OJPRO8120E", "OJPRO8122E", "OJPRO8124E", "OJPRO8125E", "OJPRO8120", "OJPRO8123",
      "OJPRO8130E", "OJPRO8132E", "OJPRO8135E", "OJPRO8138E", "OJPRO8139E", "OJPRO8130", "OJPRO8133"];

    // List of DeviceIDs of Marconi Printers will be re-directed to start.hp.com/[PrinterSKU]
    var MarconiPDLPrintersDeviceIDs = ["OJPRO9110B", "OJPRO9117B", "OJPRO9120B", "OJPRO9130B", "OJPRO9110BSERIES",,
      "OJPRO9120BSERIES", "OJPRO9130BSERIES"];
  });

function setUpCarousel() {
  var overlayCarousel = jQuery("#overlayCarousel");

  jQuery("#whereis-printer-model-label").click(function() {
    jQuery("#one23-overlay").addClass("carousel-overlay").fadeIn(200, function() {
      var xPosition = (jQuery(window).width() - 600) / 2;
      jQuery("#overlayCarousel").fadeIn(250).css({
        display: "flex", left: xPosition
      });
    });
  });

  jQuery(".owl-carousel").owlCarousel({
    rtl: jQuery("html").attr("dir")==="rtl",
    items: 1,
    center: true,
    loop: true,
    nav: true,
    navText: ["<div class='nav-btn prev-slide'><img src=\"./resources/assets/img/arrow_left.svg\"></div>",
      "<div class='nav-btn next-slide'><img src=\"./resources/assets/img/arrow_right.svg\"></div>"]
  });

  // Overlay reposition when resizing
  var $window = jQuery(window);
  var lastWindowWidth = $window.width();
  $window.resize(function() {
    if (overlayCarousel.is(":visible")) {
      var windowWidth = $window.width();
      if (lastWindowWidth !== windowWidth) {
        var xPosition = 0;
        if (windowWidth > 600) {
          xPosition = (jQuery(window).width() - 600) / 2;
        }
        overlayCarousel.css({left: xPosition});
        lastWindowWidth = windowWidth;
      }
    }
  });

  /* Overlay close button functionality*/
  jQuery("#closeCarousel").on("click", function() {
    if (overlayCarousel.is(":visible")) {
      overlayCarousel.fadeOut(200, function() {
        jQuery("#one23-overlay").removeClass("carousel-overlay");
      });
    }
  });
}
