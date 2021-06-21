import NotificationService, {NOTIF_PROFILE_PIC} from "./notification.service"

let ns = new NotificationService();

let instance = null;
var imgPic = null;
class DataService {
    constructor(){
        if(!instance) {
            instance = this;
        }
        return instance;
    }
    // send a notification to all the observers for the NOTIF_PRFILE_PIC
    changeProfilePic = img => {
        imgPic = img;
        ns.postNotification(NOTIF_PROFILE_PIC, imgPic);
    }
}
export default DataService;