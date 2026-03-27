import axios from "axios";
import expressAsyncHandler from "express-async-handler";

// send sms api bluk sms bd
const sendSMS = expressAsyncHandler(async(number, message)=>{
    await axios.get(`http://bulksmsbd.net/api/smsapi?api_key=${process.env.API_KEY}&type=text&number=${number}&senderid=8809612443880&message=${message}`)
})

// export send SMS
export default sendSMS