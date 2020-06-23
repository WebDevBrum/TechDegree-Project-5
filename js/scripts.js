//Global variables

const userData = "https://randomuser.me/api/?results=12&nat=gb,us";
const galleryDiv = document.getElementById('gallery');
const pageBody = document.querySelector('body');
const searchBox = document.querySelector('.search-container');

/*functions for grabbing data and error management*/
function fetchData(url) {
    return fetch(url)
		    .then(checkStatus)
        .then(res => res.json())
				.catch(error => console.log('Looks like there was a problem', error))
				}
				
				function checkStatus(response ) {
					
	if(response.ok){ 
		return Promise.resolve(response);
		
	} else {
		
		return Promise.reject(new Error(response.statusText()));
	}
	
	
}


/*grabs data and passes to generate users 
//calls search bar function once user promise resolved (html user cards required for search availability*/
fetchData(userData)
  .then(data => generateUsers(data.results))
	.then(search);
   
	
/* populates the page with a random selection of employees*/
function generateUsers(data) {
	 data.map(( person, index) => {
		
		const userCard = document.createElement('div');
		galleryDiv.appendChild(userCard);
		userCard.className = "card";
		userCard.innerHTML = `<div class="card-img-container">
                        <img class="card-img" src=${person.picture.large} alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                        <p class="card-text">${person.email}</p>
                        <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
												</div>`;
    userCard.addEventListener('click', (event) => {
			
			userModal(data, index);
			
			
			///JOIN??
	
		
		
		});
	
	});
	
	return data;
	}
	
	// creates a modal window based on selection
	//along with previous and next buttons
	function userModal(data, personIndex) {
		
		
		const person = data[personIndex];
		const date = person.dob.date;
		let dob = date.split("T")[0];
		dob = dob.split("-").reverse().join("-");
		const modalWindow = document.createElement('div');
		pageBody.appendChild(modalWindow);
		modalWindow.className = "modal-container";
		modalWindow.innerHTML = `<div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src=${person.picture.large} alt="profile picture">
                        <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                        <p class="modal-text">${person.email}</p>
                        <p class="modal-text cap">${person.location.city}</p>
                        <hr>
                        <p class="modal-text">${person.cell}</p>
                        <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.postcode}</p>
                        <p class="modal-text">Birthday: ${dob}</p>
												</div>`;
		
		const closeButton = document.getElementById("modal-close-btn");
		
		closeButton.addEventListener('click', (event) => {
			  modalWindow.remove();
			
		});
		
		//Prev and next buttons plus functionality
		
		const buttonContainer = document.createElement('div');
			buttonContainer.className = "modal-btn-container";
			
			
			modalWindow.appendChild(buttonContainer);
			
			buttonContainer.innerHTML =
			
			
			
			`
       <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>`;
										
										
			const nextButton = document.getElementById("modal-next");
			const prevButton = document.getElementById("modal-prev");
			if(data[personIndex +1] != null){
				nextButton.style.display = " ";
			} else {
					nextButton.style.display = "none";
				}
			
				if(data[personIndex -1] != null){
				prevButton.style.display = " ";
			} else {
					prevButton.style.display = "none";
				}
				
			nextButton.addEventListener('click', (event) => {
				
				
				
				
				
				modalWindow.remove();
				userModal(data, personIndex+1);
			
			});
			
		prevButton.addEventListener('click', (event) => {
			
				modalWindow.remove();
				userModal(data, personIndex-1);
				
			});
	
		
			
		}
		
		//creates functional searchBar 
		function search() {
			
			
			
			const searchBar= document.createElement('form');
			
			//need to add action and method to form
			searchBar.action = '#';
			searchBar.method = 'get';
			
			searchBar.innerHTML = ` 
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
														
													`;
			
			searchBox.appendChild(searchBar);
			
			
			let cards = document.querySelectorAll(".card");
			
			let searchField  = document.getElementById('search-input');
			
			let button = document.getElementById('search-submit');
			
			
			// creates search bar functionality
			function searchEmployees(searchInput, names){
			
			let searchContent = searchInput.value;
			let input = searchContent.toString().toLowerCase();
			
			for(let i=0; i<names.length; i++){
				let searchName = names[i].querySelector('h3');
				
				let stringName = searchName.textContent.toString().toLowerCase();
				
				let match = stringName.indexOf(input);
				
				if (match != (-1)) { 
               names[i].style.display = '';
               //searchList.push(names[i]);
            } else {
               names[i].style.display = 'none';
            }

         /*   if (searchList.length === 0) {
               noMatch.style.display = '';
            } else if (searchList.length > 0) {
               noMatch.style.display = 'none';
						 } */
					 }
					 
					 
					 
			}
			
			//event listener for submit button 
   button.addEventListener('click', (event) => { 
      event.preventDefault();
      searchEmployees(searchField, cards);
   });
      //reactive event listener for searchbar entry
 searchField.addEventListener('keyup', () => {
      searchEmployees(searchField, cards);
		});
			
		}
		
	
		
		
	
	
	
		
	