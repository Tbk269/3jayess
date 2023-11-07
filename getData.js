const tDisplay = document.getElementsByClassName("tempRead");
const hDisplay = document.querySelector("#humRead");

fetch('https://api.data.gov.sg/v1/environment/air-temperature')
    .then(res => {
        return res.json();
    })
    .then(data => {
        const readings = data.items[0].readings; // Assuming readings is an array of temperature readings
        let temperatureText = "Temperatures: ";
        readings.forEach(reading => {
            temperatureText += `${reading.value}, `;
        });
        tDisplay.textContent = temperatureText.slice(0, -2); // Update the content of #tempRead element
    })
    .catch(error => console.log(error));

fetch('https://api.data.gov.sg/v1/environment/relative-humidity')
    .then(res => {
        return res.json();
    })
    .then(data => {
        const readings = data.items[0].readings; // Assuming readings is an array of humidity readings
        let humidityText = "Humidities: ";
        readings.forEach(reading => {
            humidityText += `${reading.value}, `;
        });
        hDisplay.textContent = humidityText.slice(0, -2); // Update the content of #humRead element
    })
    .catch(error => console.log(error));