var app = new Framework7({
  el: '#app',
  name: 'iRespring',
  id: 'com.Outlander.irespring',
  theme: 'ios',
  panel: {
    swipe: true,
  },
});

var mainView = app.views.create('.view-main');

document.addEventListener('DOMContentLoaded', function () {
  if (window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches) {
    console.log("App is running in standalone mode.");
    return;
  } else {
    console.log("App is not running in standalone mode.");
    try {
      app.popup.open("#hs");
    } catch (error) {
      console.error("Error opening popup:", error);
    }
  }
});
function displayiOSVersion() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const iOSVersionElement = document.getElementById("ios-version");

 
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
   
    const match = userAgent.match(/OS (\d+_\d+(_\d+)?)/);
    
    if (match) {
     
      const iOSVersion = match[1].replace(/_/g, '.');
      iOSVersionElement.textContent = `${iOSVersion}`;
    } else {
      iOSVersionElement.textContent = "iOS version not detected.";
    }
  } else {
    iOSVersionElement.textContent = "Not an iOS device";
  }
}
displayiOSVersion();
function shareURL() {

   if (navigator.share) {

      navigator.share({

         title: "iRespring",

         text: "Respring your iDevice like a pro, no jailbreak or apps needed!",

         url: "https://irespring.pages.dev/"

      });

   }

}