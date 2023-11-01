const tDisplay = document.querySelector("#tempRead"); // Use # to select by ID
const hDisplay = document.querySelector("#humRead");

fetch('https://api.data.gov.sg/v1/environment/air-temperature')
    .then(res => {
        return res.json();
    })
    .then(data =>{
       tDisplay.textContent = JSON.stringify(data);
    })
    .catch(error => console.log(error));

fetch('https://api.data.gov.sg/v1/environment/relative-humidity')
    .then(res => {
        return res.json();
    })
    .then(data =>{
       hDisplay.textContent = JSON.stringify(data);
    })
    .catch(error => console.log(error));