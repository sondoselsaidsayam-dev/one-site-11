const dishes = [
  {
    name: "Vegetarian Pasta",
    description:
      "Fresh basil pesto folded through al dente pasta and seasonal greens.",
    photo:
      "https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=400&q=60",
    oldPrice: "$45.00",
    newPrice: "$18.00",
  },
  {
    name: "Smoked Salmon",
    description: "Norwegian salmon served with citrus glaze and microgreens.",
    photo:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=400&q=60",
    oldPrice: "$52.00",
    newPrice: "$22.00",
  },
  {
    name: "Truffle Burger",
    description: "Premium wagyu patty, black truffle mayo, and crisp greens.",
    photo:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=60",
    oldPrice: "$38.00",
    newPrice: "$19.00",
  },
];

let current = 0;

const nameEl = document.getElementById("dish-name");
const descEl = document.getElementById("dish-desc");
const imgEl = document.querySelector(".dish-photo img");
const oldPriceEl = document.getElementById("old-price");
const newPriceEl = document.getElementById("new-price");

const updateSlide = (index) => {
  const dish = dishes[index];
  nameEl.textContent = dish.name;
  descEl.textContent = dish.description;
  imgEl.src = dish.photo;
  imgEl.alt = dish.name;
  oldPriceEl.textContent = dish.oldPrice;
  newPriceEl.textContent = dish.newPrice;
};

document.querySelector(".prev").addEventListener("click", () => {
  current = (current - 1 + dishes.length) % dishes.length;
  updateSlide(current);
});

document.querySelector(".next").addEventListener("click", () => {
  current = (current + 1) % dishes.length;
  updateSlide(current);
});

setInterval(() => {
  current = (current + 1) % dishes.length;
  updateSlide(current);
}, 5000);

// Gallery Lightbox functionality
document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = [
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
  ];

  let currentGalleryIndex = 0;
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPrev = document.querySelector(".lightbox-nav.prev");
  const lightboxNext = document.querySelector(".lightbox-nav.next");

  if (!lightbox || !lightboxImage || !galleryItems.length) {
    console.error("Lightbox elements not found");
    return;
  }

  // Open lightbox when clicking on gallery item
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentGalleryIndex = index;
      lightboxImage.src = galleryImages[currentGalleryIndex];
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Close lightbox
  if (lightboxClose) {
    lightboxClose.addEventListener("click", () => {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  // Close lightbox when clicking on background
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Navigate to previous image
  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
      lightboxImage.src = galleryImages[currentGalleryIndex];
    });
  }

  // Navigate to next image
  if (lightboxNext) {
    lightboxNext.addEventListener("click", (e) => {
      e.stopPropagation();
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
      lightboxImage.src = galleryImages[currentGalleryIndex];
    });
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    } else if (e.key === "ArrowLeft") {
      currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
      lightboxImage.src = galleryImages[currentGalleryIndex];
    } else if (e.key === "ArrowRight") {
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
      lightboxImage.src = galleryImages[currentGalleryIndex];
    }
  });
});

// Contact Form Validation
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");

  if (!contactForm) return;

  const validateName = () => {
    const name = nameInput.value.trim();
    if (name.length < 3 || name.length > 15) {
      nameError.textContent = "Name must be 3-15 characters.";
      return false;
    }
    nameError.textContent = "";
    return true;
  };

  const validateEmail = () => {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      emailError.textContent = "Please enter your email.";
      return false;
    }
    if (!emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email.";
      return false;
    }
    emailError.textContent = "";
    return true;
  };

  const validateSubject = () => {
    const subject = subjectInput.value.trim();
    if (!subject) {
      subjectError.textContent = "Please enter a subject.";
      return false;
    }
    subjectError.textContent = "";
    return true;
  };

  const validateMessage = () => {
    const message = messageInput.value.trim();
    if (!message) {
      messageError.textContent = "Please enter a message.";
      return false;
    }
    messageError.textContent = "";
    return true;
  };

  nameInput.addEventListener("blur", validateName);
  nameInput.addEventListener("input", () => {
    if (nameError.textContent) {
      validateName();
    }
  });

  emailInput.addEventListener("blur", validateEmail);
  emailInput.addEventListener("input", () => {
    if (emailError.textContent) {
      validateEmail();
    }
  });

  subjectInput.addEventListener("blur", validateSubject);
  subjectInput.addEventListener("input", () => {
    if (subjectError.textContent) {
      validateSubject();
    }
  });

  messageInput.addEventListener("blur", validateMessage);
  messageInput.addEventListener("input", () => {
    if (messageError.textContent) {
      validateMessage();
    }
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      alert("Message sent successfully!");
      contactForm.reset();
      nameError.textContent = "";
      emailError.textContent = "";
      subjectError.textContent = "";
      messageError.textContent = "";
    }
  });
});
