const tDisplay = document.querySelector("#tempRead");
const hDisplay = document.querySelector("#humRead");

const temperatureData = [];
fetch('https://api.data.gov.sg/v1/environment/air-temperature')
    .then(res => res.json())
    .then(data => {
        const readings = data.items[0].readings;
        readings.forEach(reading => {
            temperatureData.push({ input: parseFloat(reading.value), output: { temperature: parseFloat(reading.value) } });
        });
    })
    .then(() => {
        const net = new brain.NeuralNetwork();
        net.train(temperatureData);

        const predictedTemperature = net.run(temperatureData);
        tDisplay.textContent = predictedTemperature;
    })
    .catch(error => console.log(error));

const humidityData = [];
fetch('https://api.data.gov.sg/v1/environment/relative-humidity')
    .then(res => res.json())
    .then(data => {
        const readings = data.items[0].readings;
        readings.forEach(reading => {
            humidityData.push({ input: parseFloat(reading.value), output: { humidity: parseFloat(reading.value) } });
        });
    })
    .then(() => {
        const net = new brain.NeuralNetwork();
        net.train(humidityData);

        const predictedHumidity = net.run(humidityData);
        hDisplay.textContent = predictedHumidity;
    })
    .catch(error => console.log(error));