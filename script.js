document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".row");
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
                    <img src="${photo.thumbnailUrl}" alt="${photo.title}"> 
                    <p>${photo.title}</p> 
                </div>
            </div> `;
        });
        container.innerHTML = photosHTML;
      })
      .catch((error) => console.error("Errore nella fetch delle foto:", error));
  }
  fetchPhotos();
});
