tailwind.config = {
  theme: {
    extend: {
      colors: {
        denBlue: "#1d61e7",
        denGreen: "#16a34a",
        denDarkBlue: "#0b192c",
        denCardBlue: "#172740",
      },
    },
  },
};

// 1. HERO SLIDESHOW DATA
const slides = [
  {
    badge: "Virtue Series – Kinder",
    title: "Loving God & Others",
    desc: "Early virtues and character building for young learners.",
    price: "₱250",
    image: "bookkinder.png",
  },
  {
    badge: "Virtue Series – Grade 1",
    title: "Good Manners, Matters",
    desc: "Inspiring good manners in everyday life — foundational virtues.",
    price: "₱250",
    image: "bookgrade1.png",
  },
  {
    badge: "Virtue Series – Grade 3",
    title: "Leading with Integrity",
    desc: "Inspiring good manners through leadership and honest living.",
    price: "₱250",
    image: "bookgrade3.png",
  },
  {
    badge: "Virtue Series – Grade 7",
    title: "Walking in Faith",
    desc: "Developing identity and spiritual foundation for early teens.",
    price: "₱280",
    image: "bookgrade7.png",
  },
  {
    badge: "Senior High – Grade 12",
    title: "Faithful Ambassadors",
    desc: "Preparing graduates for higher education and societal leadership.",
    price: "₱300",
    image: "bookgrade12.png",
  },
];

let currentIndex = 0;

function renderDots() {
  const dotsContainer = document.getElementById("dots-container");
  if (!dotsContainer) return;

  dotsContainer.innerHTML = slides
    .map(
      (_, i) => `
    <button onclick="goToSlide(${i})" class="h-2.5 rounded-full transition-all ${i === currentIndex ? "bg-denGreen w-6" : "bg-white/50 w-2.5"}"></button>
  `,
    )
    .join("");
}

function updateSlide() {
  const slide = slides[currentIndex];
  document.getElementById("slide-badge").innerText = slide.badge;
  document.getElementById("slide-title").innerText = slide.title;
  document.getElementById("slide-desc").innerText = slide.desc;
  document.getElementById("slide-price").innerText = slide.price;

  const imgElement = document.getElementById("slide-cover-img");
  imgElement.src = slide.image;

  renderDots();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlide();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlide();
}

function goToSlide(index) {
  currentIndex = index;
  updateSlide();
}

// 2. AUTO-SLIDING BIBLE VERSES DATA
const bibleVerses = [
  {
    text: '"I can do all things through Christ who strengthens me."',
    ref: "— Philippians 4:13",
  },
  {
    text: '"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."',
    ref: "— John 3:16",
  },
  {
    text: '"Trust in the Lord with all your heart and lean not on your own understanding."',
    ref: "— Proverbs 3:5",
  },
  {
    text: '"The Lord is my shepherd; I shall not want."',
    ref: "— Psalm 23:1",
  },
  {
    text: '"Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."',
    ref: "— Joshua 1:9",
  },
];

let verseIndex = 0;

function rotateVerse() {
  const container = document.getElementById("verse-container");
  const verseText = document.getElementById("verse-text");
  const verseRef = document.getElementById("verse-ref");

  if (!container || !verseText || !verseRef) return;

  // Fade out
  container.classList.remove("opacity-100");
  container.classList.add("opacity-0");

  setTimeout(() => {
    verseIndex = (verseIndex + 1) % bibleVerses.length;
    verseText.innerText = bibleVerses[verseIndex].text;
    verseRef.innerText = bibleVerses[verseIndex].ref;

    // Fade in
    container.classList.remove("opacity-0");
    container.classList.add("opacity-100");
  }, 500);
}

// 3. INITIALIZE EVENT LISTENERS
document.addEventListener("DOMContentLoaded", () => {
  // Hero Slider setup
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");

  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  setInterval(nextSlide, 4000);
  updateSlide();

  // Bible Verse Auto-Rotate setup (Every 5 seconds)
  setInterval(rotateVerse, 5000);
});
