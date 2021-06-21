export const NOTIF_PROFILE_PIC = "notif_profile_pic"

var observers = {};
let instance = null;
class NotificationService {
    constructor(){
        //make sure that is only one instance of NotificationService
        if(!instance){
            instance = this;
        }
        return instance;
    }
    //posting notification for the observers
    postNotification = (notifName, data) => {
        let obs = observers[notifName];
        for(var x = 0; x < obs.length; x++){
            var obj = obs[x];
            obj.callback(data);
        }
    }
    //if added it will refreh every time a notification is pushed
    addObserver = (notifName, observer, callback) => {
        let obs = observers[notifName];
        
        if(!obs) {
            observers[notifName] = [];
        }

        let obj = {observer: observer, callback: callback};
        observers[notifName].push(obj);
    }

    removeObserver =  (observer, notifName) => {
        var obs = observers[notifName];
        if(obs) {
            for(var x = 0; x < obs.length; x++) {
                if(observer === obs[x].observer){
                    obs.splice(x, 1);
                    observers[notifName] = obs;
                    break;
                }
            }
        }
    }
}

export default NotificationService;