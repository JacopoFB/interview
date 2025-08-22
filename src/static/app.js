window.addEventListener("DOMContentLoaded", setup);

/* 
	Creates DOM elements for each listings and places them in the provided container 
*/
function showListings(listings, container) {
	container.innerHTML = ""; // clear any previously rendered listings

	for (let i = 0; i < listings.length; i++) {
		// create dom elements
		const listingContainer = document.createElement('div');
		const title = document.createElement('p');
		const price = document.createElement('p');
		const thumbnail = document.createElement('img');
		
		// set and style elements
		title.innerText = listings[i].title;
		price.innerText = listings[i].price;
		thumbnail.src = listings[i].images[0].src;

		// add elements
		listingContainer.append(thumbnail, title, price);
		container.appendChild(listingContainer);
	}
}

async function setup() {
	const res = await fetch('/products');
	const listings = await res.json();
	
	showListings(listings, document.getElementById('listings'));

	// START HERE
	// API Endpoint: GET /products
	// Returns: Array of product objects with id, title, price (in cents), and array of images
	// TODO: Fetch products from the API
	// TODO: Render the products to the page in a responsive grid
	// TODO: Sort the products by price (low to high by default)
	// TODO: Implement search functionality
	// BONUS: Use the refactored sorting function for dynamic sort order
	// BONUS: Add error handling for the fetch request
}


/**
 * Sorts an array of products by price in ascending or descending order.
 *
 * Your task is to refactor and improve this function:
 * - Make it clean, modern, and readable.
 * - Allow sorting in either "asc" or "desc" order using the `sortOrder` parameter.
 * - Ensure the output remains the same.
 * - A plus, but you do not need to use the messyFunction() function.
 *
 * Requirements:
 * - Refactor the code to use modern JavaScript syntax and best practices.
 * - Rename variables and functions to be more descriptive.
 * - Fill in the missing parts of the JSDoc comments.
 *
 * Feel free to leave comments explaining your thought process.
 *
 * @param {Array} products - Array of product objects, each with a `price` property.
 * @param {string} sortOrder - Either "asc" for ascending or "desc" for descending sort order.
 * @returns {Array} - A new array of products sorted by price in the specified order.
 */
function messyFunction(data1, data2) {
	let t = [];
	for (let i = 0; i < data1.length; i++) {
		t.push(data1[i]);
	}
	for (let i = 0; i < t.length; i++) {
		for (let j = i + 1; j < t.length; j++) {
			if ((data2 === "asc" && t[i].price > t[j].price) || (data2 === "desc" && t[i].price < t[j].price)) {
				let tmp = t[i];
				t[i] = t[j];
				t[j] = tmp;
			}
		}
	}
	return t;
}
