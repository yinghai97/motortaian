/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, serviceworker, es6 */
// https://segmentfault.com/a/1190000015105705
'use strict';
self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  
    const title = '来自NTUT的通知';
    const options = {
      body: '温馨提示，您好是否要登出车位呢？'+event.data.text()+'',
      icon: 'images/icon.png',
      badge: 'images/badge.png',
      actions: [  
        {action: 'like', title: '👍是'},  
        {action: 'reply', title: '⤻ 忽略'}]  
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });
  self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');
  
    event.notification.close();
    if (event.action === 'like') {  
        clients.openWindow('https://facebook.com/')
      }  
      else if (event.action === 'reply') {  
        clients.openWindow('https://youtube.com/') 
      }  
  
    event.waitUntil(
      clients.openWindow('https://developers.google.com/web/')
    );
  });


// https://developers.google.com/web/updates/2016/01/notification-actions?hl=zh-tw 
//   self.registration.showNotification("New message from Alice", {  
//     actions: [  
//      {action: 'like', title: '👍Like'},  
//      {action: 'reply', title: '⤻ Reply'}]  
//   });
  