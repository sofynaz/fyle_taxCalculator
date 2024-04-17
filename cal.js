// Get DOM elements
const grossIncomeInput = document.getElementById('gross-income');
const extraIncomeInput = document.getElementById('extra-income');
const ageGroupInput = document.getElementById('age-group');
const deductionInput = document.getElementById('deduction');
const taxForm = document.getElementById('taxform');
const closeBtn = document.getElementById('close');

// Add event listener to the tax form
taxForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get input values and convert them to numbers
    let grossIncome = parseFloat(grossIncomeInput.value) || 0;
    let extraIncome = parseFloat(extraIncomeInput.value) || 0;
    let deductionTotal = parseFloat(deductionInput.value) || 0;
    let ageGroup = ageGroupInput.value;

    // Calculate total income after deduction
    let totalIncome_AfterDeduction = grossIncome + extraIncome - deductionTotal;

    // Calculate tax based on total income after deduction and age group
    let tax = 0;
    if (totalIncome_AfterDeduction > 800000) {
        switch (ageGroup) {
            case 'under-40':
                tax = 0.3 * (totalIncome_AfterDeduction - 800000);
                break;
            case '40-60':
                tax = 0.4 * (totalIncome_AfterDeduction - 800000);
                break;
            case 'over-60':
                tax = 0.1 * (totalIncome_AfterDeduction - 800000);
                break;
        }
    }

    // Calculate overall income after tax deduction
    let overallIncomeAfterTax = totalIncome_AfterDeduction - tax;

    // Display overall income in the modal
    let overallIncome = document.getElementById('overallIncome');
    overallIncome.innerHTML = `<strong style="font-size: 25px;">Your overall income will be :</strong><br>${overallIncomeAfterTax.toFixed(2)}<br><strong style="padding: 5px;">after tax deductions</strong>`;

    // Display "Close" button text
    closeBtn.textContent = 'Close';

    // Add event listener to the "Close" button
    closeBtn.addEventListener('click', function () {
        let taxModal = new bootstrap.Modal(document.getElementById('taxModal'));
        taxModal.hide();
    });

    // Show the tax modal
    let taxModal = new bootstrap.Modal(document.getElementById('taxModal'));
    taxModal.show();

    // Bootstrap validation
    taxForm.classList.add('was-validated');

    // Validation on input change
    var inputs = document.querySelectorAll('#gross-income, #extra-income, #age-group');
    inputs.forEach(function (input) {
        input.addEventListener('change', function () {
            validateInput(input);
        });
    });
});

// Function to validate input and show error icon
function validateInput(input) {
    var value = input.value;
    var errorIcon = input.nextElementSibling.querySelector('.error-icon');
    if (!value || isNaN(parseFloat(value))) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        errorIcon.style.display = 'inline';
    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        errorIcon.style.display = 'none';
    }
}
