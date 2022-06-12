
let email = document.getElementById('email');
let password = document.getElementById('password');


let loginButton = document.getElementById('login');


loginButton.addEventListener('click',async ()=>{
    

    if(!email.value  || !password.value){
        alert("All fields are required")
        return
    }
    const data = new FormData();
    
        
        data.append('email', email.value)
        data.append('password', password.value)
        

        await axios.post('http://127.0.0.1:8000/api/login', data).then(response=>{
            if(response.data.status === "success"){
                localStorage.setItem("token", response.data.authorisation.token);
                window.location = "./index.html"
            }
        })
    
})