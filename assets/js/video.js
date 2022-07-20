(function () {

    var formatTime = conference.formatTime;
    

    var videoSection = document.querySelector(".video");
    var video = videoSection.querySelector("video");
    var controls = videoSection.querySelector(".video-controls");
    var playButton = videoSection.querySelector(".video-play");
    var pauseButton = videoSection.querySelector(".video-pause");
    var time = videoSection.querySelector(".video-time");

    var ready = function () {
        controls.style.display = "block";
    };

    var play = function () {
        video.play();
        playButton.style.display = "none";
        pauseButton.style.display = "";
    };

    var pause = function () {
        video.pause();
        playButton.style.display = "";
        pauseButton.style.display = "none";
    };

    var updateTime = function () {
        time.textContent = formatTime(video.currentTime);
    };

    pauseButton.style.display = "none";

    video.addEventListener("loadeddata", ready, false);
    video.addEventListener("timeupdate", updateTime, false);
    playButton.addEventListener("click", play, false);
    pauseButton.addEventListener("click", pause, false);

} ());