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
			infoDiv.innerHTML = "";
			document.getElementById('title').innerHTML = "Welcome to Alcountant!"

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
			
			headers.push(document.createElement('th') );
			
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
				
				let deleteButton = document.createElement('td');
				let button = document.createElement('button');
				button.textContent = 'DELETE';
				deleteButton.appendChild(button);
				
				
				[id , loc , date , numDrinks , spent , deleteButton ].forEach((item, i) => { newRow.appendChild(item); });
				tableBody.appendChild(newRow);
			}
			newTable.appendChild(tableBody);
			infoDiv.appendChild(newTable);
			
			infoDiv = document.getElementById('info');
			for ( let i = 0 ; i < infoDiv.firstElementChild.lastElementChild.childNodes.length ; i++ ) {
				infoDiv //div
					.firstElementChild //table
					.lastElementChild //tbody
					.childNodes[i] //row
					.childNodes[1] //column
					.addEventListener('click' , showSingleTab);
				
				infoDiv //div
					.firstElementChild //table
					.lastElementChild //tbody
					.childNodes[i] //row
					.lastElementChild //deleteButton
					.addEventListener( 'click' , deleteTab );
			}
			
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	}

	xhr.send();
}

var modifyTab = function(e) {
	
	var obj;	
	xhr = new XMLHttpRequest();
	
	xhr.open('GET', 'api/tabs/' + tabId , false );

	xhr.onreadystatechange = function() {
	
		if ( xhr.readyState === 4 && xhr.status < 400) {			
			obj = JSON.parse(xhr.responseText);
		}
	};
	xhr.send();
	
	console.log(e.target.parentElement);
	obj.location = e.target.newName.value;
	xhr = new XMLHttpRequest();
	
	
	xhr.open('PUT' , 'api/tabs/' + tabId );
	xhr.setRequestHeader('Content-type', 'application/json');
		
	xhr.onreadystatechange = function() {
		allData();
	}
	
	xhr.send(JSON.stringify(obj));
	
	
	
}

