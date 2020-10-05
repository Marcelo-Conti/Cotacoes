console.log("Javascript no frontend")

const cotacoesForm = document.querySelector('form')
const mainMensage = document.querySelector('h3')
const ab = document.querySelector('#ab')
const max = document.querySelector('#max')
const min = document.querySelector('#min')

cotacoesForm.addEventListener('submit',(event) => {
    mainMensage.innerText="Buscando..."
    ab.innerHTML = ''
    max.innerHTML = ''
    min.innerHTML = ''

    event.preventDefault()
    const ativo = document.querySelector('input').value

     if(!ativo){
        mainMensage.innerText='O ativo não existe'
         return;
     }   

    fetch(`http://localhost:3000/cotacoes?ativo=${ativo}`).then((response) =>{
        response.json().then((data) => {
            if(data.error){
                mainMensage.innerText=`Alguma coisa deu errado ${error}`
            } else{
                mainMensage.innerText=data.symbol
                ab.innerHTML = "Abertura: "+data.open
                max.innerHTML = "Máximo: " +data.high
                min.innerHTML = "Mínimo: "+data.low
            }
         })
    })    
    console.log('oi '+ativo)
})