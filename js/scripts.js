const userData = "https://randomuser.me/api/?results=12";
const galleryDiv = document.getElementById('gallery');
const pageBody = document.querySelector('body');
const searchBox = document.querySelector(".search-container");
/*

fetch("https://randomuser.me/api/?format=json")
    .then(response => response.json())
		.then(data =>  data.results[0].name)
		.then(data => console.log(data))
		*/
		
		
		
		function fetchData(url) {
    return fetch(url)
		    .then(checkStatus)//a failed http request would still resolve with ok = false so still needs to be caught (as opposed to a mistyped url etc)
        .then(res => res.json())
				.catch(error => console.log('Looks like there was a problem', error))
				}
				
				function checkStatus(response ) {
					
	if(response.ok){ //have a look what this means 
		//console.log(response.ok)
		return Promise.resolve(response);
		
	} else {
		
		return Promise.reject(new Error(response.statusText()));
	}
	
	
}

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
                        <p class="card-text">email</p>
                        <p class="card-text cap">city, state</p>
												</div>`;
    userCard.addEventListener('click', (event) => {
			
			userModal(data, index);
			
			
			
		
		
		});
	});
	return data;
	}
	
	
	function userModal(data, personIndex) {
		
		
		const person = data[personIndex];
	//	const nextPerson = data[personIndex +1];
	//	const prevPerson = data[personIndex-1];
		const modalWindow = document.createElement('div');
		pageBody.appendChild(modalWindow);
		modalWindow.className = "modal-container";
		modalWindow.innerHTML = `<div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src=${person.picture.large} alt="profile picture">
                        <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                        <p class="modal-text">email</p>
                        <p class="modal-text cap">city</p>
                        <hr>
                        <p class="modal-text">(555) 555-5555</p>
                        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                        <p class="modal-text">Birthday: 10/21/2015</p>
												</div>`;
		
		const closeButton = document.getElementById("modal-close-btn");
		
		closeButton.addEventListener('click', (event) => {
			  modalWindow.remove();
			
		});
		
		//button container
		
		const buttonContainer = document.createElement('div');
			buttonContainer.className = "modal-btn-container";
			//const modalWindow = pageBody.querySelector(".modal-container");
			
			
			modalWindow.appendChild(buttonContainer);
			
			buttonContainer.innerHTML =
			
			
			
			`
       <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>`;
										
			//event listen each button
			//remove modal 
			//call usermodal and prev next? might need to add above to user modal function
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
		//prevNextUser(prevPerson, nextPerson);
		
			
		}
		
		//make this call itself?
		function search() {
			
			
			
		}
		
		

fetchData(userData)
  .then(data => generateUsers(data.results))
	//.then(data => console.log(data))
	//.then(data => userModal(data.results))
	