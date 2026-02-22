import {test,expect} from "@playwright/test"
import fs from "fs"
test("Create the Booking with external JSON file", async function({request}){
    const file=fs.readFileSync("./testData/createNewBooking.json");
    const bookingData=JSON.parse(file);
    const resp = await request.post("https://restful-booker.herokuapp.com/booking",{
        headers : {"Content-Type" :"application/json"},
        data : bookingData
    })
    expect(resp.status()).toBe(200);
})