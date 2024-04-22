const { getToken } = require("../service/oauthService");
const jwt = require("jsonwebtoken");
const { save } = require("../service/userService");

try {
    // const code = "123";
    // const resp = getToken(code);
    // console.log(resp);
    // console.log(jwt);
    const user = { username: "123", password: "123", email: "123" };
    save(user).then(res => {
        console.log(res);
    }).catch(error => {
        console.log(error);
    })
} catch (error) {
    console.log(error);
}