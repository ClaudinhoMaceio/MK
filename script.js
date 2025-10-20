// Variáveis globais
let equipmentItems = [];
let currentProposal = {};

// Catálogo completo de equipamentos disponíveis
const equipmentCatalog = [
    {
        id: 1,
        type: 'RETROESCAVADEIRA',
        description: 'RETROESCAVADEIRA COM OPERADOR INCLUSO',
        unit: 1,
        monthlyValue: 'Mensal',
        value: 'R$ 8.500,00',
        extraHour: 'R$ 180,00',
        nightHour: '20% SOBRE O VALOR DA HORA',
        insurance: 'SIM',
        observations: 'COMBUSTÍVEL NÃO INCLUSO, EPI INCLUSO',
        workingHours: 'Segunda a Quinta: 07h às 17h; Sexta: 07h às 16h (com 1h de almoço). Sábados/Domingos/Feriados NÃO inclusos (dias cobrados como hora extra).',
        category: 'Equipamentos Principais'
    },
    {
        id: 2,
        type: 'MINI ESCAVADEIRA',
        description: 'MINI ESCAVADEIRA 08 TON COM OPERADOR INCLUSO',
        unit: 1,
        monthlyValue: 'Mensal',
        value: 'R$ 7.200,00',
        extraHour: 'R$ 250,00',
        nightHour: '20% SOBRE O VALOR DA HORA',
        insurance: 'SIM',
        observations: 'COMBUSTÍVEL NÃO INCLUSO, EPI INCLUSO',
        workingHours: 'Segunda a Quinta: 07h às 17h; Sexta: 07h às 16h (com 1h de almoço). Sábados/Domingos/Feriados NÃO inclusos (dias cobrados como hora extra).',
        category: 'Equipamentos Principais'
    },
    {
        id: 3,
        type: 'BOB CAT',
        description: 'BOB CAT COM OPERADOR INCLUSO',
        unit: 1,
        monthlyValue: 'Mensal',
        value: 'R$ 6.800,00',
        extraHour: 'R$ 150,00',
        nightHour: '20% SOBRE O VALOR DA HORA',
        insurance: 'SIM',
        observations: 'COMBUSTÍVEL NÃO INCLUSO, EPI INCLUSO',
        workingHours: 'Segunda a Quinta: 07h às 17h; Sexta: 07h às 16h (com 1h de almoço). Sábados/Domingos/Feriados NÃO inclusos (dias cobrados como hora extra).',
        category: 'Equipamentos Principais'
    },
    {
        id: 4,
        type: 'ESCAVADEIRA HIDRÁULICA',
        description: 'ESCAVADEIRA HIDRÁULICA 18 TON COM OPERADOR INCLUSO',
        unit: 1,
        monthlyValue: 'Mensal',
        value: 'R$ 12.500,00',
        extraHour: 'R$ 300,00',
        nightHour: '20% SOBRE O VALOR DA HORA',
        insurance: 'SIM',
        observations: 'COMBUSTÍVEL NÃO INCLUSO, EPI INCLUSO',
        workingHours: 'Segunda a Quinta: 07h às 17h; Sexta: 07h às 16h (com 1h de almoço). Sábados/Domingos/Feriados NÃO inclusos (dias cobrados como hora extra).',
        category: 'Equipamentos Principais'
    },
    {
        id: 5,
        type: 'MOBILIZAÇÃO RETROESCAVADEIRA',
        description: 'MOBILIZAÇÃO / DESMOBILIZAÇÃO (RETROESCAVADEIRA)',
        unit: 2,
        monthlyValue: 'Diário',
        value: 'R$ 800,00',
        extraHour: '',
        nightHour: '',
        insurance: '',
        observations: 'ENTREGA E RETIRADA DA MÁQUINA',
        workingHours: '',
        category: 'Serviços de Mobilização'
    },
    {
        id: 6,
        type: 'MOBILIZAÇÃO MINI ESCAVADEIRA',
        description: 'MOBILIZAÇÃO / DESMOBILIZAÇÃO (ESCAVADEIRA 08 TON)',
        unit: 2,
        monthlyValue: 'Diário',
        value: 'R$ 700,00',
        extraHour: '',
        nightHour: '',
        insurance: '',
        observations: 'ENTREGA E RETIRADA DA MÁQUINA',
        workingHours: '',
        category: 'Serviços de Mobilização'
    },
    {
        id: 7,
        type: 'MOBILIZAÇÃO BOB CAT',
        description: 'MOBILIZAÇÃO / DESMOBILIZAÇÃO (BOB CAT)',
        unit: 2,
        monthlyValue: 'Diário',
        value: 'R$ 600,00',
        extraHour: '',
        nightHour: '',
        insurance: '',
        observations: 'ENTREGA E RETIRADA DA MÁQUINA',
        workingHours: '',
        category: 'Serviços de Mobilização'
    },
    {
        id: 8,
        type: 'MOBILIZAÇÃO ESCAVADEIRA HIDRÁULICA',
        description: 'MOBILIZAÇÃO / DESMOBILIZAÇÃO (ESCAVADEIRA 15 TON)',
        unit: 2,
        monthlyValue: 'Diário',
        value: 'R$ 1.200,00',
        extraHour: '',
        nightHour: '',
        insurance: '',
        observations: 'ENTREGA E RETIRADA DA MÁQUINA',
        workingHours: '',
        category: 'Serviços de Mobilização'
    },
    {
        id: 9,
        type: 'MINI ESCAVADEIRA 03 TON',
        description: 'MINI ESCAVADEIRA 03 TON COM OPERADOR INCLUSO',
        unit: 1,
        monthlyValue: 'Mensal',
        value: 'R$ 6.500,00',
        extraHour: 'R$ 250,00',
        nightHour: '20% SOBRE O VALOR DA HORA',
        insurance: 'SIM',
        observations: 'COMBUSTÍVEL NÃO INCLUSO, EPI INCLUSO',
        workingHours: 'Segunda a Quinta: 07h às 17h; Sexta: 07h às 16h (com 1h de almoço). Sábados/Domingos/Feriados NÃO inclusos (dias cobrados como hora extra).',
        category: 'Equipamentos Principais'
    },
    {
        id: 10,
        type: 'MOBILIZAÇÃO MINI ESCAVADEIRA',
        description: 'MOBILIZAÇÃO / DESMOBILIZAÇÃO (ESCAVADEIRA 03 TON)',
        unit: 2,
        monthlyValue: 'Diário',
        value: 'R$ 650,00',
        extraHour: '',
        nightHour: '',
        insurance: '',
        observations: 'ENTREGA E RETIRADA DA MÁQUINA',
        workingHours: '',
        category: 'Serviços de Mobilização'
    },
    {
        id: 11,
        type: 'CAMINHÃO BASCULANTE',
        description: 'BOTA FORA CTR',
        unit: 1,
        monthlyValue: 'Por Viagem',
        value: 'R$ 800,00',
        extraHour: '',
        nightHour: '',
        insurance: 'SIM',
        observations: 'COMBUSTÍVEL NÃO INCLUSO, EPI INCLUSO',
        workingHours: 'Segunda a Quinta: 07h às 17h; Sexta: 07h às 18h (com 1h de almoço). Sábados/Domingos/Feriados NÃO inclusos (dias cobrados como hora extra).',
        category: 'Equipamentos Principais'
    }
];

