import {test,expect} from "@playwright/test"
import { log } from "node:console";
const authCreateTokenurl= "https://restful-booker.herokuapp.com/auth"
const createNewBookingurl = "https://restful-booker.herokuapp.com/booking"
const deleteAPIUrl="https://restful-booker.herokuapp.com/booking/"
const getBookingByIDUrl="https://restful-booker.herokuapp.com/booking/"
test("Delete API Validations",async function({request}) {
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

      const deleteRes=await request.delete(`${deleteAPIUrl}${bookingId}`,
        {headers:{"Content-Type": "application/json", "Accept" : "application/json", "Cookie" : "token="+token}});
        console.log("Deleted Status code:",deleteRes.status());
         console.log("Deleted Status Text :",deleteRes.statusText());


    const getBookingByIDRes=await request.get(`${getBookingByIDUrl}${bookingId}`);
    console.log("Get By Booking : ",getBookingByIDRes);
    expect(getBookingByIDRes.status()).toBe(404);
});