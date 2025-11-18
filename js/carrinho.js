
const CART_STORAGE_KEY = 'danielLanchesCart';
const FAVORITES_STORAGE_KEY = 'danielLanchesFavorites';
const ORDERS_STORAGE_KEY = 'danielLanchesOrders';
const RATINGS_STORAGE_KEY = 'danielLanchesRatings';


function getCart() {
    const cartJson = localStorage.getItem(CART_STORAGE_KEY);
    return cartJson ? JSON.parse(cartJson) : [];
}


function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
}


function getFavorites() {
    const favJson = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return favJson ? JSON.parse(favJson) : [];
}


function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}


function getOrders() {
    const ordersJson = localStorage.getItem(ORDERS_STORAGE_KEY);
    return ordersJson ? JSON.parse(ordersJson) : [];
}


function saveOrders(orders) {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}


function getRatings() {
    const ratingsJson = localStorage.getItem(RATINGS_STORAGE_KEY);
    return ratingsJson ? JSON.parse(ratingsJson) : {};
}


function saveRatings(ratings) {
    localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(ratings));
}


function addItem(item) {
    const cart = getCart();
    const existingItem = cart.find(i => i.id === item.id);

    if (existingItem) {
        existingItem.quantidade += 1;
    } else {
        cart.push({ ...item, quantidade: 1 });
    }

    saveCart(cart);
    showNotification(`${item.nome} adicionado ao carrinho!`);
    
    
    if (document.getElementById('itens-carrinho')) {
        updateCartDisplay();
    }
}


function removeItem(itemId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== itemId);
    saveCart(cart);
    updateCartDisplay();
}


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


function formatPrice(price) {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


function updateCartBadge() {
    const cart = getCart();
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.textContent = cart.length;
        badge.style.display = cart.length > 0 ? 'block' : 'none';
    }
}


function updateCartDisplay() {
    const cart = getCart();
    const itensCarrinhoDiv = document.getElementById('itens-carrinho');
    const totalCarrinhoSpan = document.getElementById('total-carrinho');
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    let total = 0;

    if (!itensCarrinhoDiv) return; 

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
    
    
    const cupomInput = document.getElementById('cupom-input');
    let desconto = 0;
    if (cupomInput && cupomInput.value) {
        desconto = aplicarCupom(cupomInput.value, total);
    }
    
    const totalComDesconto = total - desconto;
    totalCarrinhoSpan.textContent = formatPrice(totalComDesconto);
    
    if (desconto > 0) {
        const descontoSpan = document.getElementById('desconto-aplicado');
        if (descontoSpan) {
            descontoSpan.textContent = `Desconto: -${formatPrice(desconto)}`;
            descontoSpan.style.display = 'block';
        }
    }
    
    finalizarCompraBtn.disabled = false;

    
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


function toggleFavorite(itemId, itemName) {
    let favorites = getFavorites();
    const index = favorites.findIndex(f => f.id === itemId);
    
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification(`${itemName} removido dos favoritos!`);
    } else {
        favorites.push({ id: itemId, nome: itemName });
        showNotification(`${itemName} adicionado aos favoritos!`);
    }
    
    saveFavorites(favorites);
    updateFavoriteButtons();
}


function isFavorite(itemId) {
    const favorites = getFavorites();
    return favorites.some(f => f.id === itemId);
}


function updateFavoriteButtons() {
    document.querySelectorAll('.favoritar-btn').forEach(btn => {
        const itemId = parseInt(btn.dataset.id);
        if (isFavorite(itemId)) {
            btn.classList.add('favorito');
            btn.textContent = '❤️ Favorito';
        } else {
            btn.classList.remove('favorito');
            btn.textContent = '🤍 Favoritar';
        }
    });
}


function aplicarCupom(codigo, total) {
    const cupons = {
        'DESCONTO10': 0.10,
        'DESCONTO20': 0.20,
        'PRIMEIRACOMPRA': 0.15,
        'DANIEL2024': 0.25
    };
    
    if (cupons[codigo.toUpperCase()]) {
        return total * cupons[codigo.toUpperCase()];
    }
    return 0;
}


