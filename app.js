const text = document.querySelector('#text')
const description = document.querySelector('#description')
const file = document.querySelector('#file')
const submit = document.querySelector('#submit')
const p = document.querySelector('#p')
const img = document.querySelector('#img')

const imgone = document.querySelector('#img-one')
const output = document.querySelector('.output')

const deletePost = document.querySelector('#delete')
const likeEl = document.querySelector('#like')

let mood = 'create';
let temp;

let post = JSON.parse(localStorage.getItem('post')) ||  []

file.onchange = ()=>{
    
    const upload = new FileReader();
    upload.readAsDataURL(file.files[0])
    upload.onload = function(){
        imgone.src = upload.result
    }
}
submit.onclick = ()=>{
    submit.style.color = 'red'
}
submit.onclick = ()=>{

    let postData = {
        text:text.value,
        description:description.value,
        file:imgone.src
    }

    if (mood === 'create'){
        post.push(postData)
    } else {
        post[temp] = postData
        mood = 'create'
        submit.innerHTML = 'create'
    }

    localStorage.setItem('post' , JSON.stringify(post))

    console.log(post)
    render()
    clearInputs()
    scroll({
        behavior:"smooth"
    })
}
const clearInputs = ()=>{
    text.value = ''
    description.value = ''
    imgone.src = ''
}
const render = ()=>{

    output.innerHTML = ''

    for (let i = 0 ; i <post.length ; i++){
        output.innerHTML += `
        <div class="output-content">
            <p id="p">${post[i].text}</p>
            <p id="desc">${post[i].description}</p>
            <img id='img-output' src="${post[i].file}">
            <div class="output-cta">
                <a id="like" class="like-link">like</a>
                <a id="delete" onclick='deleteItem(${i})'>delete</a>
                <a id="update" onclick='update(${i})'>update</a>
            </div>
            </div>
        </div>
        `
    }
}

const deleteItem =(i)=>{
    post.splice(i,1)
    localStorage.post = JSON.stringify(post)
    render()
}

render()

function update(i){
    text.value = post[i].text
    description.value = post[i].description
    imgone.src = post[i].file
    
    submit.innerHTML = 'update'
    mood = 'update'
    temp = i
    scroll({
        top:0,
        behavior:"smooth"
    })
}

function handleLikeClick(event) {
    event.preventDefault();
    event.target.classList.toggle('clicked');
}
const likeLink = document.querySelectorAll('.like-link');
likeLink.forEach((link) => {
    link.addEventListener('click', handleLikeClick);
});