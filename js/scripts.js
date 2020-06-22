
const galleryDiv = document.getElementById('gallery');

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
	data.map(person => {
		const userCard = document.createElement('div');
		galleryDiv.appendChild(userCard);
		userCard.className = "card";
		userCard.innerHTML = `<div class="card-img-container">
                        <img class="card-img" src=${person.picture.large} alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">first last</h3>
                        <p class="card-text">email</p>
                        <p class="card-text cap">city, state</p>
												</div>`;
    userCard.addEventListener('click', (event) => {
			
			userModal(person);
		
		
		});
	});
	return data;
	}
	
	
	function userModal(data) {
		console.log(data);
		
		/*
		const cards = galleryDiv.querySelectorAll(".card");
		//add event listener to all cards ? cards.length etc?
		cards.addEventListener('click', (event) => {
			
			console.log(event.target);*/
		
		
	//	});
}

fetchData("https://randomuser.me/api/?results=12")
  .then(data => generateUsers(data.results))
	//.then(data => console.log(data))
	//.then(data => userModal(data.results))
	