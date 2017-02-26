/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.fullscreen');

//Functions
function togglePlay() {
    video.paused ? video.play() : video.pause();
}

function updateButton () {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip () {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate () {
    video[this.name] = this.value;
}

function handleProgress () {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub (e) {
    var scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime; 
}

function goFullScreen () {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
}

//Events listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(btn => btn.addEventListener('click', skip));

ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpdate);
    range.addEventListener('mousemove', handleRangeUpdate)
});

fullScreen.addEventListener('click', goFullScreen);

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => isClickDown && scrub(e));

let isClickDown = false;
progress.addEventListener('mousedown', () => isClickDown = true);
progress.addEventListener('mouseup', () => isClickDown = false);