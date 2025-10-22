let username = "";
let password = "";
let isValid = true;
//Nếu username && password khác rỗng thì trả về true
//Nếu username && password rỗng thì trả về false
//Nếu username rỗng && password khác rỗng thì trả về false
//Nếu username khác rỗng && password rỗng thì trả về false

if (username !== "" && password !== "") {
  console.log(isValid);
} else {
  isValid = false;
  console.log(isValid);
}
