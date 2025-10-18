// Script para testar o sistema de ícone personalizado
// Execute no console do navegador para testar

// Função para testar upload de ícone
function testIconUpload() {
    console.log('Para testar upload de ícone:');
    console.log('1. Vá para a aba "Configurações"');
    console.log('2. Na seção "Ícone Personalizado"');
    console.log('3. Selecione "Upload de arquivo"');
    console.log('4. Escolha uma imagem JPG, PNG, SVG ou GIF');
    console.log('5. Clique em "Salvar Ícone"');
}

// Função para testar URL de ícone
function testIconUrl() {
    console.log('Para testar URL de ícone:');
    console.log('1. Vá para a aba "Configurações"');
    console.log('2. Na seção "Ícone Personalizado"');
    console.log('3. Selecione "URL de imagem"');
    console.log('4. Cole uma URL de imagem válida');
    console.log('5. Clique em "Salvar Ícone"');
}

// Função para testar diferentes tamanhos
function testIconSizes() {
    console.log('Para testar tamanhos de ícone:');
    console.log('1. Configure um ícone personalizado');
    console.log('2. Altere o tamanho no seletor');
    console.log('3. Clique em "Salvar Ícone"');
    console.log('4. Veja a mudança no preview e no sistema');
}

// Função para resetar ícone
function resetIcon() {
    if (window.eventManager) {
        eventManager.resetIconConfig();
        console.log('Ícone resetado para o padrão');
    } else {
        console.log('Sistema ainda não inicializado. Aguarde...');
    }
}

// Função para verificar configuração atual
function checkIconConfig() {
    if (window.eventManager) {
        offlineStorage.getSettings('customIcon').then(config => {
            console.log('Configuração atual do ícone:', config);
        });
    } else {
        console.log('Sistema ainda não inicializado. Aguarde...');
    }
}

// Função para simular upload de ícone com URL
function simulateIconWithUrl(url) {
    if (window.eventManager) {
        // Simular configuração de ícone via URL
        const iconConfig = {
            enabled: true,
            url: url,
            type: 'url',
            size: 'medium'
        };
        
        eventManager.updateIconPreview(iconConfig);
        eventManager.applyIconToSystem(iconConfig);
        console.log('Ícone simulado com URL:', url);
    } else {
        console.log('Sistema ainda não inicializado. Aguarde...');
    }
}

// Função para criar ícone de teste
function createTestIcon() {
    // Criar um canvas com um ícone de teste
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    
    // Desenhar um círculo com as iniciais MK
    ctx.fillStyle = '#667eea';
    ctx.beginPath();
    ctx.arc(50, 50, 50, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('MK', 50, 50);
    
    // Converter para data URL
    const dataURL = canvas.toDataURL('image/png');
    
    // Aplicar como ícone personalizado
    if (window.eventManager) {
        const iconConfig = {
            enabled: true,
            url: dataURL,
            type: 'upload',
            size: 'medium'
        };
        
        eventManager.updateIconPreview(iconConfig);
        eventManager.applyIconToSystem(iconConfig);
        console.log('Ícone de teste criado e aplicado!');
    }
}

// Adicionar funções ao console
console.log('=== Teste do Sistema de Ícone Personalizado ===');
console.log('testIconUpload() - Instruções para testar upload');
console.log('testIconUrl() - Instruções para testar URL');
console.log('testIconSizes() - Instruções para testar tamanhos');
console.log('resetIcon() - Resetar para ícone padrão');
console.log('checkIconConfig() - Verificar configuração atual');
console.log('simulateIconWithUrl("URL") - Simular ícone com URL');
console.log('createTestIcon() - Criar ícone de teste com "MK"');

// Tornar funções globais
window.testIconUpload = testIconUpload;
window.testIconUrl = testIconUrl;
window.testIconSizes = testIconSizes;
window.resetIcon = resetIcon;
window.checkIconConfig = checkIconConfig;
window.simulateIconWithUrl = simulateIconWithUrl;
window.createTestIcon = createTestIcon;
