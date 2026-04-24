// 캐시 이름 정의
const CACHE_NAME = 'kimbiseo-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/service-worker.js',
  '/01_보고서/dashboard.html',
  '/01_보고서/chart.html',
  '/01_보고서/diagram.html',
  '/01_보고서/diagram.svg',
  '/01_보고서/meeting-result.html',
  '/01_보고서/report.html',
  '/01_보고서/spreadsheet-report.html',
  '/01_보고서/price-analysis.html',
  '/CLAUDE.md'
];

// Service Worker 설치 이벤트
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker 설치 중...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('✅ 캐시 생성 및 파일 저장');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('⚠️ 일부 파일 캐싱 실패 (오프라인일 수 있음):', err);
        // 부분적 실패를 무시하고 계속 진행
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting();
});

// Service Worker 활성화 이벤트
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker 활성화됨');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ 이전 캐시 삭제:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch 이벤트 - 캐시 우선 전략
self.addEventListener('fetch', (event) => {
  // CSV, TXT 파일은 네트워크 우선
  if (event.request.url.includes('.csv') || event.request.url.includes('.txt')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // 네트워크 성공하면 캐시 업데이트
          if (response.status === 200) {
            const cache = caches.open(CACHE_NAME);
            cache.then((c) => c.put(event.request, response.clone()));
          }
          return response;
        })
        .catch(() => {
          // 네트워크 실패하면 캐시에서 가져오기
          return caches.match(event.request).then((response) => {
            return response || new Response('오프라인 상태입니다. 인터넷 연결을 확인하세요.', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain; charset=utf-8'
              })
            });
          });
        })
    );
    return;
  }

  // HTML, CSS, JS, 이미지는 캐시 우선
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request)
        .then((response) => {
          // 네트워크 성공하면 캐시에 저장
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // 네트워크 실패 시 캐시된 페이지 반환
          return caches.match(event.request).then((response) => {
            return response || new Response('오프라인 상태입니다.', {
              status: 503,
              headers: new Headers({
                'Content-Type': 'text/plain; charset=utf-8'
              })
            });
          });
        });
    })
  );
});

// 백그라운드 동기 이벤트 (선택사항)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      // 여기에 데이터 동기화 로직 추가 가능
      Promise.resolve()
    );
  }
});

// 푸시 알림 이벤트 (선택사항)
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};
  const options = {
    body: data.body || '김비서에서 새로운 알림이 있습니다.',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23667eea;stop-opacity:1" /><stop offset="100%" style="stop-color:%23764ba2;stop-opacity:1" /></linearGradient></defs><rect fill="url(%23grad)" width="192" height="192" rx="45"/><text x="96" y="96" font-size="100" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif">김</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect fill="%23667eea" width="96" height="96" rx="20"/><text x="48" y="48" font-size="48" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">김</text></svg>',
    tag: 'kimbiseo-notification',
    requireInteraction: false
  };

  event.waitUntil(
    self.registration.showNotification('김비서', options)
  );
});

// 알림 클릭 처리
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (let client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});

console.log('✅ Service Worker 로드 완료');
