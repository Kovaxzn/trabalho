<?php
header('Content-Type: application/json');

// Define o e-mail de destino
$email_destino = "daniel.lanches.pedidos@example.com"; // Substitua pelo e-mail real de destino

// Verifica se o método é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método não permitido.']);
    exit;
}

// Recebe o JSON enviado pelo JavaScript
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

// Verifica se os dados necessários estão presentes
if (!isset($data['carrinho']) || !isset($data['cliente']) || !isset($data['total'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dados do pedido incompletos.']);
    exit;
}

$carrinho = $data['carrinho'];
$cliente = $data['cliente'];
$total = $data['total'];

// --- Montagem do Corpo do E-mail ---

$corpo_email = "<h2>Novo Pedido - Daniel Lanches</h2>";
$corpo_email .= "<h3>Dados do Cliente</h3>";
$corpo_email .= "<ul>";
$corpo_email .= "<li><strong>Nome:</strong> " . htmlspecialchars($cliente['nome']) . "</li>";
$corpo_email .= "<li><strong>Telefone:</strong> " . htmlspecialchars($cliente['telefone']) . "</li>";
$corpo_email .= "<li><strong>Endereço:</strong> " . htmlspecialchars($cliente['endereco']) . "</li>";
$corpo_email .= "<li><strong>Email:</strong> " . htmlspecialchars($cliente['email']) . "</li>";
$corpo_email .= "</ul>";

$corpo_email .= "<h3>Itens do Pedido</h3>";
$corpo_email .= "<table border='1' cellpadding='10' cellspacing='0' width='100%'>";
$corpo_email .= "<thead><tr><th>Item</th><th>Preço Unitário</th><th>Quantidade</th><th>Subtotal</th></tr></thead>";
$corpo_email .= "<tbody>";

foreach ($carrinho as $item) {
    $subtotal = number_format($item['preco'] * $item['quantidade'], 2, ',', '.');
    $preco_unitario = number_format($item['preco'], 2, ',', '.');
    $corpo_email .= "<tr>";
    $corpo_email .= "<td>" . htmlspecialchars($item['nome']) . "</td>";
    $corpo_email .= "<td>R$ " . $preco_unitario . "</td>";
    $corpo_email .= "<td>" . $item['quantidade'] . "</td>";
    $corpo_email .= "<td>R$ " . $subtotal . "</td>";
    $corpo_email .= "</tr>";
}

$corpo_email .= "</tbody>";
$corpo_email .= "<tfoot><tr><td colspan='3' align='right'><strong>Total:</strong></td><td><strong>R$ " . number_format($total, 2, ',', '.') . "</strong></td></tr></tfoot>";
$corpo_email .= "</table>";

// --- Configuração do E-mail ---

$assunto = "Novo Pedido de Lanches - Cliente: " . htmlspecialchars($cliente['nome']);
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: Daniel Lanches <noreply@daniellanches.com>' . "\r\n"; // Substitua pelo seu e-mail de envio

// --- Envio do E-mail ---

// ATENÇÃO: A função mail() só funciona em um servidor web configurado para envio de e-mails (como um servidor de hospedagem).
// No ambiente de sandbox, esta função não enviará o e-mail de fato.
// Para fins de demonstração, vamos simular o sucesso.

$envio_sucesso = true; // Simulação de sucesso

if ($envio_sucesso) {
    // Aqui você usaria a função mail() em um ambiente real:
    // mail($email_destino, $assunto, $corpo_email, $headers);
    
    echo json_encode(['success' => true, 'message' => 'Pedido enviado com sucesso! Você receberá uma confirmação em breve.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro ao enviar o pedido. Tente novamente mais tarde.']);
}

?>
