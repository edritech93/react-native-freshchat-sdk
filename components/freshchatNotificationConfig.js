const {NativeModules} = require('react-native');
const {RNFreshchatSdk} = NativeModules;

const NotificationPriority = {
    "PRIORITY_DEFAULT": RNFreshchatSdk.NotificationPriority.PRIORITY_DEFAULT,
    "PRIORITY_HIGH": RNFreshchatSdk.NotificationPriority.PRIORITY_HIGH,
    "PRIORITY_LOW": RNFreshchatSdk.NotificationPriority.PRIORITY_LOW,
    "PRIORITY_MAX": RNFreshchatSdk.NotificationPriority.PRIORITY_MAX,
    "PRIORITY_MIN": RNFreshchatSdk.NotificationPriority.PRIORITY_MIN
};

const NotificationImportance = {
    "NONE": RNFreshchatSdk.NotificationImportance.NONE,
    "MIN": RNFreshchatSdk.NotificationImportance.MIN,
    "LOW": RNFreshchatSdk.NotificationImportance.LOW,
    "DEFAULT": RNFreshchatSdk.NotificationImportance.DEFAULT,
    "HIGH": RNFreshchatSdk.NotificationImportance.HIGH,
    "MAX": RNFreshchatSdk.NotificationImportance.MAX
};


class FreshchatNotificationConfig {

    constructor() {

        // TODO: Add notificationSoundUriPath - muthu

        this.notificationSoundEnabled = true;
        this.activityToLaunchOnFinish = null;
        this.largeIcon = null;
        this.smallIcon = null;
        this.priority = NotificationPriority.PRIORITY_DEFAULT;
        this.importance = NotificationImportance.DEFAULT;
        this.overrideNotificationClickListener = false;

        Object.preventExtensions(this);
    }

    static get NotificationPriority() {
        return NotificationPriority;
    }

    static get NotificationImportance() {
        return NotificationImportance;
    }
}

export default FreshchatNotificationConfig;
