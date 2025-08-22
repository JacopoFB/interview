window.addEventListener("DOMContentLoaded", setup);

async function setup() {
	document.getElementById('error').innerText = ""; // clear any errors

	try {
		const res = await fetch('/products');
		const listings = sortProducts(await res.json(), "asc");
	
		showListings(listings, document.getElementById('listings'));

		// Add searchbar functionality
		const searchListings = (listings, keyword) => {
			return listings.filter((listing) => listing.title.toLowerCase().includes(keyword.toLowerCase()));
		}
		document.getElementById('searchbar').addEventListener('input', (event) => {
			let filteredListings = searchListings(listings, event.target.value);
			filteredListings = sortProducts(filteredListings, "asc"); // sort filtered listings
			showListings(filteredListings, document.getElementById('listings'));
		});
	} catch (err) {
		console.log("Something went wrong getting listings: " + err);
		document.getElementById('error').innerText = "Something went wrong fetching listings!"
	}
}

/* MY CUSTOM HELPER FUNCTIONS ----- */

/* Creates DOM elements for each listings and places them in the provided container */
function showListings(listings, container) {
	container.innerHTML = ""; // clear any previously rendered listings
	
	if (listings.length == 0) { 
		container.innerText = "No Listings Found"; 
		return;
	}

	const centsToDollars = (cents) => { return cents / 100; }

	for (let i = 0; i < listings.length; i++) {
		// create dom elements
		const listingContainer = document.createElement('div');
		const title = document.createElement('h3');
		const price = document.createElement('p');
		const thumbnail = document.createElement('img');
		
		// set and style elements
		title.innerText = listings[i].title;
		price.innerText = "$" + centsToDollars(listings[i].price);
		thumbnail.src = listings[i].images[0].src;
		listingContainer.classList = "listing";
		price.classList = "listing-price";

		// add elements
		listingContainer.append(thumbnail, title, price);
		container.appendChild(listingContainer);
	}
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
function sortProducts(products, sortOrder) {
	let results = [];

	products.forEach(element => { results.push(element); }); // shorter way to copy products into new array

	return results.sort((a, b) => {
		return sortOrder === "desc" ? b.price - a.price : a.price - b.price;
	});

	/*
		explanation:
		Instead of implementing our own sort algorithm, I replaced it with the native JS sort function.
		I use a ternary operator to check if the user wants descending order, and defaults to ascending
		otherwise.

		I used the W3 reference for the sort function as I didn't know the syntax offhand: 
		https://www.w3schools.com/js/js_array_sort.asp
	*/
}
