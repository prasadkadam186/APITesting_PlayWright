import {test,expect} from "@playwright/test"

const authCreateTokenurl= "https://restful-booker.herokuapp.com/auth"
const createNewBookingurl = "https://restful-booker.herokuapp.com/booking"
const putAPIUrl="https://restful-booker.herokuapp.com/booking/"
test("Put and Patch API Validations", async function({request}){
    // To get the authincation Token
    const authData = {
        "username": "admin",
        "password": "password123"
    }
    const resToken=await request.post(authCreateTokenurl,{headers : {"Content-Type": "application/json"},data:authData});
    const resTokenInJson= await resToken.json();
    const token=resTokenInJson.token;

    // To create the New Bookings
    const newBookingObject = {
        "firstname": "Prasad",
        "lastname": "Kadam",
        "totalprice": 500,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2025-01-01",
            "checkout": "2026-01-01"
        },
        "additionalneeds": "Breakfast"
    }
    const newbookingRes=await request.post(createNewBookingurl,{headers:{"Content-Type":"application/json"},data:newBookingObject})
    const newbookingResJson=await newbookingRes.json();
    const bookingId=newbookingResJson.bookingid;

    // To put the updated Details
    const UpdatedBookingObject = {
        "firstname": "Mr Prasad",
        "lastname": "Kadam",
        "totalprice": 2000,
        "depositpaid": false,
        "bookingdates": {
            "checkin": "2025-01-01",
            "checkout": "2026-01-01"
        },
        "additionalneeds": "Dinner"
    }

    const updatedRes=await request.put(`${putAPIUrl}${bookingId}`,
        {headers:{"Content-Type": "application/json", "Accept" : "application/json", "Cookie" : "token="+token},data:UpdatedBookingObject});
    const updatedResJson=await updatedRes.json();
    expect(updatedResJson.totalprice).toBe(UpdatedBookingObject.totalprice)
     expect(updatedResJson.additionalneeds).toBe("Dinner")
})