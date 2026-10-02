const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navigation.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
});

document.querySelector('#planner-form').addEventListener('submit', (event) => {
  event.preventDefault();
  window.location.href = 'curtains-planner.html';
});

const videoModal = document.querySelector('#video-modal');
const videoPlayer = document.querySelector('#video-player');
const videoModalTitle = document.querySelector('#video-modal-title');
const videoModalClose = document.querySelector('#video-modal-close');

function openVideo(videoId, title) {
  const origin = window.location.origin && window.location.origin !== 'null'
    ? `&origin=${encodeURIComponent(window.location.origin)}`
    : '';
  videoModalTitle.textContent = title || 'AK Interiors Video';
  videoPlayer.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1&modestbranding=1${origin}`;
  videoModal.classList.add('open');
  videoModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('video-open');
  videoModalClose.focus();
}

function closeVideo() {
  videoModal.classList.remove('open');
  videoModal.setAttribute('aria-hidden', 'true');
  videoPlayer.src = '';
  document.body.classList.remove('video-open');
}

document.querySelectorAll('.js-video').forEach((button) => {
  button.addEventListener('click', () => openVideo(button.dataset.video, button.dataset.title));
});

videoModalClose.addEventListener('click', closeVideo);
videoModal.addEventListener('click', (event) => {
  if (event.target === videoModal) closeVideo();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && videoModal.classList.contains('open')) closeVideo();
});
