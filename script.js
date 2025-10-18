// Sistema de Gestão MK Audiovisual
class MKEventManager {
    constructor() {
        this.events = [];
        this.history = [];
        this.employees = [];
        this.currentEditingId = null;
        this.init();
    }

    async init() {
        try {
            // Aguardar inicialização do IndexedDB
            await offlineStorage.init();
            
            // Carregar dados
            await this.loadAllData();
            
            // Sincronizar dados
            await offlineStorage.syncData();
            
            // Atualizar interface
            this.updateDashboard();
            this.renderEvents();
            this.renderAlerts();
            this.renderHistory();
            this.renderCalendar();
            this.renderSettings();
            
            // Configurar listeners
            this.setupEventListeners();
            
        // Verificar alertas
        this.checkForMonthAlerts();
        this.checkForWeekAlerts();
        
            // Verificar instalação PWA
            this.checkPWAInstallation();
            
            // Carregar configuração de ícone personalizado
            await this.loadIconConfig();
            
            console.log('Sistema MK Audiovisual inicializado com sucesso');
        } catch (error) {
            console.error('Erro ao inicializar sistema:', error);
            this.showToast('Erro ao inicializar sistema', 'error');
        }
    }

    async loadAllData() {
        try {
            this.events = await offlineStorage.getActiveEvents();
            this.history = await offlineStorage.getHistory();
            this.employees = await offlineStorage.getEmployees();
            
            // Se não há funcionários, carregar do config
            if (this.employees.length === 0) {
                this.employees = getConfig('employees');
                await offlineStorage.saveEmployees(this.employees);
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            this.events = [];
            this.history = [];
            this.employees = getConfig('employees');
        }
    }

    // Gerenciamento de Eventos
    async saveEvent(event) {
        event.preventDefault();
        
        // Validar campos obrigatórios
        const name = document.getElementById('eventName').value.trim();
        const client = document.getElementById('eventClient').value.trim();
        const date = document.getElementById('eventDate').value;
        const valueStr = document.getElementById('eventValue').value.trim();
        const phone = document.getElementById('eventPhone').value.trim();
        const responsible = document.getElementById('eventResponsible').value;
        const location = document.getElementById('eventLocation').value.trim();
        const equipment = document.getElementById('eventEquipment').value;
        
        // Validações
        if (!name) {
            this.showToast('Nome do evento é obrigatório', 'error');
            return;
        }
        if (!client) {
            this.showToast('Nome da contratante é obrigatório', 'error');
            return;
        }
        if (!date) {
            this.showToast('Data do evento é obrigatória', 'error');
            return;
        }
        if (!valueStr || isNaN(parseFloat(valueStr)) || parseFloat(valueStr) <= 0) {
            this.showToast('Valor do evento deve ser um número maior que zero', 'error');
            return;
        }
        if (!phone) {
            this.showToast('Telefone de contato é obrigatório', 'error');
            return;
        }
        if (!responsible) {
            this.showToast('Responsável pelo evento é obrigatório', 'error');
            return;
        }
        if (!location) {
            this.showToast('Local do evento é obrigatório', 'error');
            return;
        }
        
        const eventData = {
            id: this.currentEditingId || Date.now().toString(),
            name: name,
            client: client,
            date: date,
            value: parseFloat(valueStr),
            phone: phone,
            responsible: responsible,
            location: location,
            equipment: equipment,
            createdAt: this.currentEditingId ? this.events.find(e => e.id === this.currentEditingId)?.createdAt || new Date().toISOString() : new Date().toISOString()
        };

        try {
            await offlineStorage.saveEvent(eventData);
            
            if (this.currentEditingId) {
                this.showToast('Evento atualizado com sucesso!', 'success');
            } else {
                this.showToast('Evento adicionado com sucesso!', 'success');
            }

            // Recarregar dados
            await this.loadAllData();
            
            // Atualizar interface
            this.updateDashboard();
            this.renderEvents();
            this.renderAlerts();
            this.renderHistory();
            this.renderCalendar();
            
            this.closeEventModal();
        } catch (error) {
            console.error('Erro ao salvar evento:', error);
            this.showToast('Erro ao salvar evento', 'error');
        }
    }

    async deleteEvent(id) {
        if (confirm('Tem certeza que deseja excluir este evento?')) {
            try {
                await offlineStorage.deleteEvent(id);
                await this.loadAllData();
                
                this.updateDashboard();
                this.renderEvents();
                this.renderAlerts();
                this.renderHistory();
                this.renderCalendar();
                this.showToast('Evento excluído com sucesso!', 'success');
            } catch (error) {
                console.error('Erro ao excluir evento:', error);
                this.showToast('Erro ao excluir evento', 'error');
            }
        }
    }

    editEvent(id) {
        const event = this.events.find(e => e.id === id);
        if (event) {
            this.currentEditingId = id;
        document.getElementById('eventName').value = event.name;
        document.getElementById('eventClient').value = event.client || '';
        document.getElementById('eventDate').value = event.date;
        document.getElementById('eventValue').value = event.value;
        document.getElementById('eventPhone').value = event.phone;
        document.getElementById('eventResponsible').value = event.responsible;
        document.getElementById('eventLocation').value = event.location;
        document.getElementById('eventEquipment').value = event.equipment || '';
            document.getElementById('modalTitle').textContent = 'Editar Evento';
            this.showEventModal();
        }
    }

    // Dashboard
    updateDashboard() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Filtrar eventos do mês atual
        const monthEvents = this.events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
        });

        // Calcular totais usando funcionários dinâmicos
        const monthTotal = monthEvents.reduce((sum, event) => sum + event.value, 0);
        
        // Atualizar elementos do dashboard
        document.getElementById('monthEvents').textContent = monthEvents.length;
        document.getElementById('monthTotal').textContent = this.formatCurrency(monthTotal);
        
        // Atualizar cards de funcionários dinamicamente
        this.updateEmployeeCards(monthTotal);

        // Atualizar gráfico
        this.updateChart();
    }

    updateChart() {
        const canvas = document.getElementById('eventsChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const currentDate = new Date();
        const months = [];
        const values = [];

        // Coletar dados dos últimos 6 meses
        for (let i = 5; i >= 0; i--) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            const monthName = date.toLocaleDateString('pt-BR', { month: 'short' });
            months.push(monthName);

            const monthEvents = this.events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear();
            });

            const monthTotal = monthEvents.reduce((sum, event) => sum + event.value, 0);
            values.push(monthTotal);
        }

        // Desenhar gráfico simples
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const maxValue = Math.max(...values, 1);
        const barWidth = canvas.width / values.length;
        const barHeight = canvas.height - 40;

        values.forEach((value, index) => {
            const height = (value / maxValue) * barHeight;
            const x = index * barWidth + 10;
            const y = canvas.height - height - 20;

            // Barra
            ctx.fillStyle = '#667eea';
            ctx.fillRect(x, y, barWidth - 20, height);

            // Valor
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(this.formatCurrency(value), x + barWidth/2 - 10, y - 5);

            // Mês
            ctx.fillText(months[index], x + barWidth/2 - 10, canvas.height - 5);
        });
    }

    // Atualizar cards de funcionários dinamicamente
    updateEmployeeCards(monthTotal) {
        const dashboardGrid = document.querySelector('.dashboard-grid');
        if (!dashboardGrid) return;

        // Remover cards antigos de funcionários (manter apenas os primeiros 2)
        const existingCards = dashboardGrid.querySelectorAll('.card');
        for (let i = 2; i < existingCards.length; i++) {
            existingCards[i].remove();
        }

        // Adicionar cards para cada funcionário
        this.employees.forEach(employee => {
            const amount = monthTotal * (employee.percentage / 100);
            
            const card = document.createElement('div');
            card.className = 'card';
            card.style.borderLeftColor = employee.color;
            
            card.innerHTML = `
                <h3><i class="fas fa-user"></i> ${employee.name}</h3>
                <div class="stat-value" style="color: ${employee.color}">${this.formatCurrency(amount)}</div>
                <div class="stat-percentage">${employee.percentage}%</div>
            `;
            
            dashboardGrid.appendChild(card);
        });
    }

    // Renderização de Calendário
    renderCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        if (!calendarGrid) return;

        const currentDate = new Date();
        const currentMonth = this.currentCalendarMonth || currentDate.getMonth();
        const currentYear = this.currentCalendarYear || currentDate.getFullYear();

        // Atualizar título do mês
        this.updateCalendarTitle(currentMonth, currentYear);

        // Gerar calendário
        const calendarHTML = this.generateCalendarHTML(currentMonth, currentYear);
        calendarGrid.innerHTML = calendarHTML;

        // Aplicar eventos aos dias
        this.attachCalendarEventListeners();
    }

    updateCalendarTitle(month, year) {
        const monthYearElement = document.getElementById('currentMonthYear');
        if (monthYearElement) {
            const monthNames = [
                'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ];
            monthYearElement.textContent = `${monthNames[month]} ${year}`;
        }
    }

    generateCalendarHTML(month, year) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        // Cabeçalho dos dias da semana
        const dayHeaders = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        let calendarHTML = dayHeaders.map(day => 
            `<div class="calendar-day-header">${day}</div>`
        ).join('');

        // Dias do mês anterior (para preencher a primeira semana)
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        const prevMonthLastDay = new Date(prevYear, prevMonth + 1, 0).getDate();

        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            const day = prevMonthLastDay - i;
            calendarHTML += `<div class="calendar-day other-month" data-date="${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}">
                <div class="day-number">${day}</div>
            </div>`;
        }

        // Dias do mês atual
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
            const dayEvents = this.getEventsForDate(dateString);
            
            let dayClass = 'calendar-day';
            if (isToday) dayClass += ' today';
            if (dayEvents.length > 0) dayClass += ' has-events';

            calendarHTML += `<div class="calendar-day" data-date="${dateString}">
                <div class="day-number">${day}</div>
                <div class="day-events">${this.generateDayEventsHTML(dayEvents)}</div>
            </div>`;
        }

        // Dias do próximo mês (para preencher a última semana)
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextYear = month === 11 ? year + 1 : year;
        const remainingDays = 42 - (startingDayOfWeek + daysInMonth);

        for (let day = 1; day <= remainingDays; day++) {
            calendarHTML += `<div class="calendar-day other-month" data-date="${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}">
                <div class="day-number">${day}</div>
            </div>`;
        }

        return calendarHTML;
    }

    getEventsForDate(dateString) {
        return this.events.filter(event => event.date === dateString);
    }

    generateDayEventsHTML(events) {
        if (events.length === 0) return '';

        return events.map(event => {
            const eventDate = new Date(event.date);
            const today = new Date();
            const daysUntilEvent = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
            
            let eventClass = 'event-dot';
            if (daysUntilEvent < 0) {
                eventClass += ' past';
            } else if (daysUntilEvent <= 2) {
                eventClass += ' urgent';
            } else if (daysUntilEvent <= 7) {
                eventClass += ' warning';
            } else {
                eventClass += ' normal';
            }

            return `<div class="${eventClass}" onclick="showEventDetails('${event.id}')" title="${event.name}">
                ${event.name}
            </div>`;
        }).join('');
    }

    attachCalendarEventListeners() {
        const calendarDays = document.querySelectorAll('.calendar-day');
        calendarDays.forEach(day => {
            day.addEventListener('click', (e) => {
                if (!e.target.classList.contains('event-dot')) {
                    const date = day.dataset.date;
                    this.showDateEvents(date);
                }
            });
        });
    }

    showDateEvents(date) {
        const events = this.getEventsForDate(date);
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('pt-BR');
        
        if (events.length === 0) {
            this.showToast(`Nenhum evento em ${formattedDate}`, 'info');
            return;
        }

        // Mostrar modal com eventos do dia
        this.showEventDetailsModal(events, formattedDate);
    }

    showEventDetailsModal(events, date) {
        const modal = document.getElementById('eventDetailModal');
        const title = document.getElementById('eventDetailTitle');
        const info = document.getElementById('eventDetailInfo');
        
        if (!modal || !title || !info) return;

        title.textContent = `Eventos de ${date}`;
        
        info.innerHTML = events.map(event => `
            <div class="event-detail-item">
                <i class="fas fa-calendar"></i>
                <div>
                    <strong>${event.name}</strong><br>
                    <small>Contratante: ${event.client || 'Não informado'}</small><br>
                    <small>Valor: ${this.formatCurrency(event.value)} | Responsável: ${event.responsible}</small><br>
                    <small>Local: ${event.location} | Equipamento: ${event.equipment || 'Não especificado'}</small>
                </div>
            </div>
        `).join('');

        modal.style.display = 'block';
    }

    // Renderização de Histórico
    async renderHistory() {
        const historyList = document.getElementById('historyList');
        if (!historyList) return;

        if (this.history.length === 0) {
            historyList.innerHTML = `
                <div class="history-card" style="text-align: center; padding: 3rem;">
                    <i class="fas fa-history" style="font-size: 3rem; color: #6c757d; margin-bottom: 1rem;"></i>
                    <h3 style="color: #6c757d; margin-bottom: 1rem;">Nenhum evento no histórico</h3>
                    <p style="color: #6c757d;">Eventos passados aparecerão aqui automaticamente</p>
                </div>
            `;
            return;
        }

        const sortedHistory = [...this.history].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        historyList.innerHTML = sortedHistory.map(event => `
            <div class="history-card ${event.status === 'past' ? 'past' : ''}">
                <h4>${event.name}</h4>
                <div class="history-details">
                    <div><i class="fas fa-calendar"></i> ${this.formatDate(event.date)}</div>
                    <div><i class="fas fa-dollar-sign"></i> ${this.formatCurrency(event.value)}</div>
                    <div><i class="fas fa-user-tie"></i> ${event.client || 'Não informado'}</div>
                    <div><i class="fas fa-user"></i> ${event.responsible}</div>
                    <div><i class="fas fa-map-marker-alt"></i> ${event.location}</div>
                    <div><i class="fas fa-microphone"></i> ${event.equipment || 'Não especificado'}</div>
                </div>
                <div class="history-status ${event.status === 'past' ? 'past' : ''}">
                    ${event.status === 'past' ? 'Evento Passado' : 'Arquivado'}
                </div>
            </div>
        `).join('');
    }

    // Renderização de Configurações
    async renderSettings() {
        const percentagesConfig = document.getElementById('percentagesConfig');
        const employeesConfig = document.getElementById('employeesConfig');
        
        if (percentagesConfig) {
            this.renderPercentagesConfig(percentagesConfig);
        }
        
        if (employeesConfig) {
            this.renderEmployeesConfig(employeesConfig);
        }

        // Carregar configurações de ícone
        await this.loadIconConfig();
    }

    renderPercentagesConfig(container) {
        container.innerHTML = this.employees.map(employee => `
            <div class="percentage-item">
                <label>${employee.name}:</label>
                <input type="number" value="${employee.percentage}" min="0" max="100" 
                       onchange="updateEmployeePercentage('${employee.name}', this.value)">
                <span>%</span>
            </div>
        `).join('');
    }

    renderEmployeesConfig(container) {
        container.innerHTML = this.employees.map((employee, index) => `
            <div class="employee-item">
                <input type="text" value="${employee.name}" 
                       onchange="updateEmployeeName(${index}, this.value)">
                <input type="number" value="${employee.percentage}" min="0" max="100"
                       onchange="updateEmployeePercentage('${employee.name}', this.value)">
                <input type="color" class="color-picker" value="${employee.color}"
                       onchange="updateEmployeeColor(${index}, this.value)">
                <div class="employee-actions">
                    <button class="btn-remove" onclick="removeEmployee(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Verificar alertas da semana
    checkForWeekAlerts() {
        if (!getConfig('alerts.showWeekAlert')) return;

        const currentDate = new Date();
        const weekFromNow = new Date(currentDate.getTime() + (7 * 24 * 60 * 60 * 1000));
        
        const weekEvents = this.events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= currentDate && eventDate <= weekFromNow;
        });

        if (weekEvents.length > 0) {
            this.showWeekAlert(weekEvents);
        }
    }

    showWeekAlert(events) {
        // Remover alerta existente
        const existingAlert = document.querySelector('.entry-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        const alert = document.createElement('div');
        alert.className = 'entry-alert';
        alert.innerHTML = `
            <button class="close-alert" onclick="this.parentElement.remove()">&times;</button>
            <h4><i class="fas fa-calendar-week"></i> Eventos desta Semana</h4>
            <p>Você tem ${events.length} evento(s) agendado(s) para os próximos 7 dias.</p>
        `;

        document.body.appendChild(alert);

        // Remover automaticamente após 10 segundos
        setTimeout(() => {
            if (alert.parentElement) {
                alert.remove();
            }
        }, 10000);
    }

    // Renderização de Eventos
    renderEvents() {
        const eventsList = document.getElementById('eventsList');
        if (!eventsList) return;

        if (this.events.length === 0) {
            eventsList.innerHTML = `
                <div class="event-card" style="text-align: center; padding: 3rem;">
                    <i class="fas fa-calendar-plus" style="font-size: 3rem; color: #6c757d; margin-bottom: 1rem;"></i>
                    <h3 style="color: #6c757d; margin-bottom: 1rem;">Nenhum evento cadastrado</h3>
                    <p style="color: #6c757d;">Clique em "Novo Evento" para começar</p>
                </div>
            `;
            return;
        }

        const sortedEvents = [...this.events].sort((a, b) => new Date(a.date) - new Date(b.date));
        
        eventsList.innerHTML = sortedEvents.map(event => `
            <div class="event-card">
                <div class="event-header">
                    <div class="event-title">${event.name}</div>
                    <div class="event-date">${this.formatDate(event.date)}</div>
                </div>
                <div class="event-details">
                    <div class="event-detail">
                        <i class="fas fa-user-tie"></i>
                        <span>${event.client || 'Não informado'}</span>
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-phone"></i>
                        <span>${event.phone}</span>
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-user"></i>
                        <span>${event.responsible}</span>
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.location}</span>
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-microphone"></i>
                        <span>${event.equipment || 'Não especificado'}</span>
                    </div>
                </div>
                <div class="event-value">${this.formatCurrency(event.value)}</div>
                <div class="event-actions">
                    <button class="btn btn-sm btn-edit" onclick="eventManager.editEvent('${event.id}')">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-sm btn-delete" onclick="eventManager.deleteEvent('${event.id}')">
                        <i class="fas fa-trash"></i> Excluir
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Alertas
    renderAlerts() {
        const alertsList = document.getElementById('alertsList');
        if (!alertsList) return;

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Filtrar eventos do mês atual
        const monthEvents = this.events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
        });

        if (monthEvents.length === 0) {
            alertsList.innerHTML = `
                <div class="alert-card">
                    <div class="alert-title">Nenhum evento este mês</div>
                    <div class="alert-details">Não há eventos cadastrados para o mês atual.</div>
                </div>
            `;
            return;
        }

        // Ordenar eventos por data
        const sortedEvents = monthEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        alertsList.innerHTML = sortedEvents.map(event => {
            const eventDate = new Date(event.date);
            const today = new Date();
            const daysUntilEvent = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
            
            let alertClass = '';
            let alertMessage = '';
            
            const urgentDays = getConfig('alerts.urgentDays');
            const warningDays = getConfig('alerts.warningDays');
            
            if (daysUntilEvent < 0) {
                alertClass = 'urgent';
                alertMessage = 'Evento já passou';
            } else if (daysUntilEvent === 0) {
                alertClass = 'urgent';
                alertMessage = 'Evento é hoje!';
            } else if (daysUntilEvent <= urgentDays) {
                alertClass = 'urgent';
                alertMessage = `Evento em ${daysUntilEvent} dia${daysUntilEvent > 1 ? 's' : ''}`;
            } else if (daysUntilEvent <= warningDays) {
                alertClass = 'warning';
                alertMessage = `Evento em ${daysUntilEvent} dias`;
            } else {
                alertClass = 'normal';
                alertMessage = `Evento em ${daysUntilEvent} dias`;
            }

            return `
                <div class="alert-card ${alertClass}">
                    <div class="alert-title ${alertClass}">${event.name}</div>
                    <div class="alert-details">
                        <strong>Data:</strong> ${this.formatDate(event.date)}<br>
                        <strong>Valor:</strong> ${this.formatCurrency(event.value)}<br>
                        <strong>Responsável:</strong> ${event.responsible}<br>
                        <strong>Local:</strong> ${event.location}<br>
                        <strong>Status:</strong> ${alertMessage}
                    </div>
                </div>
            `;
        }).join('');
    }

    checkForMonthAlerts() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const monthEvents = this.events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
        });

        if (monthEvents.length > 0) {
            const totalValue = monthEvents.reduce((sum, event) => sum + event.value, 0);
            this.showToast(`Você tem ${monthEvents.length} evento(s) este mês totalizando ${this.formatCurrency(totalValue)}`, 'info');
        }
    }

    // Filtros e Busca
    filterEvents() {
        const searchTerm = document.getElementById('searchEvents').value.toLowerCase();
        const eventCards = document.querySelectorAll('.event-card');
        
        eventCards.forEach(card => {
            const eventText = card.textContent.toLowerCase();
            if (eventText.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterHistory() {
        const filterValue = document.getElementById('historyFilter').value;
        const historyCards = document.querySelectorAll('.history-card');
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        
        historyCards.forEach(card => {
            let show = true;
            
            if (filterValue === 'past') {
                show = card.classList.contains('past');
            } else if (filterValue === 'thisMonth') {
                const eventDate = new Date(card.querySelector('.history-details div').textContent.split(' ')[1]);
                show = eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
            } else if (filterValue === 'lastMonth') {
                const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
                const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
                const eventDate = new Date(card.querySelector('.history-details div').textContent.split(' ')[1]);
                show = eventDate.getMonth() === lastMonth && eventDate.getFullYear() === lastMonthYear;
            }
            
            card.style.display = show ? 'block' : 'none';
        });
    }

    // Navegação
    showTab(tabName) {
        // Esconder todas as abas
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Remover classe active de todas as abas de navegação
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Mostrar aba selecionada
        document.getElementById(tabName).classList.add('active');
        
        // Adicionar classe active na aba de navegação correspondente
        event.target.classList.add('active');

        // Atualizar dados se necessário
        if (tabName === 'dashboard') {
            this.updateDashboard();
        } else if (tabName === 'events') {
            this.renderEvents();
        } else if (tabName === 'alerts') {
            this.renderAlerts();
        } else if (tabName === 'calendar') {
            this.renderCalendar();
        }
    }

    // Modal
    showEventModal() {
        document.getElementById('eventModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeEventModal() {
        document.getElementById('eventModal').style.display = 'none';
        document.body.style.overflow = 'auto';
        this.currentEditingId = null;
        
        // Limpar formulário manualmente para evitar problemas
        document.getElementById('eventName').value = '';
        document.getElementById('eventClient').value = '';
        document.getElementById('eventDate').value = '';
        document.getElementById('eventValue').value = '';
        document.getElementById('eventPhone').value = '';
        document.getElementById('eventResponsible').value = '';
        document.getElementById('eventLocation').value = '';
        document.getElementById('eventEquipment').value = '';
        
        document.getElementById('modalTitle').textContent = 'Novo Evento';
    }

    // Event Listeners
    setupEventListeners() {
        // Fechar modal ao clicar fora dele
        document.getElementById('eventModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('eventModal')) {
                this.closeEventModal();
            }
        });

        // Fechar modal com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeEventModal();
            }
        });
    }

    // Utilitários
    formatCurrency(value) {
        const locale = getConfig('system.locale') || 'pt-BR';
        const currency = getConfig('system.currency') || 'BRL';
        
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency
        }).format(value);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');

        const duration = getConfig('notifications.duration') || 3000;
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }

    // Funções de configuração de funcionários
    async updateEmployeeName(index, newName) {
        this.employees[index].name = newName;
        await offlineStorage.saveEmployees(this.employees);
        this.updateDashboard();
        this.renderSettings();
    }

    async updateEmployeePercentage(name, percentage) {
        const employee = this.employees.find(emp => emp.name === name);
        if (employee) {
            employee.percentage = parseInt(percentage);
            await offlineStorage.saveEmployees(this.employees);
            this.updateDashboard();
        }
    }

    async updateEmployeeColor(index, color) {
        this.employees[index].color = color;
        await offlineStorage.saveEmployees(this.employees);
        this.updateDashboard();
        this.renderSettings();
    }

    async addEmployee() {
        const name = prompt('Nome do novo funcionário:');
        if (name) {
            const percentage = parseInt(prompt('Percentual (0-100):')) || 0;
            const color = prompt('Cor (código hexadecimal):') || '#000000';
            
            this.employees.push({
                name: name,
                percentage: percentage,
                color: color
            });
            
            await offlineStorage.saveEmployees(this.employees);
            this.updateDashboard();
            this.renderSettings();
            this.showToast('Funcionário adicionado com sucesso!', 'success');
        }
    }

    async removeEmployee(index) {
        if (confirm('Tem certeza que deseja remover este funcionário?')) {
            this.employees.splice(index, 1);
            await offlineStorage.saveEmployees(this.employees);
            this.updateDashboard();
            this.renderSettings();
            this.showToast('Funcionário removido com sucesso!', 'success');
        }
    }

    async saveSettings() {
        try {
            // Salvar configurações de alertas
            const urgentDays = document.getElementById('urgentDays').value;
            const warningDays = document.getElementById('warningDays').value;
            const showWeekAlert = document.getElementById('showWeekAlert').checked;
            
            await offlineStorage.saveSettings('urgentDays', parseInt(urgentDays));
            await offlineStorage.saveSettings('warningDays', parseInt(warningDays));
            await offlineStorage.saveSettings('showWeekAlert', showWeekAlert);
            
            // Atualizar configurações globais
            setConfig('alerts.urgentDays', parseInt(urgentDays));
            setConfig('alerts.warningDays', parseInt(warningDays));
            setConfig('alerts.showWeekAlert', showWeekAlert);
            
            this.showToast('Configurações salvas com sucesso!', 'success');
            
        // Recarregar alertas com novas configurações
        this.renderAlerts();
    } catch (error) {
        console.error('Erro ao salvar configurações:', error);
        this.showToast('Erro ao salvar configurações', 'error');
    }
}

    // Navegação do Calendário
    previousMonth() {
        const currentDate = new Date();
        const currentMonth = this.currentCalendarMonth || currentDate.getMonth();
        const currentYear = this.currentCalendarYear || currentDate.getFullYear();
        
        if (currentMonth === 0) {
            this.currentCalendarMonth = 11;
            this.currentCalendarYear = currentYear - 1;
        } else {
            this.currentCalendarMonth = currentMonth - 1;
            this.currentCalendarYear = currentYear;
        }
        
        this.renderCalendar();
    }

    nextMonth() {
        const currentDate = new Date();
        const currentMonth = this.currentCalendarMonth || currentDate.getMonth();
        const currentYear = this.currentCalendarYear || currentDate.getFullYear();
        
        if (currentMonth === 11) {
            this.currentCalendarMonth = 0;
            this.currentCalendarYear = currentYear + 1;
        } else {
            this.currentCalendarMonth = currentMonth + 1;
            this.currentCalendarYear = currentYear;
        }
        
        this.renderCalendar();
    }

    goToToday() {
        const today = new Date();
        this.currentCalendarMonth = today.getMonth();
        this.currentCalendarYear = today.getFullYear();
        this.renderCalendar();
    }

    async exportAllData() {
        try {
            const data = await offlineStorage.exportData();
            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `mk-audiovisual-backup-${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            
            this.showToast('Dados exportados com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao exportar dados:', error);
            this.showToast('Erro ao exportar dados', 'error');
        }
    }

    async importAllData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = async (event) => {
            const file = event.target.files[0];
            if (file) {
                try {
                    const text = await file.text();
                    const data = JSON.parse(text);
                    await offlineStorage.importData(data);
                    await this.loadAllData();
                    
                    this.updateDashboard();
                    this.renderEvents();
                    this.renderAlerts();
                    this.renderHistory();
                    this.renderSettings();
                    
                    this.showToast('Dados importados com sucesso!', 'success');
                } catch (error) {
                    console.error('Erro ao importar dados:', error);
                    this.showToast('Erro ao importar dados', 'error');
                }
            }
        };
        
        input.click();
    }

    async clearAllData() {
        if (confirm('Tem certeza que deseja excluir TODOS os dados? Esta ação não pode ser desfeita.')) {
            try {
                // Limpar IndexedDB
                const db = await offlineStorage.init();
                const transaction = db.transaction(['events', 'history', 'employees', 'settings'], 'readwrite');
                
                await Promise.all([
                    transaction.objectStore('events').clear(),
                    transaction.objectStore('history').clear(),
                    transaction.objectStore('employees').clear(),
                    transaction.objectStore('settings').clear()
                ]);
                
                // Recarregar dados
                await this.loadAllData();
                
                this.updateDashboard();
                this.renderEvents();
                this.renderAlerts();
                this.renderHistory();
                this.renderSettings();
                
                this.showToast('Todos os dados foram removidos!', 'success');
            } catch (error) {
                console.error('Erro ao limpar dados:', error);
                this.showToast('Erro ao limpar dados', 'error');
            }
        }
    }

    // Sistema de Instalação PWA
    checkPWAInstallation() {
        // Verificar se já foi mostrado o modal de instalação
        const pwaModalShown = localStorage.getItem('pwaModalShown');
        if (pwaModalShown === 'true') return;

        // Verificar se o navegador suporta PWA
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
            console.log('PWA não suportado neste navegador');
            return;
        }

        // Detectar dispositivo e navegador
        const deviceInfo = this.detectDevice();
        
        // Mostrar modal de instalação após 2 segundos
        setTimeout(() => {
            this.showPWAInstallModal(deviceInfo);
        }, 2000);
    }

    detectDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        const isIOS = /iphone|ipad|ipod/.test(userAgent);
        const isAndroid = /android/.test(userAgent);
        const isChrome = /chrome/.test(userAgent);
        const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
        const isEdge = /edge/.test(userAgent);
        const isFirefox = /firefox/.test(userAgent);

        return {
            isIOS,
            isAndroid,
            isChrome,
            isSafari,
            isEdge,
            isFirefox,
            isMobile: isIOS || isAndroid,
            isDesktop: !isIOS && !isAndroid
        };
    }

    showPWAInstallModal(deviceInfo) {
        const modal = document.getElementById('pwaInstallModal');
        const instructions = document.getElementById('pwaInstructions');
        
        if (!modal || !instructions) return;

        // Configurar instruções baseadas no dispositivo
        let instructionHTML = '';
        
        if (deviceInfo.isIOS) {
            instructionHTML = `
                <h4><i class="fas fa-mobile-alt"></i> Instruções para iPhone/iPad:</h4>
                <ol>
                    <li>Toque no botão <strong>"Compartilhar"</strong> na barra inferior</li>
                    <li>Role para baixo e toque em <strong>"Adicionar à Tela de Início"</strong></li>
                    <li>Toque em <strong>"Adicionar"</strong> para confirmar</li>
                    <li>O app aparecerá na sua tela inicial!</li>
                </ol>
            `;
        } else if (deviceInfo.isAndroid) {
            instructionHTML = `
                <h4><i class="fas fa-mobile-alt"></i> Instruções para Android:</h4>
                <ol>
                    <li>Toque no menu (3 pontos) no navegador</li>
                    <li>Selecione <strong>"Adicionar à tela inicial"</strong></li>
                    <li>Toque em <strong>"Adicionar"</strong> para confirmar</li>
                    <li>O app aparecerá na sua tela inicial!</li>
                </ol>
            `;
        } else {
            instructionHTML = `
                <h4><i class="fas fa-desktop"></i> Instruções para Computador:</h4>
                <ol>
                    <li>Procure pelo ícone de instalação na barra de endereços</li>
                    <li>Clique em <strong>"Instalar"</strong> ou <strong>"Adicionar"</strong></li>
                    <li>Confirme a instalação</li>
                    <li>O app será instalado e aparecerá no menu iniciar!</li>
                </ol>
            `;
        }

        instructions.innerHTML = instructionHTML;
        modal.style.display = 'block';
        
        // Marcar como mostrado
        localStorage.setItem('pwaModalShown', 'true');
    }

    closePWAInstallModal() {
        const modal = document.getElementById('pwaInstallModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    async installPWA() {
        try {
            // Verificar se o evento beforeinstallprompt está disponível
            if (window.deferredPrompt) {
                window.deferredPrompt.prompt();
                const { outcome } = await window.deferredPrompt.userChoice;
                
                if (outcome === 'accepted') {
                    this.showToast('App instalado com sucesso!', 'success');
                } else {
                    this.showToast('Instalação cancelada', 'warning');
                }
                
                window.deferredPrompt = null;
            } else {
                // Para iOS e outros navegadores, mostrar instruções
                this.showToast('Siga as instruções na tela para instalar', 'info');
            }
            
            this.closePWAInstallModal();
        } catch (error) {
            console.error('Erro ao instalar PWA:', error);
            this.showToast('Erro ao instalar app', 'error');
        }
    }

    // Sistema de Ícone Personalizado
    async loadIconConfig() {
        try {
            const iconConfig = await offlineStorage.getSettings('customIcon') || getConfig('customIcon');
            
            // Atualizar interface
            this.updateIconPreview(iconConfig);
            this.updateIconTypeSelection(iconConfig.type);
            this.updateIconSizeSelection(iconConfig.size);
            
            // Aplicar ícone no sistema
            this.applyIconToSystem(iconConfig);
        } catch (error) {
            console.error('Erro ao carregar configuração de ícone:', error);
        }
    }

    updateIconPreview(config) {
        const preview = document.getElementById('iconPreview');
        if (!preview) return;

        // Limpar preview
        preview.innerHTML = '';

        if (config.enabled && config.url) {
            const img = document.createElement('img');
            img.src = config.url;
            img.alt = 'Ícone personalizado';
            img.onerror = () => {
                preview.innerHTML = '<i class="fas fa-microphone"></i>';
            };
            preview.appendChild(img);
        } else {
            preview.innerHTML = '<i class="fas fa-microphone"></i>';
        }

        // Aplicar tamanho
        preview.className = `icon-preview icon-${config.size}`;
    }

    updateIconTypeSelection(type) {
        const radioButtons = document.querySelectorAll('input[name="iconType"]');
        radioButtons.forEach(radio => {
            radio.checked = radio.value === type;
        });

        // Mostrar/esconder seções
        const uploadSection = document.getElementById('iconUploadSection');
        const urlSection = document.getElementById('iconUrlSection');
        
        if (uploadSection) uploadSection.style.display = type === 'upload' ? 'block' : 'none';
        if (urlSection) urlSection.style.display = type === 'url' ? 'block' : 'none';
    }

    updateIconSizeSelection(size) {
        const sizeSelect = document.getElementById('iconSize');
        if (sizeSelect) {
            sizeSelect.value = size;
        }
    }

    async saveIconConfig() {
        try {
            const iconType = document.querySelector('input[name="iconType"]:checked').value;
            const iconSize = document.getElementById('iconSize').value;
            
            let iconUrl = null;
            let enabled = false;

            if (iconType === 'upload') {
                const fileInput = document.getElementById('iconFile');
                if (fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    iconUrl = await this.convertFileToDataURL(file);
                    enabled = true;
                }
            } else if (iconType === 'url') {
                const urlInput = document.getElementById('iconUrl');
                if (urlInput.value.trim()) {
                    iconUrl = urlInput.value.trim();
                    enabled = true;
                }
            }

            const iconConfig = {
                enabled,
                url: iconUrl,
                type: iconType,
                size: iconSize
            };

            // Salvar configuração
            await offlineStorage.saveSettings('customIcon', iconConfig);
            
            // Atualizar preview
            this.updateIconPreview(iconConfig);
            
            // Aplicar ícone no sistema
            this.applyIconToSystem(iconConfig);
            
            this.showToast('Configuração de ícone salva com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao salvar configuração de ícone:', error);
            this.showToast('Erro ao salvar configuração de ícone', 'error');
        }
    }

    async convertFileToDataURL(file) {
        return new Promise((resolve, reject) => {
            // Validar tamanho (2MB máximo)
            if (file.size > 2 * 1024 * 1024) {
                reject(new Error('Arquivo muito grande. Máximo 2MB.'));
                return;
            }

            // Validar tipo
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                reject(new Error('Formato não suportado. Use JPG, PNG, SVG ou GIF.'));
                return;
            }

            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
            reader.readAsDataURL(file);
        });
    }

    applyIconToSystem(config) {
        // Aplicar ícone no header
        this.updateHeaderIcon(config);
        
        // Aplicar ícone no modal PWA
        this.updatePWAIcon(config);
        
        // Aplicar ícone em outros locais do sistema
        this.updateSystemIcons(config);
    }

    updateHeaderIcon(config) {
        const headerIcon = document.querySelector('.header h1 i');
        if (headerIcon) {
            if (config.enabled && config.url) {
                headerIcon.style.display = 'none';
                let iconImg = headerIcon.nextElementSibling;
                if (!iconImg || !iconImg.classList.contains('custom-icon')) {
                    iconImg = document.createElement('img');
                    iconImg.className = 'custom-icon';
                    iconImg.alt = 'Ícone personalizado';
                    iconImg.style.width = '1.2em';
                    iconImg.style.height = '1.2em';
                    iconImg.style.marginRight = '0.5rem';
                    iconImg.style.borderRadius = '50%';
                    iconImg.style.objectFit = 'cover';
                    headerIcon.parentNode.insertBefore(iconImg, headerIcon.nextSibling);
                }
                iconImg.src = config.url;
                iconImg.style.display = 'inline-block';
            } else {
                headerIcon.style.display = 'inline-block';
                const iconImg = headerIcon.nextElementSibling;
                if (iconImg && iconImg.classList.contains('custom-icon')) {
                    iconImg.style.display = 'none';
                }
            }
        }
    }

    updatePWAIcon(config) {
        const pwaIcon = document.querySelector('.pwa-icon i');
        if (pwaIcon) {
            if (config.enabled && config.url) {
                pwaIcon.style.display = 'none';
                let iconImg = pwaIcon.nextElementSibling;
                if (!iconImg || !iconImg.classList.contains('custom-icon')) {
                    iconImg = document.createElement('img');
                    iconImg.className = 'custom-icon';
                    iconImg.alt = 'Ícone personalizado';
                    iconImg.style.width = '100%';
                    iconImg.style.height = '100%';
                    iconImg.style.borderRadius = '50%';
                    iconImg.style.objectFit = 'cover';
                    pwaIcon.parentNode.appendChild(iconImg);
                }
                iconImg.src = config.url;
                iconImg.style.display = 'block';
            } else {
                pwaIcon.style.display = 'block';
                const iconImg = pwaIcon.nextElementSibling;
                if (iconImg && iconImg.classList.contains('custom-icon')) {
                    iconImg.style.display = 'none';
                }
            }
        }
    }

    updateSystemIcons(config) {
        // Atualizar outros ícones do sistema se necessário
        const systemIcons = document.querySelectorAll('.fas.fa-microphone');
        systemIcons.forEach(icon => {
            if (config.enabled && config.url && !icon.closest('.icon-preview')) {
                // Aplicar ícone personalizado em outros locais se necessário
            }
        });
    }

    async resetIconConfig() {
        try {
            const defaultConfig = getConfig('customIcon');
            await offlineStorage.saveSettings('customIcon', defaultConfig);
            
            // Resetar interface
            document.querySelector('input[name="iconType"][value="default"]').checked = true;
            document.getElementById('iconSize').value = 'medium';
            document.getElementById('iconFile').value = '';
            document.getElementById('iconUrl').value = '';
            
            // Atualizar preview
            this.updateIconPreview(defaultConfig);
            this.updateIconTypeSelection('default');
            
            // Aplicar ícone no sistema
            this.applyIconToSystem(defaultConfig);
            
            this.showToast('Configuração de ícone resetada!', 'success');
        } catch (error) {
            console.error('Erro ao resetar configuração de ícone:', error);
            this.showToast('Erro ao resetar configuração de ícone', 'error');
        }
    }
}

// Funções globais para uso no HTML
function showAddEventModal() {
    eventManager.currentEditingId = null;
    
    // Limpar formulário manualmente para evitar problemas
    document.getElementById('eventName').value = '';
    document.getElementById('eventClient').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('eventValue').value = '';
    document.getElementById('eventPhone').value = '';
    document.getElementById('eventResponsible').value = '';
    document.getElementById('eventLocation').value = '';
    document.getElementById('eventEquipment').value = '';
    
    document.getElementById('modalTitle').textContent = 'Novo Evento';
    eventManager.showEventModal();
}

function closeEventModal() {
    eventManager.closeEventModal();
}

function saveEvent(event) {
    eventManager.saveEvent(event);
}

function showTab(tabName) {
    eventManager.showTab(tabName);
}

function filterEvents() {
    eventManager.filterEvents();
}

function filterHistory() {
    eventManager.filterHistory();
}

function addEmployee() {
    eventManager.addEmployee();
}

function updateEmployeeName(index, newName) {
    eventManager.updateEmployeeName(index, newName);
}

function updateEmployeePercentage(name, percentage) {
    eventManager.updateEmployeePercentage(name, percentage);
}

function updateEmployeeColor(index, color) {
    eventManager.updateEmployeeColor(index, color);
}

function removeEmployee(index) {
    eventManager.removeEmployee(index);
}

function saveSettings() {
    eventManager.saveSettings();
}

function exportAllData() {
    eventManager.exportAllData();
}

function importAllData() {
    eventManager.importAllData();
}

function clearAllData() {
    eventManager.clearAllData();
}

function closePWAInstallModal() {
    eventManager.closePWAInstallModal();
}

function installPWA() {
    eventManager.installPWA();
}

// Funções para gerenciamento de ícone personalizado
function changeIconType(type) {
    eventManager.updateIconTypeSelection(type);
}

function changeIconSize(size) {
    const preview = document.getElementById('iconPreview');
    if (preview) {
        preview.className = `icon-preview icon-${size}`;
    }
}

function handleIconUpload(input) {
    if (input.files.length > 0) {
        const file = input.files[0];
        
        // Validar tamanho
        if (file.size > 2 * 1024 * 1024) {
            eventManager.showToast('Arquivo muito grande. Máximo 2MB.', 'error');
            input.value = '';
            return;
        }
        
        // Validar tipo
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            eventManager.showToast('Formato não suportado. Use JPG, PNG, SVG ou GIF.', 'error');
            input.value = '';
            return;
        }
        
        // Preview do arquivo
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('iconPreview');
            if (preview) {
                preview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
            }
        };
        reader.readAsDataURL(file);
    }
}

function handleIconUrl(input) {
    if (input.value.trim()) {
        const preview = document.getElementById('iconPreview');
        if (preview) {
            const img = document.createElement('img');
            img.src = input.value;
            img.alt = 'Preview';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '50%';
            img.onerror = () => {
                eventManager.showToast('Erro ao carregar imagem da URL', 'error');
                preview.innerHTML = '<i class="fas fa-microphone"></i>';
            };
            preview.innerHTML = '';
            preview.appendChild(img);
        }
    }
}

function saveIconConfig() {
    eventManager.saveIconConfig();
}

function resetIconConfig() {
    eventManager.resetIconConfig();
}

// Funções para navegação do calendário
function previousMonth() {
    eventManager.previousMonth();
}

function nextMonth() {
    eventManager.nextMonth();
}

function goToToday() {
    eventManager.goToToday();
}

function showEventDetails(eventId) {
    const event = eventManager.events.find(e => e.id === eventId);
    if (event) {
        const modal = document.getElementById('eventDetailModal');
        const title = document.getElementById('eventDetailTitle');
        const info = document.getElementById('eventDetailInfo');
        
        if (modal && title && info) {
            title.textContent = event.name;
            
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('pt-BR');
            
            info.innerHTML = `
                <div class="event-detail-item">
                    <i class="fas fa-calendar"></i>
                    <div>
                        <strong>Data:</strong> ${formattedDate}
                    </div>
                </div>
                <div class="event-detail-item">
                    <i class="fas fa-user-tie"></i>
                    <div>
                        <strong>Contratante:</strong> ${event.client || 'Não informado'}
                    </div>
                </div>
                <div class="event-detail-item">
                    <i class="fas fa-dollar-sign"></i>
                    <div>
                        <strong>Valor:</strong> ${eventManager.formatCurrency(event.value)}
                    </div>
                </div>
                <div class="event-detail-item">
                    <i class="fas fa-phone"></i>
                    <div>
                        <strong>Telefone:</strong> ${event.phone}
                    </div>
                </div>
                <div class="event-detail-item">
                    <i class="fas fa-user"></i>
                    <div>
                        <strong>Responsável:</strong> ${event.responsible}
                    </div>
                </div>
                <div class="event-detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>
                        <strong>Local:</strong> ${event.location}
                    </div>
                </div>
                <div class="event-detail-item">
                    <i class="fas fa-microphone"></i>
                    <div>
                        <strong>Equipamento:</strong> ${event.equipment || 'Não especificado'}
                    </div>
                </div>
            `;
            
            modal.style.display = 'block';
        }
    }
}

function closeEventDetailModal() {
    const modal = document.getElementById('eventDetailModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Inicializar aplicação
let eventManager;
document.addEventListener('DOMContentLoaded', () => {
    eventManager = new MKEventManager();
});
