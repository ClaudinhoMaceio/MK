// Service Worker para MK Audiovisual
const CACHE_NAME = 'mk-audiovisual-v1.0.0';
const urlsToCache = [
    './',
    './index.html',
    './styles.css',
    './script.js',
    './manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Instalar Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.log('Erro ao instalar cache:', error);
            })
    );
});

// Ativar Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptar requisições
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retornar do cache se encontrado
                if (response) {
                    return response;
                }

                // Clonar a requisição
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(response => {
                    // Verificar se recebemos uma resposta válida
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clonar a resposta
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }).catch(() => {
                    // Se a requisição falhar e for uma página HTML, retornar a página offline
                    if (event.request.destination === 'document') {
                        return caches.match('./index.html');
                    }
                });
            })
    );
});

// Notificações push (para futuras implementações)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Nova notificação do MK Audiovisual',
        icon: './icons/icon-192x192.png',
        badge: './icons/icon-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Ver detalhes',
                icon: './icons/icon-96x96.png'
            },
            {
                action: 'close',
                title: 'Fechar',
                icon: './icons/icon-96x96.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('MK Audiovisual', options)
    );
});

// Clique em notificação
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('./index.html')
        );
    }
});

// Sincronização em background (para futuras implementações)
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(
            // Aqui você pode implementar sincronização de dados
            console.log('Sincronização em background executada')
        );
    }
});

// Mensagens do cliente
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
