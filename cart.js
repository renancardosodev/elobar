
function initCart() {
    const cartItems = document.getElementById('cart_items')
    const cartTotal = document.getElementById('cart_total')
    const cartContainer = document.querySelector('.cart_container')
    const cartEmptyMessage = document.createElement('p')
    cartEmptyMessage.textContent = 'O carrinho está vazio'
    cartEmptyMessage.classList.add('cart_empty_message')
    cartContainer.appendChild(cartEmptyMessage)

    const successMessage = document.getElementById('success_message') 

    const cart = []

    function updateCartUI() {
        cartItems.innerHTML = ''
        let total = 0
        if (cart.length === 0) {
            cartEmptyMessage.style.display = 'block'
            document.getElementById('finish_order').disabled = true
        } else {
            cartEmptyMessage.style.display = 'none'
            document.getElementById('finish_order').disabled = false
            cart.forEach(item => {
                const li = document.createElement('li')
                li.innerHTML = `
                    <span class="name_food">${item.name}: </span>
                    <button class="decrease" data-name="${item.name}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-name="${item.name}">+</button>
                    <span> - Total: R$ ${(item.price * item.quantity).toFixed(2)}</span>
                `
                cartItems.appendChild(li)
                total += item.price * item.quantity
            })
        }
        cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`

        if (cart.length > 0) {
            cartContainer.classList.add('show')
        } else {
            cartContainer.classList.remove('show')
        }
    }

    function addToCart(food) {
        const existingItem = cart.find(item => item.name === food.name)
        if (existingItem) {
            existingItem.quantity++
        } else {
            cart.push({ ...food, quantity: 1 })
        }
        updateCartUI()
    }

    function removeFromCart(name) {
        const index = cart.findIndex(item => item.name === name)
        cart.splice(index, 1)
        updateCartUI()
    }

    function increaseQuantity(name) {
        const item = cart.find(item => item.name === name)
        if (item) {
            item.quantity++
            updateCartUI()
        }
    }

    function decreaseQuantity(name) {
        const item = cart.find(item => item.name === name)
        if (item) {
            item.quantity--
            if (item.quantity === 0) {
                removeFromCart(name)
            } else {
                updateCartUI()
            }
        }
    }

    function finishOrder() {
        console.log("Itens no Carrinho:")
        cart.forEach(item => {
            console.log(`Item: ${item.name}, Quantidade: ${item.quantity}, Valor Unitário: R$ ${item.price.toFixed(2)}, Valor Total: R$ ${(item.price * item.quantity).toFixed(2)}`)
        })
        console.log(`Total do Pedido: R$ ${cartTotal.textContent.split(":")[1].trim()}`)
        // Aqui pode-se adicionar a lógica para finalizar o pedido, como enviar os dados para o servidor.
        successMessage.style.display = 'block'
        setTimeout(() => { successMessage.style.display = 'none' }, 3000) 
    }

    function initializeCart() {
        const buyButton = document.querySelector('#buy')
        const cartIcons = document.querySelectorAll('.cart')
        const shopIcons = document.querySelectorAll('.shop')
        const finishOrderButton = document.getElementById('finish_order')

        buyButton.addEventListener('click', () => {
            const name = document.querySelector('#title').textContent
            const price = parseFloat(document.querySelector('#price_cont').textContent.replace('R$', ''))
            const food = { name, price }
            addToCart(food)
        })

        cartIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                const card = icon.parentElement.parentElement
                const name = card.querySelector('h5').textContent
                const price = parseFloat(card.querySelector('h4').textContent.replace('R$', ''))
                const food = { name, price }
                addToCart(food)
            })
        })

        shopIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                if (cartContainer.classList.contains('show')) {
                    cartContainer.classList.remove('show')
                } else {
                    cartContainer.classList.add('show')
                }
            })
        })

        finishOrderButton.addEventListener('click', () => {
            finishOrder()
            cart.length = 0 
            updateCartUI() 
        })

        cartItems.addEventListener('click', (event) => {
            if (event.target.classList.contains('increase')) {
                const name = event.target.dataset.name
                increaseQuantity(name)
            } else if (event.target.classList.contains('decrease')) {
                const name = event.target.dataset.name
                decreaseQuantity(name)
            }
        })
    }

    initializeCart()
}




export { initCart };
