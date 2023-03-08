const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

async function load(){
    const values = await fetch("http://localhost:3000").then((data) => data.json())
    values.urls.map(({name, url}) => addElement({name, url}))
}

async function update({name, url}, del = 0){
    let updt_url = `http://localhost:3000/?name=${name}&url=${url}`
    if(del === 1){
        updt_url +="&del=1"
        console.log(updt_url)
    }
    await fetch(updt_url)
}

load()

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")
    li.name = name
    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement({name, url}, trash)


    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement({name, url}, el) {
    if (confirm('Tem certeza que deseja deletar?'))
        update({name,url},1)
        el.parentNode.remove()
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    addElement({ name, url })
    update({name, url})

    input.value = ""
})