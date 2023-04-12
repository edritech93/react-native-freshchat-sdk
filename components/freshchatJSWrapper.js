const {NativeModules} = require('react-native');
const {RNFreshchatSdk} = NativeModules;
import {NativeEventEmitter} from 'react-native';
const emitter = new NativeEventEmitter(RNFreshchatSdk);
const _eventHandlers = {};
import {
    Platform
} from 'react-native';
const { version } = require('../package.json');

const rn_sdk_version_placeholder = "{{rn-version}}";
const platform_name_placeholder = "{{platform}}";
const platform_sdk_version_placeholder = "{{platform-version}}";
const android_platform_name = "android";
const ios_platform_name = "ios";
const sdk_version_placeholder = "rn-" + rn_sdk_version_placeholder + "-" + platform_name_placeholder + "-" + platform_sdk_version_placeholder;

const isAndroid = function() {
    return !isIos();
};

const isIos = function() {
    return Platform.OS === 'ios';
};

const registerForRestoreIdUpdates = function (register) {
    RNFreshchatSdk.registerForRestoreIdUpdates(register);
};

const registerForMessageCountUpdates = function (register) {
    RNFreshchatSdk.registerForMessageCountUpdates(register);
};

const registerUserInteractionListerner = function (register) {
    RNFreshchatSdk.registerUserInteractionListerner(register);
};

const registerForOpeningLink = function (register) {
    RNFreshchatSdk.registerForOpeningLink(register);
};

const registerForLocaleChangedByWebview = function (register) {
    RNFreshchatSdk.registerForOpeningLink(register);
};

const registerForUserActions = function (register) {
    RNFreshchatSdk.registerForUserActions(register);
};

const registerNotificationClickListener = function (register) {
    RNFreshchatSdk.registerNotificationClickListener(register);
};

const registerForJWTRefresh = function (register) {
    RNFreshchatSdk.registerForJWTRefresh(register);
};

