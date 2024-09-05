const tracks = [
    { name: 'California Gurls - Katy Perry', file: 'songs/Katy Perry - California Gurls (Official Music Video) ft. Snoop Dogg.mp3' },
    { name: 'Ninja Tuna - Mr. Scruff', file: 'songs/Mr. Scruff - Kalimba (Ninja Tuna) (Full Length_Longer Intro).mp3' },
    { name: 'Time - Pink Floyd', file: 'songs/Pink Floyd â€“ Time (Official Audio).mp3' }
];

let currentTrackIndex = 0;
let isPlaying = false;

const audio = new Audio();
const trackNameElement = document.getElementById('track-name');
const trackTimeElement = document.getElementById('track-time');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

function loadTrack(index) {
    audio.src = tracks[index].file;
    trackNameElement.textContent = tracks[index].name;
    audio.load();
}

function updateTrackTime() {
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
    trackTimeElement.textContent = `${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`;
}

function playPauseTrack() {
    if (isPlaying) {
        audio.pause();
        playButton.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}


function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audio.play();
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audio.play();
}

playButton.addEventListener('click', playPauseTrack);
prevButton.addEventListener('click', prevTrack);
nextButton.addEventListener('click', nextTrack);
audio.addEventListener('timeupdate', updateTrackTime);
audio.addEventListener('ended', nextTrack);

// Load the first track initially
loadTrack(currentTrackIndex);
