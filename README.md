# 🍔 Daniel Lanches - Site Aprimorado

Um site moderno e funcional de lanchonete com sistema de carrinho de compras, avaliações, cupons de desconto e muito mais!

## ✨ Funcionalidades Implementadas

### 1. **Sistema de Carrinho de Compras**
- Adicionar/remover itens do carrinho
- Atualizar quantidades
- Cálculo automático do total
- Persistência de dados com localStorage
- Badge com quantidade de itens no header

### 2. **Busca e Filtro no Cardápio**
- Busca em tempo real por nome do lanche
- Filtro por descrição
- Interface intuitiva com ícone de lupa

### 3. **Sistema de Favoritos**
- Salvar itens preferidos
- Botão de favorito em cada lanche
- Indicação visual de itens favoritados
- Persistência de dados

### 4. **Avaliações e Comentários**
- Sistema de 5 estrelas
- Campo para comentários
- Exibição de avaliações anteriores
- Data e hora do comentário

### 5. **Cupons de Desconto**
- Aplicar códigos promocionais
- Desconto automático no total
- Cupons disponíveis:
  - **DESCONTO10**: 10% de desconto
  - **DESCONTO20**: 20% de desconto
  - **PRIMEIRACOMPRA**: 15% de desconto
  - **DANIEL2024**: 25% de desconto

### 6. **Modo Escuro**
- Toggle para alternar entre tema claro e escuro
- Persistência da preferência do usuário
- Cores otimizadas para cada tema

### 7. **Integração com WhatsApp**
- Botão para enviar pedido via WhatsApp
- Mensagem automática com itens e total
- Link direto para conversa

### 8. **Histórico de Pedidos**
- Rastreamento de pedidos anteriores
- Data, hora e itens de cada pedido
- Visualização em tabela

### 9. **Seção de Contato Melhorada**
- Formulário funcional com validação
- Campos para nome, email e mensagem
- Notificações de sucesso

### 10. **Notificações em Tempo Real**
- Notificações de ações (adicionar ao carrinho, favoritar, etc.)
- Animações suaves
- Desaparecimento automático

### 11. **Cardápio Expandido**
- 6 lanches diferentes
- Descrições detalhadas
- Imagens de alta qualidade
- Preços variados

### 12. **Design Responsivo**
- Adaptável para mobile, tablet e desktop
- Layout flexível
- Navegação intuitiva

## 📱 Páginas do Site

### **index.html** - Página Inicial
- Hero section com call-to-action
- Seção de promoções
- Formulário de cálculo de frete
- Formulário de contato
- Informações de contato

### **cardapio.html** - Cardápio
- Grid de lanches
- Busca em tempo real
- Botões de favorito
- Sistema de avaliações
- Botões de adicionar ao carrinho

### **carrinho.html** - Carrinho de Compras
- Lista de itens
- Atualização de quantidades
- Aplicação de cupons
- Resumo do pedido
- Histórico de pedidos
- Opção de enviar via WhatsApp

## 🎨 Cores e Design

- **Cor Principal**: #d62828 (Vermelho)
- **Cor Secundária**: #f77f00 (Laranja)
- **Cor de Destaque**: #ff4500 (Laranja Escuro)
- **Cor de Sucesso**: #28a745 (Verde)
- **Cor de Alerta**: #dc3545 (Vermelho Claro)

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos responsivos e tema escuro
- **JavaScript Vanilla**: Lógica de negócio
- **LocalStorage**: Persistência de dados
- **WhatsApp Web API**: Integração com WhatsApp

## 📦 Estrutura de Arquivos

```
daniel-lanches/
├── index.html          # Página inicial
├── cardapio.html       # Cardápio com lanches
├── carrinho.html       # Carrinho de compras
├── style.css           # Estilos globais
├── js/
│   └── carrinho.js     # Lógica de carrinho e funcionalidades
├── README.md           # Este arquivo
└── Imagens
    ├── danielico.jpg
    ├── danielll.jpg
    ├── lanchao.jpg
    ├── xbacon.jpg
    ├── xburguer.jpg
    └── xfRAGON.jpg
```

## 🚀 Como Usar

1. **Abra o site**: Abra o arquivo `index.html` em um navegador web
2. **Navegue pelo cardápio**: Clique em "Cardápio" para ver todos os lanches
3. **Busque lanches**: Use a barra de busca para filtrar por nome
4. **Adicione ao carrinho**: Clique em "Adicionar ao Carrinho"
5. **Aplique cupom**: No carrinho, insira um código de cupom válido
6. **Finalize a compra**: Clique em "Finalizar Compra" ou "Enviar via WhatsApp"

## 💾 Dados Persistentes

O site utiliza localStorage para salvar:
- Itens do carrinho
- Favoritos
- Histórico de pedidos
- Avaliações
- Preferência de tema

## 🔧 Cupons Disponíveis

| Código | Desconto | Descrição |
|--------|----------|-----------|
| DESCONTO10 | 10% | Desconto geral |
| DESCONTO20 | 20% | Desconto maior |
| PRIMEIRACOMPRA | 15% | Primeira compra |
| DANIEL2024 | 25% | Desconto especial |

## 📞 Contato

- **Telefone**: (44) 1234-5678
- **Email**: contato@daniellanches.com.br
- **Horário**: Seg-Dom 11h às 23h

## 🎯 Melhorias Futuras

- [ ] Integração com API de pagamento
- [ ] Sistema de login de usuários
- [ ] Rastreamento de pedidos em tempo real
- [ ] Notificações por email
- [ ] App mobile nativa
- [ ] Sistema de pontos de fidelidade
- [ ] Integração com redes sociais

## 📝 Notas

- Todos os dados são salvos localmente no navegador
- Para sincronizar entre dispositivos, é necessário implementar um backend
- O link do WhatsApp deve ser configurado com o número real da lanchonete
- As imagens podem ser otimizadas para melhor performance

## 👨‍💻 Desenvolvedor

Site desenvolvido com ❤️ para Daniel Lanches

---

**Versão**: 2.0  
**Última atualização**: Novembro 2024
