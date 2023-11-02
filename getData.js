const tDisplay = document.querySelector("#tempRead");
const hDisplay = document.querySelector("#humRead");

fetch('https://api.data.gov.sg/v1/environment/air-temperature')
    .then(res => {
        return res.json();
    })
    .then(data => {
        const temperature = data.items[0].readings[2].value; // Extracting specific temperature value from the fetched data
        tDisplay.textContent = temperature; // Update the content of #tempRead element
    })
    .catch(error => console.log(error));

fetch('https://api.data.gov.sg/v1/environment/relative-humidity')
    .then(res => {
        return res.json();
    })
    .then(data => {
        const humidity = data.items[0].readings[2].value; // Extracting specific humidity value from the fetched data
        hDisplay.textContent = humidity; // Update the content of #humRead element
    })
    .catch(error => console.log(error));