const RegisterErrors = {
    fullName : {
        required: 'Full name is required',
        tooShort: 'Full name must have at least 3 characters',
        tooLong: 'Full name must be sohrter than 20 characters'
    },
    email : {
        required: 'email is required',
        notValid:"please enter a valid email"
    },
    password : {
        required: 'Password is required',
        tooShort: 'Password must have at least 8 characters',
        tooLong: 'Password must be sohrter than 16 characters'
    },
    confirmPassword : {
        required: 'confiormPassword is required',
        doNotMatch: 'passwords do not match'
    },
    phoneNumber : {
        required: 'Phone number is required',
        notValid: 'please enter a valid phone number'
    },
}

export default RegisterErrors;