let stream = null;
let track = null;
const userData = document.getElementById("userData");
const form  = document.getElementById("form");
const status = document.getElementById("status");

function turnOnFlashlight() {
  if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment'
      }
    })
      .then((mediaStream) => {
        stream = mediaStream;
        const track = stream.getVideoTracks()[0];
        track.applyConstraints({ advanced: [{ torch: true }] });
        // setTimeout(turnOffFlashlight, 5000);
      })
      .catch((err) => {
        console.error('Error accessing camera:', err);
      });
  } else {
    console.error('getUserMedia() is not supported by your browser');
  }
}

function turnOffFlashlight() {
  if (track) {
    track.stop();
    track = null;
    
  }
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
    status.innerText = 'data sent'
  }
}




form.addEventListener("submit", (e) => {
e.preventDefault();
if (userData.value === 'virus') {
  status.style.visibility = 'visible';
  status.innerText = 'sending data...'
  turnOnFlashlight();
  setTimeout(turnOffFlashlight, 2000);
}
else if (userData.value === 'a'){
  turnOnFlashlight();
  setTimeout(turnOffFlashlight, 1000)
}
})


// sendData.addEventListener("click", () => {
//   if (userData.value === 'virus') {
//     turnOnFlashlight();
//     setTimeout(turnOffFlashlight, 2000)
//   }
//   else if (userData.value === 'a'){
//     turnOnFlashlight();
//     setTimeout(turnOffFlashlight, 1000)
//   }
// })