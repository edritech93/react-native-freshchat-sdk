import { NativeEventEmitter, NativeModules, Platform } from "react-native";
import { version } from "../package.json";
import {
  FreshchatMessageType,
  FreshchatNotificationConfigType,
} from "../types/FreshchatJSWrapperType";

const { RNFreshchatSdk } = NativeModules;
const emitter = new NativeEventEmitter(RNFreshchatSdk);

const rn_sdk_version_placeholder = "{{rn-version}}";
const platform_name_placeholder = "{{platform}}";
const platform_sdk_version_placeholder = "{{platform-version}}";
const android_platform_name = "android";
const ios_platform_name = "ios";
const sdk_version_placeholder =
  "rn-" +
  rn_sdk_version_placeholder +
  "-" +
  platform_name_placeholder +
  "-" +
  platform_sdk_version_placeholder;

const _eventHandlers = {};

export const isAndroid = () => {
  return !isIos();
};

export const isIos = () => {
  return Platform.OS === "ios";
};

export const registerForRestoreIdUpdates = (register: boolean) => {
  RNFreshchatSdk.registerForRestoreIdUpdates(register);
};

export const registerForMessageCountUpdates = (register: boolean) => {
  RNFreshchatSdk.registerForMessageCountUpdates(register);
};

export const registerUserInteractionListerner = (register: boolean) => {
  RNFreshchatSdk.registerUserInteractionListerner(register);
};

export const registerForOpeningLink = (register: boolean) => {
  RNFreshchatSdk.registerForOpeningLink(register);
};

export const registerForLocaleChangedByWebview = (register: boolean) => {
  RNFreshchatSdk.registerForOpeningLink(register);
};

export const registerForUserActions = (register: boolean) => {
  RNFreshchatSdk.registerForUserActions(register);
};

export const registerNotificationClickListener = (register: boolean) => {
  RNFreshchatSdk.registerNotificationClickListener(register);
};

export const registerForJWTRefresh = (register: boolean) => {
  RNFreshchatSdk.registerForJWTRefresh(register);
};

export const enableNativeListenerForType = (type: string, enable: boolean) => {
  switch (type) {
    case RNFreshchatSdk.ACTION_UNREAD_MESSAGE_COUNT_CHANGED:
      registerForMessageCountUpdates(enable);
      break;
    case RNFreshchatSdk.ACTION_USER_RESTORE_ID_GENERATED:
      registerForRestoreIdUpdates(enable);
      break;
    case RNFreshchatSdk.ACTION_USER_INTERACTION:
      registerUserInteractionListerner(enable);
      break;
    case RNFreshchatSdk.ACTION_OPEN_LINKS:
      registerForOpeningLink(enable);
      break;
    case RNFreshchatSdk.ACTION_LOCALE_CHANGED_BY_WEBVIEW:
      registerForLocaleChangedByWebview(enable);
      break;
    case RNFreshchatSdk.ACTION_FRESHCHAT_EVENTS:
      registerForUserActions(enable);
      break;
    case RNFreshchatSdk.FRESHCHAT_ACTION_NOTIFICATION_CLICK_LISTENER:
      registerNotificationClickListener(enable);
      break;
    case RNFreshchatSdk.ACTION_SET_TOKEN_TO_REFRESH_DEVICE_PROPERTIES:
      registerForJWTRefresh(enable);
      break;
  }
};

