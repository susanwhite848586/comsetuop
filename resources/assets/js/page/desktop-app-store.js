jQuery(document)
  .ready(function() {
    printerSetupUrl = jQuery("#printerSetupUrl").val();
    printerTroubleshootUrl = jQuery("#printerTroubleshootUrl").val();
    printerVideoUrl = jQuery("#printerVideoUrl").val();
    appStoreUrl = "";
    if (document.getElementById("appStoreUrl")) {
      appStoreUrl = jQuery("#appStoreUrl").val();
    }

    jQuery("#appstore-button").on("click", function(e) {
      var deviceId = jQuery("#deviceId").val();

      var pageName = "click_to_appstore";
      if (deviceId != "") {
        pageName = pageName + "_" + deviceId.toLowerCase();
      }
      pageName = pageName + "_" + jQuery("#osType").val();

      // UDL tracking.
      dataLayer.push({
        event: "e_linkClick", linkPlacement: "body", linkID: pageName
      });

      setTimeout(pageRedirect(appStoreUrl), 500);
    });

    var pageRedirect = function(url) {
      window.location.href = url;
    };

    jQuery("#support-url").on("click", function() {
      this.target = "_blank";
      this.href = printerSetupUrl;
    });
    jQuery("#printer-troubleshoot-url").on("click", function() {
      this.target = "_blank";
      this.href = printerTroubleshootUrl;
    });
    jQuery("#printer-setup-url").on("click", function() {
      this.target = "_blank";
      this.href = printerVideoUrl;
    });

    if (jQuery("#osType").val() != "windows") {
      jQuery(".content-container").css("height", "500px");
      jQuery(".connection-copy-container").css("display", "none");
    }

    attachClickToExpandHeight(".collapsible-list-header", ".collapsible-list-content", 250);
  });

jQuery(window).load(function() {
  checkCLC();
});
