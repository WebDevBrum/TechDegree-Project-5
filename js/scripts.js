fetch("https://randomuser.me/api/?format=json")
    .then(response => response.json())
		
		.then(data => console.log(data.results[0].name.first))
		
   // .then(data => data.results.map(result => console.log(result.name.first + result.name.last)))