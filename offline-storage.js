// Sistema de Armazenamento Offline Avançado com IndexedDB
class OfflineStorage {
    constructor() {
        this.dbName = 'MK_Audiovisual_DB';
        this.dbVersion = 1;
        this.db = null;
        this.init();
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            
            request.onerror = () => {
                console.error('Erro ao abrir IndexedDB:', request.error);
                reject(request.error);
            };
            
            request.onsuccess = () => {
                this.db = request.result;
                console.log('IndexedDB inicializado com sucesso');
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Store para eventos
                if (!db.objectStoreNames.contains('events')) {
                    const eventStore = db.createObjectStore('events', { keyPath: 'id' });
                    eventStore.createIndex('date', 'date', { unique: false });
                    eventStore.createIndex('responsible', 'responsible', { unique: false });
                    eventStore.createIndex('status', 'status', { unique: false });
                }
                
                // Store para configurações
                if (!db.objectStoreNames.contains('settings')) {
                    db.createObjectStore('settings', { keyPath: 'key' });
                }
                
                // Store para histórico
                if (!db.objectStoreNames.contains('history')) {
                    const historyStore = db.createObjectStore('history', { keyPath: 'id' });
                    historyStore.createIndex('date', 'date', { unique: false });
                    historyStore.createIndex('status', 'status', { unique: false });
                }
                
                // Store para funcionários
                if (!db.objectStoreNames.contains('employees')) {
                    db.createObjectStore('employees', { keyPath: 'id' });
                }
            };
        });
    }

    // Métodos para Eventos
    async saveEvent(event) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['events'], 'readwrite');
            const store = transaction.objectStore('events');
            
            // Adicionar status baseado na data
            const eventDate = new Date(event.date);
            const today = new Date();
            const daysUntilEvent = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
            
            if (daysUntilEvent < 0) {
                event.status = 'past';
            } else if (daysUntilEvent <= 2) {
                event.status = 'urgent';
            } else if (daysUntilEvent <= 7) {
                event.status = 'warning';
            } else {
                event.status = 'normal';
            }
            
            const request = store.put(event);
            request.onsuccess = () => resolve(event);
            request.onerror = () => reject(request.error);
        });
    }

    async getAllEvents() {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['events'], 'readonly');
            const store = transaction.objectStore('events');
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    }

    async getActiveEvents() {
        const allEvents = await this.getAllEvents();
        return allEvents.filter(event => event.status !== 'past');
    }

    async getPastEvents() {
        const allEvents = await this.getAllEvents();
        return allEvents.filter(event => event.status === 'past');
    }

    async deleteEvent(id) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['events'], 'readwrite');
            const store = transaction.objectStore('events');
            const request = store.delete(id);
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    // Métodos para Histórico
    async addToHistory(event) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['history'], 'readwrite');
            const store = transaction.objectStore('history');
            
            const historyEvent = {
                ...event,
                id: event.id + '_history_' + Date.now(),
                archivedAt: new Date().toISOString(),
                originalId: event.id
            };
            
            const request = store.put(historyEvent);
            request.onsuccess = () => resolve(historyEvent);
            request.onerror = () => reject(request.error);
        });
    }

    async getHistory() {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['history'], 'readonly');
            const store = transaction.objectStore('history');
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    }

    // Métodos para Configurações
    async saveSettings(key, value) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['settings'], 'readwrite');
            const store = transaction.objectStore('settings');
            
            const request = store.put({ key, value, updatedAt: new Date().toISOString() });
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async getSettings(key) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['settings'], 'readonly');
            const store = transaction.objectStore('settings');
            const request = store.get(key);
            
            request.onsuccess = () => {
                resolve(request.result ? request.result.value : null);
            };
            request.onerror = () => reject(request.error);
        });
    }

    // Métodos para Funcionários
    async saveEmployees(employees) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['employees'], 'readwrite');
            const store = transaction.objectStore('employees');
            
            // Limpar funcionários existentes
            store.clear();
            
            // Adicionar novos funcionários
            const requests = employees.map((employee, index) => {
                return store.put({ ...employee, id: index + 1 });
            });
            
            Promise.all(requests).then(() => resolve()).catch(reject);
        });
    }

    async getEmployees() {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['employees'], 'readonly');
            const store = transaction.objectStore('employees');
            const request = store.getAll();
            
            request.onsuccess = () => {
                const employees = request.result || [];
                resolve(employees.sort((a, b) => a.id - b.id));
            };
            request.onerror = () => reject(request.error);
        });
    }

    // Sincronização automática
    async syncData() {
        try {
            // Atualizar status dos eventos
            const events = await this.getAllEvents();
            const today = new Date();
            
            for (const event of events) {
                const eventDate = new Date(event.date);
                const daysUntilEvent = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
                
                let newStatus;
                if (daysUntilEvent < 0) {
                    newStatus = 'past';
                } else if (daysUntilEvent <= 2) {
                    newStatus = 'urgent';
                } else if (daysUntilEvent <= 7) {
                    newStatus = 'warning';
                } else {
                    newStatus = 'normal';
                }
                
                if (event.status !== newStatus) {
                    event.status = newStatus;
                    await this.saveEvent(event);
                    
                    // Se evento passou, mover para histórico
                    if (newStatus === 'past' && event.status !== 'past') {
                        await this.addToHistory(event);
                    }
                }
            }
            
            console.log('Sincronização de dados concluída');
        } catch (error) {
            console.error('Erro na sincronização:', error);
        }
    }

    // Backup e Restauração
    async exportData() {
        const events = await this.getAllEvents();
        const history = await this.getHistory();
        const employees = await this.getEmployees();
        const settings = await this.getAllSettings();
        
        return {
            events,
            history,
            employees,
            settings,
            exportDate: new Date().toISOString(),
            version: '1.0.0'
        };
    }

    async importData(data) {
        try {
            // Importar eventos
            if (data.events) {
                for (const event of data.events) {
                    await this.saveEvent(event);
                }
            }
            
            // Importar funcionários
            if (data.employees) {
                await this.saveEmployees(data.employees);
            }
            
            // Importar configurações
            if (data.settings) {
                for (const setting of data.settings) {
                    await this.saveSettings(setting.key, setting.value);
                }
            }
            
            console.log('Dados importados com sucesso');
        } catch (error) {
            console.error('Erro ao importar dados:', error);
            throw error;
        }
    }

    async getAllSettings() {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['settings'], 'readonly');
            const store = transaction.objectStore('settings');
            const request = store.getAll();
            
            request.onsuccess = () => {
                const settings = {};
                request.result.forEach(item => {
                    settings[item.key] = item.value;
                });
                resolve(settings);
            };
            request.onerror = () => reject(request.error);
        });
    }
}

// Instância global
window.offlineStorage = new OfflineStorage();
