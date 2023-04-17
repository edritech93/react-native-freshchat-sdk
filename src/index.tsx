import { NativeModules, Platform } from "react-native";
import FreshchatNotificationConfig, {
  NotificationPriority,
} from "../components/freshchatNotificationConfig";

const LINKING_ERROR =
  `The package 'react-native-system-time' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: "" }) +
  "- You rebuilt the app after installing the package\n" +
  "- You are not using Expo Go\n";

const RNFreshchatSdk = NativeModules.RNFreshchatSdk
  ? NativeModules.SystemTime
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function getNotificationPriority(): typeof NotificationPriority {
  return FreshchatNotificationConfig.getNotificationPriority();
}
