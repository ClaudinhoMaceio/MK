// Script para testar o modal de instalação PWA
// Execute no console do navegador para testar

// Função para resetar o modal (para testar novamente)
function resetPWAModal() {
    localStorage.removeItem('pwaModalShown');
    console.log('Modal PWA resetado. Recarregue a página para testar.');
}

// Função para forçar exibição do modal
function showPWAModal() {
    localStorage.removeItem('pwaModalShown');
    if (window.eventManager) {
        const deviceInfo = eventManager.detectDevice();
        eventManager.showPWAInstallModal(deviceInfo);
        console.log('Modal PWA exibido manualmente');
    } else {
        console.log('Sistema ainda não inicializado. Aguarde...');
    }
}

// Função para simular diferentes dispositivos
function simulateDevice(deviceType) {
    const originalUserAgent = navigator.userAgent;
    
    switch(deviceType) {
        case 'ios':
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
                configurable: true
            });
            break;
        case 'android':
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
                configurable: true
            });
            break;
        case 'desktop':
            Object.defineProperty(navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                configurable: true
            });
            break;
        default:
            console.log('Tipos disponíveis: ios, android, desktop');
            return;
    }
    
    console.log(`Simulando dispositivo: ${deviceType}`);
    showPWAModal();
    
    // Restaurar User Agent original após 5 segundos
    setTimeout(() => {
        Object.defineProperty(navigator, 'userAgent', {
            value: originalUserAgent,
            configurable: true
        });
    }, 5000);
}

// Função para verificar status do PWA
function checkPWAStatus() {
    const status = {
        serviceWorker: 'serviceWorker' in navigator,
        pushManager: 'PushManager' in window,
        beforeInstallPrompt: !!window.deferredPrompt,
        modalShown: localStorage.getItem('pwaModalShown') === 'true',
        standalone: window.matchMedia('(display-mode: standalone)').matches,
        deviceInfo: window.eventManager ? eventManager.detectDevice() : 'Sistema não inicializado'
    };
    
    console.log('Status do PWA:', status);
    return status;
}

// Adicionar funções ao console
console.log('=== Teste do Modal PWA ===');
console.log('resetPWAModal() - Resetar modal para testar novamente');
console.log('showPWAModal() - Mostrar modal manualmente');
console.log('simulateDevice("ios") - Simular iPhone/iPad');
console.log('simulateDevice("android") - Simular Android');
console.log('simulateDevice("desktop") - Simular Desktop');
console.log('checkPWAStatus() - Verificar status do PWA');

// Tornar funções globais
window.resetPWAModal = resetPWAModal;
window.showPWAModal = showPWAModal;
window.simulateDevice = simulateDevice;
window.checkPWAStatus = checkPWAStatus;
