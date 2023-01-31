const flickrApiUrl = "https://api.flickr.com/services/rest/";
const imageContainer = document.getElementById("image-container");
const searchField = document.getElementById("search-field");
const imageCount = document.getElementById("image-count");
const imageSize = document.getElementById("image-size");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", function (event) {
	console.log("In eventlistenern");
	event.preventDefault();

	if (searchField.value.trim() === "") {
		alert(
			"The Search field is empty, if you dont enter anything, you will see this annoying alert! Please enter a search string!"
		);
		return;
	}

	imageContainer.innerHTML = "";
	const params = {
		method: "flickr.photos.search",
		api_key: "9b75579ca350fe1c7ec7860bb432bd04",
		text: searchField.value,
		per_page: imageCount.value,
		page: 1,
		extras: `url_${imageSize.value}`,
		format: "json",
		nojsoncallback: 1,
	};
	const queryString = Object.keys(params)
		.map((key) => key + "=" + params[key])
		.join("&");
	const url = flickrApiUrl + "?" + queryString;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			console.log(data.photos);
			if (!data.photos || data.photos.photo.length === 0) {
				alert("No photos found. Please try a different search term.");
				return;
			}
			const photos = data.photos.photo;
			photos.forEach((photo) => {
				const img = document.createElement("img");
				img.src = photo[`url_${imageSize.value}`];
				img.alt = photo.title;
				imageContainer.appendChild(img);
			});
		})

		.catch((error) => {
			imageContainer.innerHTML = "";
			let errorImg = document.createElement("img");
			errorImg.src = "./img/oops.jpg";
			errorImg.alt = "An error occurred";
			imageContainer.appendChild(errorImg);
		});
});
