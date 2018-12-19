Notification.requestPermission(function (status) {
    console.log('Notification permission status:', status);
});
var option = {
    body:'bobob',
    icon:'./images/refreshments.jpg',
    vibrate:[100,50,100],
    data:{primaryKey:1}

};
function displayNotification(a) {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration().then(function (reg) {
           
            reg.showNotification('Hello world',a);
        });
    }
}
// displayNotification(option);
function setPushSubscribe(){
    if (!('serviceWorker' in navigator)) 
        return;
    
    navigator.serviceWorker.ready
        .then(function(sw){
          return sw.pushManager.getSubscription();
        })
        .then(function(sub){
            if(sub === null){
                reg.pushManager.subscribe();

            }else{
                //已經訂閱
            }
        });
}
setPushSubscribe();