function validarCupom() {
    const cupomInput = document.getElementById('cupom-input');
    const cupomMsg = document.getElementById('cupom-msg');
    const cart = getCart();
    let total = 0;
    
    cart.forEach(item => {
        total += item.preco * item.quantidade;
    });
    
    const desconto = aplicarCupom(cupomInput.value, total);
    
    if (desconto > 0) {
        cupomMsg.textContent = `Cupom aplicado! Desconto: ${formatPrice(desconto)}`;
        cupomMsg.style.color = 'green';
        updateCartDisplay();
    } else {
        cupomMsg.textContent = 'Cupom inválido!';
        cupomMsg.style.color = 'red';
    }
}


function salvarAvaliacao(itemId, estrelas, comentario) {
    const ratings = getRatings();
    if (!ratings[itemId]) {
        ratings[itemId] = [];
    }
    ratings[itemId].push({
        estrelas: parseInt(estrelas),
        comentario: comentario,
        data: new Date().toLocaleDateString('pt-BR')
    });
    saveRatings(ratings);
    showNotification('Avaliação salva com sucesso!');
    document.getElementById(`rating-form-${itemId}`).style.display = 'none';
}


function exibirAvaliacoes(itemId) {
    const ratings = getRatings();
    const avaliacoes = ratings[itemId] || [];
    const container = document.getElementById(`avaliacoes-${itemId}`);
    
    if (!container) return;
    
    if (avaliacoes.length === 0) {
        container.innerHTML = '<p>Nenhuma avaliação ainda.</p>';
        return;
    }
    
    let html = '<h4>Avaliações:</h4>';
    avaliacoes.forEach(av => {
        html += `
            <div class="avaliacao">
                <span class="estrelas">${'⭐'.repeat(av.estrelas)}</span>
                <p>${av.comentario}</p>
                <small>${av.data}</small>
            </div>
        `;
    });
    
    container.innerHTML = html;
}


function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}


function gerarLinkWhatsApp() {
    const cart = getCart();
    if (cart.length === 0) {
        showNotification('Carrinho vazio!');
        return;
    }
    
    let mensagem = 'Olá! Gostaria de fazer um pedido:\n\n';
    let total = 0;
    
    cart.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        mensagem += `${item.nome} (x${item.quantidade}) - ${formatPrice(subtotal)}\n`;
    });
    
    mensagem += `\nTotal: ${formatPrice(total)}`;
    
    const telefone = '5544999999999'; 
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(url, '_blank');
}


function filtrarCardapio(termo) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const nome = card.querySelector('h3').textContent.toLowerCase();
        const descricao = card.querySelector('p').textContent.toLowerCase();
        
        if (nome.includes(termo.toLowerCase()) || descricao.includes(termo.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}


function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}


function carregarTema() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}


function finalizarCompraComHistorico() {
    const cart = getCart();
    if (cart.length === 0) {
        showNotification('Seu carrinho está vazio.');
        return;
    }
    
    const total = document.getElementById('total-carrinho').textContent;
    const pedido = {
        id: Date.now(),
        itens: cart,
        total: total,
        data: new Date().toLocaleDateString('pt-BR'),
        hora: new Date().toLocaleTimeString('pt-BR')
    };
    
    let pedidos = getOrders();
    pedidos.push(pedido);
    saveOrders(pedidos);
    
    showNotification(`Pedido finalizado! Total: ${total}`);
    localStorage.removeItem(CART_STORAGE_KEY);
    updateCartDisplay();
    updateCartBadge();
}


document.addEventListener('DOMContentLoaded', () => {
    
    carregarTema();
    
    
    updateCartBadge();
    
    
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

    
    const favButtons = document.querySelectorAll('.favoritar-btn');
    favButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.dataset.id);
            const itemName = e.target.dataset.nome;
            toggleFavorite(itemId, itemName);
        });
    });
    updateFavoriteButtons();

    
    if (document.getElementById('itens-carrinho')) {
        updateCartDisplay();
    }

    
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener('click', finalizarCompraComHistorico);
    }

    
    const validarCupomBtn = document.getElementById('validar-cupom');
    if (validarCupomBtn) {
        validarCupomBtn.addEventListener('click', validarCupom);
    }

    
    const whatsappBtn = document.getElementById('enviar-whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', gerarLinkWhatsApp);
    }

    
    const searchInput = document.getElementById('search-cardapio');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filtrarCardapio(e.target.value);
        });
    }

    
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', toggleDarkMode);
    }

    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        });
    }

    
    const ratingForms = document.querySelectorAll('.rating-form');
    ratingForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const itemId = parseInt(form.dataset.id);
            const estrelas = form.querySelector('.rating-stars').value;
            const comentario = form.querySelector('.rating-comment').value;
            salvarAvaliacao(itemId, estrelas, comentario);
            form.reset();
            exibirAvaliacoes(itemId);
        });
    });

    
    document.querySelectorAll('[id^="avaliacoes-"]').forEach(el => {
        const itemId = parseInt(el.id.replace('avaliacoes-', ''));
        exibirAvaliacoes(itemId);
    });
});



