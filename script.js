const videoElement = document.getElementById("video");
const pipBtn = document.getElementById("pip");

// Prompt to select media stream, pass to video element, then play
function selectMediaStream() {
  return new Promise(async (resolve, reject) => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia();
      videoElement.srcObject = mediaStream;
      videoElement.onloadedmetadata = () => {
        videoElement.play();
        resolve();
      };
    } catch (err) {
      // catch err here
      reject();
    }
  });
}

pipBtn.addEventListener("click", () => {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
    pipBtn.textContent = "START PIP";
    location.reload();
  } else {
    pipBtn.textContent = "STOP PIP";
    selectMediaStream().then(async () => {
      await videoElement.requestPictureInPicture();
    });
  }
});

if (!document.pictureInPictureEnabled) {
  pipBtn.disabled = true;
  pipBtn.textContent = "PIP is Disabled";
  pipBtn.classList.add("disabled");
}
