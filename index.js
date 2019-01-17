

function s(arg){
    return document.querySelector(arg)
}

function c(arg){
    return document.createElement(arg)
}

//VARIABLES

let monsters;
let mc = s('#monster-container')
let mf = s('#create-monster')

//RENDER
function render(){
    fetch('http://localhost:3000/monsters')
    .then(res => res.json())
    .then(res => {
        monsters = res
        renderMonster(monsters)
    })
}

render(); //YAY I REMEMBERED

function renderMonster(){
    mc.innerHTML = ''
    // displays the monsters
    monsters.forEach(monster => {
         let name = document.createElement('h2')
         let age = document.createElement('h4')
         let bio = document.createElement('p')
            name.innerText = monster.name
            age.innerText = monster.age
            bio.innerText = monster.description
            mc.append(name, age, bio) 
            
    })

    //displays form
    let form = c('form')
    form.setAttribute('id', 'monster-form')
    let name = c("input");
    name.placeholder = "name";
    name.id = "name";
    let age = c("input")
    age.placeholder = "age";
    age.id = "age";
    let desc = c("input")
    desc.placeholder = "description";
    desc.id = "description";
    let button = c('button')
    button.innerText = "Create"
    form.append(name, age, desc, button)

    //button click
    button.addEventListener('click', (e) => {
        // console.log(form.name.value)
        e.preventDefault()
        let mon = {
            name: form.name.value,
            age: form.age.value,
            description: form.description.value
        }
        
        fetch('http://localhost:3000/monsters', {
            
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                Accept: "application/json"
            },
            body: JSON.stringify(mon)
            
        })
        .then(render)
    })
    


 
    mf.append(form)
}//RENDERMONSTER END


