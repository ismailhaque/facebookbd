// create random number
export const createRandom = () =>{
    const random = Math.floor(Math.random() * (99999 - 10000) ) + 10000;
    return random
}