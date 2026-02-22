import {test,expect} from "@playwright/test"
test("Get API Call validateion",async function({request}){
    const resp = await request.get("https://jsonplaceholder.typicode.com/posts");
    // Purpose : To print the data in JSON format
    const resJson = await resp.json();
    console.log("Responce in JSON : ", resJson);
    
    // Purpose : To print the body 
    const respbody=await resp.body();
    console.log("Body :",respbody);

    // Purpose : To print the headers and headers array 
    const header=resp.headers();
    const headerArray=resp.headersArray();
    console.log("Header",header);
    console.log("Header Array : ",headerArray);
    // Purpose : To varify the status and status text
    const status =resp.status();
    const statusText =resp.statusText();
    expect(status).toBe(200);
    expect(statusText).toBe("OK")
    const post = resJson[1];
    expect(post).toHaveProperty("userId",1);
    expect(post).toHaveProperty("id",2);
    expect(post.title).toContain("qui est esse")
    expect(post.body).toContain("est rerum tempore vitae");
})