const enableNativeListenerForType = function (type, enable) {
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

const eventsList = function(key) {
    let events = {
        EVENT_EXTERNAL_LINK_CLICKED                    : RNFreshchatSdk.ACTION_OPEN_LINKS,
        EVENT_LOCALE_CHANGED_BY_WEBVIEW                : RNFreshchatSdk.ACTION_LOCALE_CHANGED_BY_WEBVIEW,
        EVENT_UNREAD_MESSAGE_COUNT_CHANGED             : RNFreshchatSdk.ACTION_UNREAD_MESSAGE_COUNT_CHANGED,
        EVENT_USER_RESTORE_ID_GENERATED                : RNFreshchatSdk.ACTION_USER_RESTORE_ID_GENERATED,
        EVENT_USER_INTERACTED                          : RNFreshchatSdk.ACTION_USER_INTERACTION,
        FRESHCHAT_EVENTS                               : RNFreshchatSdk.ACTION_FRESHCHAT_EVENTS,
        FRESHCHAT_NOTIFICATION_CLICKED                 : RNFreshchatSdk.FRESHCHAT_ACTION_NOTIFICATION_CLICK_LISTENER,
        EVENT_SET_TOKEN_TO_REFRESH_DEVICE_PROPERTIES   : RNFreshchatSdk.ACTION_SET_TOKEN_TO_REFRESH_DEVICE_PROPERTIES
    };
    return events[key];
};

module.exports = {

    EVENT_EXTERNAL_LINK_CLICKED                   : eventsList('EVENT_EXTERNAL_LINK_CLICKED'),
    EVENT_ANDROID_LOCALE_CHANGED_BY_WEBVIEW       : eventsList('EVENT_LOCALE_CHANGED_BY_WEBVIEW'),
    EVENT_UNREAD_MESSAGE_COUNT_CHANGED            : eventsList('EVENT_UNREAD_MESSAGE_COUNT_CHANGED'),
    EVENT_USER_RESTORE_ID_GENERATED               : eventsList('EVENT_USER_RESTORE_ID_GENERATED'),
    EVENT_USER_INTERACTED                         : eventsList('EVENT_USER_INTERACTED'),
    FRESHCHAT_EVENTS                              : eventsList('FRESHCHAT_EVENTS'),
    FRESHCHAT_NOTIFICATION_CLICKED                : eventsList('FRESHCHAT_NOTIFICATION_CLICKED'),
    EVENT_SET_TOKEN_TO_REFRESH_DEVICE_PROPERTIES  : eventsList('EVENT_SET_TOKEN_TO_REFRESH_DEVICE_PROPERTIES'),


    init: function(freshchatConfig) {
        RNFreshchatSdk.init(freshchatConfig);
    },

    showFAQs: function(faqOptions) {
        if(faqOptions) {
            RNFreshchatSdk.showFAQsWithOptions(faqOptions);
        } else {
            RNFreshchatSdk.showFAQs();
        }
    },

    showConversations: function(conversationOptions) {
        if(conversationOptions) {
            RNFreshchatSdk.showConversationsWithOptions(conversationOptions);
        } else {
            RNFreshchatSdk.showConversations();
        }
    },

    resetUser: function() {
        RNFreshchatSdk.resetUser();
    },

    getUnreadCountAsync: function (callback, tags) {
        try {
            if (tags) {
                RNFreshchatSdk.getUnreadCountAsyncForTags(callback, tags);
            } else {
                RNFreshchatSdk.getUnreadCountAsync(callback);
            }
        }
        catch (err) {
            console.log(err)
        }
    },

    setUser: function(user, errorCallback) {
        RNFreshchatSdk.setUser(user, errorCallback);
    },

    setUserWithIdToken: function(jwt, errorCallback) {
        if (isAndroid()) {
            RNFreshchatSdk.setUserWithIdToken(jwt, errorCallback);
        } else {
            RNFreshchatSdk.setUserWithIdToken(jwt);
        }
    },

    getUser: function(callback) {
        RNFreshchatSdk.getUser(callback);
    },

    getSDKVersionCode: function (callback) {
        RNFreshchatSdk.getSDKVersionCode((native_sdk_version) => {
            var platformName = "";
            if (isAndroid()) {
                platformName = android_platform_name;
            } else {
                platformName = ios_platform_name;
            }

            var reactNativeVersion = sdk_version_placeholder;
            reactNativeVersion = reactNativeVersion.replace(rn_sdk_version_placeholder, version);
            reactNativeVersion = reactNativeVersion.replace(platform_name_placeholder, platformName);
            reactNativeVersion = reactNativeVersion.replace(platform_sdk_version_placeholder, native_sdk_version);

            callback(reactNativeVersion);
        });
    },

    setUserProperties: function(userProperties, errorCallback) {
        RNFreshchatSdk.setUserProperties(userProperties, errorCallback);
    },

    sendMessage: function(freshchatMessage) {
        RNFreshchatSdk.sendMessage(freshchatMessage);
    },

    identifyUser: function(externalId, restoreId, errorCallback) {
        RNFreshchatSdk.identifyUser(externalId, restoreId, errorCallback);
    },

    restoreUserWithIdToken: function(jwt, errorCallback) {
        if (isAndroid()) {
            RNFreshchatSdk.restoreUser(jwt, errorCallback);
        } else {
            RNFreshchatSdk.restoreUser(jwt);
        }
    },

    getUserIdTokenStatus: function(callback) {
        RNFreshchatSdk.getUserIdTokenStatus(callback);
    },

    getFreshchatUserId: function(callback) {
        RNFreshchatSdk.getFreshchatUserId(callback);
    },

    /**
     * Function to dismiss Freshchat SDK screens
     *
     * @since 0.4.5
     */
    dismissFreshchatViews: function () {
        RNFreshchatSdk.dismissFreshchatViews();
    },

    setNotificationConfig: function(freshchatNotificationConfig) {
        RNFreshchatSdk.setNotificationConfig(freshchatNotificationConfig);
    },

    setPushRegistrationToken: function (token) {
        RNFreshchatSdk.setPushRegistrationToken(token);
    },

    isFreshchatNotification: function (payload, callback) {
        RNFreshchatSdk.isFreshchatNotification(payload, callback);
    },

    handlePushNotification: function (payload) {
        RNFreshchatSdk.handlePushNotification(payload);
    },

    openFreshchatDeeplink: function (link) {
        RNFreshchatSdk.openFreshchatDeeplink(link);
    },

    trackEvent: function (name, properties) {
        RNFreshchatSdk.trackEvent(name, properties);
    },

    notifyAppLocaleChange: function () {
        RNFreshchatSdk.notifyAppLocaleChange();
    },

    addEventListener: function (type, handler) {
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
    },

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

    removeEventListeners: function (type) {
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
    },

    transformPushNotificationIOSPayloadToNativePayload: function (reactPayload) {
        var nativePayload = reactPayload._data;

        var load = {
          "alert": reactPayload._alert,
          "badge": reactPayload._badgeCount,
          "sound" : "default"
        };
        var apsPayload = {"aps":load};
        var payload = Object.assign({}, apsPayload, nativePayload);
        return payload;
    },

    // isAppActiveWhenReceivingNotification: function (nativePayload) {
    //     if (nativePayload.isActive !== undefined) {
    //         return nativePayload.isActive;
    //     } else {
    //         return false;
    //     }
    // },
}
