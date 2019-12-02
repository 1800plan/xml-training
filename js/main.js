function loadData() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
    		myFunction(this);
		}
	};
	
	//TODO: vaihda linkki hakemaan kaupungin kinodata
	var url = "https://www.finnkino.fi/xml/Schedule/";
	xhttp.open("GET", url, true);
    xhttp.send();
	
}

function myFunction(xml) {
	var i;
	var xmlDocument = xml.responseXML;
	var table = "<tr><th>Teatteri</th><th>Elokuva</th><th>Ikäraja</th><th>Promokuva</th></tr>";
	var x = xmlDocument.getElementsByTagName("Shows");
	
	for (i = 0; i < x.length; i++) {
		table += "<tr><td>" +
		x[i].getElementsByTagName("Theatre")[0].childNodes[0].nodeValue +
		"</td><td>" +
		x[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue +
		"</td></tr>";
		// TODO: loput tagit ei näy?
		x[i].getElementsByTagName("dttmShowEndUTC")[0].childNodes[0].nodeValue +
		"</td></tr>";
		x[i].getElementsByTagName("EventSmallImagePortrait")[0].childNodes[0].nodeValue +
		"</td></tr>"; // TODO: DISPLAY IMG URL FROM XML
	}
	
	document.getElementById("apidata").innerHTML = table;
	
	var x = xmlDocument.getElementsByTagName("show").length;
	console.log(x);
}
//show and hide assignment-div
function hideAssignmentDiv() {
	var x = document.getElementById("assignment-div");
	if (x.style.display === "block") {
		x.style.display = "none";
	} else {
		x.style.display = "block";
  }
}

function selectOption() {
    
	var table = document.getElementById("apidata");
	var cells = table.getElementsByTagName("td");

	for (var i = 0; i < cells.length; i++) {
		// Take each cell
		var cell = cells[i];
		// do something on onclick event for cell
		cell.onclick = function () {
			// Get the row id where the cell exists
			var rowId = this.parentNode.rowIndex;

			var rowsNotSelected = table.getElementsByTagName('tr');
			for (var row = 0; row < rowsNotSelected.length; row++) {
				rowsNotSelected[row].style.backgroundColor = "";
				rowsNotSelected[row].classList.remove('selected');
			}
			var rowSelected = table.getElementsByTagName('tr')[rowId];
			rowSelected.style.backgroundColor = "#40bf80";
			rowSelected.className += " selected";

			msg = 'The theatre you selected is: ' + rowSelected.cells[0].innerHTML;
			msg += '\nThe cell value is: ' + this.innerHTML;
			console.log(msg);
		}
	}
}

function getCityTheatres() {
	var city = document.getElementById("selectCity").value;
	console.log("You chose " + city);
}

/*	
	console.log("API call from " + url); // console notice
	console.log(xmlDocument); // console notice
	document.getElementById("apidata").innerHTML =
	"ID: " + xmlDocument.getElementsByTagName("ID")[0].childNodes[0].nodeValue;

*/
