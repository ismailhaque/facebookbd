import { compareSync, genSaltSync, hashSync } from "bcryptjs"

/**
 * create hash password
 * @param {*} password 
 * @returns 
 */
export const createHashPass = (password) => {
    const salt = genSaltSync(10)
    const hash = hashSync(password, salt)
    return hash
}

/**
 * verify hash password
 * @param {*} password 
 * @param {*} hashpassword 
 * @returns 
 */ 
export const verifyHashPass = (password, hashpassword) => {
    return compareSync(password, hashpassword)
}