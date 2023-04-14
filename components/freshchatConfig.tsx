class FreshchatConfig {
  readonly appId: string;
  readonly appKey: string;
  domain: string | null = null;
  themeName: string | null = null;
  stringsBundle: any | null = null;
  teamMemberInfoVisible: boolean = true;
  cameraCaptureEnabled: boolean = true;
  gallerySelectionEnabled: boolean = true;
  fileSelectionEnabled: boolean = true;
  responseExpectationEnabled: boolean = true;
  errorLogsEnabled: boolean = true; // iOS only
  showNotificationBanner: boolean = true; // iOS only
  notificationSoundEnabled: boolean = true; // iOS only

  constructor(appId: string, appKey: string) {
    this.appId = appId;
    this.appKey = appKey;
    Object.preventExtensions(this);
  }
}

export default FreshchatConfig;
