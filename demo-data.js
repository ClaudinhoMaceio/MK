// Dados de demonstração para o sistema MK Audiovisual
// Execute este código no console do navegador para popular o sistema com dados de exemplo

const demoEvents = [
    {
        id: '1',
        name: 'Casamento João e Maria',
        client: 'João Silva',
        date: '2024-12-15',
        value: 2500.00,
        phone: '(11) 99999-1111',
        responsible: 'Mikael',
        location: 'Salão de Festas Jardim das Flores',
        equipment: 'DJ Completo',
        createdAt: '2024-10-01T10:00:00.000Z'
    },
    {
        id: '2',
        name: 'Aniversário de 50 anos - Sr. Carlos',
        client: 'Carlos Santos',
        date: '2024-12-20',
        value: 1800.00,
        phone: '(11) 98888-2222',
        responsible: 'Cláudio',
        location: 'Clube Social da Cidade',
        equipment: 'Som Porte Médio',
        createdAt: '2024-10-02T14:30:00.000Z'
    },
    {
        id: '3',
        name: 'Formatura Medicina - Ana',
        client: 'Ana Costa',
        date: '2024-12-28',
        value: 3200.00,
        phone: '(11) 97777-3333',
        responsible: 'Ambos',
        location: 'Centro de Convenções',
        equipment: 'Plataforma 360',
        createdAt: '2024-10-03T09:15:00.000Z'
    },
    {
        id: '4',
        name: 'Evento Corporativo TechCorp',
        client: 'TechCorp Ltda',
        date: '2024-11-30',
        value: 4500.00,
        phone: '(11) 96666-4444',
        responsible: 'Mikael',
        location: 'Hotel Business Center',
        equipment: 'Iluminação',
        createdAt: '2024-10-04T16:45:00.000Z'
    },
    {
        id: '5',
        name: 'Festa de 15 anos - Sofia',
        client: 'Maria Silva (mãe da Sofia)',
        date: '2024-12-10',
        value: 2200.00,
        phone: '(11) 95555-5555',
        responsible: 'Cláudio',
        location: 'Espaço de Eventos Primavera',
        equipment: 'Som Porte Pequeno',
        createdAt: '2024-10-05T11:20:00.000Z'
    },
    {
        id: '6',
        name: 'Conferência de Marketing Digital',
        client: 'Instituto de Marketing',
        date: '2024-12-05',
        value: 3800.00,
        phone: '(11) 94444-6666',
        responsible: 'Ambos',
        location: 'Auditório Municipal',
        equipment: 'DJ Completo',
        createdAt: '2024-10-06T13:10:00.000Z'
    },
    {
        id: '7',
        name: 'Bodas de Ouro - Casal Silva',
        client: 'Família Silva',
        date: '2024-12-22',
        value: 1950.00,
        phone: '(11) 93333-7777',
        responsible: 'Mikael',
        location: 'Igreja São José',
        equipment: 'Som Porte Pequeno',
        createdAt: '2024-10-07T08:30:00.000Z'
    },
    {
        id: '8',
        name: 'Lançamento de Produto - Empresa XYZ',
        client: 'Empresa XYZ',
        date: '2024-12-18',
        value: 5200.00,
        phone: '(11) 92222-8888',
        responsible: 'Cláudio',
        location: 'Shopping Center Plaza',
        equipment: 'Plataforma 360',
        createdAt: '2024-10-08T15:00:00.000Z'
    },
    {
        id: '9',
        name: 'Evento Passado - Aniversário',
        client: 'Roberto Lima',
        date: '2024-10-01',
        value: 1500.00,
        phone: '(11) 91111-9999',
        responsible: 'Mikael',
        location: 'Casa de Festas',
        equipment: 'Som Porte Pequeno',
        createdAt: '2024-09-15T10:00:00.000Z'
    },
    {
        id: '10',
        name: 'Evento Urgente - Hoje',
        client: 'Cliente Urgente',
        date: new Date().toISOString().split('T')[0],
        value: 3000.00,
        phone: '(11) 90000-0000',
        responsible: 'Ambos',
        location: 'Centro de Eventos',
        equipment: 'DJ Completo',
        createdAt: '2024-10-01T08:00:00.000Z'
    },
    {
        id: '11',
        name: 'Evento Urgente - Amanhã',
        client: 'Cliente Próximo',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        value: 2500.00,
        phone: '(11) 89999-1111',
        responsible: 'Cláudio',
        location: 'Salão de Festas',
        equipment: 'Iluminação',
        createdAt: '2024-10-02T09:00:00.000Z'
    }
];

// Função para carregar dados de demonstração
async function loadDemoData() {
    if (confirm('Deseja carregar dados de demonstração? Isso irá substituir todos os eventos existentes.')) {
        try {
            // Salvar eventos usando o novo sistema
            for (const event of demoEvents) {
                await offlineStorage.saveEvent(event);
            }
            
            // Recarregar página para atualizar interface
            location.reload();
        } catch (error) {
            console.error('Erro ao carregar dados de demonstração:', error);
            alert('Erro ao carregar dados de demonstração');
        }
    }
}

// Função para limpar todos os dados
async function clearAllData() {
    if (confirm('Tem certeza que deseja excluir TODOS os eventos? Esta ação não pode ser desfeita.')) {
        try {
            // Usar a função do sistema principal
            if (window.eventManager) {
                await eventManager.clearAllData();
            } else {
                // Fallback para localStorage
                localStorage.removeItem('mkEvents');
                location.reload();
            }
        } catch (error) {
            console.error('Erro ao limpar dados:', error);
            alert('Erro ao limpar dados');
        }
    }
}

// Função para exportar dados
async function exportData() {
    try {
        if (window.eventManager) {
            await eventManager.exportAllData();
        } else {
            // Fallback para localStorage
            const events = JSON.parse(localStorage.getItem('mkEvents') || '[]');
            const dataStr = JSON.stringify(events, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = 'mk-events-backup.json';
            link.click();
            
            alert('Dados exportados com sucesso!');
        }
    } catch (error) {
        console.error('Erro ao exportar dados:', error);
        alert('Erro ao exportar dados');
    }
}

// Função para importar dados
async function importData() {
    try {
        if (window.eventManager) {
            await eventManager.importAllData();
        } else {
            // Fallback para localStorage
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            
            input.onchange = function(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        try {
                            const data = JSON.parse(e.target.result);
                            if (Array.isArray(data)) {
                                localStorage.setItem('mkEvents', JSON.stringify(data));
                                location.reload();
                                alert('Dados importados com sucesso!');
                            } else {
                                alert('Arquivo inválido!');
                            }
                        } catch (error) {
                            alert('Erro ao importar arquivo: ' + error.message);
                        }
                    };
                    reader.readAsText(file);
                }
            };
            
            input.click();
        }
    } catch (error) {
        console.error('Erro ao importar dados:', error);
        alert('Erro ao importar dados');
    }
}

// Adicionar funções ao console para facilitar o uso
console.log('=== MK Audiovisual - Funções de Demonstração ===');
console.log('loadDemoData() - Carregar dados de exemplo');
console.log('clearAllData() - Limpar todos os dados');
console.log('exportData() - Exportar dados para backup');
console.log('importData() - Importar dados de backup');

// Tornar funções globais
window.loadDemoData = loadDemoData;
window.clearAllData = clearAllData;
window.exportData = exportData;
window.importData = importData;
