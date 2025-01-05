// SlideBar
const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const indicators = document.querySelectorAll(".indicator");

let currentIndex = 0;

function updateSlider() {
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentIndex);
  });
}

prev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slide.length) % slide.length;
  updateSlider();
  resetAutoSlide();
});

next.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slide.length;
  updateSlider();
  resetAutoSlide();
});

indicators.forEach((indicator) => {
  indicator.addEventListener("click", () => {
    currentIndex = parseInt(indicator.dataset.slide);
    updateSlider();
    resetAutoSlide();
  });
});

// Automatic slide function
function autoSlide() {
  currentIndex = (currentIndex + 1) % slide.length;
  updateSlider();
}

let autoSlideInterval = setInterval(autoSlide, 3000); // Change slide every 3 seconds

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(autoSlide, 4000);
}

// Initialize the slider
updateSlider();

//////////////
// <!-- Disabel scrolling -->
const song = document.querySelector("#song");
const audioIconWrapper = document.querySelector(".audio-icon-wrapper");
let isPlaying = false;
const audioIcon = document.querySelector(".audio-icon-wrapper i");

function disableScroll() {
  // Menambahkan style overflow hidden ke elemen body
  document.body.style.overflow = "hidden";

  // Menonaktifkan scroll behavior agar smooth scroll tidak mempengaruhi hasil
  document.documentElement.style.scrollBehavior = "auto";
}
function enableScroll() {
  window.onscroll = function () {
    // Menambahkan style overflow kembali ke awal ke elemen body
    document.body.style.overflow = "";

    document.documentElement.style.scrollBehavior = "smooth";

    playAudio();
  };
}

function playAudio() {
  song.volume = 0.7;
  audioIconWrapper.style.display = "flex";
  song.play();
  isPlaying = true;
}

audioIconWrapper.onclick = function () {
  if (isPlaying) {
    song.pause();
    audioIcon.classList.remove("bi-disc");
    audioIcon.classList.add("bi-pause-circle");
  } else {
    song.play();
    audioIcon.classList.add("bi-disc");
    audioIcon.classList.remove("bi-pause-circle");
  }

  isPlaying = !isPlaying;
};

disableScroll();

////////////////////
// Fungsi untuk mengambil nilai parameter dari URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Fungsi untuk mengatur nama pada elemen <h3>
function setInvitedName() {
  const invitedElement = document.querySelector(".invited h3");

  // Ambil nilai parameter 'name' dari URL
  const nameFromUrl = getQueryParam("name");

  // Jika ada nilai, ubah teks pada elemen <h3>, jika tidak, gunakan default
  if (nameFromUrl) {
    invitedElement.textContent = decodeURIComponent(nameFromUrl);
  }
}

// Panggil fungsi saat halaman dimuat
window.onload = setInvitedName;
//contoh url
// http://127.0.0.1:3000/?name=Agung%20Sabranowo
