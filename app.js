const tableData = document.getElementById('covidTable');
const root = document.getElementById('covidTable').getElementsByTagName('tbody')[0];;


fetch('https://api.covid19api.com/summary')
  .then(response => response.json())
  .then(result => {
      for(let country in result.Countries){
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        let td3 = document.createElement('td')
        let td4 = document.createElement('td')

        td1.innerHTML = result.Countries[country].Country
        td2.innerHTML = result.Countries[country].TotalConfirmed
        td3.innerHTML = result.Countries[country].TotalDeaths
        td4.innerHTML = result.Countries[country].TotalRecovered

        tr.append(td1)
        tr.append(td2)
        tr.append(td3)
        tr.append(td4)
        
        root.appendChild(tr)
      }
  })


  function exportTableToCSV(html, filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for(let i = 0; i < rows.length; i++){
        var row = [], cols = rows[i].querySelectorAll("td, th");
        for(var j = 0; j < cols.length; j++){
            row.push(String(cols[j].innerText).replace(",",""));
        }
        csv.push(row.join(","));
    }

    // download csv file
    downloadCSV(csv.join("\n"), filename);
}

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

	if (window.Blob == undefined || window.URL == undefined || window.URL.createObjectURL == undefined) {
		alert("Your browser doesn't support Blobs");
		return;
	}
	
    csvFile = new Blob([csv], {type:"text/csv"});
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}