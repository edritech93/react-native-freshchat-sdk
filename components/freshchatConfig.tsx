class FreshchatConfig {
  public readonly appId: string;
  public readonly appKey: string;
  public domain: string | null = null;
  public themeName: string | null = null;
  public stringsBundle: any | null = null;
  public teamMemberInfoVisible: boolean = true;
  public cameraCaptureEnabled: boolean = true;
  public gallerySelectionEnabled: boolean = true;
  public fileSelectionEnabled: boolean = true;
  public responseExpectationEnabled: boolean = true;
  public errorLogsEnabled: boolean = true; // iOS only
  public showNotificationBanner: boolean = true; // iOS only
  public notificationSoundEnabled: boolean = true; // iOS only

  constructor(appId: string, appKey: string) {
    this.appId = appId;
    this.appKey = appKey;
    Object.preventExtensions(this);
  }
}

export default FreshchatConfig;