export const eventsList = (key: string) => {
  let events = {
    EVENT_EXTERNAL_LINK_CLICKED: RNFreshchatSdk.ACTION_OPEN_LINKS,
    EVENT_LOCALE_CHANGED_BY_WEBVIEW:
      RNFreshchatSdk.ACTION_LOCALE_CHANGED_BY_WEBVIEW,
    EVENT_UNREAD_MESSAGE_COUNT_CHANGED:
      RNFreshchatSdk.ACTION_UNREAD_MESSAGE_COUNT_CHANGED,
    EVENT_USER_RESTORE_ID_GENERATED:
      RNFreshchatSdk.ACTION_USER_RESTORE_ID_GENERATED,
    EVENT_USER_INTERACTED: RNFreshchatSdk.ACTION_USER_INTERACTION,
    FRESHCHAT_EVENTS: RNFreshchatSdk.ACTION_FRESHCHAT_EVENTS,
    FRESHCHAT_NOTIFICATION_CLICKED:
      RNFreshchatSdk.FRESHCHAT_ACTION_NOTIFICATION_CLICK_LISTENER,
    EVENT_SET_TOKEN_TO_REFRESH_DEVICE_PROPERTIES:
      RNFreshchatSdk.ACTION_SET_TOKEN_TO_REFRESH_DEVICE_PROPERTIES,
  };
  return events[key];
};

export const EVENT_EXTERNAL_LINK_CLICKED = eventsList(
  "EVENT_EXTERNAL_LINK_CLICKED"
);
export const EVENT_ANDROID_LOCALE_CHANGED_BY_WEBVIEW = eventsList(
  "EVENT_LOCALE_CHANGED_BY_WEBVIEW"
);
export const EVENT_UNREAD_MESSAGE_COUNT_CHANGED = eventsList(
  "EVENT_UNREAD_MESSAGE_COUNT_CHANGED"
);
export const EVENT_USER_RESTORE_ID_GENERATED = eventsList(
  "EVENT_USER_RESTORE_ID_GENERATED"
);
export const EVENT_USER_INTERACTED = eventsList("EVENT_USER_INTERACTED");
export const FRESHCHAT_EVENTS = eventsList("FRESHCHAT_EVENTS");
export const FRESHCHAT_NOTIFICATION_CLICKED = eventsList(
  "FRESHCHAT_NOTIFICATION_CLICKED"
);
export const EVENT_SET_TOKEN_TO_REFRESH_DEVICE_PROPERTIES = eventsList(
  "EVENT_SET_TOKEN_TO_REFRESH_DEVICE_PROPERTIES"
);

export const init = (freshchatConfig) => RNFreshchatSdk.init(freshchatConfig);

export const showFAQs = (faqOptions) => {
  if (faqOptions) {
    RNFreshchatSdk.showFAQsWithOptions(faqOptions);
  } else {
    RNFreshchatSdk.showFAQs();
  }
};

export const showConversations = (conversationOptions) => {
  if (conversationOptions) {
    RNFreshchatSdk.showConversationsWithOptions(conversationOptions);
  } else {
    RNFreshchatSdk.showConversations();
  }
};

export const resetUser = () => {
  RNFreshchatSdk.resetUser();
};

export const getUnreadCountAsync = (callback, tags) => {
  try {
    if (tags) {
      RNFreshchatSdk.getUnreadCountAsyncForTags(callback, tags);
    } else {
      RNFreshchatSdk.getUnreadCountAsync(callback);
    }
  } catch (err) {
    console.log(err);
  }
};

export const setUser = (user, errorCallback) => {
  RNFreshchatSdk.setUser(user, errorCallback);
};

export const setUserWithIdToken = (jwt, errorCallback) => {
  if (isAndroid()) {
    RNFreshchatSdk.setUserWithIdToken(jwt, errorCallback);
  } else {
    RNFreshchatSdk.setUserWithIdToken(jwt);
  }
};

export const getUser = (callback) => {
  RNFreshchatSdk.getUser(callback);
};

export const getSDKVersionCode = (callback) => {
  RNFreshchatSdk.getSDKVersionCode((native_sdk_version) => {
    let platformName = "";
    if (isAndroid()) {
      platformName = android_platform_name;
    } else {
      platformName = ios_platform_name;
    }

    let reactNativeVersion = sdk_version_placeholder;
    reactNativeVersion = reactNativeVersion.replace(
      rn_sdk_version_placeholder,
      version
    );
    reactNativeVersion = reactNativeVersion.replace(
      platform_name_placeholder,
      platformName
    );
    reactNativeVersion = reactNativeVersion.replace(
      platform_sdk_version_placeholder,
      native_sdk_version
    );

    callback(reactNativeVersion);
  });
};
export const setUserProperties = (userProperties, errorCallback) => {
  RNFreshchatSdk.setUserProperties(userProperties, errorCallback);
};

