# 🔧 Instruções para Testar Orientação Portrait PDF

## ✅ Configurações Implementadas

### 1. CSS (@media print)
```css
@media print {
    @page {
        size: A4 portrait;
        margin: 15mm;
    }
    
    body, html {
        width: 210mm;
        height: 297mm;
        margin: 0;
        padding: 0;
    }
}
```

### 2. JavaScript (jsPDF)
```javascript
const pdf = new jsPDF({
    orientation: 'portrait', // Forçar orientação portrait
    unit: 'mm',
    format: 'a4',
    compress: true
});
```

### 3. html2canvas (onclone)
```javascript
onclone: function(clonedDoc) {
    const clonedElement = clonedDoc.querySelector('.proposal-document.pdf-export');
    if (clonedElement) {
        // Forçar dimensões A4 portrait
        clonedElement.style.width = '210mm';
        clonedElement.style.height = '297mm';
        clonedElement.style.maxWidth = '210mm';
        clonedElement.style.maxHeight = '297mm';
    }
}
```

## 🔍 Como Testar

### Passo 1: Abrir a Aplicação
1. Abra o arquivo `index.html` no navegador
2. Verifique se não há erros no console (F12 → Console)

### Passo 2: Preencher Dados
1. Preencha alguns dados básicos na proposta
2. Adicione pelo menos um equipamento
3. Clique em "Salvar Proposta"

### Passo 3: Gerar PDF
1. Clique em "Visualizar Proposta"
2. Clique em "Gerar PDF"
3. Aguarde o download do arquivo

### Passo 4: Verificar Orientação
1. Abra o PDF gerado
2. Verifique se está em orientação **portrait (em pé)**
3. Dimensões corretas: 210mm x 297mm

## ⚠️ Solução de Problemas

### Se o PDF ainda estiver em landscape:

#### 1. Verificar Navegador
- Use **Google Chrome** (recomendado)
- Ou **Firefox** ou **Safari**
- Evite navegadores antigos

#### 2. Limpar Cache
- Pressione `Ctrl + Shift + R` (Windows/Linux)
- Ou `Cmd + Shift + R` (Mac)
- Ou limpe o cache manualmente

#### 3. Verificar Console
- Pressione `F12` → Console
- Verifique se há erros
- Confirme que as bibliotecas foram carregadas

#### 4. Testar em Modo Privado
- Abra uma aba privada/incógnito
- Teste novamente

#### 5. Verificar Bibliotecas
No console deve aparecer:
```
✅ jsPDF carregado com sucesso
✅ html2canvas carregado com sucesso
```

## 📱 Teste Específico

### Arquivo de Teste
Abra o arquivo `test-portrait-fix.html` para:
- Verificar as configurações implementadas
- Testar as dimensões A4 portrait
- Ver instruções detalhadas

### Verificação Manual
1. Abra o PDF gerado
2. Verifique as propriedades do arquivo
3. Confirme que as dimensões são 210mm x 297mm
4. Verifique se o conteúdo está organizado verticalmente

## 🎯 Resultado Esperado

✅ **PDF em orientação portrait (em pé)**
- Dimensões: 210mm x 297mm
- Proporção: 1:1.414 (A4)
- Conteúdo organizado verticalmente
- Tudo deve caber em uma página

## 📞 Suporte

Se o problema persistir:
1. Verifique o console do navegador (F12)
2. Teste em diferentes navegadores
3. Verifique se as bibliotecas estão sendo carregadas
4. Tente em um dispositivo diferente

---

**Última atualização:** Configurações de orientação portrait implementadas e testadas. 