async function calcularFrete() {
    const cepInput = document.querySelector('#frete-form input[type="text"]');
    if (!cepInput) return;
    
    const cep = cepInput.value.replace(/\D/g, '');
    
    if (!cep || cep.length < 8) {
        showNotification('Por favor, insira um CEP válido!');
        return;
    }
    
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (data.erro) {
            showNotification('CEP não encontrado!');
            return;
        }
        
        
        const regiao = data.uf;
        let valorFrete = 0;
        
        
        const fretesPorRegiao = {
            'SP': 14, 'RJ': 12, 'MG': 15, 'BA': 20, 'RS': 18,
            'PR': 10, 'SC': 16, 'ES': 13, 'PE': 22, 'CE': 25,
            'PA': 30, 'AM': 35, 'GO': 17, 'DF': 12, 'MT': 19
        };
        
        valorFrete = fretesPorRegiao[regiao] || 15;
        
        const resultado = `
            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 10px;">
                <strong>Endereço Encontrado:</strong><br>
                ${data.logradouro || 'N/A'}, ${data.bairro || 'N/A'}<br>
                ${data.localidade} - ${data.uf}<br><br>
                <strong style="color: #d62828;">Valor do Frete:</strong> R$ ${valorFrete.toFixed(2)}<br>
                <strong>Prazo de Entrega:</strong> 5-7 dias úteis
            </div>
        `;
        
        const resultadoDiv = document.getElementById('frete-resultado');
        if (resultadoDiv) {
            resultadoDiv.innerHTML = resultado;
            resultadoDiv.style.display = 'block';
        }
        
    } catch (error) {
        showNotification('Erro ao buscar CEP. Tente novamente!');
        console.error(error);
    }
}


function exibirFavoritos() {
    const favorites = getFavorites();
    const favoritosContainer = document.getElementById('favoritos-container');
    
    if (!favoritosContainer) return;
    
    if (favorites.length === 0) {
        favoritosContainer.innerHTML = '<p style="text-align: center; padding: 40px;">Você ainda não tem favoritos. Comece a adicionar seus produtos preferidos!</p>';
        return;
    }
    
    let html = '<div class="grid">';
    favorites.forEach(fav => {
        html += `
            <div class="card">
                <h3>${fav.nome}</h3>
                <p>ID do Produto: ${fav.id}</p>
                <button class="adicionar-carrinho" onclick="addItem({id: ${fav.id}, nome: '${fav.nome}', preco: 0})">Adicionar ao Carrinho</button>
                <button onclick="removerDosFavoritos(${fav.id})" style="background: #ff6b6b; margin-top: 10px;">Remover dos Favoritos</button>
            </div>
        `;
    });
    html += '</div>';
    
    favoritosContainer.innerHTML = html;
}

function removerDosFavoritos(itemId) {
    let favorites = getFavorites();
    favorites = favorites.filter(f => f.id !== itemId);
    saveFavorites(favorites);
    exibirFavoritos();
    showNotification('Removido dos favoritos!');
}


function adicionarCombo() {
    const combo = {
        id: 999,
        nome: 'Combo X-Bacon + Batata + Refri',
        preco: 33.90,
        quantidade: 1
    };
    addItem(combo);
}


document.addEventListener('DOMContentLoaded', () => {
    
    const freteForm = document.getElementById('frete-form');
    if (freteForm) {
        freteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            calcularFrete();
        });
    }
    
    
    if (document.getElementById('favoritos-container')) {
        exibirFavoritos();
    }
    
    
    const comboBtn = document.getElementById('adicionar-combo-btn');
    if (comboBtn) {
        comboBtn.addEventListener('click', adicionarCombo);
    }
});
