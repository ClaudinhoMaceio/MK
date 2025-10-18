// Configurações do Sistema MK Audiovisual
const MKConfig = {
    // Percentuais de distribuição de valores
    percentages: {
        company: 20,    // Empresa MK Audiovisual
        mikael: 40,     // Mikael
        claudio: 40     // Cláudio
    },

    // Configurações de alertas
    alerts: {
        urgentDays: 2,      // Dias para considerar urgente (vermelho)
        warningDays: 7,     // Dias para considerar aviso
        showMonthAlert: true, // Mostrar alerta do mês
        showWeekAlert: true,  // Mostrar alerta de eventos da semana
        autoHidePastEvents: true // Ocultar eventos passados automaticamente
    },

    // Configurações do sistema
    system: {
        appName: 'MK Audiovisual',
        version: '1.0.0',
        currency: 'BRL',
        locale: 'pt-BR',
        dateFormat: 'dd/MM/yyyy'
    },

    // Responsáveis disponíveis (configurável)
    responsibles: [
        'Mikael',
        'Cláudio', 
        'Ambos'
    ],

    // Equipamentos disponíveis
    equipment: [
        'DJ Completo',
        'Som Porte Médio',
        'Som Porte Pequeno',
        'Plataforma 360',
        'Iluminação'
    ],

    // Funcionários com percentuais personalizados
    employees: [
        { name: 'Empresa MK', percentage: 20, color: '#667eea' },
        { name: 'Mikael', percentage: 40, color: '#28a745' },
        { name: 'Cláudio', percentage: 40, color: '#ffc107' }
    ],

    // Configurações de cache
    cache: {
        version: 'v1.0.0',
        maxAge: 86400000 // 24 horas em milissegundos
    },

    // Configurações de notificações
    notifications: {
        enabled: true,
        duration: 3000, // 3 segundos
        position: 'bottom-right'
    },

    // Configurações de tema
    theme: {
        primaryColor: '#667eea',
        secondaryColor: '#764ba2',
        successColor: '#28a745',
        warningColor: '#ffc107',
        dangerColor: '#dc3545',
        infoColor: '#17a2b8'
    },

    // Configurações de ícone personalizado
    customIcon: {
        enabled: false,
        url: null,
        type: 'default', // 'default', 'upload', 'url'
        size: 'medium' // 'small', 'medium', 'large'
    }
};

// Função para obter configuração
function getConfig(key) {
    const keys = key.split('.');
    let value = MKConfig;
    
    for (const k of keys) {
        value = value[k];
        if (value === undefined) {
            console.warn(`Configuração não encontrada: ${key}`);
            return null;
        }
    }
    
    return value;
}

// Função para definir configuração
function setConfig(key, value) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    let target = MKConfig;
    
    for (const k of keys) {
        if (!target[k]) target[k] = {};
        target = target[k];
    }
    
    target[lastKey] = value;
    console.log(`Configuração atualizada: ${key} = ${value}`);
}

// Exportar para uso global
window.MKConfig = MKConfig;
window.getConfig = getConfig;
window.setConfig = setConfig;
