
const login = async ()=>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const form = new FormData;
    form.append('email', email);
    form.append('password', password);
    if(email === "" || password === "") return;
    await axios.post('http://127.0.0.1:8000/api/login', form).then(response=>{
        if(response.data.status === "success" && response.data.user.user_type === 1){
            localStorage.setItem("token", response.data.authorisation.token)
        }
    });
    window.location = "../index.html";
}

const button = document.getElementById("login-button");
button.onclick = login;
