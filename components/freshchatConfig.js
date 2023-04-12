class FreshchatConfig {

    constructor(appId, appKey) {

        // TODO: expose stringsBundle to be used in iOS wrapper - muthu

        this.appId = appId;  //TODO: Can we have non nullable ?
        this.appKey = appKey;  //TODO: Can we have non nullable ?

        this.domain = null;
        this.themeName = null;
        this.stringsBundle = null;
        this.teamMemberInfoVisible = true;
        this.cameraCaptureEnabled = true;
        this.gallerySelectionEnabled = true;
        this.fileSelectionEnabled = true;
        this.responseExpectationEnabled = true;
        this.errorLogsEnabled = true; //iOS only
        this.showNotificationBanner = true; //iOS only
        this.notificationSoundEnabled = true; //iOS only

        Object.preventExtensions(this);
    }
}

export default FreshchatConfig;
