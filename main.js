document.addEventListener('DOMContentLoaded', function () {
    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBNva7N1AAFIz_gCLayZejZMmzGj0l8evQ",
        authDomain: "dht-esp32-6bce5.firebaseapp.com",
        databaseURL: "https://dht-esp32-6bce5-default-rtdb.firebaseio.com",
        projectId: "dht-esp32-6bce5",
        storageBucket: "dht-esp32-6bce5.appspot.com",
        messagingSenderId: "1044680342252",
        appId: "1:1044680342252:web:aefe69988f56e4d041c3c9"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Reference to the sensor data
    const sensorDataRef = firebase.database().ref('sensor_data/dht11_data');

    // Update sensor data on value changes
    sensorDataRef.on('value', function (snapshot) {
        const sensorData = snapshot.val();
        if (sensorData) {
            displaySensorData(sensorData);
        } else {
            document.getElementById('sensorValues').innerHTML = 'No data available';
        }
    });

 // ...

// Function to display sensor data
function displaySensorData(data) {
    const sensorValuesDiv = document.getElementById('sensorValues');
    const temperature = data.temperature;

    let temperatureImage;
    let weatherText;

    if (temperature > 25) {
        temperatureImage = 'caliente.gif';
        weatherText = getHotWeatherText();
    } else {
        temperatureImage = 'frio2.gif';
        weatherText = getColdWeatherText();
    }

    sensorValuesDiv.innerHTML = `
        <p><img src="temperatura.png" alt="Temperature Icon" class="sensor-icon" style="width: 30px; margin-right: 10px; height: 30px;">Temperatura: ${temperature} °C</p>
        <p><img src="humedad.png" alt="Humidity Icon" class="sensor-icon" style="width: 30px; margin-right: 10px; height: 30px;">Humedad: ${data.humidity} %</p>
        <img src="${temperatureImage}" alt="Temperature Image" style="max-width: 100%; height: auto;">
        <p>${weatherText}</p>
    `;
}



// Function to get random hot weather text
function getHotWeatherText() {
    const hotWeatherTexts = [
        "¡Qué día caluroso!",
        "El sol está radiante hoy.",
        "Prepárate para el calor intenso."
    ];

    const randomIndex = Math.floor(Math.random() * hotWeatherTexts.length);
    return hotWeatherTexts[randomIndex];
}

// Function to get random cold weather text
function getColdWeatherText() {
    const coldWeatherTexts = [
        "Hace un poco de frío.",
        "Abrígate bien, hace fresco.",
        "El viento está helado hoy."
    ];

    const randomIndex = Math.floor(Math.random() * coldWeatherTexts.length);
    return coldWeatherTexts[randomIndex];
}

// ...

});