var showSingleTab = function(e) {
	
	console.log(e.target.parentElement.firstChild.textContent);

	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/tabs/' + e.target.parentElement.firstChild.textContent);

	xhr.onreadystatechange = function() {

		if (xhr.readyState === 4 && xhr.status < 400) {
			var data = JSON.parse(xhr.responseText);
			let infoDiv = document.getElementById('info');
			tabId = data.id;
			infoDiv.innerHTML = "";
			let headers = [];
			document.getElementById('title').innerHTML = data.location + ", night of "
				+ data.createdAt.split("T")[0];
			
			var modifyTabForm = document.createElement('form');
			modifyTabForm.id = 'modifytab';
			var modifyTabLocText = document.createElement('input');
			modifyTabLocText.type = 'text'
			modifyTabLocText.name = 'newName'
			modifyTabLocText.placeholder = 'Enter a new location name'
			modifyTabLocSubmit = document.createElement('input');
			modifyTabLocSubmit.type = 'submit';
			modifyTabLocSubmit.value = "UPDATE";
			modifyTabForm.appendChild(modifyTabLocText);
			modifyTabForm.appendChild(modifyTabLocSubmit);
			title.appendChild(modifyTabForm);
			document.getElementById('modifytab').addEventListener('submit' , modifyTab);
			

			let drinkTable = document.createElement('table');
			//table header
			let tableHead = document.createElement('thead');
			let headRow = document.createElement('tr');
			
			let numHead = document.createElement('th');
			numHead.textContent = "#";
			headers.push(numHead);
			
			let nameHead = document.createElement('th');
			nameHead.textContent = "Drink";
			headers.push(nameHead);
			
			let priceHead = document.createElement('th');
			priceHead.textContent = "$";
			headers.push(priceHead);
			
			headers.push(document.createElement('th') )
			
			headers.forEach( ( item , i ) => {
				headRow.appendChild(item);
			});
			tableHead.appendChild(headRow);
			drinkTable.appendChild(tableHead);
			
			//table body
			let sum = 0;
			let tableBody = document.createElement('tbody');
			
			
			for ( let i = 0 ; i < data.drinks.length ; i++ ) {
				let items = [];
				let newRow = document.createElement('tr');

				let num = document.createElement('td');
				num.textContent = data.drinks[i].id;
				items.push(num);
				
				let name = document.createElement('td');
				name.textContent = data.drinks[i].name;
				items.push(name);

				let price = document.createElement('td');
				price.textContent = data.drinks[i].price;
				items.push(price);
				
				let deleteButton = document.createElement('td');
				let button = document.createElement('button');
				button.textContent = 'DELETE';
				deleteButton.appendChild(button);
				items.push(deleteButton);
				
				let edit = document.createElement('td');
				let editButton = document.createElement('button');
				editButton.textContent = "MODIFY";
				edit.appendChild(editButton);
				items.push(edit);
				
				
				sum += data.drinks[i].price;
				items.forEach( ( item , i ) => {
					newRow.appendChild(item)
				});
				tableBody.appendChild( newRow );
			}
			
			//final row with summation
			let totalRow = document.createElement('tr');
			let footer = document.createElement('td');
			let total = document.createElement('td');
			let boldText = document.createElement('strong');
			let boldText2 = document.createElement('strong');
			boldText.textContent = "TOTAL";
			totalRow.appendChild( boldText );
			totalRow.appendChild( document.createElement( 'td' ) );
			boldText2.textContent = sum;
			total.appendChild(boldText2);
			totalRow.appendChild( total );
			totalRow.appendChild( document.createElement( 'td' ) );
			tableBody.appendChild(totalRow);
			
			drinkTable.appendChild(tableBody);
			
			//add assembled table to DOM
			infoDiv.appendChild(drinkTable);
		
			for ( let i = 0 ; i < infoDiv.firstElementChild.lastElementChild.childNodes.length - 1 ; i++ ) {
				let infoDiv = document.getElementById('info');
				infoDiv //div
					.firstElementChild //table
					.lastElementChild //tbody
					.childNodes[i] //row
					.lastElementChild
					.previousElementSibling //deleteButton
					.addEventListener( 'click' , deleteDrink );
					
				infoDiv
					.firstElementChild
					.lastElementChild
					.childNodes[i]
					.lastElementChild
					.addEventListener( 'click' , showEditDrinkForm );
			}
			
			let addDrinkForm = document.createElement('form');
			addDrinkForm.id = 'addDrink'
			let addDrinkTitle = document.createElement('h6');
			addDrinkTitle.innerHTML = "Add a drink to this tab"
			addDrinkForm.appendChild(addDrinkTitle);
			let addDrinkName = document.createElement('input');
			addDrinkName.type = 'text';
			addDrinkName.name = 'name';
						let addDrinkPrice = document.createElement('input');
			addDrinkPrice.type = 'text';
			addDrinkPrice.name = 'price';
			let addDrinkSubmit = document.createElement('input');
			addDrinkSubmit.type = 'submit';
			addDrinkSubmit.value = "SUBMIT";
			addDrinkForm.appendChild(addDrinkName);
			addDrinkForm.appendChild(addDrinkPrice);
			addDrinkForm.appendChild(addDrinkSubmit);
			infoDiv.appendChild(addDrinkForm);
			document.getElementById('addDrink').addEventListener('submit' , addDrinkToTab );
			
			
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
	
	xhr.send();

}

var showEditDrinkForm = function(e) {
	//deletes form if already present so no duplicates
	var form = document.getElementById('editDrink');
	if ( form != null ) { form.parentElement.removeChild(form); };
	
	drinkId = e.target.parentElement.parentElement.firstElementChild.textContent;
	var editForm = document.createElement('form');
	editForm.id = 'editDrink'
	var newName = document.createElement('input');
	newName.type = "text";
	newName.name = 'name'
	newName.placeholder = "Different Name";
	var newPrice = document.createElement('input');
	newPrice.type = "text";
	newPrice.name = 'price';
	newPrice.placeholder = "Different Name";
	var submitButton = document.createElement('input');
	submitButton.type = 'submit';
	submitButton.value = 'UPDATE';
	
	editForm.appendChild(newName);
	editForm.appendChild(newPrice);
	editForm.appendChild(submitButton);
	
	document.getElementById('info').appendChild(editForm);
	document.getElementById('editDrink').addEventListener( 'submit' , editDrink );
	
}

var editDrink = function(e) {
	
	xhr = new XMLHttpRequest();
	xhr.open('GET' , 'api/tabs/' + tabId + '/drinks/' + drinkId, false );
	var obj;
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			obj = JSON.parse(xhr.responseText);
		}
	}
	
	xhr.send();
	
	tab = {};
	tab.id = tabId;
	obj.tab = tab;
	
	
	if ( e.target.name.value != "" ) { obj.name = e.target.name.value; };
	if ( e.target.price.value != "" ) { obj.price = e.target.price.value; };
	
	console.log(obj);
	console.log(obj.tab);

	xhr = new XMLHttpRequest();
	
	xhr.open('PUT' , 'api/tabs/' + tabId + '/drinks/' + drinkId );
	xhr.setRequestHeader('Content-type', 'application/json');
	
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			allData();
		}
	}
	
	xhr.send(JSON.stringify(obj));
	
}

