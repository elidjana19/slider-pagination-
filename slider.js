const leftBtn = document.getElementById("prev");
const rightBtn = document.getElementById("next");

let imgs = document.querySelectorAll("img");
console.log(imgs);

const sliderContainer = document.querySelector(".slider-container");
const slider = document.getElementById("slider");

const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");

const paginationContainer = document.getElementById("pagination");

let index = 0;

function goNext() {
  console.log("next");
  if (index < imgs.length - 1) {
    index++;
  } else {
    index = 0; //back to first img
  }

  console.log(index);
  updateDisplay();
}

function goPrev() {
  console.log("prev");
  if (index > 0) {
    index--;
  } else {
    index = imgs.length - 1; // back to the last img
  }

  console.log(index);
  updateDisplay();
}

leftBtn.addEventListener("click", goPrev);
rightBtn.addEventListener("click", goNext);

function updateDisplay() {
  imgs.forEach((img, i) => {
    img.style.display = i === index ? "block" : "none";
  });

  const dots = document.querySelectorAll(".pagination-dot");

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function createPaginationDots() {
  paginationContainer.innerHTML = "";
  imgs.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("pagination-dot");
    dot.addEventListener("click", () => {
      index = i;
      updateDisplay();
    });
    paginationContainer.appendChild(dot);
  });
}

function updateImgs() {
  imgs = document.querySelectorAll("img");
}

// upload
fileInput.addEventListener("change", (e) => {
  //e.target => input type file
  //e.target.files => all the files
  const files = e.target.files;

  for (let file of files) {
    const reader = new FileReader();
    reader.readAsDataURL(file); //read the file as url

    reader.onload = (e) => {
      const res = e.target.result; //retrieve the url
      console.log(res);

      const img = document.createElement("img");
      img.src = res;
      img.alt = file.name;

      slider.appendChild(img);

      updateImgs();
      createPaginationDots();
      updateDisplay();
    };
  }
});

uploadButton.addEventListener("click", () => {
  fileInput.click();
});

createPaginationDots();
updateDisplay();
