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
	data.map(person => console.log(person))
	}


fetchData("https://randomuser.me/api/?results=12")
  .then(data => generateUsers(data.results))
	
	