// Script de teste para o campo de valor
// Execute no console do navegador para testar

function testValueField() {
    console.log('=== Teste do Campo de Valor ===');
    
    const valueField = document.getElementById('eventValue');
    if (!valueField) {
        console.error('❌ Campo eventValue não encontrado!');
        return;
    }
    
    console.log('✅ Campo encontrado:', valueField);
    console.log('📋 Propriedades do campo:');
    console.log('  - Tipo:', valueField.type);
    console.log('  - Valor atual:', valueField.value);
    console.log('  - Step:', valueField.step);
    console.log('  - Min:', valueField.min);
    console.log('  - Required:', valueField.required);
    console.log('  - Disabled:', valueField.disabled);
    console.log('  - Placeholder:', valueField.placeholder);
    
    // Teste 1: Definir valor
    console.log('\n🧪 Teste 1: Definir valor');
    valueField.value = '1500.50';
    console.log('Valor definido: 1500.50');
    console.log('Valor lido:', valueField.value);
    console.log('Valor parseado:', parseFloat(valueField.value));
    
    // Teste 2: Limpar campo
    console.log('\n🧪 Teste 2: Limpar campo');
    valueField.value = '';
    console.log('Campo limpo');
    console.log('Valor após limpeza:', valueField.value);
    
    // Teste 3: Testar validação
    console.log('\n🧪 Teste 3: Testar validação');
    valueField.value = '2000';
    console.log('Valor definido: 2000');
    console.log('Campo válido?', valueField.checkValidity());
    console.log('Mensagem de validação:', valueField.validationMessage);
    
    // Teste 4: Testar valor inválido
    console.log('\n🧪 Teste 4: Testar valor inválido');
    valueField.value = '-100';
    console.log('Valor definido: -100');
    console.log('Campo válido?', valueField.checkValidity());
    console.log('Mensagem de validação:', valueField.validationMessage);
    
    // Teste 5: Testar valor decimal
    console.log('\n🧪 Teste 5: Testar valor decimal');
    valueField.value = '2500.75';
    console.log('Valor definido: 2500.75');
    console.log('Campo válido?', valueField.checkValidity());
    console.log('Valor parseado:', parseFloat(valueField.value));
    
    console.log('\n✅ Teste concluído!');
}

function testFormSubmission() {
    console.log('=== Teste de Submissão do Formulário ===');
    
    const form = document.getElementById('eventForm');
    if (!form) {
        console.error('❌ Formulário não encontrado!');
        return;
    }
    
    console.log('✅ Formulário encontrado');
    
    // Preencher todos os campos
    console.log('📝 Preenchendo formulário...');
    document.getElementById('eventName').value = 'Teste de Evento';
    document.getElementById('eventClient').value = 'Cliente Teste';
    document.getElementById('eventDate').value = '2024-12-31';
    document.getElementById('eventValue').value = '1500.00';
    document.getElementById('eventPhone').value = '(11) 99999-9999';
    document.getElementById('eventResponsible').value = 'Mikael';
    document.getElementById('eventLocation').value = 'Local Teste';
    document.getElementById('eventEquipment').value = 'DJ Completo';
    
    console.log('✅ Formulário preenchido');
    console.log('Valor do campo value:', document.getElementById('eventValue').value);
    
    // Verificar validação
    console.log('🔍 Verificando validação...');
    console.log('Formulário válido?', form.checkValidity());
    
    // Verificar cada campo individualmente
    const requiredFields = [
        'eventName', 'eventClient', 'eventDate', 'eventValue', 
        'eventPhone', 'eventResponsible', 'eventLocation'
    ];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            console.log(`${fieldId}: ${field.value} (válido: ${field.checkValidity()})`);
        }
    });
    
    console.log('✅ Teste de submissão concluído!');
}

function simulateUserInput() {
    console.log('=== Simulação de Entrada do Usuário ===');
    
    const valueField = document.getElementById('eventValue');
    if (!valueField) {
        console.error('❌ Campo não encontrado!');
        return;
    }
    
    // Focar no campo
    valueField.focus();
    console.log('🎯 Campo focado');
    
    // Simular digitação
    const testValues = ['1000', '1500.50', '2000.00', '3000'];
    
    testValues.forEach((value, index) => {
        setTimeout(() => {
            valueField.value = value;
            console.log(`⌨️ Valor ${index + 1}: ${value}`);
            console.log(`   Valor parseado: ${parseFloat(value)}`);
            console.log(`   É válido: ${!isNaN(parseFloat(value)) && parseFloat(value) > 0}`);
        }, index * 1000);
    });
    
    console.log('✅ Simulação iniciada (aguarde 4 segundos)');
}

// Adicionar funções ao console
console.log('=== Testes do Campo de Valor ===');
console.log('testValueField() - Teste completo do campo');
console.log('testFormSubmission() - Teste de submissão do formulário');
console.log('simulateUserInput() - Simular entrada do usuário');

// Tornar funções globais
window.testValueField = testValueField;
window.testFormSubmission = testFormSubmission;
window.simulateUserInput = simulateUserInput;
