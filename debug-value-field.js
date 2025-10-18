// Script de debug para verificar o campo de valor
// Execute no console do navegador para testar

function debugValueField() {
    const valueField = document.getElementById('eventValue');
    
    if (!valueField) {
        console.error('Campo eventValue não encontrado!');
        return;
    }
    
    console.log('Campo encontrado:', valueField);
    console.log('Tipo do campo:', valueField.type);
    console.log('Valor atual:', valueField.value);
    console.log('Atributos:', {
        step: valueField.step,
        min: valueField.min,
        required: valueField.required,
        disabled: valueField.disabled
    });
    
    // Testar se consegue definir valor
    valueField.value = '1000.50';
    console.log('Valor após definir 1000.50:', valueField.value);
    
    // Testar se consegue ler valor
    const testValue = parseFloat(valueField.value);
    console.log('Valor parseado:', testValue);
    console.log('É um número válido?', !isNaN(testValue));
}

function testFormSubmission() {
    const form = document.getElementById('eventForm');
    if (form) {
        console.log('Formulário encontrado');
        
        // Preencher todos os campos obrigatórios
        document.getElementById('eventName').value = 'Teste';
        document.getElementById('eventClient').value = 'Cliente Teste';
        document.getElementById('eventDate').value = '2024-12-31';
        document.getElementById('eventValue').value = '1500.00';
        document.getElementById('eventPhone').value = '(11) 99999-9999';
        document.getElementById('eventResponsible').value = 'Mikael';
        document.getElementById('eventLocation').value = 'Local Teste';
        document.getElementById('eventEquipment').value = 'DJ Completo';
        
        console.log('Todos os campos preenchidos');
        console.log('Valor do campo value:', document.getElementById('eventValue').value);
        
        // Verificar se o formulário é válido
        console.log('Formulário válido?', form.checkValidity());
        
        // Mostrar erros de validação
        const inputs = form.querySelectorAll('input[required], select[required]');
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                console.error('Campo inválido:', input.id, input.validationMessage);
            }
        });
    } else {
        console.error('Formulário não encontrado!');
    }
}

// Função para limpar e testar o campo
function clearAndTestValueField() {
    const valueField = document.getElementById('eventValue');
    if (valueField) {
        valueField.value = '';
        console.log('Campo limpo');
        
        // Testar entrada manual
        valueField.focus();
        console.log('Campo focado. Tente digitar um valor...');
        
        // Adicionar listener para mudanças
        valueField.addEventListener('input', function() {
            console.log('Valor digitado:', this.value);
        });
    }
}

console.log('=== Debug do Campo de Valor ===');
console.log('debugValueField() - Verificar propriedades do campo');
console.log('testFormSubmission() - Testar preenchimento completo');
console.log('clearAndTestValueField() - Limpar e testar entrada');

// Tornar funções globais
window.debugValueField = debugValueField;
window.testFormSubmission = testFormSubmission;
window.clearAndTestValueField = clearAndTestValueField;
