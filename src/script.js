function findVideoPlayerInChzzk() {
  const videoList = Array.from(document.querySelectorAll("video"));

  videoList
    .filter((video) => {
      if (video.disablePictureInPicture) {
        video.disablePictureInPicture = false;
      }
    })
    .filter((video) => video.readyState !== 0);

  if (videoList.length === 0) {
    return;
  }

  return videoList[0];
}

async function requestPictureInPictureMode(video) {
  await video.requestPictureInPicture();
  video.setAttribute("pipenabled", true);
  video.addEventListener(
    "leavepictureinpicture",
    () => {
      video.removeAttribute("pipenabled");
    },
    { once: true }
  );

  new ResizeObserver(updatePictureInPictureVideo).observe(video);
}

function updatePictureInPictureVideo(entries, observer) {
  const observedVideo = entries[0].target;

  if (!document.querySelector("[pipenabled]")) {
    observer.unobserve(observedVideo);
    return;
  }

  const video = findVideoPlayerInChzzk();

  if (video && !video.hasAttribute("pipenabled")) {
    observer.unobserve(observedVideo);
    requestPictureInPictureMode(video);
  }
}

(async () => {
  const video = findVideoPlayerInChzzk();
  if (!video) {
    return;
  }

  if (video.hasAttribute("pipenabled")) {
    document.exitPictureInPicture();
    return;
  }

  await requestPictureInPictureMode(video);
})();
