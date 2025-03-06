function Menu(e) {
  let list = document.querySelector("ul");
  let menuIcon = document.querySelector(".fa-bars");
  let closeIcon = document.querySelector(".fa-xmark");

  if (e.name === "menu") {
    e.name = "close";
    list.classList.add("top-[80px]", "opacity-100");
    menuIcon.style.display = "none";
    closeIcon.style.display = "inline-block";
    closeIcon.style.width = "auto";
  } else {
    e.name = "menu";
    list.classList.remove("top-[80px]", "opacity-100");
    menuIcon.style.display = "inline-block";
    closeIcon.style.display = "none";
    closeIcon.style.width = "0";
  }
}



document.addEventListener('DOMContentLoaded', function() {
  const successMessage = document.querySelector('.flash-success');
  const errorMessage = document.querySelector('.flash-error');

  if (successMessage && successMessage.textContent.trim()) {
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 1500);
  }
  
  if (errorMessage && errorMessage.textContent.trim()) {
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 1500);
  }

  if (successMessage && errorMessage) {
    if (successMessage.textContent.trim()) {
      errorMessage.style.display = 'none';
    } else if (errorMessage.textContent.trim()) {
      successMessage.style.display = 'none';
    }
  }
});


