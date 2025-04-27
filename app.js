const accessKey = "0DCgzF3q0zB0aMqT5_sVl7hQABAjpJ8nHhz4EL60PSk";

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const query = document.getElementById('query').value.trim();
    const imagesContainer = document.getElementById('images-container');
    imagesContainer.innerHTML = "";

    if (query === "") {
        imagesContainer.innerHTML = "<p>Please enter a search term.</p>";
        return;
    }

    fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                data.results.forEach(photo => {
                    const imgElement = document.createElement('img');
                    imgElement.src = photo.urls.small;
                    imgElement.alt = photo.alt_description || "Unsplash Image";

                    imagesContainer.appendChild(imgElement);
                });
            } else {
                imagesContainer.innerHTML = "<p>⚠️ No images found.</p>";
            }
        })
        .catch(error => {
            console.error('Error fetching images:', error);
            imagesContainer.innerHTML = "<p>❌ Something went wrong. Please try again later.</p>";
        });
});
