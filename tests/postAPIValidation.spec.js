import {test,expect} from "@playwright/test"

// Purpose : To check the create API to get authication token
test("Post API with authincation",async function({request}){
    const reqdata = {
        "username": "admin",
        "password": "password123"
    }
    const responce = await request.post("https://restful-booker.herokuapp.com/auth",{headers : {"Content-Type":"application/json"}, data : reqdata});
    console.log(responce);
    const res=await responce.json();
    console.log("Responce : ",res);
    expect(res.token).not.toBeNull();
})

// Purpose : To check the create Booking API with validations
test("Create Booking API validations",async function({request}) {
    const bookingObj = {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"
    }
   const res=await request.post("https://restful-booker.herokuapp.com/booking",{headers : {"Content-Type" : "application/json"},data : bookingObj}) 
   const resultData=await res.json();
   expect(res.statusText()).toBe("OK")
   expect(resultData.bookingid).not.toBeNull()
   expect(resultData.booking.firstname).toBe(bookingObj.firstname)
   expect(resultData.booking.lastname).toBe(bookingObj.lastname)
   expect(resultData.booking.totalprice).toBe(bookingObj.totalprice)
   expect(resultData.booking.additionalneeds).toBe(bookingObj.additionalneeds)
   expect(resultData.booking.depositpaid).toBe(bookingObj.depositpaid)
   expect(resultData.booking.bookingdates.checkin).toBe(bookingObj.bookingdates.checkin)
   expect(resultData.booking.bookingdates.checkout).toBe(bookingObj.bookingdates.checkout)
})