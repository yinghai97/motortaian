這是一個index.js 是一個推送通知的程序

用的是node.js ,必須安裝後才能使用
https://nodejs.org/en/

index.js
7 把公鑰貼上來
8 私鑰貼上來
10-16 連接mysql
21-33 調出endpoint 並開始發送通知

新手使用node.js時，建議先去預先自行科普
實驗室目前沒什麼人使用node.js不過未來 node.js 很有可能取代apache，php

使用方法是
用terminal cd 到此push文件夾內 輸入npm start 並會開始從數據庫內調出所有訂閱backend並依序推送notification
此時已經訂閱的 用戶就會收到 通知了