var addDrinkToTab = function(e) {
	e.preventDefault();
	var drink = {};
	drink.id = -1; //for some reason posts wouldn't work without this;
	drink.name = e.target.name.value;
	drink.price = e.target.price.value;
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST' , 'api/tabs/' + tabId + '/drinks' );
	xhr.setRequestHeader('Content-type', 'application/json');
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			tab  = {};
			tab.target = {};
			tab.target.parentElement = {};
			tab.target.parentElement.firstChild = {};
			tab.target.parentElement.firstChild.textContent = tabId;
			showSingleTab(tab);
		}
	}
	
	xhr.send(JSON.stringify(drink));
	
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

var deleteTab = function(e) {
	var xhr = new XMLHttpRequest();
	xhr.open( 'DELETE' , 'api/tabs/' + 
							e.target
								.parentElement
								.parentElement
								.firstElementChild
								.textContent );
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			allData();
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	}
	
	xhr.send();
	
}

var deleteDrink = function(e) {
	var xhr = new XMLHttpRequest();
	xhr.open( 'DELETE' , 'api/tabs/' + 
							tabId + "/drinks/" + 
							e.target
								.parentElement
								.parentElement
								.firstElementChild
								.textContent );
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			allData();
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	}
	
	xhr.send();
	
}

var showTotalSpent = function(e) {
	var xhrAll = new XMLHttpRequest();
	var infoDiv = document.getElementById('info');
	infoDiv.innerHTML = '';
	xhrAll.open('GET', 'api/tabs');
	
	xhrAll.onreadystatechange = function() {
		var tabs = JSON.parse(xhrAll.responseText);
		console.log(tabs);
		let sum = 0;
		for ( let i = 0 ; i < tabs.length ; i++) {
			for ( let j = 0 ; j < tabs[i].drinks.length ; j++ ) {
				sum += tabs[i].drinks[j].price;
			}
		}
		
		let totalInfo = document.createElement('h2');
		totalInfo.innerHTML = "You have spent $" + sum.toFixed(2) + " across " + tabs.length + " bar tabs.";
		infoDiv.appendChild(totalInfo);		
		let goBack = document.createElement('button');
			goBack.textContent = "View All Tabs"
			goBack.id = "goBack"
			infoDiv.appendChild(goBack);
			document.getElementById('goBack').addEventListener('click' , allData);
	}
	
	xhrAll.send();
}



window.addEventListener('load', function(e) {
	allData(e);
	document.getElementById('newTab').lastElementChild.addEventListener('click', makeNewTab);
	document.getElementById('total').addEventListener('click' , showTotalSpent);
});

var tabId;
var drinkId;