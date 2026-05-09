document.getElementById('prediction-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const btn = form.querySelector('.btn-predict');
    const loader = document.getElementById('loader');
    const resultContainer = document.getElementById('result-container');
    const resultTitle = document.getElementById('result-title');
    const resultDesc = document.getElementById('result-desc');
    const resultIcon = document.getElementById('result-icon');

    // Show loading state
    btn.disabled = true;
    loader.style.display = 'block';
    btn.querySelector('span').textContent = 'Analyzing...';

    // Get form data
    const formData = new FormData(form);
    const data = {
        Pregnancies: parseInt(formData.get('Pregnancies')),
        Glucose: parseFloat(formData.get('Glucose')),
        BloodPressure: parseFloat(formData.get('BloodPressure')),
        BMI: parseFloat(formData.get('BMI')),
        Age: parseInt(formData.get('Age'))
    };

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        // Simulate a slight delay for better UX
        setTimeout(() => {
            btn.disabled = false;
            loader.style.display = 'none';
            btn.querySelector('span').textContent = 'Analyze Health Data';

            showResult(result.diabetic);
        }, 800);

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while making the prediction. Please try again.');
        btn.disabled = false;
        loader.style.display = 'none';
        btn.querySelector('span').textContent = 'Analyze Health Data';
    }
});

function showResult(isDiabetic) {
    const container = document.getElementById('result-container');
    const title = document.getElementById('result-title');
    const desc = document.getElementById('result-desc');
    const icon = document.getElementById('result-icon');

    container.classList.remove('hidden');

    if (isDiabetic) {
        icon.innerHTML = '⚠️';
        title.textContent = 'High Risk Detected';
        title.className = 'status-positive';
        desc.textContent = 'Based on the provided data, there is a high probability of diabetes. We recommend consulting a healthcare professional for a comprehensive evaluation.';
    } else {
        icon.innerHTML = '✅';
        title.textContent = 'Low Risk Detected';
        title.className = 'status-negative';
        desc.textContent = 'Great news! Your indicators suggest a low risk of diabetes. Continue maintaining a healthy lifestyle with balanced nutrition and regular exercise.';
    }
}

function resetForm() {
    const container = document.getElementById('result-container');
    const form = document.getElementById('prediction-form');
    
    container.classList.add('hidden');
    form.reset();
}
