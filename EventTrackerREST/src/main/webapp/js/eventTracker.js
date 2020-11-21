var clearDisplay = function(e) {
	let infoDiv = document.getElementById('info');
	while( infoDiv.hasChildNodes() ) {
		infoDiv.removeChild( infoDiv.firstElementChild )
	}
}

var allData = function(e) {
	console.log('loaded')
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/tabs');

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && [200, 201].includes(xhr.status)) {
			var data = JSON.parse(xhr.responseText);
			let newTable = document.createElement('table');
			//removes the existing table; it is recreated immediately with current data
			let infoDiv = document.getElementById('info');
			clearDisplay();

			//Building the table head
			let tableHead = document.createElement('thead');
			let headRow = document.createElement('tr');
			let headers = [];
			
			let idHead = document.createElement('th');
			idHead.textContent = "ID";
			headers.push(idHead);
			
			let locHead = document.createElement('th');
			locHead.textContent = "Location";
			headers.push(locHead);
			
			let dateHead = document.createElement('th');
			dateHead.textContent = "Date";
			headers.push(dateHead);

			let drinksHead = document.createElement('th');
			drinksHead.textContent = "# of drinks";
			headers.push(drinksHead);
			
			
			let totalHead = document.createElement('th');
			totalHead.textContent = "$ spent";
			headers.push(totalHead);
			
			console.log(headers.length);
			headers.forEach((item, i) => { headRow.appendChild(item); });
			
			tableHead.appendChild(headRow);
			newTable.appendChild(tableHead);

			//and now the table body
			tableBody = document.createElement('tbody');
			for (let i = 0; i < data.length; i++) {
				let newRow = document.createElement('tr');

				let id = document.createElement('td');
				id.textContent = data[i].id;

				let loc = document.createElement('td');
				loc.textContent = data[i].location;

				let date = document.createElement('td');
				date.textContent = data[i].createdAt.split("T")[0];

				let numDrinks = document.createElement('td');
				numDrinks.textContent = data[i].drinks.length;
				numDrinks.style.textAlign = 'center';
				
				let spent = document.createElement('td');
				sum = 0;
				data[i].drinks.forEach( (item , i) => {
					sum += item.price;
				});
				spent.textContent = sum;
				
				[id , loc , date , numDrinks , spent].forEach((item, i) => { newRow.appendChild(item); });
				tableBody.appendChild(newRow);
			}
			newTable.appendChild(tableBody);
			infoDiv.appendChild(newTable);
			
			infoDiv = document.getElementById('info');
			for ( let i = 0 ; i < infoDiv.childNodes.length ; i++ ) {
				infoDiv
					.firstElementChild
					.lastElementChild
					.childNodes[i]
					.childNodes[1]
					.addEventListener('click' , showSingleTab);
			}
			
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	}

	xhr.send();
}

var showSingleTab = function(e) {

	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/tabs/' + e.target.parentElement.id);

	xhr.onreadystatechange = function() {

		if (xhr.readyState === 4 && xhr.status < 400) {
			var data = JSON.parse(xhr.responseText);
			let infoDiv = document.getElementById('info');

			//deletes the table so we can replace it with a view of a single tab
			//easily replaced later with allData() call
			clearDisplay();
			let tabView = document.createElement('div');
			let h3 = document.createElement('h3');
			h3.textContent = data.location + ", night of "
				+ data.createdAt.split("T")[0];
			tabView.appendChild('h3');
			let drinkTable = document.createElement('table');
			//table header
			let tableHead = document.createElement('thead');
			let headRow = document.createElement('tr');
			let numHead = document.createElement('th');
			let nameHead = document.createElement('th');
			let priceHead = document.createElement('th');
			numHead.textContent = "#";
			nameHead.textContent = "Drink";
			priceHead.textContent = "$"
			[numHead , nameHead , priceHead].forEach( ( item , i ) => {
				headRow.appendChild(item);
			});
			tableHead.appendChild(headRow);
			drinkTable.appendChild(tableHead);
			
			//table body
			let sum = 0;
			for ( let i = 0 ; i < data.drinks.length ; i++ ) {
				let newRow = document.createElement('tr');
				let num = document.createElement('td');
				let name = document.createElement('td');
				let price = document.createElement('price');
				num.textContent = i + 1;
				name.textContent = data.drinks[i].name;
				price.textContent = data.drinks[i].price;
				sum += data.drinks[i].price;
				[num , name , price].forEach( ( item , i ) => {
					newRow.appendChild(item)
				});
				drinkTable.appendChild( newRow );
			}
			//final row with summation
			let totalRow = document.createElement('tr');
			let footer = document.createElement('td');
			let total = document.createElement('td');
			let boldText = document.createElement('strong');
			boldText.textContent = "TOTAL";
			footer.appendChild( boldText );
			totalRow.appendChild( footer );
			totalRow.appendChild( document.createElement( 'td' ) );
			boldText.textContent = sum;
			total.appendChild(boldText);
			totalRow.appendChild( total );
			
			//add assembled table to DOM
			infoDiv.appendChild(drinkTable);
			
			let goBack = document.createElement('button');
			goBack.textContent = "View All Tabs"
			goBack.id = "goBack"
			infoDiv.appendChild(goBack);

			document.getElementById('goBack').addEventListener( 'click' , allData );
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}

	}

}

var makeNewTab = function(e) {
	let newTab = {};
	newTab.location = e.target.parentElement.location.value;
	console.log(e.target.parentElement.location.value);

	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/tabs');
	xhr.setRequestHeader('Content-type', 'application/json');

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			allData();
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	}

	xhr.send(JSON.stringify(newTab));
}



window.addEventListener('load', function(e) {
	allData(e);
	document.getElementById('newTab').lastElementChild.addEventListener('click', makeNewTab);
});