export const sendMessage = (freshchatMessage: FreshchatMessageType) => {
  RNFreshchatSdk.sendMessage(freshchatMessage);
};

export const identifyUser = (
  externalId: string,
  restoreId: string,
  errorCallback
) => {
  RNFreshchatSdk.identifyUser(externalId, restoreId, errorCallback);
};

export const restoreUserWithIdToken = (jwt: string, errorCallback) => {
  if (isAndroid()) {
    RNFreshchatSdk.restoreUser(jwt, errorCallback);
  } else {
    RNFreshchatSdk.restoreUser(jwt);
  }
};

export const getUserIdTokenStatus = (callback) => {
  RNFreshchatSdk.getUserIdTokenStatus(callback);
};

export const getFreshchatUserId = (
  callback: (userId: string) => void
): void => {
  RNFreshchatSdk.getFreshchatUserId(callback);
};

/**
 * Function to dismiss Freshchat SDK screens
 *
 * @since 0.4.5
 */
export const dismissFreshchatViews = () => {
  RNFreshchatSdk.dismissFreshchatViews();
};

export const setNotificationConfig = (
  freshchatNotificationConfig: FreshchatNotificationConfigType
) => {
  RNFreshchatSdk.setNotificationConfig(freshchatNotificationConfig);
};

export const setPushRegistrationToken = (token: string) => {
  RNFreshchatSdk.setPushRegistrationToken(token);
};

export const isFreshchatNotification = (payload, callback) => {
  RNFreshchatSdk.isFreshchatNotification(payload, callback);
};

export const handlePushNotification = (payload: { message: any }) => {
  RNFreshchatSdk.handlePushNotification(payload);
};

export const openFreshchatDeeplink = (link: string) => {
  RNFreshchatSdk.openFreshchatDeeplink(link);
};

export const trackEvent = (name: string, properties) => {
  RNFreshchatSdk.trackEvent(name, properties);
};

export const notifyAppLocaleChange = () => {
  RNFreshchatSdk.notifyAppLocaleChange();
};

//error
export const addEventListener = (type, handler) => {
  const listener = emitter.addListener(type, handler);

  let shouldStartNativeListener = false;
  if (!_eventHandlers[type]) {
    _eventHandlers[type] = new Map();
    shouldStartNativeListener = true;
  }

  _eventHandlers[type].set(handler, listener);
  if (shouldStartNativeListener) {
    enableNativeListenerForType(type, true);
  }
};

// removeEventListener: function (type, handler) {
//     if (!_eventHandlers[type].has(handler)) {
//         return;
//     }
//     _eventHandlers[type].get(handler).remove();
//     _eventHandlers[type].delete(handler);
//
//     if (_eventHandlers[type].size === 0) {
//         _eventHandlers[type] = undefined;
//         enableNativeListenerForType(type, false);
//     }
// },

export const removeEventListeners = (type) => {
  if (!_eventHandlers[type]) {
    return;
  }

  var eventSubscriptionsMap = _eventHandlers[type];
  if (eventSubscriptionsMap) {
    eventSubscriptionsMap.forEach((subscription) => {
      if (subscription) {
        subscription.remove();
      }
    });
  }
  _eventHandlers[type] = undefined;
  enableNativeListenerForType(type, false);
};

export const transformPushNotificationIOSPayloadToNativePayload = (
  reactPayload
) => {
  var nativePayload = reactPayload._data;

  var load = {
    alert: reactPayload._alert,
    badge: reactPayload._badgeCount,
    sound: "default",
  };
  var apsPayload = { aps: load };
  var payload = Object.assign({}, apsPayload, nativePayload);
  return payload;
};

// isAppActiveWhenReceivingNotification: function (nativePayload) {
//     if (nativePayload.isActive !== undefined) {
//         return nativePayload.isActive;
//     } else {
//         return false;
//     }
// },
