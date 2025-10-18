# MK Audiovisual - Sistema de Gestão

Sistema completo de gestão de eventos para a empresa MK Audiovisual, desenvolvido como PWA (Progressive Web App) com funcionalidade offline.

## 🚀 Funcionalidades

### ✅ Cadastro de Eventos
- Nome do evento
- Data do evento
- Valor do evento
- Telefone de contato
- Responsável pelo evento (Mikael, Cláudio ou Ambos)
- Local do evento

### 📊 Dashboard Inteligente
- Total de eventos do mês
- Valor total do mês
- Distribuição automática de percentuais:
  - **40%** para a empresa MK Audiovisual
  - **30%** para Mikael
  - **30%** para Cláudio
- Gráfico de eventos por mês

### 🔔 Sistema de Alertas
- Alertas automáticos para eventos do mês
- Notificações de eventos próximos
- Status visual dos eventos (urgente, próximo, normal)

### 📱 PWA (Progressive Web App)
- Funciona offline
- Pode ser instalado no celular/computador
- Interface responsiva
- Armazenamento local dos dados

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Design moderno e responsivo
- **JavaScript ES6+** - Funcionalidades interativas
- **Service Worker** - Funcionalidade offline
- **LocalStorage** - Armazenamento de dados
- **PWA** - Aplicativo web progressivo

## 📱 Como Usar

### Instalação
1. Abra o arquivo `index.html` no navegador
2. O sistema funcionará imediatamente
3. Para instalar como app:
   - No Chrome: Clique no ícone de instalação na barra de endereços
   - No Edge: Clique em "Instalar" no menu
   - No mobile: Adicione à tela inicial

### Cadastro de Eventos
1. Clique em "Novo Evento"
2. Preencha todos os campos obrigatórios
3. Clique em "Salvar Evento"

### Visualização
- **Dashboard**: Veja estatísticas e valores
- **Eventos**: Lista completa de eventos cadastrados
- **Alertas**: Eventos do mês com status

### Busca
- Use a barra de busca na aba "Eventos" para filtrar

## 💾 Armazenamento

- Todos os dados são salvos localmente no navegador
- Não há necessidade de internet após o primeiro carregamento
- Os dados são mantidos mesmo se fechar o navegador

## 🎨 Design

- Interface moderna e limpa
- Cores da empresa (azul e roxo)
- Totalmente responsivo (funciona em celular, tablet e desktop)
- Animações suaves
- Ícones Font Awesome

## 📊 Distribuição de Valores

O sistema calcula automaticamente a distribuição dos valores:

```
Valor Total do Mês = Soma de todos os eventos do mês

Empresa MK Audiovisual = 40% do total
Mikael = 30% do total  
Cláudio = 30% do total
```

## 🔧 Personalização

Para alterar os percentuais de distribuição, edite o arquivo `script.js` na função `updateDashboard()`:

```javascript
const companyAmount = monthTotal * 0.4; // 40% para a empresa
const mikaelAmount = monthTotal * 0.3;  // 30% para Mikael
const claudioAmount = monthTotal * 0.3; // 30% para Cláudio
```

## 📱 Compatibilidade

- ✅ Chrome (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile (iOS/Android)

## 🚀 Próximas Funcionalidades

- [ ] Exportação de relatórios em PDF
- [ ] Sincronização na nuvem
- [ ] Notificações push
- [ ] Backup automático
- [ ] Relatórios mensais detalhados

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato com o desenvolvedor.

---

**Desenvolvido com ❤️ para MK Audiovisual**
