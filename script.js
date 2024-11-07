document.addEventListener("DOMContentLoaded", () => {
  const row = document.querySelector(".row");
  const overlay = document.querySelector(".overlay");
  const overlayImage = overlay.querySelector(".image-container img");
  const closeOverlayButton = document.getElementById("close-overlay");

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
                    <img class="image thumbnail" src="${photo.url}" alt="${photo.title}" data-full-url="${photo.url}"> 
                    <p class="caption">${photo.title}</p> 
                </div>
            </div> `;
        });
        row.innerHTML = photosHTML;
        addThumbnailClickEvent();
      })
      .catch((error) => console.error("Errore nella fetch delle foto:", error));
  }

  function addThumbnailClickEvent() {
    const thumbnails = document.querySelectorAll(".thumbnail");
    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", () => {
        const fullSizeUrl = thumbnail.getAttribute("data-full-url");
        console.log(`URL immagine completa: ${fullSizeUrl}`);
        overlayImage.src = fullSizeUrl;
        overlay.classList.remove("d-none");
      });
    });
  }

  closeOverlayButton.addEventListener("click", () => {
    overlay.classList.add("d-none");
  });

  fetchPhotos();
});