// Configuração das colunas do relatório
let reportColumns = {
    description: true,
    unit: true,
    value: true,
    monthlyValue: true,
    extraHour: true,
    nightHour: true,
    insurance: true,
    observations: true
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setDefaultDates();
    loadSavedProposal();
    initializePWA();
    checkDeviceType();
    loadColumnsConfig(); // Carregar configuração das colunas ao iniciar
    
    // Event listeners para conectividade
    window.addEventListener('online', () => {
        document.body.classList.remove('offline');
        showNotification('Conexão restaurada!', 'success');
    });
    
    window.addEventListener('offline', () => {
        document.body.classList.add('offline');
        showNotification('Modo offline ativo', 'warning');
    });
    
    // Verificar conectividade inicial
    checkConnectivity();
    
    // Adicionar botão de compartilhamento se suportado
    if (navigator.share) {
        addShareButton();
    }
    
    // Verificar bibliotecas após carregamento
    setTimeout(checkLibraries, 2000);
});

// Verificar se as bibliotecas necessárias estão carregadas
function checkLibraries() {
    const missingLibraries = [];
    
    if (typeof window.jspdf === 'undefined') {
        missingLibraries.push('jsPDF');
    }
    
    if (typeof html2canvas === 'undefined') {
        missingLibraries.push('html2canvas');
    }
    
    if (missingLibraries.length > 0) {
        console.warn('Bibliotecas não carregadas:', missingLibraries);
        showNotification(`Atenção: Algumas bibliotecas não carregaram corretamente. Recarregue a página se houver problemas com a geração de PDF.`, 'warning');
    } else {
        console.log('✅ Todas as bibliotecas carregadas com sucesso');
    }
}

// Verificar tipo de dispositivo
function checkDeviceType() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(navigator.userAgent);
    
    if (isMobile || isTablet) {
        document.body.classList.add('mobile-device');
    } else {
        document.body.classList.add('desktop-device');
    }
}

// Inicializar PWA
function initializePWA() {
    // Registrar service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
                
                // Verificar atualizações
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            showUpdateNotification();
                        }
                    });
                });
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    }
    
    // Instalar PWA
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallButton();
    });
    
    // Verificar se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
        document.body.classList.add('pwa-installed');
    }
    
    // Configurar share target
    if ('serviceWorker' in navigator && 'serviceWorker' in navigator.serviceWorker) {
        navigator.serviceWorker.ready.then(registration => {
            if ('shareTarget' in registration) {
                console.log('Share Target API disponível');
            }
        });
    }
    
    // Configurar periodic sync (se disponível)
    if ('periodicSync' in navigator.serviceWorker) {
        navigator.serviceWorker.ready.then(registration => {
            registration.periodicSync.register('cleanup-cache', {
                minInterval: 24 * 60 * 60 * 1000 // 24 horas
            });
        });
    }
}

// Mostrar botão de instalação
function showInstallButton() {
    const installBtn = document.createElement('button');
    installBtn.className = 'install-btn';
    installBtn.innerHTML = '<i class="fas fa-download"></i> Instalar App';
    installBtn.onclick = installPWA;
    
    const header = document.querySelector('.app-header');
    header.appendChild(installBtn);
}

// Instalar PWA
async function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('PWA installed');
            showNotification('Aplicativo instalado com sucesso!', 'success');
            document.body.classList.add('pwa-installed');
        }
        deferredPrompt = null;
    }
}

// Mostrar notificação de atualização
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
        <div class="update-content">
            <i class="fas fa-download"></i>
            <span>Nova versão disponível!</span>
            <button onclick="updateApp()" class="update-btn">Atualizar</button>
            <button onclick="closeUpdateNotification()" class="close-update-btn">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
}

// Atualizar aplicativo
function updateApp() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        });
    }
    window.location.reload();
}

// Fechar notificação de atualização
function closeUpdateNotification() {
    const notification = document.querySelector('.update-notification');
    if (notification) {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }
}

// Verificar conectividade
function checkConnectivity() {
    if (!navigator.onLine) {
        showNotification('Modo offline ativo', 'warning');
        document.body.classList.add('offline');
    } else {
        document.body.classList.remove('offline');
    }
}

// Compartilhar proposta
async function shareProposal() {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Proposta de Locação - M A VIANA',
                text: `Proposta Nº ${currentProposal.propostaNum || 'N/A'}`,
                url: window.location.href
            });
        } catch (error) {
            console.log('Erro ao compartilhar:', error);
        }
    } else {
        // Fallback para navegadores sem suporte
        copyToClipboard(window.location.href);
        showNotification('Link copiado para área de transferência!', 'success');
    }
}

// Copiar para área de transferência
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback para navegadores antigos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// Adicionar botão de compartilhamento
function addShareButton() {
    const shareBtn = document.createElement('button');
    shareBtn.className = 'share-btn';
    shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
    shareBtn.onclick = shareProposal;
    shareBtn.title = 'Compartilhar proposta';
    
    const header = document.querySelector('.app-header');
    header.appendChild(shareBtn);
}

// Inicializar aplicativo
function initializeApp() {
    // Definir data atual (corrigindo problema de fuso horário)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;
    
    document.getElementById('proposta-data').value = todayString;
    document.getElementById('data-assinatura').value = todayString;
    
    // Definir número da proposta
    const proposalNumber = Math.floor(Math.random() * 1000) + 100;
    document.getElementById('proposta-num').value = proposalNumber;
    
    // Definir texto padrão do aviso de horas trabalhadas
    // O aviso de horas trabalhadas agora é exibido estaticamente no HTML
}

// Definir datas padrão
function setDefaultDates() {
    const today = new Date();
    const formattedDate = formatDate(today);
    
    // O aviso de horas trabalhadas agora é exibido estaticamente no HTML
}

