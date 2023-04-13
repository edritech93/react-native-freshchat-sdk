export type FreshchatConfigType = {
  appId: string;
  appKey: string;
  gallerySelectionEnabled?: boolean;
  cameraCaptureEnabled?: boolean;
  teamMemberInfoVisible?: boolean;
  responseExpectationEnabled?: boolean;
  showNotificationBanner?: boolean;
  themeName?: string;
};
export type FAQOptionsType = {
  faqTitle?: string;
  contactUsActionVisible?: boolean;
  showContactUsOnAppBar?: boolean;
  showFaqCategoriesAsGrid?: boolean;
  showContactUsOnFaqScreens?: boolean;
};
export type ConversationOptionsType = {
  tags?: string[];
  filteredViewTitle?: string;
  filterType?: "unread" | "assigned" | "my_conversations";
  cameraCaptureEnabled?: boolean;
  gallerySelectionEnabled?: boolean;
  responseExpectationEnabled?: boolean;
  showNotificationBanner?: boolean;
  statusBarColor?: string;
  themeName?: string;
};
export type FreshchatUserType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneCountryCode?: string;
  phone?: string;
  externalId?: string;
  restoreId?: string;
  metaData?: Record<string, any>;
};
export type FreshchatMessageType = {
  tags?: string[];
  content: string;
  title?: string;
  messageId?: string;
  meta?: Record<string, any>;
};

export type FreshchatNotificationConfigType = {
  notificationSoundEnabled?: boolean;
  priority?: number;
  iconResourceId?: string;
};

// export type FreshchatSDK = {
//   EVENT_EXTERNAL_LINK_CLICKED: string;
//   EVENT_ANDROID_LOCALE_CHANGED_BY_WEBVIEW: string;
//   EVENT_UNREAD_MESSAGE_COUNT_CHANGED: string;
//   EVENT_USER_RESTORE_ID_GENERATED: string;
//   EVENT_USER_INTERACTED: string;
//   FRESHCHAT_EVENTS: string;
//   FRESHCHAT_NOTIFICATION_CLICKED: string;
//   EVENT_SET_TOKEN_TO_REFRESH_DEVICE_PROPERTIES: string;
//   init(freshchatConfig: FreshchatConfig): void;
//   showFAQs(faqOptions?: FreshchatFAQOptions): void;
//   showConversations(conversationOptions?: FreshchatConversationOptions): void;
//   resetUser(): void;
//   getUnreadCountAsync(callback: (count: number) => void, tags?: string[]): void;
//   setUser(user: FreshchatUser, errorCallback?: () => void): void;
//   setUserWithIdToken(jwt: string, errorCallback?: () => void): void;
//   getUser(callback: (user: FreshchatUser) => void): void;
//   getSDKVersionCode(callback: (version: string) => void): void;
//   setUserProperties(
//     userProperties: Record<string, any>,
//     errorCallback?: () => void
//   ): void;
//   sendMessage(message: FreshchatMessage): void;
//   identifyUser(
//     externalId: string,
//     restoreId?: string,
//     errorCallback?: () => void
//   ): void;
//   restoreUserWithIdToken(jwt: string, errorCallback?: () => void): void;
//   getUserIdTokenStatus(
//     callback: (status: "TOKEN_ABSENT" | "TOKEN_VALID" | "TOKEN_INVALID") => void
//   ): void;
//   getFreshchatUserId(callback: (userId: string) => void): void;
//   dismissFreshchatViews(): void;
//   setNotificationConfig(notificationConfig: FreshchatNotificationConfig): void;
//   setPushRegistrationToken(token: string): void;
//   isFreshchatNotification(
//     payload: Record<string, any>,
//     callback: (isFreshchat: boolean) => void
//   ): void;
//   handlePushNotification(payload: Record<string, any>): void;
//   openFreshchatDeeplink(link: string): void;
// };
