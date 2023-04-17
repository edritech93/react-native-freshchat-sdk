import { NativeModules } from "react-native";
const { RNFreshchatSdk } = NativeModules;

export enum NotificationPriority {
  PRIORITY_DEFAULT = RNFreshchatSdk.NotificationPriority.PRIORITY_DEFAULT,
  PRIORITY_HIGH = RNFreshchatSdk.NotificationPriority.PRIORITY_HIGH,
  PRIORITY_LOW = RNFreshchatSdk.NotificationPriority.PRIORITY_LOW,
  PRIORITY_MAX = RNFreshchatSdk.NotificationPriority.PRIORITY_MAX,
  PRIORITY_MIN = RNFreshchatSdk.NotificationPriority.PRIORITY_MIN,
}

export const tes = "tesss";

export enum NotificationImportance {
  NONE = RNFreshchatSdk.NotificationImportance.NONE,
  MIN = RNFreshchatSdk.NotificationImportance.MIN,
  LOW = RNFreshchatSdk.NotificationImportance.LOW,
  DEFAULT = RNFreshchatSdk.NotificationImportance.DEFAULT,
  HIGH = RNFreshchatSdk.NotificationImportance.HIGH,
  MAX = RNFreshchatSdk.NotificationImportance.MAX,
}

class FreshchatNotificationConfig {
  notificationSoundEnabled: boolean = true;
  activityToLaunchOnFinish: string | null = null;
  largeIcon: string | null = null;
  smallIcon: string | null = null;
  priority: NotificationPriority = NotificationPriority.PRIORITY_DEFAULT;
  importance: NotificationImportance = NotificationImportance.DEFAULT;
  overrideNotificationClickListener: boolean = false;

  constructor() {
    Object.preventExtensions(this);
  }

  static getNotificationPriority(): typeof NotificationPriority {
    return NotificationPriority;
  }

  static getNotificationImportance(): typeof NotificationImportance {
    return NotificationImportance;
  }
}

export default FreshchatNotificationConfig;
