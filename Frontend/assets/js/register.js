// Registration form functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeRegistrationForm();
});

let currentStep = 1;
const totalSteps = 3;

function initializeRegistrationForm() {
    // Initialize form navigation
    initFormNavigation();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize password strength checker
    initPasswordStrength();
    
    // Initialize subject/interest limits
    initSelectionLimits();
    
    // Initialize dynamic form updates
    initDynamicFormUpdates();
    
    // Initialize form submission
    initFormSubmission();
}

// Form Navigation
function initFormNavigation() {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    nextBtn.addEventListener('click', nextStep);
    prevBtn.addEventListener('click', prevStep);
    
    // Handle form step changes
    updateStepDisplay();
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            updateStepDisplay();
            updateProgressBar();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
        updateProgressBar();
    }
}

function updateStepDisplay() {
    const steps = document.querySelectorAll('.form-step');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Hide all steps
    steps.forEach(step => step.classList.remove('active'));
    
    // Show current step
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }
    
    // Update navigation buttons
    prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-flex';
    
    if (currentStep === totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
    } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    }
}

function updateProgressBar() {
    const progressSteps = document.querySelectorAll('.progress-step');
    
    progressSteps.forEach((step, index) => {
        const stepNumber = index + 1;
        
        if (stepNumber < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

// Form Validation
function initFormValidation() {
    const form = document.getElementById('registrationForm');
    const inputs = form.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function validateCurrentStep() {
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Additional validation for specific steps
    if (currentStep === 1) {
        isValid = validateStep1() && isValid;
    } else if (currentStep === 2) {
        isValid = validateStep2() && isValid;
    } else if (currentStep === 3) {
        isValid = validateStep3() && isValid;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'This field is required';
        isValid = false;
    }
    
    // Specific validations
    if (value && isValid) {
        switch (fieldName) {
            case 'email':
                if (!isValidEmail(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
                
            case 'phone':
                if (!isValidPhone(value)) {
                    errorMessage = 'Please enter a valid 10-digit mobile number';
                    isValid = false;
                }
                break;
                
            case 'password':
                if (value.length < 8) {
                    errorMessage = 'Password must be at least 8 characters long';
                    isValid = false;
                }
                break;
                
            case 'confirmPassword':
                const password = document.getElementById('password').value;
                if (value !== password) {
                    errorMessage = 'Passwords do not match';
                    isValid = false;
                }
                break;
                
            case 'dateOfBirth':
                if (!isValidAge(value)) {
                    errorMessage = 'You must be between 13 and 35 years old';
                    isValid = false;
                }
                break;
        }
    }
    
    // Display validation result
    if (isValid) {
        showFieldSuccess(field);
    } else {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function validateStep1() {
    // Additional validations for step 1
    let isValid = true;
    
    // Check password strength
    const password = document.getElementById('password').value;
    if (password && getPasswordStrength(password) < 2) {
        showFieldError(document.getElementById('password'), 'Password is too weak');
        isValid = false;
    }
    
    return isValid;
}

function validateStep2() {
    // Additional validations for step 2
    let isValid = true;
    
    // Check if at least one strong subject is selected
    const strongSubjects = document.querySelectorAll('input[name="strongSubjects"]:checked');
    if (strongSubjects.length === 0) {
        showCustomError('strongSubjects', 'Please select at least one strong subject');
        isValid = false;
    }
    
    return isValid;
}

function validateStep3() {
    // Additional validations for step 3
    let isValid = true;
    
    // Check if at least one career interest is selected
    const careerInterests = document.querySelectorAll('input[name="careerInterests"]:checked');
    if (careerInterests.length === 0) {
        showCustomError('careerInterests', 'Please select at least one career interest');
        isValid = false;
    }
    
    // Check if terms are agreed
    const agreeTerms = document.getElementById('agreeTerms');
    if (!agreeTerms.checked) {
        showFieldError(agreeTerms, 'You must agree to the terms and conditions');
        isValid = false;
    }
    
    return isValid;
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

function isValidAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age >= 13 && age <= 35;
}

// Error Display Functions
function showFieldError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function showFieldSuccess(field) {
    field.classList.add('success');
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

function showCustomError(fieldName, message) {
    const container = document.querySelector(`[name="${fieldName}"]`).closest('.form-group');
    const errorElement = container.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// Password Strength
function initPasswordStrength() {
    const passwordField = document.getElementById('password');
    const strengthFill = document.querySelector('.strength-fill');
    const strengthLevel = document.getElementById('strengthLevel');
    
    passwordField.addEventListener('input', function() {
        const password = this.value;
        const strength = getPasswordStrength(password);
        
        updatePasswordStrengthDisplay(strength, strengthFill, strengthLevel);
    });
}

function getPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    return strength;
}

function updatePasswordStrengthDisplay(strength, fillElement, textElement) {
    const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const classes = ['very-weak', 'weak', 'fair', 'good', 'strong'];
    
    fillElement.className = 'strength-fill ' + classes[strength];
    textElement.textContent = levels[strength] || 'Very Weak';
}

// Selection Limits
function initSelectionLimits() {
    // Limit strong subjects to 5
    const strongSubjects = document.querySelectorAll('input[name="strongSubjects"]');
    strongSubjects.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            limitCheckboxSelection('strongSubjects', 5);
        });
    });
    
    // Limit career interests to 7
    const careerInterests = document.querySelectorAll('input[name="careerInterests"]');
    careerInterests.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            limitCheckboxSelection('careerInterests', 7);
        });
    });
}

function limitCheckboxSelection(name, limit) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]`);
    const checked = document.querySelectorAll(`input[name="${name}"]:checked`);
    
    if (checked.length >= limit) {
        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                checkbox.disabled = true;
                checkbox.parentNode.style.opacity = '0.5';
            }
        });
    } else {
        checkboxes.forEach(checkbox => {
            checkbox.disabled = false;
            checkbox.parentNode.style.opacity = '1';
        });
    }
}

// Dynamic Form Updates
function initDynamicFormUpdates() {
    const educationLevel = document.getElementById('currentEducation');
    const streamGroup = document.querySelector('.stream-group');
    const streamSelect = document.getElementById('stream');
    
    educationLevel.addEventListener('change', function() {
        const level = this.value;
        
        if (level === 'class-11' || level === 'class-12') {
            streamGroup.style.display = 'block';
            streamSelect.required = true;
            updateStreamOptions('school', level);
        } else if (level === 'undergraduate' || level === 'postgraduate') {
            streamGroup.style.display = 'block';
            streamSelect.required = true;
            updateStreamOptions('college', level);
        } else {
            streamGroup.style.display = 'none';
            streamSelect.required = false;
        }
    });
}

function updateStreamOptions(type, level) {
    const streamSelect = document.getElementById('stream');
    streamSelect.innerHTML = '<option value="">Select your stream</option>';
    
    let options = [];
    
    if (type === 'school') {
        options = [
            { value: 'science-pcm', text: 'Science (Physics, Chemistry, Maths)' },
            { value: 'science-pcb', text: 'Science (Physics, Chemistry, Biology)' },
            { value: 'commerce', text: 'Commerce' },
            { value: 'arts', text: 'Arts/Humanities' }
        ];
    } else if (type === 'college') {
        options = [
            { value: 'engineering', text: 'Engineering/Technology' },
            { value: 'medicine', text: 'Medicine/Healthcare' },
            { value: 'commerce', text: 'Commerce/Business' },
            { value: 'arts', text: 'Arts/Humanities' },
            { value: 'science', text: 'Pure Sciences' },
            { value: 'law', text: 'Law' },
            { value: 'other', text: 'Other' }
        ];
    }
    
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        streamSelect.appendChild(optionElement);
    });
}

// Password Toggle
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const toggleBtn = field.parentNode.querySelector('.password-toggle i');
    
    if (field.type === 'password') {
        field.type = 'text';
        toggleBtn.classList.remove('fa-eye');
        toggleBtn.classList.add('fa-eye-slash');
    } else {
        field.type = 'password';
        toggleBtn.classList.remove('fa-eye-slash');
        toggleBtn.classList.add('fa-eye');
    }
}

// Form Submission
function initFormSubmission() {
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    
    form.addEventListener('submit', handleFormSubmission);
}

async function handleFormSubmission(e) {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
        return;
    }
    
    const formData = collectFormData();
    
    // Show loading overlay
    showLoadingOverlay();
    
    try {
        const response = await submitRegistration(formData);
        
        if (response.success) {
            showSuccessMessage();
            // Redirect to dashboard or login
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        } else {
            throw new Error(response.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showErrorMessage(error.message);
    } finally {
        hideLoadingOverlay();
    }
}

function collectFormData() {
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);
    const data = {};
    
    // Convert FormData to regular object
    for (let [key, value] of formData.entries()) {
        if (data[key]) {
            // Handle multiple values (checkboxes)
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    }
    
    // Get checkbox values
    data.strongSubjects = Array.from(document.querySelectorAll('input[name="strongSubjects"]:checked'))
        .map(cb => cb.value);
    
    data.careerInterests = Array.from(document.querySelectorAll('input[name="careerInterests"]:checked'))
        .map(cb => cb.value);
    
    return data;
}

async function submitRegistration(data) {
    // Simulate API call - replace with actual API endpoint
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, message: 'Registration successful' });
        }, 2000);
    });
    
    // Actual API call would look like this:
    /*
    const response = await fetch('/backend/auth/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    return await response.json();
    */
}

// Loading and Message Functions
function showLoadingOverlay() {
    document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoadingOverlay() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

function showSuccessMessage() {
    // You can implement a toast notification system here
    alert('Registration successful! Redirecting to dashboard...');
}

function showErrorMessage(message) {
    // You can implement a toast notification system here
    alert('Registration failed: ' + message);
}

// Export functions for global use
window.RegisterForm = {
    togglePassword,
    nextStep,
    prevStep
};
