let fname = document.getElementById('f-name');
let lname = document.getElementById('l-name');
let email = document.getElementById('email');
let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirm-password');
let dob = document.getElementById('dob');
let phone = document.getElementById('phone');
let image;

let signupButton = document.getElementById('signup');


document.getElementById('img').addEventListener('change', (e)=>{
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('loadend', ()=>{
        image = reader.result;
    })
})

signupButton.addEventListener('click',async ()=>{
    if(password.value !== confirmPassword.value){
        alert("Passwords do not match")
        return
    }

    if(!fname.value || !lname.value || !email.value || !password.value || !dob.value || !phone.value || !image){
        alert("All fields are required")
        return
    }
    const data = new FormData();
    
        data.append('first_name', fname.value)
        data.append('last_name', lname.value)
        data.append('email', email.value)
        data.append('password', password.value)
        data.append('dob', dob.value)
        data.append('phone_number', phone.value)
        data.append('image', image)

        await axios.post('http://127.0.0.1:8000/api/register', data).then(response=>{
            if(response.data.status === "success"){
                console.log(response)
                console.log(response.data.authorisation.token);
                localStorage.setItem("token", response.data.authorisation.token);
                window.location = "./index.html"
            }
        })
    
})