// Formatar data (corrigindo problema de fuso horário)
function formatDate(date) {
    // Usar métodos locais para evitar problemas de fuso horário
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Mostrar seção
function showSection(sectionName) {
    // Esconder todas as seções
    document.querySelectorAll('.app-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remover classe active de todos os botões
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar seção selecionada
    if (sectionName === 'form') {
        document.getElementById('form-section').classList.add('active');
        document.querySelector('.nav-btn[onclick="showSection(\'form\')"]').classList.add('active');
    } else if (sectionName === 'preview') {
        document.getElementById('preview-section').classList.add('active');
        document.querySelector('.nav-btn[onclick="showSection(\'preview\')"]').classList.add('active');
        generatePreview();
    }
}

// Mostrar modal de seleção de equipamentos
function showEquipmentSelector() {
    const modal = document.createElement('div');
    modal.className = 'equipment-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Selecionar Equipamentos</h3>
                <button class="close-btn" onclick="closeEquipmentSelector()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="equipment-categories">
                    ${getEquipmentCategoriesHTML()}
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="closeEquipmentSelector()">Cancelar</button>
                <button class="btn-primary" onclick="addSelectedEquipment()">Adicionar Selecionados</button>
                <button class="btn-add" onclick="showAddEquipmentForm()"><i class='fas fa-plus'></i> Adicionar Novo Equipamento</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

// Fechar modal de seleção
function closeEquipmentSelector() {
    const modal = document.querySelector('.equipment-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// Gerar HTML das categorias de equipamentos
function getEquipmentCategoriesHTML() {
    const categories = [...new Set(equipmentCatalog.map(item => item.category))];
    
    return categories.map(category => `
        <div class="equipment-category">
            <h4>${category}</h4>
            <div class="equipment-list">
                ${equipmentCatalog
                    .filter(item => item.category === category)
                    .map(item => `
                        <div class="equipment-option" data-id="${item.id}">
                            <input type="checkbox" id="equipment-${item.id}" value="${item.id}">
                            <label for="equipment-${item.id}">
                                <div class="equipment-info">
                                    <span style="display:flex;align-items:center;"><img src='icons/${item.type.toLowerCase().replace(/[^a-z0-9]/g, '_')}.png' alt='${item.type}' style='height:18px;vertical-align:middle;margin-right:6px;object-fit:contain;' onerror="this.style.display='none'"> <strong>${item.type}</strong></span>
                                    <p>${item.description}</p>
                                    <small>Valor: ${item.value || item.monthlyValue}</small>
                                </div>
                            </label>
                        </div>
                    `).join('')}
            </div>
        </div>
    `).join('');
}

// Adicionar equipamentos selecionados
function addSelectedEquipment() {
    const selectedCheckboxes = document.querySelectorAll('.equipment-modal input[type="checkbox"]:checked');
    
    selectedCheckboxes.forEach(checkbox => {
        const equipmentId = parseInt(checkbox.value);
        const equipment = equipmentCatalog.find(item => item.id === equipmentId);
        
        if (equipment && !equipmentItems.some(item => item.id === equipmentId)) {
            equipmentItems.push({...equipment});
        }
    });
    
    renderEquipmentItems();
    closeEquipmentSelector();
    showNotification(`${selectedCheckboxes.length} equipamento(s) adicionado(s)!`, 'success');
}

// Remover item de equipamento
function removeEquipmentItem(index) {
    equipmentItems.splice(index, 1);
    renderEquipmentItems();
}

// Renderizar itens de equipamento
function renderEquipmentItems() {
    const container = document.getElementById('equipment-items');
    container.innerHTML = '';
    
    if (equipmentItems.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-truck"></i>
                <p>Nenhum equipamento selecionado</p>
                <small>Clique em "Selecionar Equipamentos" para adicionar itens</small>
            </div>
        `;
        return;
    }
    
    equipmentItems.forEach((item, index) => {
        // Tenta usar um ícone local baseado no tipo do equipamento
        const iconFile = `icons/${item.type.toLowerCase().replace(/[^a-z0-9]/g, '_')}.png`;
        const iconImg = `<img src="${iconFile}" alt="${item.type}" style="height:18px;vertical-align:middle;margin-right:6px;object-fit:contain;" onerror="this.style.display='none'">`;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'equipment-item';
        itemElement.innerHTML = `
            <h4>
                ${iconImg}<span>${item.type}</span>
                <button class="remove-btn" onclick="removeEquipmentItem(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </h4>
            <div class="equipment-details">
                <div class="detail-row">
                    <span class="label">Descrição:</span>
                    <input type="text" class="value-input" value="${item.description}" onchange="updateEquipmentItem(${index}, 'description', this.value)">
                </div>
                <div class="detail-row">
                    <span class="label">Unidade:</span>
                    <input type="number" class="value-input" value="${item.unit}" onchange="updateEquipmentItem(${index}, 'unit', this.value)" min="1">
                </div>
                <div class="detail-row">
                    <span class="label">Valor:</span>
                    <input type="text" class="value-input" value="${item.value || ''}" onchange="updateEquipmentItem(${index}, 'value', this.value)" placeholder="R$ 0,00">
                </div>
                <div class="detail-row">
                    <span class="label">Frequência de Pagamento:</span>
                    <select class="value-input" onchange="updateEquipmentItem(${index}, 'monthlyValue', this.value)">
                        <option value="Mensal" ${item.monthlyValue === 'Mensal' ? 'selected' : ''}>Mensal</option>
                        <option value="Quinzenal" ${item.monthlyValue === 'Quinzenal' ? 'selected' : ''}>Quinzenal</option>
                        <option value="Diário" ${item.monthlyValue === 'Diário' ? 'selected' : ''}>Diário</option>
                        <option value="Semanal" ${item.monthlyValue === 'Semanal' ? 'selected' : ''}>Semanal</option>
                        <option value="Por Viagem" ${item.monthlyValue === 'Por Viagem' ? 'selected' : ''}>Por Viagem</option>
                    </select>
                </div>
                ${item.extraHour ? `
                    <div class="detail-row">
                        <span class="label">Hora Extra:</span>
                        <input type="text" class="value-input" value="${item.extraHour}" onchange="updateEquipmentItem(${index}, 'extraHour', this.value)">
                    </div>
                ` : ''}
                ${item.nightHour ? `
                    <div class="detail-row">
                        <span class="label">Hora Noturna:</span>
                        <input type="text" class="value-input" value="${item.nightHour}" onchange="updateEquipmentItem(${index}, 'nightHour', this.value)">
                    </div>
                ` : ''}
                ${item.insurance ? `
                    <div class="detail-row">
                        <span class="label">Seguro:</span>
                        <input type="text" class="value-input" value="${item.insurance}" onchange="updateEquipmentItem(${index}, 'insurance', this.value)">
                    </div>
                ` : ''}
                <div class="detail-row">
                    <span class="label">COMBUSTÍVEL NÃO INCLUSO, EPI INCLUSO:</span>
                    <input type="radio" name="combustivel_epi_${index}" ${item.observations && item.observations.includes('COMBUSTÍVEL NÃO INCLUSO, EPI INCLUSO') ? 'checked' : ''} onchange="setExclusiveObservation(${index}, 'COMBUSTÍVEL NÃO INCLUSO, EPI INCLUSO')">
                </div>
                <div class="detail-row">
                    <span class="label">COMBUSTÍVEL INCLUSO, EPI INCLUSO:</span>
                    <input type="radio" name="combustivel_epi_${index}" ${item.observations && item.observations.includes('COMBUSTÍVEL INCLUSO, EPI INCLUSO') ? 'checked' : ''} onchange="setExclusiveObservation(${index}, 'COMBUSTÍVEL INCLUSO, EPI INCLUSO')">
                </div>
                <div class="detail-row">
                    <span class="label">Observações:</span>
                    <input type="text" class="value-input" value="${item.observations}" onchange="updateEquipmentItem(${index}, 'observations', this.value)">
                </div>
                ${item.workingHours ? `
                    <div class="detail-row">
                        <span class="label">Horário de Trabalho:</span>
                        <textarea class="value-textarea" onchange="updateEquipmentItem(${index}, 'workingHours', this.value)">${item.workingHours}</textarea>
                    </div>
                ` : ''}
            </div>
        `;
        container.appendChild(itemElement);
    });
}

// Atualizar item de equipamento
function updateEquipmentItem(index, field, value) {
    equipmentItems[index][field] = value;
    showNotification('Valor atualizado!', 'success');
}

// Função para marcar apenas uma observação exclusiva
function setExclusiveObservation(index, text) {
    equipmentItems[index].observations = text;
    renderEquipmentItems();
    showNotification('Observação atualizada!', 'success');
}

// Salvar proposta
function saveProposal() {
    const proposal = {
        empresa: document.getElementById('empresa').value,
        cnpj: document.getElementById('cnpj').value,
        contato: document.getElementById('contato').value,
        email: document.getElementById('email').value,
        endereco: document.getElementById('endereco').value,
        bairro: document.getElementById('bairro').value,
        clienteEmpresa: document.getElementById('cliente-empresa').value,
        clienteCnpj: document.getElementById('cliente-cnpj').value,
        clienteContato: document.getElementById('cliente-contato').value,
        clienteEmail: document.getElementById('cliente-email').value,
        clienteEndereco: document.getElementById('cliente-endereco').value,
        clienteBairro: document.getElementById('cliente-bairro').value,
        localObra: document.getElementById('local-obra').value,
        propostaNum: document.getElementById('proposta-num').value,
        propostaData: document.getElementById('proposta-data').value,
        validade: document.getElementById('validade').value,
        pagamento: document.getElementById('pagamento').value,
        prazo: document.getElementById('prazo').value,
        // Aviso de horas trabalhadas agora é estático no HTML
        assinatura: document.getElementById('assinatura').value,
        dataAssinatura: document.getElementById('data-assinatura').value,
        equipmentItems: equipmentItems
    };
    
    currentProposal = proposal;
    localStorage.setItem('currentProposal', JSON.stringify(proposal));
    
    showNotification('Proposta salva com sucesso!', 'success');
}

// Gerar preview
function generatePreview() {
    const container = document.getElementById('pdf-content');
    const proposal = currentProposal;
    if (!proposal.empresa) saveProposal();
    
    // Adiciona o logo no topo do PDF
    const logoHtml = `<div class='logo-topo' style="text-align: center; margin-bottom: 10px;"><img src='icons/logo.png' alt='Logo M A VIANA' style='max-height: 45px; max-width: 150px; object-fit: contain;'>`;
    
    // Gerar cabeçalhos da tabela baseado na configuração
    const headers = ['#'];
    if (reportColumns.description) headers.push('Descrição');
    if (reportColumns.unit) headers.push('UND');
    if (reportColumns.value) headers.push('Valor');
    if (reportColumns.monthlyValue) headers.push('Freq.');
    if (reportColumns.extraHour) headers.push('Extra');
    if (reportColumns.nightHour) headers.push('Noturna');
    if (reportColumns.insurance) headers.push('Seguro');
    if (reportColumns.observations) headers.push('Obs');
    
    // Gerar linhas da tabela baseado na configuração
    const tableRows = (proposal.equipmentItems || equipmentItems).map((item, index) => {
        const cells = [`${index + 1}`];
        if (reportColumns.description) cells.push(item.description);
        if (reportColumns.unit) cells.push(item.unit);
        if (reportColumns.value) cells.push(item.value || '-');
        if (reportColumns.monthlyValue) cells.push(item.monthlyValue);
        if (reportColumns.extraHour) cells.push(item.extraHour || '-');
        if (reportColumns.nightHour) cells.push(item.nightHour || '-');
        if (reportColumns.insurance) cells.push(item.insurance || '-');
        if (reportColumns.observations) cells.push(item.observations || '-');
        return `<tr>${cells.map(cell => `<td style="padding: 4px 3px; text-align: left; border-bottom: 1px solid #ecf0f1; font-size: 8px; vertical-align: top;">${cell}</td>`).join('')}</tr>`;
    }).join('');
    
    // Formatar data da proposta
    const propostaData = proposal.propostaData ? formatDate(new Date(proposal.propostaData)) : '_____';
    const dataAssinatura = proposal.dataAssinatura ? formatDate(new Date(proposal.dataAssinatura)) : '_____';
    
    container.innerHTML = `
        <div class="proposal-document pdf-export" style="background: white; padding: 15px; font-family: 'Arial', sans-serif; color: #333; line-height: 1.2; font-size: 9px;">
            ${logoHtml}
            <h1 style="color: #2c3e50; font-size: 16px; font-weight: 700; text-align: center; margin-bottom: 10px; border-bottom: 2px solid #3498db; padding-bottom: 5px; letter-spacing: 0.5px;">PROPOSTA DE SERVIÇO / LOCAÇÃO</h1>
            
            <!-- Cabeçalho compacto com informações da empresa e cliente lado a lado -->
            <div style="display: flex; gap: 15px; margin-bottom: 10px;">
                <div style="flex: 1; background: #f8f9fa; padding: 8px; border-radius: 4px; border-left: 3px solid #3498db;">
                    <h3 style="color: #2c3e50; font-size: 10px; font-weight: 600; margin: 0 0 5px 0;">EMPRESA</h3>
                    <p style="margin: 2px 0; font-size: 8px; color: #555;"><strong>CNPJ:</strong> ${proposal.cnpj || '14.251.441/0001-15'}</p>
                    <p style="margin: 2px 0; font-size: 8px; color: #555;"><strong>Contato:</strong> ${proposal.contato || '(11) 97103-7390'}</p>
                    <p style="margin: 2px 0; font-size: 8px; color: #555;"><strong>Email:</strong> ${proposal.email || 'vianamarcelo7@gmail.com'}</p>
                    <p style="margin: 2px 0; font-size: 8px; color: #555;"><strong>Endereço:</strong> ${proposal.endereco || 'R. Des. Aureo Cerqueira Leite, 36'}</p>
                </div>
                <div style="flex: 1; background: #f8f9fa; padding: 8px; border-radius: 4px; border-left: 3px solid #e74c3c;">
                    <h3 style="color: #2c3e50; font-size: 10px; font-weight: 600; margin: 0 0 5px 0;">CLIENTE</h3>
                    <p style="margin: 2px 0; font-size: 8px; color: #555;"><strong>Empresa:</strong> ${proposal.clienteEmpresa || '_____'}</p>
                    <p style="margin: 2px 0; font-size: 8px; color: #555;"><strong>CNPJ:</strong> ${proposal.clienteCnpj || '_____'}</p>
                    <p style="margin: 2px 0; font-size: 8px; color: #555;"><strong>Contato:</strong> ${proposal.clienteContato || '_____'}</p>
                    <p style="margin: 2px 0; font-size: 8px; color: #555;"><strong>Email:</strong> ${proposal.clienteEmail || '_____'}</p>
                    <p style="margin: 2px 0; font-size: 8px; color: #555;"><strong>Endereço:</strong> ${proposal.clienteEndereco || '_____'}</p>
                    <p style="margin: 2px 0; font-size: 8px; color: #555;"><strong>Local da Obra:</strong> ${proposal.localObra || '_____'}</p>
                </div>
            </div>
            
            <!-- Cabeçalho da proposta compacto -->
            <div style="background: #3498db; color: white; padding: 6px 12px; margin-bottom: 10px; text-align: center; font-weight: 600; border-radius: 4px;">
                <div style="display: flex; justify-content: space-around; font-size: 9px;">
                    <span><strong>Nº:</strong> ${proposal.propostaNum || '_____'}</span>
                    <span><strong>Data:</strong> ${propostaData}</span>
                    <span><strong>Validade:</strong> ${proposal.validade || '7 dias'}</span>
                </div>
            </div>
            
            <!-- Tabela de equipamentos compacta -->
            <div style="margin-bottom: 10px;">
                <h3 style="color: #2c3e50; font-size: 10px; font-weight: 600; margin: 0 0 5px 0; border-left: 3px solid #3498db; padding-left: 6px;">EQUIPAMENTOS E SERVIÇOS</h3>
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; background: white; border: 1px solid #ecf0f1; font-size: 8px;">
                        <thead>
                            <tr>
                                ${headers.map(header => `<th style="background: #3498db; color: white; font-weight: 600; font-size: 8px; text-transform: uppercase; letter-spacing: 0.2px; padding: 4px 3px; text-align: left; border-bottom: 1px solid #ecf0f1;">${header}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <!-- Seção inferior com pagamento e aceite lado a lado -->
            <div style="display: flex; gap: 15px; margin-bottom: 10px;">
                <div style="flex: 1; background: #f8f9fa; padding: 8px; border-radius: 4px; border-left: 3px solid #28a745;">
                    <h3 style="color: #2c3e50; font-size: 10px; font-weight: 600; margin: 0 0 5px 0;">PAGAMENTO</h3>
                    <p style="margin: 2px 0; font-size: 8px; color: #555;"><strong>Forma:</strong> ${proposal.pagamento || 'TRANSFERÊNCIA'}</p>
                    <p style="margin: 2px 0; font-size: 8px; color: #555;"><strong>Prazo:</strong> ${proposal.prazo || 'A COMBINAR'}</p>
                </div>
                <div style="flex: 1; background: #f8f9fa; padding: 8px; border-radius: 4px; border-left: 3px solid #ffc107; text-align: center;">
                    <h3 style="color: #2c3e50; font-size: 10px; font-weight: 600; margin: 0 0 5px 0;">HORÁRIO DE TRABALHO</h3>
                    <p style="margin: 2px 0; font-size: 8px; color: #555; line-height: 1.3;"><strong>Segunda a Quinta:</strong> 07h às 17h</p>
                    <p style="margin: 2px 0; font-size: 8px; color: #555; line-height: 1.3;"><strong>Sexta:</strong> 07h às 18h com 1 hora de almoço</p>
                    <p style="margin: 2px 0; font-size: 7px; color: #666; font-style: italic; line-height: 1.2;">Sábado, Domingo e Feriados NÃO inclusos (dias cobrados como hora extra)</p>
                    <div style="display: flex; justify-content: space-between; margin-top: 5px; padding-top: 5px; border-top: 1px solid #e9ecef; font-size: 8px; color: #555;">
                        <span><strong>Assinatura:</strong> ${proposal.assinatura || '_____'}</span>
                        <span><strong>Data:</strong> ${dataAssinatura}</span>
                    </div>
                </div>
            </div>
            
            <!-- Rodapé compacto -->
            <div style="text-align: center; color: #7f8c8d; font-size: 7px; margin-top: 10px; padding-top: 8px; border-top: 1px solid #ecf0f1; font-style: italic;">
                M A VIANA LOCAÇÕES E SERVIÇOS - ME &bull; Proposta digital
            </div>
        </div>
    `;
}

// Função para baixar o PDF normalmente ao clicar em 'Gerar PDF'
async function generatePDF() {
    try {
        showNotification('Gerando PDF...', 'info');
        saveProposal();
        
        // Verificar se as bibliotecas estão carregadas
        if (typeof window.jspdf === 'undefined') {
            throw new Error('Biblioteca jsPDF não encontrada');
        }
        if (typeof html2canvas === 'undefined') {
            throw new Error('Biblioteca html2canvas não encontrada');
        }
        
        // Garantir que o preview seja gerado com o novo design
        if (!document.getElementById('preview-section').classList.contains('active')) {
            generatePreview();
        }
        
        // Aguardar para o CSS ser aplicado corretamente
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const element = document.querySelector('.proposal-document.pdf-export');
        if (!element) {
            throw new Error('Elemento do documento não encontrado');
        }
        
        // Configurações mais conservadoras para html2canvas
        const canvas = await html2canvas(element, {
            scale: 1.5, // Reduzido para melhor compatibilidade
            useCORS: true,
            allowTaint: false, // Mudado para false para melhor compatibilidade
            backgroundColor: '#ffffff',
            width: element.offsetWidth,
            height: element.offsetHeight,
            scrollX: 0,
            scrollY: 0,
            logging: false,
            removeContainer: false, // Mudado para false
            foreignObjectRendering: false,
            imageTimeout: 30000, // Aumentado timeout
            onclone: function(clonedDoc) {
                // Garantir que o elemento clonado tenha as dimensões corretas
                const clonedElement = clonedDoc.querySelector('.proposal-document.pdf-export');
                if (clonedElement) {
                    clonedElement.style.width = '210mm';
                    clonedElement.style.height = '297mm';
                    clonedElement.style.maxWidth = '210mm';
                    clonedElement.style.maxHeight = '297mm';
                }
            }
        });
        
        if (!canvas) {
            throw new Error('Falha ao gerar canvas');
        }
        
        const imgData = canvas.toDataURL('image/png', 0.95); // Reduzida qualidade para melhor compatibilidade
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        // Configurações de página A4 com margens otimizadas
        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 15;
        const usableWidth = pageWidth - (2 * margin);
        const usableHeight = pageHeight - (2 * margin);
        
        // Calcular dimensões da imagem mantendo proporção
        const imgAspectRatio = canvas.width / canvas.height;
        const pageAspectRatio = usableWidth / usableHeight;
        
        let imgWidth, imgHeight;
        if (imgAspectRatio > pageAspectRatio) {
            imgWidth = usableWidth;
            imgHeight = usableWidth / imgAspectRatio;
        } else {
            imgHeight = usableHeight;
            imgWidth = usableHeight * imgAspectRatio;
        }
        
        // Centralizar a imagem na página
        const xOffset = margin + (usableWidth - imgWidth) / 2;
        const yOffset = margin + (usableHeight - imgHeight) / 2;
        
        // Adicionar primeira página
        pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
        
        // Verificar se precisa de páginas adicionais
        let heightLeft = imgHeight;
        heightLeft -= usableHeight;
        
        // Adicionar páginas adicionais se necessário
        while (heightLeft >= 0) {
            const position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', xOffset, yOffset + position, imgWidth, imgHeight);
            heightLeft -= usableHeight;
        }
        
        // Nome do arquivo com timestamp
        const today = new Date();
        const timestamp = today.toISOString().slice(0, 10).replace(/-/g, '');
        const fileName = `proposta_${currentProposal.propostaNum || 'locacao'}_${timestamp}.pdf`;
        
        // Tentar salvar o PDF
        pdf.save(fileName);
        showNotification('PDF gerado com sucesso!', 'success');
        
    } catch (error) {
        console.error('Erro detalhado ao gerar PDF:', error);
        
        // Mensagem de erro mais específica
        let errorMessage = 'Erro ao gerar o PDF.\n\n';
        
        if (error.message.includes('jsPDF')) {
            errorMessage += '• Biblioteca jsPDF não carregada\n';
        } else if (error.message.includes('html2canvas')) {
            errorMessage += '• Biblioteca html2canvas não carregada\n';
        } else if (error.message.includes('Elemento')) {
            errorMessage += '• Erro na renderização do documento\n';
        }
        
        errorMessage += '\nSoluções:\n';
        errorMessage += '• Recarregue a página e tente novamente\n';
        errorMessage += '• Use Google Chrome ou Safari\n';
        errorMessage += '• Permita pop-ups e downloads\n';
        errorMessage += '• Verifique sua conexão com a internet';
        
        showNotification(errorMessage, 'error');
    }
}

// Gerar PDF e retornar Blob para link temporário
async function generatePDFAndGetBlob() {
    try {
        showNotification('Gerando PDF...', 'info');
        saveProposal();
        if (!document.getElementById('preview-section').classList.contains('active')) {
            generatePreview();
        }
        window.scrollTo(0, 0);
        
        // Aguardar um pouco mais para garantir que o DOM esteja totalmente renderizado
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const element = document.querySelector('.proposal-document.pdf-export');
        
        // Configurações otimizadas para PDF branco e limpo
        const canvas = await html2canvas(element, {
            scale: 3, // Maior resolução para melhor qualidade
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            width: element.scrollWidth,
            height: element.scrollHeight,
            scrollX: 0,
            scrollY: 0,
            logging: false, // Desabilitar logs para melhor performance
            removeContainer: true, // Remover containers temporários
            foreignObjectRendering: false, // Melhor compatibilidade
            imageTimeout: 15000, // Timeout maior para imagens
            // Forçar orientação portrait
            onclone: function(clonedDoc) {
                const clonedElement = clonedDoc.querySelector('.proposal-document.pdf-export');
                if (clonedElement) {
                    // Forçar dimensões A4 portrait
                    clonedElement.style.width = '210mm';
                    clonedElement.style.height = '297mm';
                    clonedElement.style.maxWidth = '210mm';
                    clonedElement.style.maxHeight = '297mm';
                    clonedElement.style.transform = 'none';
                    clonedElement.style.transformOrigin = 'top left';
                }
            }
        });
        
        const imgData = canvas.toDataURL('image/png', 1.0); // Qualidade máxima
        const { jsPDF } = window.jspdf;
        
        // Configurações explícitas para orientação portrait
        const pdf = new jsPDF({
            orientation: 'portrait', // Forçar orientação portrait
            unit: 'mm',
            format: 'a4',
            compress: true
        });
        
        // Configurações de página A4 portrait (210mm x 297mm)
        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 10; // Reduzido de 15 para 10
        const usableWidth = pageWidth - (2 * margin);
        const usableHeight = pageHeight - (2 * margin);
        
        // Calcular dimensões da imagem mantendo proporção
        const imgAspectRatio = canvas.width / canvas.height;
        const pageAspectRatio = usableWidth / usableHeight;
        
        let imgWidth, imgHeight;
        if (imgAspectRatio > pageAspectRatio) {
            // Imagem mais larga que a página
            imgWidth = usableWidth;
            imgHeight = usableWidth / imgAspectRatio;
        } else {
            // Imagem mais alta que a página
            imgHeight = usableHeight;
            imgWidth = usableHeight * imgAspectRatio;
        }
        
        // Centralizar a imagem na página
        const xOffset = margin + (usableWidth - imgWidth) / 2;
        const yOffset = margin + (usableHeight - imgHeight) / 2;
        
        // Adicionar primeira página
        pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
        
        // Verificar se precisa de páginas adicionais
        let heightLeft = imgHeight;
        let position = 0;
        heightLeft -= usableHeight;
        
        // Adicionar páginas adicionais se necessário
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', xOffset, yOffset + position, imgWidth, imgHeight);
            heightLeft -= usableHeight;
        }
        
        // Gerar Blob
        const blob = pdf.output('blob');
        return blob;
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        showNotification('Erro ao gerar o PDF.\nPossíveis soluções:\n- Permita pop-ups e downloads no navegador.\n- Tente usar o Google Chrome (Android) ou Safari (iPhone).\n- Se o problema persistir, entre em contato com o suporte.', 'error');
        throw error;
    }
}

// Botão para enviar link do PDF via WhatsApp
async function sendPDFLinkWhatsApp() {
    try {
        const blob = await generatePDFAndGetBlob();
        const fileName = `proposta_${currentProposal.propostaNum || 'locacao'}_${formatDate(new Date()).replace(/\//g, '-')}.pdf`;
        // Criar link temporário
        const url = URL.createObjectURL(blob);
        // Mensagem personalizada
        const message = `Olá! Segue o link para baixar a proposta de locação de equipamentos Nº ${currentProposal.propostaNum || 'N/A'} da M A VIANA LOCAÇÕES E SERVIÇOS - ME.\n\nClique para baixar: ${url}\n\nObs: O link só funciona neste dispositivo e sessão. Salve o PDF após abrir.`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        showNotification('WhatsApp aberto com o link do PDF! Lembre-se: o link só funciona neste dispositivo.', 'info');
        // Opcional: abrir o link para download automaticamente
        setTimeout(() => {
            window.open(url, '_blank');
        }, 2000);
    } catch (error) {
        // Mensagem de erro já tratada em generatePDFAndGetBlob
    }
}

// Compartilhar via WhatsApp
function shareWhatsApp() {
    try {
        // Primeiro gerar o PDF
        generatePDFAndGetBlob().then(() => {
            // Aguardar um pouco para o PDF ser gerado
            setTimeout(() => {
                const message = `Olá! Segue a proposta de locação de equipamentos Nº ${currentProposal.propostaNum || 'N/A'} da M A VIANA LOCAÇÕES E SERVIÇOS - ME.`;
                
                // URL do WhatsApp com mensagem
                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
                
                // Abrir WhatsApp
                window.open(whatsappUrl, '_blank');
                
                showNotification('Abrindo WhatsApp... Lembre-se de anexar manualmente o PDF salvo à conversa!', 'info');
                alert('O WhatsApp será aberto com a mensagem pronta.\n\nIMPORTANTE: Você deve anexar manualmente o PDF gerado à conversa antes de enviar.');
            }, 2000);
        }).catch(error => {
            console.error('Erro ao gerar PDF para WhatsApp:', error);
            showNotification('Erro ao preparar PDF para WhatsApp', 'error');
        });
        
    } catch (error) {
        console.error('Erro ao abrir WhatsApp:', error);
        showNotification('Erro ao abrir WhatsApp', 'error');
    }
}

// Mostrar notificação
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Carregar proposta salva
function loadSavedProposal() {
    const saved = localStorage.getItem('currentProposal');
    if (saved) {
        currentProposal = JSON.parse(saved);
        
        // Preencher campos
        if (currentProposal.clienteEmpresa) document.getElementById('cliente-empresa').value = currentProposal.clienteEmpresa;
        if (currentProposal.clienteCnpj) document.getElementById('cliente-cnpj').value = currentProposal.clienteCnpj;
        if (currentProposal.clienteContato) document.getElementById('cliente-contato').value = currentProposal.clienteContato;
        if (currentProposal.clienteEmail) document.getElementById('cliente-email').value = currentProposal.clienteEmail;
        if (currentProposal.clienteEndereco) document.getElementById('cliente-endereco').value = currentProposal.clienteEndereco;
        if (currentProposal.clienteBairro) document.getElementById('cliente-bairro').value = currentProposal.clienteBairro;
        if (currentProposal.localObra) document.getElementById('local-obra').value = currentProposal.localObra;
        if (currentProposal.propostaNum) document.getElementById('proposta-num').value = currentProposal.propostaNum;
        if (currentProposal.propostaData) document.getElementById('proposta-data').value = currentProposal.propostaData;
        // Aviso de horas trabalhadas agora é estático no HTML
        if (currentProposal.assinatura) document.getElementById('assinatura').value = currentProposal.assinatura;
        if (currentProposal.dataAssinatura) document.getElementById('data-assinatura').value = currentProposal.dataAssinatura;
        
        if (currentProposal.equipmentItems) {
            equipmentItems = currentProposal.equipmentItems;
            renderEquipmentItems();
        }
    }
} 

// Formulário para adicionar novo equipamento
function showAddEquipmentForm() {
    const modal = document.querySelector('.equipment-modal .modal-body');
    if (!modal) return;
    modal.innerHTML = `
        <h4>Novo Equipamento</h4>
        <div class='form-row'>
            <input type='text' id='new-type' placeholder='Tipo'>
        </div>
        <div class='form-row'>
            <input type='text' id='new-description' placeholder='Descrição'>
        </div>
        <div class='form-row'>
            <input type='number' id='new-unit' placeholder='Unidade' min='1' value='1'>
        </div>
        <div class='form-row'>
            <input type='text' id='new-value' placeholder='Valor (ex: R$ 8.500,00)'>
        </div>
        <div class='form-row'>
            <select id='new-monthlyValue'>
                <option value='Mensal'>Mensal</option>
                <option value='Quinzenal'>Quinzenal</option>
                <option value='Diário'>Diário</option>
                <option value='Semanal'>Semanal</option>
                <option value='Por Viagem'>Por Viagem</option>
            </select>
        </div>
        <div class='form-row'>
            <input type='text' id='new-extraHour' placeholder='Hora Extra'>
        </div>
        <div class='form-row'>
            <input type='text' id='new-nightHour' placeholder='Hora Noturna'>
        </div>
        <div class='form-row'>
            <input type='text' id='new-insurance' placeholder='Seguro'>
        </div>
        <div class='form-row'>
            <input type='text' id='new-observations' placeholder='Observações'>
        </div>
        <div class='form-row'>
            <textarea id='new-workingHours' placeholder='Horário de Trabalho'></textarea>
        </div>
        <div class='form-row'>
            <input type='text' id='new-category' placeholder='Categoria'>
        </div>
        <div class='form-row'>
            <button class='btn-primary' onclick='saveNewEquipment()'>Salvar Equipamento</button>
            <button class='btn-secondary' onclick='showEquipmentSelector()'>Cancelar</button>
        </div>
    `;
}

function saveNewEquipment() {
    const newEquipment = {
        id: Date.now(),
        type: document.getElementById('new-type').value,
        description: document.getElementById('new-description').value,
        unit: parseInt(document.getElementById('new-unit').value) || 1,
        value: document.getElementById('new-value').value,
        monthlyValue: document.getElementById('new-monthlyValue').value,
        extraHour: document.getElementById('new-extraHour').value,
        nightHour: document.getElementById('new-nightHour').value,
        insurance: document.getElementById('new-insurance').value,
        observations: document.getElementById('new-observations').value,
        workingHours: document.getElementById('new-workingHours').value,
        category: document.getElementById('new-category').value || 'Outros'
    };
    equipmentCatalog.push(newEquipment);
    showEquipmentSelector();
    showNotification('Novo equipamento adicionado!', 'success');
} 

// Modal de opções do WhatsApp
function showWhatsAppOptions() {
    // Remover modal antigo se existir
    const oldModal = document.getElementById('whatsapp-options-modal');
    if (oldModal) oldModal.remove();
    // Criar modal
    const modal = document.createElement('div');
    modal.id = 'whatsapp-options-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.25)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';
    modal.innerHTML = `
      <div style="background:#fff;padding:28px 22px;border-radius:14px;box-shadow:0 4px 24px #0002;min-width:260px;text-align:center;max-width:90vw;">
        <h3 style='margin-bottom:18px;font-size:1.1em;color:#007AFF;'>Como deseja enviar pelo WhatsApp?</h3>
        <button onclick="closeWhatsAppOptions();shareWhatsApp();" style="margin:8px 0 12px 0;padding:10px 22px;font-size:1em;border-radius:7px;border:none;background:#007AFF;color:#fff;cursor:pointer;width:100%;">Enviar PDF como arquivo</button>
        <button onclick="closeWhatsAppOptions();sendPDFLinkWhatsApp();" style="margin-bottom:8px;padding:10px 22px;font-size:1em;border-radius:7px;border:1.5px solid #007AFF;background:#fff;color:#007AFF;cursor:pointer;width:100%;">Enviar link para download</button>
        <br><button onclick="closeWhatsAppOptions();" style="margin-top:10px;font-size:0.95em;color:#888;background:none;border:none;cursor:pointer;">Cancelar</button>
      </div>
    `;
    document.body.appendChild(modal);
}
function closeWhatsAppOptions() {
    const modal = document.getElementById('whatsapp-options-modal');
    if (modal) modal.remove();
} 

// Modal para configurar colunas do relatório
function showReportColumnsConfig() {
    const modal = document.createElement('div');
    modal.id = 'columns-config-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.25)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';
    modal.innerHTML = `
      <div style="background:#fff;padding:28px 22px;border-radius:14px;box-shadow:0 4px 24px #0002;min-width:280px;text-align:center;max-width:90vw;">
        <h3 style='margin-bottom:18px;font-size:1.1em;color:#007AFF;'>Selecionar Colunas do Relatório</h3>
        <div style="text-align:left;margin-bottom:20px;">
          <label style="display:block;margin:8px 0;cursor:pointer;">
            <input type="checkbox" id="col-desc" ${reportColumns.description ? 'checked' : ''} style="margin-right:8px;">
            Descrição
          </label>
          <label style="display:block;margin:8px 0;cursor:pointer;">
            <input type="checkbox" id="col-unit" ${reportColumns.unit ? 'checked' : ''} style="margin-right:8px;">
            UND
          </label>
          <label style="display:block;margin:8px 0;cursor:pointer;">
            <input type="checkbox" id="col-val" ${reportColumns.value ? 'checked' : ''} style="margin-right:8px;">
            Valor
          </label>
          <label style="display:block;margin:8px 0;cursor:pointer;">
            <input type="checkbox" id="col-value" ${reportColumns.monthlyValue ? 'checked' : ''} style="margin-right:8px;">
            Frequência de Pagamento
          </label>
          <label style="display:block;margin:8px 0;cursor:pointer;">
            <input type="checkbox" id="col-extra" ${reportColumns.extraHour ? 'checked' : ''} style="margin-right:8px;">
            Extra
          </label>
          <label style="display:block;margin:8px 0;cursor:pointer;">
            <input type="checkbox" id="col-night" ${reportColumns.nightHour ? 'checked' : ''} style="margin-right:8px;">
            Noturna
          </label>
          <label style="display:block;margin:8px 0;cursor:pointer;">
            <input type="checkbox" id="col-insurance" ${reportColumns.insurance ? 'checked' : ''} style="margin-right:8px;">
            Seguro
          </label>
          <label style="display:block;margin:8px 0;cursor:pointer;">
            <input type="checkbox" id="col-obs" ${reportColumns.observations ? 'checked' : ''} style="margin-right:8px;">
            Obs
          </label>
        </div>
        <button onclick="saveColumnsConfig()" style="margin:8px 0 12px 0;padding:10px 22px;font-size:1em;border-radius:7px;border:none;background:#007AFF;color:#fff;cursor:pointer;width:100%;">Salvar Configuração</button>
        <br><button onclick="closeColumnsConfig()" style="margin-top:10px;font-size:0.95em;color:#888;background:none;border:none;cursor:pointer;">Cancelar</button>
      </div>
    `;
    document.body.appendChild(modal);
}

function closeColumnsConfig() {
    const modal = document.getElementById('columns-config-modal');
    if (modal) modal.remove();
}

function saveColumnsConfig() {
    reportColumns = {
        description: document.getElementById('col-desc').checked,
        unit: document.getElementById('col-unit').checked,
        value: document.getElementById('col-val').checked,
        monthlyValue: document.getElementById('col-value').checked,
        extraHour: document.getElementById('col-extra').checked,
        nightHour: document.getElementById('col-night').checked,
        insurance: document.getElementById('col-insurance').checked,
        observations: document.getElementById('col-obs').checked
    };
    localStorage.setItem('reportColumns', JSON.stringify(reportColumns));
    closeColumnsConfig();
    showNotification('Configuração salva!', 'success');
}

// Carregar configuração das colunas
function loadColumnsConfig() {
    const saved = localStorage.getItem('reportColumns');
    if (saved) {
        reportColumns = JSON.parse(saved);
    }
} 