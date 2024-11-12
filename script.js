// Versione simile alle correzioni e più corretta:

document.addEventListener("DOMContentLoaded", () => {
  const row = document.querySelector(".row");
  const overlay = document.querySelector(".overlay");
  const overlayImage = overlay.querySelector(".image-container img");
  const closeOverlayButton = document.getElementById("close-overlay");

  function toggleOverlay() {
    overlay.classList.toggle("d-none");
    document.body.classList.toggle("overflow-hidden");
  }

  overlay.addEventListener("click", (event) => {
    if (event.target.tagName !== "IMG") {
      toggleOverlay();
    }
  });

  closeOverlayButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleOverlay();
  });

  function fetchPhotos() {
    axios
      .get("https://jsonplaceholder.typicode.com/photos?_limit=6")
      .then((response) => {
        const photos = response.data;
        let photosHTML = "";
        photos.forEach((photo) => {
          photosHTML += ` 
            <div class="col-4">
                 <div class="card">
                     <img class="pin" src="./img/pin.svg" alt="pin">
                     <img class="image thumbnail" src="${photo.url}" alt="${photo.title}">
                     <p class="caption">${photo.title}</p>
                 </div>
            </div> `;
        });
        row.innerHTML += photosHTML;
        addThumbnailClickEvent(photos);
      })
      .catch((error) => console.error("Errore nella fetch delle foto:", error));
  }
// aggiungiamo un evento di click ad ogni miniatura delle foto che attiva toggleoverlay()
  function addThumbnailClickEvent(photos) {
    const thumbnails = document.querySelectorAll(".thumbnail");
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        const fullSizeUrl = photos[index].url;
        overlayImage.src = fullSizeUrl;
        toggleOverlay();
      });
    });
  }

  fetchPhotos();
});

// vecchia versione:

// document.addEventListener("DOMContentLoaded", () => {
//   const row = document.querySelector(".row");
//   const overlay = document.querySelector(".overlay");
//   const overlayImage = overlay.querySelector(".image-container img");
//   const closeOverlayButton = document.getElementById("close-overlay");

//   function fetchPhotos() {
//     axios
//       .get("https://jsonplaceholder.typicode.com/photos?_limit=6")
//       .then((response) => {
//         const photos = response.data;
//         let photosHTML = "";
//         photos.forEach((photo) => {
//           photosHTML += `
//             <div class="col-4">
//                 <div class="card">
//                     <img class="pin" src="./img/pin.svg" alt="pin">
//                     <img class="image thumbnail" src="${photo.url}" alt="${photo.title}">
//                     <p class="caption">${photo.title}</p>
//                 </div>
//             </div> `;
//         });
//         row.innerHTML += photosHTML;
//         addThumbnailClickEvent();
//       })
//       .catch((error) =>
//         console.error("Errore nel caricamento delle foto", error)
//       );
//   }

// function addThumbnailClickEvent() {
//   const thumbnails = document.querySelectorAll(".thumbnail");
//   thumbnails.forEach((thumbnail) => {
//     thumbnail.addEventListener("click", () => {
//       const fullSizeUrl = thumbnail.getAttribute("data-full-url");
//       overlayImage.src = fullSizeUrl;
//       overlay.classList.remove("d-none");
//     });
//   });
// }

// closeOverlayButton.addEventListener("click", () => {
//   overlay.classList.add("d-none");
// });

//   fetchPhotos();
// });
