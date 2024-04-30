// Define characteristics for each collar
const collars = [
    { id: 'collar1', price: 800, subscription: 5, geofencing: 10, batteryLife: 21, waterResistance: 10 },
    { id: 'collar2', price: 1500, subscription: 30, geofencing: 10, batteryLife: 18, waterResistance: 10 },
    { id: 'collar3', price: 50, subscription: 8, geofencing: 10, batteryLife: 5, waterResistance: 10 },
    { id: 'collar4', price: 150, subscription: 40, geofencing: 0, batteryLife: 90, waterResistance: 10 },
    { id: 'collar5', price: 1, subscription: 1, geofencing: 0, batteryLife: 1, waterResistance: 10 } // Update this with actual values for the generic tracker
];

// Function to update slider values display and update collar order
document.addEventListener('DOMContentLoaded', function () {
    const questionContainer = document.querySelector('.question-container');
    questionContainer.addEventListener('input', function (event) {
        if (event.target.type === 'range') {
            const valueDisplay = document.getElementById(event.target.id + '-value');
            valueDisplay.textContent = event.target.value;
            updateCollarOrder(); // Rearrange collars based on current values
        }
    });
});


// Function to compute and update collar order based on preferences
function updateCollarOrder() {
    // Log values from sliders to check they are being read correctly
    const priceMax = parseInt(document.getElementById('price').value, 10);
    const subMax = parseInt(document.getElementById('subscription').value, 10);
    const geoImportance = parseInt(document.getElementById('geofencing').value, 10);
    const batteryRequired = parseInt(document.getElementById('battery-life').value, 10);
    const waterImportance = parseInt(document.getElementById('water-resistance').value, 10);

    console.log(`Slider Values: PriceMax=${priceMax}, SubMax=${subMax}, GeoImportance=${geoImportance}, BatteryRequired=${batteryRequired}, WaterImportance=${waterImportance}`);

    collars.forEach(collar => {
        collar.score = computeScore(collar, priceMax, subMax, geoImportance, batteryRequired, waterImportance);
        console.log(`Score for ${collar.id}: ${collar.score}`); // Check computed scores
    });

    collars.sort((a, b) => b.score - a.score);

    collars.forEach((collar, index) => {
        const collarElement = document.getElementById(collar.id);
        const scoreElement = document.getElementById('score' + collar.id.substring(6));
        if (!scoreElement) {
            console.log(`Score element not found for ${collar.id}`); // Debug if score element is not found
        }
        collarElement.style.order = index;
        scoreElement.textContent = `Score: ${collar.score.toFixed(2)}`;

        console.log(`Updated Order for ${collar.id}: ${index}, Score: ${collar.score.toFixed(2)}`);
    });
}



   // Update DOM order based on score and update score text
collars.forEach((collar, index) => {
    const collarElement = document.getElementById(collar.id);
    collarElement.style.order = index;
    
    // Update the score display
    const scoreElement = document.getElementById('score' + collar.id.substring(6)); // Assuming 'collar1' has score ID 'score1'
    scoreElement.textContent = `Score: ${collar.score.toFixed(2)}`; // Round the score to two decimal places for better readability
    
    console.log(`Order for ${collar.id}: ${index}, Score: ${collar.score.toFixed(2)}`);
});


// Detailed computeScore function with logging
function computeScore(collar, priceMax, subMax, geoImportance, batteryRequired, waterImportance) {
    let score = 0;
    score += (1500 - collar.price) / 1400 * (10 - priceMax); // Incentivize lower prices if price is more important
    score += (40 - collar.subscription) / 35 * (10 - subMax); // Incentivize lower subscription cost if cost is more important
    score += collar.geofencing * geoImportance;
    score += collar.batteryLife / 90 * batteryRequired;
    score += collar.waterResistance * waterImportance;
    return score;
}
