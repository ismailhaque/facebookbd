import jwt from 'jsonwebtoken'

/**
 * create json web token
 * @param {*} id 
 * @param {*} isActive 
 * @returns 
 */
export const createAccessToken = (id) => {
    const token = jwt.sign({id}, process.env.ACCESS_KEY, {
        expiresIn : 1000*60*60,
    })

    return token
}

/**
 * create json web token
 * @param {*} id 
 * @param {*} isActive 
 * @returns 
 */
export const createRefrashToken = (id) => {
    const token = jwt.sign({id}, process.env.REFRASH_KEY, {
        expiresIn : 1000*60*60*24*7
    })

    return token
}

/**
 * create json web token
 * @param {*} id 
 * @param {*} isActive 
 * @returns 
 */
export const createVerifyToken = (id) => {
    const token = jwt.sign({id}, process.env.VERIFY_KEY, {
        expiresIn : 1000*60*60*24*30
    })

    return token
}

/**
 * create json web token
 * @param {*} id 
 * @param {*} isActive 
 * @returns 
 */
export const verifyToken = (token, secret_key) => {
    const data = jwt.verify(token, secret_key)

    return data
}