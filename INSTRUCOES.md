# 📋 Instruções de Uso - MK Audiovisual

## 🚀 Como Iniciar o Sistema

### Opção 1: Abrir Diretamente
1. Navegue até a pasta do sistema
2. Clique duas vezes no arquivo `index.html`
3. O sistema abrirá no seu navegador padrão

### Opção 2: Servidor Local (Recomendado)
1. Abra o terminal/prompt de comando
2. Navegue até a pasta do sistema:
   ```bash
   cd "C:\Users\claudinho\Downloads\mk audio visual"
   ```
3. Inicie um servidor local:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (se tiver instalado)
   npx http-server -p 8000
   ```
4. Abra o navegador e acesse: `http://localhost:8000`

## 📱 Instalação como App (PWA)

### No Computador:
1. Abra o sistema no Chrome ou Edge
2. Procure pelo ícone de instalação na barra de endereços
3. Clique em "Instalar" ou "Adicionar à tela inicial"
4. O app será instalado e aparecerá no menu iniciar

### No Celular:
1. Abra o sistema no navegador
2. No Chrome: Toque no menu (3 pontos) > "Adicionar à tela inicial"
3. No Safari: Toque no botão de compartilhar > "Adicionar à Tela de Início"
4. O app aparecerá como um ícone na tela inicial

## 🎯 Primeiros Passos

### 1. Cadastrar Primeiro Evento
1. Clique em "Novo Evento"
2. Preencha todos os campos:
   - **Nome do Evento**: Ex: "Casamento João e Maria"
   - **Data**: Selecione a data do evento
   - **Valor**: Digite o valor em reais (ex: 2500.00)
   - **Telefone**: Número de contato
   - **Responsável**: Escolha entre Mikael, Cláudio ou Ambos
   - **Local**: Endereço ou nome do local
3. Clique em "Salvar Evento"

### 2. Visualizar Dashboard
- O dashboard mostra automaticamente:
  - Quantidade de eventos do mês
  - Valor total do mês
  - Distribuição dos valores (40% empresa, 30% Mikael, 30% Cláudio)
  - Gráfico de eventos por mês

### 3. Gerenciar Eventos
- **Ver todos os eventos**: Aba "Eventos"
- **Buscar evento**: Use a barra de busca
- **Editar evento**: Clique em "Editar" no evento desejado
- **Excluir evento**: Clique em "Excluir" (confirmação necessária)

### 4. Verificar Alertas
- **Aba "Alertas"**: Mostra eventos do mês atual
- **Cores dos alertas**:
  - 🔴 Vermelho: Evento urgente (hoje ou próximos 3 dias)
  - 🟡 Amarelo: Evento próximo (próximos 7 dias)
  - 🟢 Verde: Evento normal

## 🔧 Funcionalidades Avançadas

### Dados de Demonstração
Para testar o sistema com dados de exemplo:
1. Abra o console do navegador (F12)
2. Execute: `loadDemoData()`
3. Confirme para carregar 8 eventos de exemplo

### Backup e Restauração
- **Exportar dados**: `exportData()` (no console)
- **Importar dados**: `importData()` (no console)
- **Limpar todos os dados**: `clearAllData()` (no console)

### Personalização
Edite o arquivo `config.js` para alterar:
- Percentuais de distribuição
- Configurações de alertas
- Cores do tema
- Configurações de notificações

## 📊 Entendendo os Percentuais

O sistema calcula automaticamente:
```
Valor Total do Mês = Soma de todos os eventos do mês

Empresa MK Audiovisual = 40% do total
Mikael = 30% do total
Cláudio = 30% do total
```

**Exemplo:**
- Total do mês: R$ 10.000,00
- Empresa: R$ 4.000,00 (40%)
- Mikael: R$ 3.000,00 (30%)
- Cláudio: R$ 3.000,00 (30%)

## 🔄 Sincronização e Backup

### Armazenamento Local
- Todos os dados ficam salvos no navebador
- Funciona offline após o primeiro carregamento
- Dados persistem mesmo fechando o navegador

### Backup Recomendado
1. Faça backup regular dos dados
2. Use a função `exportData()` para exportar
3. Guarde o arquivo `.json` em local seguro
4. Para restaurar, use `importData()`

## 🆘 Solução de Problemas

### Sistema não carrega
- Verifique se todos os arquivos estão na mesma pasta
- Use um servidor local em vez de abrir diretamente
- Verifique o console do navegador (F12) para erros

### Dados não salvam
- Verifique se o LocalStorage está habilitado
- Limpe o cache do navegador
- Tente em modo incógnito

### PWA não instala
- Use Chrome ou Edge (recomendado)
- Verifique se o HTTPS está ativo (em servidor local)
- Aguarde alguns segundos após carregar a página

### Gráfico não aparece
- Verifique se há eventos cadastrados
- Atualize a página (F5)
- Verifique o console para erros

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique este arquivo de instruções
2. Consulte o README.md
3. Verifique o console do navebador (F12)
4. Entre em contato com o desenvolvedor

---

**Sistema desenvolvido especialmente para MK Audiovisual** 🎤✨
