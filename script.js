document.querySelectorAll('input[type="range"]').forEach(input => {
    input.addEventListener('input', function() {
        const valueDisplay = document.getElementById(this.id + '-value');
        valueDisplay.textContent = this.value; // Updates the displayed value
        updateCollarOrder(); // Rearrange collars based on current values
    });
});

function updateCollarOrder() {
    const costPreference = parseInt(document.getElementById('cost').value, 10);
    const collar1 = document.getElementById('collar1');
    const collar2 = document.getElementById('collar2');

    if (costPreference > 5) {
        collar2.style.order = 1;
        collar1.style.order = 2;
    } else {
        collar1.style.order = 1;
        collar2.style.order = 2;
    }
}
