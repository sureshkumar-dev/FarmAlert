import twilio from "twilio"

const accountSid = "ACd0161cfac8f42f752a851c7a0c51bc06"
const authToken = "b7b2b747fd938e815cc480fa9c423e58"

const client = twilio(accountSid, authToken)
const sendSMS = async (phone, message) => {

    try {

        await client.messages.create({
            body: message,
            messagingServiceSid: "MG7ef98540c3048df537db7264c7a3f44c",
            to: `+91${phone}`
        })

        console.log("SMS sent")

    } catch (error) {
        console.log(error)
    }

}

export default sendSMS