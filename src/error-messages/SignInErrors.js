const signInErrors = {
    email : {
        required: 'email is required',
        notValid:"please enter a valid email"
    },
    password : {
        required: 'Password is required',
        tooShort: 'Password must have at least 8 characters',
        tooLong: 'Password must be sohrter than 16 characters'
    },
}

export default signInErrors;