var app = new Framework7({
  el: '#app',
  name: 'iRespring',
  id: 'com.Outlander.irespring',
  theme: 'ios',
  serviceWorker: {

         path: "./service-worker.js"

      },
  panel: {
    swipe: true,
  },
});

var mainView = app.views.create('.view-main');
function checkiOSCompatibility() {
  function getiOSVersion() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      const match = userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
      if (match) {
        const major = parseInt(match[1], 10);
        const minor = parseInt(match[2] || "0", 10);
        const patch = parseInt(match[3] || "0", 10);
        return { major, minor, patch };
      }
    }
    return null;
  }

  const iOSVersion = getiOSVersion();
  if (iOSVersion) {
    const { major, minor, patch } = iOSVersion;
    if (
      major > 15 ||
      (major === 15 && (minor > 8 || (minor === 8 && patch > 3)))
    ) {
      app.dialog.alert("This app is not compatible with your iOS/iPadOS version.");
    }
  }
}

checkiOSCompatibility();

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

if ("serviceWorker" in navigator) {

   navigator.serviceWorker.getRegistration().then(registration => {

      if (!registration) {

         navigator.serviceWorker.register("service-worker.js").then(() => {}).catch(() => {});

      }

   });

}
