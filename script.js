import { initCart } from "./cart.js"


function highlight(firstFood) {
    // Atualizar os elementos HTML com os dados do primeiro prato
    const poster = document.querySelector('#poster')
    const title = document.querySelector('#title')
    const priceCont = document.querySelector('#price_cont')
    const description = document.querySelector('#description')

    poster.src = firstFood.img
    title.innerText = firstFood.name
    priceCont.innerText = firstFood.price
    description.innerText = firstFood.description
    
    //Mudança do destaque ao clicar em um card
    Array.from(document.getElementsByClassName('card')).forEach((e)=>{
        e.addEventListener('click', ()=>{
            poster.src = e.getElementsByTagName('img')[0].src
            title.innerText = e.getElementsByTagName('h5')[0].innerText
            priceCont.innerText = e.getElementsByTagName('h4')[0].innerText
            description.innerText = e.getElementsByTagName('p')[0].innerText
        })
    })
}

function arrows() {
    const leftArrow = document.getElementsByClassName('bi-caret-left-fill')[0]
    const rightArrow = document.getElementsByClassName('bi-caret-right-fill')[0]
    const cards = document.getElementsByClassName('cards')[0]
    
    leftArrow.addEventListener('click', () => {
        cards.scrollLeft -= 140
    })
    
    rightArrow.addEventListener('click', () => {
        cards.scrollLeft += 140
    })
}

function menu() {
    const menuList = document.getElementsByClassName('bi-list')[0]
    const leftMenu = document.getElementsByClassName('left_menu')[0]
    
    menuList.addEventListener('click', () => {
        if(leftMenu.classList.contains('open')) {
            leftMenu.classList.remove('open')
            menuList.classList = 'bi menu bi-x'
        }else {
            leftMenu.classList.add('open')
            menuList.classList = 'bi menu bi-list'
        }
    })
}


//Iterar os dados do JSON e criar os cards
function addCardsFood() {
    fetch('/assets/data/foods.json')
    .then(response => response.json())
    .then(data => {
        const cardsContainer = document.querySelector('.cards');
        const promises = []

        data.forEach(prato => {
            const card = document.createElement('div')
            card.classList.add('card')

            const img = document.createElement('img')
            img.classList.add('dish')
            img.src = prato.img
            img.alt = prato.name

            const price = document.createElement('h4')
            price.textContent = prato.price

            const name = document.createElement('h5')
            name.textContent = prato.name

            const description = document.createElement('p')
            description.textContent = prato.description
            description.classList.add('description')

            const rateCart = document.createElement('div')
            rateCart.classList.add('rate_cart')

            const perDish = document.createElement('p')
            perDish.textContent = "por prato"

            const rate = document.createElement('h6')
            rate.textContent = prato.rate

            const cartIcon = document.createElement('i')
            cartIcon.classList.add('bi', 'cart', 'bi-cart-dash-fill')

            rateCart.appendChild(rate)
            rateCart.appendChild(cartIcon)

            card.appendChild(img)
            card.appendChild(price)
            card.appendChild(name)
            card.appendChild(description)
            card.appendChild(perDish)
            card.appendChild(rateCart)

            cardsContainer.appendChild(card)

            const firstFood = data[0]
            highlight(firstFood)

            const promise = new Promise(resolve => {
                resolve()
            })

            promises.push(promise)
        })

        Promise.all(promises).then(() => {
            initCart()
        })
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error))
}

addCardsFood()
menu()
arrows()

