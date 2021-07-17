import NotificationService, { NOTIF_FILE_CHANGE } from "./notification.service"

let ns = new NotificationService();

let instance = null;
class DataService {
    constructor() {
            if (!instance) {
                instance = this;
            }
            return instance;
        }
        // send a notification to all the observers for the NOTIF_PRFILE_PIC
    changeFile = file => {
        ns.postNotification(NOTIF_FILE_CHANGE, file);
    }
}
export default DataService;