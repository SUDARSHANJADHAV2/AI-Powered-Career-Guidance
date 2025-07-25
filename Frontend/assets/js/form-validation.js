// Advanced form validation utilities
class FormValidator {
    constructor() {
        this.rules = {};
        this.messages = {};
        this.customValidators = {};
    }
    
    // Add validation rule
    addRule(field, rule, message) {
        if (!this.rules[field]) {
            this.rules[field] = [];
            this.messages[field] = [];
        }
        
        this.rules[field].push(rule);
        this.messages[field].push(message);
        
        return this;
    }
    
    // Add custom validator
    addCustomValidator(name, validator) {
        this.customValidators[name] = validator;
        return this;
    }
    
    // Validate single field
    validateField(field, value) {
        const fieldName = field.name || field.id;
        const rules = this.rules[fieldName];
        const messages = this.messages[fieldName];
        
        if (!rules) return { valid: true };
        
        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            const message = messages[i];
            
            if (typeof rule === 'function') {
                if (!rule(value, field)) {
                    return { valid: false, message };
                }
            } else if (typeof rule === 'string') {
                if (this.customValidators[rule] && !this.customValidators[rule](value, field)) {
                    return { valid: false, message };
                }
            }
        }
        
        return { valid: true };
    }
    
    // Validate entire form
    validateForm(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        let isValid = true;
        const errors = {};
        
        inputs.forEach(input => {
            const result = this.validateField(input, input.value);
            if (!result.valid) {
                isValid = false;
                errors[input.name || input.id] = result.message;
                this.showError(input, result.message);
            } else {
                this.showSuccess(input);
            }
        });
        
        return { valid: isValid, errors };
    }
    
    // Show error for field
    showError(field, message) {
        field.classList.add('error');
        field.classList.remove('success');
        
        const errorElement = this.getErrorElement(field);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }
    
    // Show success for field
    showSuccess(field) {
        field.classList.add('success');
        field.classList.remove('error');
        
        const errorElement = this.getErrorElement(field);
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }
    
    // Get or create error element
    getErrorElement(field) {
        let errorElement = field.parentNode.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        return errorElement;
    }
}

// Common validation rules
const ValidationRules = {
    required: (value) => value && value.trim() !== '',
    
    email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !value || emailRegex.test(value);
    },
    
    phone: (value) => {
        const phoneRegex = /^[6-9]\d{9}$/;
        return !value || phoneRegex.test(value);
    },
    
    minLength: (minLength) => (value) => {
        return !value || value.length >= minLength;
    },
    
    maxLength: (maxLength) => (value) => {
        return !value || value.length <= maxLength;
    },
    
    pattern: (regex) => (value) => {
        return !value || regex.test(value);
    },
    
    matchField: (fieldId) => (value, field) => {
        const matchField = document.getElementById(fieldId);
        return !value || value === matchField.value;
    },
    
    age: (min, max) => (value) => {
        if (!value) return true;
        
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age >= min && age <= max;
    },
    
    passwordStrength: (value) => {
        if (!value) return true;
        
        let strength = 0;
        if (value.length >= 8) strength++;
        if (/[a-z]/.test(value)) strength++;
        if (/[A-Z]/.test(value)) strength++;
        if (/\d/.test(value)) strength++;
        if (/[^a-zA-Z\d]/.test(value)) strength++;
        
        return strength >= 3;
    }
};

// Initialize form validator for registration form
function initRegistrationValidator() {
    const validator = new FormValidator();
    
    // Add validation rules
    validator
        .addRule('firstName', ValidationRules.required, 'First name is required')
        .addRule('firstName', ValidationRules.minLength(2), 'First name must be at least 2 characters')
        .addRule('firstName', ValidationRules.maxLength(50), 'First name must not exceed 50 characters')
        
        .addRule('lastName', ValidationRules.required, 'Last name is required')
        .addRule('lastName', ValidationRules.minLength(2), 'Last name must be at least 2 characters')
        .addRule('lastName', ValidationRules.maxLength(50), 'Last name must not exceed 50 characters')
        
        .addRule('email', ValidationRules.required, 'Email is required')
        .addRule('email', ValidationRules.email, 'Please enter a valid email address')
        
        .addRule('phone', ValidationRules.required, 'Mobile number is required')
        .addRule('phone', ValidationRules.phone, 'Please enter a valid 10-digit mobile number')
        
        .addRule('dateOfBirth', ValidationRules.required, 'Date of birth is required')
        .addRule('dateOfBirth', ValidationRules.age(13, 35), 'Age must be between 13 and 35 years')
        
        .addRule('gender', ValidationRules.required, 'Gender is required')
        
        .addRule('city', ValidationRules.required, 'City is required')
        .addRule('city', ValidationRules.minLength(2), 'City name must be at least 2 characters')
        
        .addRule('password', ValidationRules.required, 'Password is required')
        .addRule('password', ValidationRules.minLength(8), 'Password must be at least 8 characters')
        .addRule('password', ValidationRules.passwordStrength, 'Password is too weak')
        
        .addRule('confirmPassword', ValidationRules.required, 'Please confirm your password')
        .addRule('confirmPassword', ValidationRules.matchField('password'), 'Passwords do not match')
        
        .addRule('currentEducation', ValidationRules.required, 'Current education level is required')
        .addRule('institution', ValidationRules.required, 'Institution name is required')
        .addRule('board', ValidationRules.required, 'Board/University is required')
        .addRule('academicPerformance', ValidationRules.required, 'Academic performance is required')
        .addRule('careerGoals', ValidationRules.required, 'Career goal is required')
        .addRule('workPreference', ValidationRules.required, 'Work preference is required')
        
        .addRule('agreeTerms', (value, field) => field.checked, 'You must agree to the terms and conditions');
    
    return validator;
}

// Real-time validation setup
function setupRealTimeValidation() {
    const form = document.getElementById('registrationForm');
    const validator = initRegistrationValidator();
    
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Validate on blur
        input.addEventListener('blur', function() {
            const result = validator.validateField(this, this.value);
            if (!result.valid) {
                validator.showError(this, result.message);
            } else {
                validator.showSuccess(this);
            }
        });
        
        // Clear errors on input
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorElement = this.parentNode.querySelector('.error-message');
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
            }
        });
    });
    
    return validator;
}

// Export for global use
window.FormValidator = FormValidator;
window.ValidationRules = ValidationRules;
window.initRegistrationValidator = initRegistrationValidator;
window.setupRealTimeValidation = setupRealTimeValidation;

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('registrationForm')) {
        setupRealTimeValidation();
    }
});
