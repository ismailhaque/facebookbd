// email validator
export const validateEmail = (email) => {
    return String(email).toLowerCase().match(/^([a-zA-Z0-9_.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)
}

// phone number validator
export const validatePhone = (phone) => {
    return String(phone).toLowerCase().match(/^(?:\+88|88)?(01[3-9]\d{8})$/)
}
