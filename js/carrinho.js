// Variáveis e Funções de Utilidade
const CART_STORAGE_KEY = 'danielLanchesCart';

// Função para obter o carrinho do localStorage
function getCart() {
    const cartJson = localStorage.getItem(CART_STORAGE_KEY);
    return cartJson ? JSON.parse(cartJson) : [];
}

// Função para salvar o carrinho no localStorage
function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

// Função para adicionar um item ao carrinho
function addItem(item) {
    const cart = getCart();
    const existingItem = cart.find(i => i.id === item.id);

    if (existingItem) {
        existingItem.quantidade += 1;
    } else {
        cart.push({ ...item, quantidade: 1 });
    }

    saveCart(cart);
    alert(`${item.nome} adicionado ao carrinho!`);
    // Se estiver na página do carrinho, atualiza a exibição
    if (document.getElementById('itens-carrinho')) {
        updateCartDisplay();
    }
}

// Função para remover um item do carrinho
function removeItem(itemId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== itemId);
    saveCart(cart);
    updateCartDisplay();
}

// Função para atualizar a quantidade de um item
function updateQuantity(itemId, newQuantity) {
    const cart = getCart();
    const item = cart.find(i => i.id === itemId);

    if (item) {
        item.quantidade = parseInt(newQuantity);
        if (item.quantidade <= 0) {
            removeItem(itemId);
        } else {
            saveCart(cart);
            updateCartDisplay();
        }
    }
}

// Função para formatar o preço
function formatPrice(price) {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para renderizar o carrinho na página carrinho.html
function updateCartDisplay() {
    const cart = getCart();
    const itensCarrinhoDiv = document.getElementById('itens-carrinho');
    const totalCarrinhoSpan = document.getElementById('total-carrinho');
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    let total = 0;

    if (!itensCarrinhoDiv) return; // Não está na página do carrinho

    itensCarrinhoDiv.innerHTML = '';

    if (cart.length === 0) {
        itensCarrinhoDiv.innerHTML = '<p>Seu carrinho está vazio.</p>';
        totalCarrinhoSpan.textContent = formatPrice(0);
        finalizarCompraBtn.disabled = true;
        return;
    }

    const ul = document.createElement('ul');
    ul.classList.add('lista-carrinho');

    cart.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        const li = document.createElement('li');
        li.innerHTML = `
            <span class="item-nome">${item.nome}</span>
            <span class="item-preco">${formatPrice(item.preco)}</span>
            <input type="number" min="1" value="${item.quantidade}" data-id="${item.id}" class="item-quantidade">
            <span class="item-subtotal">${formatPrice(subtotal)}</span>
            <button class="remover-item" data-id="${item.id}">Remover</button>
        `;
        ul.appendChild(li);
    });

    itensCarrinhoDiv.innerHTML = '<h3>Itens Selecionados</h3>';
    itensCarrinhoDiv.appendChild(ul);
    totalCarrinhoSpan.textContent = formatPrice(total);
    finalizarCompraBtn.disabled = false;

    // Adiciona listeners para remover e atualizar quantidade
    document.querySelectorAll('.remover-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.dataset.id);
            removeItem(itemId);
        });
    });

    document.querySelectorAll('.item-quantidade').forEach(input => {
        input.addEventListener('change', (e) => {
            const itemId = parseInt(e.target.dataset.id);
            const newQuantity = parseInt(e.target.value);
            updateQuantity(itemId, newQuantity);
        });
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Lógica para a página cardapio.html
    const addButtons = document.querySelectorAll('.adicionar-carrinho');
    addButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const item = {
                id: parseInt(e.target.dataset.id),
                nome: e.target.dataset.nome,
                preco: parseFloat(e.target.dataset.preco)
            };
            addItem(item);
        });
    });

    // Lógica para a página carrinho.html
    if (document.getElementById('itens-carrinho')) {
        updateCartDisplay();
    }

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
    // Lógica para o formulário de pedido
    const formPedido = document.getElementById('form-pedido');
    if (formPedido) {
        formPedido.addEventListener('submit', async (e) => {
            e.preventDefault();

            const cart = getCart();
            if (cart.length === 0) {
                alert('Seu carrinho está vazio.');
                return;
            }

            const total = cart.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);

            const cliente = {
                nome: document.getElementById('nome-cliente').value,
                telefone: document.getElementById('telefone-cliente').value,
                endereco: document.getElementById('endereco-cliente').value,
                email: document.getElementById('email-cliente').value
            };

            const pedidoData = {
                carrinho: cart,
                cliente: cliente,
                total: total
            };

            try {
                const response = await fetch('enviar_pedido.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(pedidoData)
                });

                const result = await response.json();

                if (result.success) {
                    alert(result.message);
                    localStorage.removeItem(CART_STORAGE_KEY); // Limpa o carrinho
                    updateCartDisplay(); // Atualiza a exibição
                    document.getElementById('resumo-carrinho').style.display = 'block';
                    document.getElementById('dados-cliente').style.display = 'none';
                } else {
                    alert('Erro ao enviar pedido: ' + result.message);
                }

            } catch (error) {
                console.error('Erro ao enviar pedido:', error);
                alert('Erro de comunicação com o servidor. Tente novamente.');
            }
        });
    }

    // Lógica para o botão Finalizar Compra
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener('click', () => {
            document.getElementById('resumo-carrinho').style.display = 'none';
            document.getElementById('dados-cliente').style.display = 'block';
        });
            const cart = getCart();
            if (cart.length > 0) {
                // Não faz nada aqui, a lógica de envio será no form-pedido
                // alert('Pedido finalizado! O total é: ' + document.getElementById('total-carrinho').textContent + '. Em breve entraremos em contato para confirmar o pedido.');
                // localStorage.removeItem(CART_STORAGE_KEY); // Limpa o carrinho
                // updateCartDisplay(); // Atualiza a exibição
=======
>>>>>>> a42b2b0d916fc354d2b59dd4d9a0d162dd98080a
>>>>>>> 147b0beb0586dd74abb26a683987aaf5527a1a9c
    // Lógica para o botão Finalizar Compra (simulação)
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener('click', () => {
            const cart = getCart();
            if (cart.length > 0) {
                alert('Pedido finalizado! O total é: ' + document.getElementById('total-carrinho').textContent + '. Em breve entraremos em contato para confirmar o pedido.');
                localStorage.removeItem(CART_STORAGE_KEY); // Limpa o carrinho
                updateCartDisplay(); // Atualiza a exibição
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> a9b52546c135942d113dd151ae682a1219a7c9a7
>>>>>>> a42b2b0d916fc354d2b59dd4d9a0d162dd98080a
>>>>>>> 147b0beb0586dd74abb26a683987aaf5527a1a9c
            } else {
                alert('Seu carrinho está vazio.');
            }
        });
    }
});
