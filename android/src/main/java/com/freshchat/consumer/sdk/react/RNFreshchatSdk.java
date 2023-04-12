package com.freshchat.consumer.sdk.react;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.freshchat.consumer.sdk.ConversationOptions;
import com.freshchat.consumer.sdk.FaqOptions;
import com.freshchat.consumer.sdk.Freshchat;
import com.freshchat.consumer.sdk.FreshchatCallbackStatus;
import com.freshchat.consumer.sdk.FreshchatConfig;
import com.freshchat.consumer.sdk.FreshchatMessage;
import com.freshchat.consumer.sdk.FreshchatNotificationConfig;
import com.freshchat.consumer.sdk.FreshchatUser;
import com.freshchat.consumer.sdk.FreshchatUserInteractionListener;
import com.freshchat.consumer.sdk.UnreadCountCallback;
import com.freshchat.consumer.sdk.JwtTokenStatus;
import com.freshchat.consumer.sdk.exception.JwtException;
import com.freshchat.consumer.sdk.exception.MethodNotAllowedException;
import com.freshchat.consumer.sdk.LinkHandler;
import com.freshchat.consumer.sdk.Event;
import com.freshchat.consumer.sdk.FreshchatWebViewListener;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.lang.ref.WeakReference;


public class RNFreshchatSdk extends ReactContextBaseJavaModule {

    private static final String LOG_TAG = "RNFreshchatSdk";
    private static final String FRESHCHAT_ACTION_USER_INTERACTION = "com.freshchat.consumer.sdk.reactnative.actions.UserInteraction";
    private static final String ACTION_OPEN_LINKS = "ACTION_OPEN_LINKS";
    private static final String ACTION_LOCALE_CHANGED_BY_WEBVIEW = "ACTION_LOCALE_CHANGED_BY_WEBVIEW";

    private final FreshchatSDKBroadcastReceiver restoreIdUpdatesReceiver;
    private final FreshchatSDKBroadcastReceiver messageCountUpdatesReceiver;
    private final FreshchatSDKBroadcastReceiver userActionsReceiver;
    private final FreshchatSDKBroadcastReceiver notificationClickReceiver;
    private final FreshchatSDKBroadcastReceiver jwtRefreshEventReceiver;

    public RNFreshchatSdk(@NonNull ReactApplicationContext reactcontext) {
        super(reactcontext);

        restoreIdUpdatesReceiver = new FreshchatSDKBroadcastReceiver(reactcontext, Freshchat.FRESHCHAT_USER_RESTORE_ID_GENERATED);
        messageCountUpdatesReceiver = new FreshchatSDKBroadcastReceiver(reactcontext, Freshchat.FRESHCHAT_ACTION_MESSAGE_COUNT_CHANGED);
        userActionsReceiver = new FreshchatSDKBroadcastReceiver(reactcontext, Freshchat.FRESHCHAT_EVENTS);
        notificationClickReceiver = new FreshchatSDKBroadcastReceiver(reactcontext, Freshchat.FRESHCHAT_ACTION_NOTIFICATION_INTERCEPTED);
        jwtRefreshEventReceiver = new FreshchatSDKBroadcastReceiver(reactcontext, Freshchat.FRESHCHAT_SET_TOKEN_TO_REFRESH_DEVICE_PROPERTIES);
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        Map<String, Object> notificationPriorityMap = new HashMap<>();
        notificationPriorityMap.put("PRIORITY_DEFAULT", 0);
        notificationPriorityMap.put("PRIORITY_HIGH", 1);
        notificationPriorityMap.put("PRIORITY_LOW", -1);
        notificationPriorityMap.put("PRIORITY_MAX", 2);
        notificationPriorityMap.put("PRIORITY_MIN", -2);
        Map<String, Object> notificationImportanceMap = new HashMap<>();
        notificationImportanceMap.put("NONE", 0);
        notificationImportanceMap.put("MIN", 1);
        notificationImportanceMap.put("LOW", 2);
        notificationImportanceMap.put("DEFAULT", 3);
        notificationImportanceMap.put("HIGH", 4);
        notificationImportanceMap.put("MAX", 5);
        Map<String, Object> FilterType = new HashMap<>();
        FilterType.put("ARTICLE", "article");
        FilterType.put("CATEGORY", "category");
        constants.put("NotificationPriority", notificationPriorityMap);
        constants.put("NotificationImportance", notificationImportanceMap);
        constants.put("FilterType", FilterType);
        constants.put("ACTION_USER_RESTORE_ID_GENERATED", Freshchat.FRESHCHAT_USER_RESTORE_ID_GENERATED);
        constants.put("ACTION_UNREAD_MESSAGE_COUNT_CHANGED", Freshchat.FRESHCHAT_ACTION_MESSAGE_COUNT_CHANGED);
        constants.put("ACTION_USER_INTERACTION", FRESHCHAT_ACTION_USER_INTERACTION);
        constants.put("ACTION_FRESHCHAT_EVENTS", Freshchat.FRESHCHAT_EVENTS);
        constants.put(ACTION_OPEN_LINKS, ACTION_OPEN_LINKS);
        constants.put(ACTION_LOCALE_CHANGED_BY_WEBVIEW, ACTION_LOCALE_CHANGED_BY_WEBVIEW);
        constants.put("FRESHCHAT_ACTION_NOTIFICATION_CLICK_LISTENER", Freshchat.FRESHCHAT_ACTION_NOTIFICATION_INTERCEPTED);
        constants.put("ACTION_SET_TOKEN_TO_REFRESH_DEVICE_PROPERTIES", Freshchat.FRESHCHAT_SET_TOKEN_TO_REFRESH_DEVICE_PROPERTIES);
        return constants;
    }

    @Override
    public String getName() {
        return "RNFreshchatSdk";
    }

    public Bundle jsonToBundle(@NonNull ReadableMap readableMap) {
        Bundle bundle = new Bundle();
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        HashMap<String, Object> params = readableMap.toHashMap();
        if (params.size() == 0) {
            return bundle;
        }
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableType type = readableMap.getType(key);
            try {
                switch (type) {
                    case Null:
                        bundle.putString(key, null);
                        break;
                    case Boolean:
                        bundle.putBoolean(key, readableMap.getBoolean(key));
                        break;
                    case Number:
                        bundle.putDouble(key, readableMap.getDouble(key));
                        break;
                    case String:
                        bundle.putString(key, readableMap.getString(key));
                        break;
                    default:
                        bundle.putString(key, readableMap.getString(key));
                }
            } catch (Exception e) {
                Log.w(LOG_TAG, e.toString());
            }
        }
        return bundle;
    }


    @ReactMethod
    public void init(@NonNull ReadableMap initArgs) {
        try {

            if (initArgs == null || initArgs.toHashMap().size() == 0) {
                Log.e(LOG_TAG, "Please provide parameters to init()");
                return;
            }

            if (!initArgs.hasKey("appId") || !initArgs.hasKey("appKey")) {
                Log.e(LOG_TAG, "appId and appKey are mandatory parameters");
                return;
            }

            String appId = initArgs.getString("appId");
            String appKey = initArgs.getString("appKey");

            FreshchatConfig freshchatConfig = new FreshchatConfig(appId, appKey);

            if (initArgs.hasKey("domain")) {
                freshchatConfig.setDomain(initArgs.getString("domain"));
            }
            if (initArgs.hasKey("cameraCaptureEnabled")) {
                freshchatConfig.setCameraCaptureEnabled(initArgs.getBoolean("cameraCaptureEnabled"));
            }
            if (initArgs.hasKey("gallerySelectionEnabled")) {
                freshchatConfig.setGallerySelectionEnabled(initArgs.getBoolean("gallerySelectionEnabled"));
            }
            if (initArgs.hasKey("fileSelectionEnabled")) {
                freshchatConfig.setFileSelectionEnabled(initArgs.getBoolean("fileSelectionEnabled"));
            }
            if (initArgs.hasKey("teamMemberInfoVisible")) {
                freshchatConfig.setTeamMemberInfoVisible(initArgs.getBoolean("teamMemberInfoVisible"));
            }
            if (initArgs.hasKey("responseExpectationEnabled")) {
                freshchatConfig.setResponseExpectationEnabled(initArgs.getBoolean("responseExpectationEnabled"));
            }
            Freshchat.getInstance(getContext()).init(freshchatConfig);
        } catch (Exception e) {
            Log.e(LOG_TAG, e.toString());
        }
    }

    @ReactMethod
    public void showFAQs() {
        Freshchat.showFAQs(getContext());
    }

    @ReactMethod
    public void showFAQsWithOptions(@NonNull ReadableMap faqArgs) {
        try {

            if (faqArgs == null) {
                return;
            }

            FaqOptions faqOptions = new FaqOptions();
            if (faqArgs.hasKey("showFaqCategoriesAsGrid")) {
                faqOptions.showFaqCategoriesAsGrid(faqArgs.getBoolean("showFaqCategoriesAsGrid"));
            }
            if (faqArgs.hasKey("showContactUsOnAppBar")) {
                faqOptions.showContactUsOnAppBar(faqArgs.getBoolean("showContactUsOnAppBar"));
            }
            if (faqArgs.hasKey("showContactUsOnFaqScreens")) {
                faqOptions.showContactUsOnFaqScreens(faqArgs.getBoolean("showContactUsOnFaqScreens"));
            }
            if (faqArgs.hasKey("showContactUsOnFaqNotHelpful")) {
                faqOptions.showContactUsOnFaqNotHelpful(faqArgs.getBoolean("showContactUsOnFaqNotHelpful"));
            }

            List<String> tagsList = new ArrayList<String>();
            if (faqArgs.hasKey("tags")) {
                ReadableArray readableArray = faqArgs.getArray("tags");

                if (readableArray != null) {
                    for (int i = 0; i < readableArray.size(); i++) {
                        tagsList.add(readableArray.getString(i));
                    }
                    String title = faqArgs.getString("filteredViewTitle");

                    if ("category".equals(faqArgs.getString("filterType"))) {
                        faqOptions.filterByTags(tagsList, title, FaqOptions.FilterType.CATEGORY);
                    } else {
                        faqOptions.filterByTags(tagsList, title, FaqOptions.FilterType.ARTICLE);
                    }
                }
            }

            List<String> contactusTagsList = new ArrayList<String>();
            if (faqArgs.hasKey("contactusFilterTags")) {
                ReadableArray contactusTags = faqArgs.getArray("contactusFilterTags");
                if (contactusTags != null) {
                    for (int i = 0; i < contactusTags.size(); i++) {
                        contactusTagsList.add(contactusTags.getString(i));
                    }
                    String contactusFilterTitle = faqArgs.getString("contactusFilterTitle");
                    faqOptions.filterContactUsByTags(contactusTagsList, contactusFilterTitle);
                }
            }

            Freshchat.showFAQs(getContext(), faqOptions);
        } catch (Exception e) {
            Log.e(LOG_TAG, e.toString());
        }
    }

    @ReactMethod
    public void showConversations() {
        Freshchat.showConversations(getContext());
    }

    @ReactMethod
    public void showConversationsWithOptions(@NonNull ReadableMap conversationArgs) {
        ConversationOptions conversationOptions = new ConversationOptions();
        List<String> tagsList = new ArrayList<String>();
        if (conversationArgs.hasKey("tags")) {
            try {
                ReadableArray tags = conversationArgs.getArray("tags");
                if (tags != null) {
                    for (int i = 0; i < tags.size(); i++) {
                        tagsList.add(tags.getString(i));
                    }
                }
                String title = conversationArgs.getString("filteredViewTitle");
                conversationOptions.filterByTags(tagsList, title);
            } catch (Exception e) {
                Log.e(LOG_TAG, "Please provide parameters to update a user");
            }
        }
        Freshchat.showConversations(getContext(), conversationOptions);
    }

    @ReactMethod
    public void resetUser() {
        Freshchat.resetUser(getContext());
    }

    @ReactMethod
    public void setUser(@NonNull ReadableMap args, @Nullable final Callback errorCallback) {

        if (args == null || args.toHashMap().size() == 0) {
            Log.e(LOG_TAG, "Please provide parameters to setUser");
            return;
        }

        try {
            FreshchatUser freshchatUser = Freshchat.getInstance(getContext()).getUser();

            freshchatUser.setFirstName(args.getString("firstName"));
            freshchatUser.setLastName(args.getString("lastName"));
            freshchatUser.setEmail(args.getString("email"));
            freshchatUser.setPhone(args.getString("phoneCountryCode"), args.getString("phone"));

            Freshchat.getInstance(getContext()).setUser(freshchatUser);
        } catch (Exception e) {
            String errorMessage = e.toString();
            Log.e(LOG_TAG, errorMessage);
            postError(errorCallback, "setUser", errorMessage);
        }
    }

    @ReactMethod
    public void setUserWithIdToken(@NonNull String jwt, @Nullable final Callback errorCallback) {
        try {
            Freshchat.getInstance(getContext()).setUser(jwt);
        } catch (Exception e) {
            postError(errorCallback, "setUserWithIdToken", e.toString());
        }
    }


    @ReactMethod
    public void setUserProperties(@NonNull ReadableMap readableMap, @Nullable final Callback errorCallback) {

        if (readableMap == null) {
            Log.e(LOG_TAG, "Please provide user properties to update the user");
            return;
        }

        try {
            HashMap<String, Object> params = readableMap.toHashMap();
            Map<String, String> userMeta = new HashMap<String, String>();
            ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
            while (iterator.hasNextKey()) {
                String key = iterator.nextKey();
                ReadableType type = readableMap.getType(key);
                userMeta.put(key, readableMap.getString(key));
            }

            Freshchat.getInstance(getContext()).setUserProperties(userMeta);
        } catch (Exception e) {
            String errorMessage = e.toString();
            Log.e(LOG_TAG, errorMessage);
            postError(errorCallback, "setUserProperties", errorMessage);
        }
    }

    @ReactMethod
    public void getUnreadCountAsync(@NonNull final Callback callback) {
        Freshchat.getInstance(getContext()).getUnreadCountAsync(new UnreadCountCallback() {
            @Override
            public void onResult(FreshchatCallbackStatus freshchatCallbackStatus, int count) {
                boolean status = freshchatCallbackStatus == FreshchatCallbackStatus.STATUS_SUCCESS;

                WritableMap map = new WritableNativeMap();
                map.putBoolean("status", status);
                map.putInt("count", count);
                callback.invoke(map);
            }
        });
    }

    @ReactMethod
    public void getUnreadCountAsyncForTags(@NonNull ReadableMap readableMap, @NonNull final Callback callback) {

        List<String> tagsList = new ArrayList<String>();

        if (readableMap != null && readableMap.toHashMap().size() > 0) {
            HashMap<String, Object> params = readableMap.toHashMap();
            if (readableMap.hasKey("tags")) {
                ReadableArray readableArray = readableMap.getArray("tags");
                if (readableArray != null) {
                    for (int i = 0; i < readableArray.size(); i++) {
                        tagsList.add(readableArray.getString(i));
                    }
                }
            }
        }

        Freshchat.getInstance(getContext()).getUnreadCountAsync(
                new UnreadCountCallback() {
                    @Override
                    public void onResult(FreshchatCallbackStatus freshchatCallbackStatus, int count) {
                        boolean status = freshchatCallbackStatus == FreshchatCallbackStatus.STATUS_SUCCESS;

                        WritableMap map = new WritableNativeMap();
                        map.putBoolean("status", status);
                        map.putInt("count", count);
                        callback.invoke(map);
                    }
                },
                tagsList);
    }

    @ReactMethod
    public void getSDKVersionCode(@NonNull Callback successCallback) {
        int versionNumber = Freshchat.getInstance(getContext()).getSDKVersionCode();
        successCallback.invoke(versionNumber);
    }

    @ReactMethod
    public void getUser(@NonNull Callback userCallback) {
        FreshchatUser freshchatUser = Freshchat.getInstance(getContext()).getUser();

        WritableMap map = new WritableNativeMap();

        if (freshchatUser != null) {
            map.putString("email", freshchatUser.getEmail());
            map.putString("firstName", freshchatUser.getFirstName());
            map.putString("lastName", freshchatUser.getLastName());
            map.putString("phone", freshchatUser.getPhone());
            map.putString("phoneCountryCode", freshchatUser.getPhoneCountryCode());
            map.putString("externalId", freshchatUser.getExternalId());
            map.putString("restoreId", freshchatUser.getRestoreId());
        }

        userCallback.invoke(map);
    }

    @ReactMethod
    public void isFreshchatNotification(@NonNull ReadableMap readableMap, @NonNull Callback callback) {
        HashMap<String, Object> params = readableMap.toHashMap();
        if (params.size() == 0) {
            callback.invoke(0);
        } else {
            Bundle bundle = jsonToBundle(readableMap);
            if (Freshchat.getInstance(getContext()).isFreshchatNotification(bundle)) {
                callback.invoke(1);
            } else {
                callback.invoke(0);
            }
        }
    }

    @ReactMethod
    public void handlePushNotification(@NonNull ReadableMap readableMap) {

        if (readableMap == null || readableMap.toHashMap().size() == 0) {
            Log.e(LOG_TAG, "Please provide values to handlePushNotification");
            return;
        }

        HashMap<String, Object> params = readableMap.toHashMap();
        Bundle bundle = jsonToBundle(readableMap);
        Freshchat.handleFcmMessage(getContext(), bundle);
    }

    @ReactMethod
    public void identifyUser(@NonNull String externalId, @NonNull String restoreId, @Nullable final Callback errorCallback) {
        try {
            Freshchat.getInstance(getContext()).identifyUser(externalId, restoreId);
        } catch (Exception e) {
            String errorMessage = e.toString();
            Log.e(LOG_TAG, errorMessage);
            postError(errorCallback, "identifyUser", errorMessage);
        }
    }

    @ReactMethod
    public void restoreUser(@NonNull String jwt, @Nullable final Callback errorCallback) {
        try {
            Freshchat.getInstance(getContext()).restoreUser(jwt);
        } catch (Exception e) {
            postError(errorCallback, "setUserWithIdToken", e.toString());
        }
    }

    @ReactMethod
    public void sendMessage(@NonNull ReadableMap readableMap) {
        HashMap<String, Object> params = readableMap.toHashMap();
        if (params.size() < 2) {
            Log.e(LOG_TAG, "Please provide valid field to sendMessage");
            return;
        }

        FreshchatMessage freshchatMessage = new FreshchatMessage();
        freshchatMessage.setTag(readableMap.getString("tag"))
                .setMessage(readableMap.getString("message"));

        Freshchat.getInstance(getContext()).sendMessage(getContext(), freshchatMessage);
    }

    @ReactMethod
    public void setPushRegistrationToken(@NonNull String token) {
        Freshchat.getInstance(getContext()).setPushRegistrationToken(token);
    }

    @ReactMethod
    public void dismissFreshchatViews() {
        Intent intent = new Intent("com.freshchat.consumer.sdk.actions.DismissFreshchatScreens");
        LocalBroadcastManager.getInstance(getContext().getApplicationContext()).sendBroadcast(intent);
    }

    @ReactMethod
    public void setNotificationConfig(@NonNull ReadableMap readableMap) {
        try {
            HashMap<String, Object> params = readableMap.toHashMap();
            FreshchatNotificationConfig notificationConfig = new FreshchatNotificationConfig();

            if (readableMap.hasKey("notificationSoundEnabled")) {
                notificationConfig.setNotificationSoundEnabled(readableMap.getBoolean("notificationSoundEnabled"));
            }

            try {
                if (readableMap.hasKey("smallIcon")) {
                    String iconName = readableMap.getString("smallIcon");
                    int iconId = getContext().getResources().getIdentifier(iconName, "drawable", getContext().getPackageName());
                    notificationConfig.setSmallIcon(iconId);
                }
            } catch (Exception e) {
                Log.i(LOG_TAG, "smallIcon parsing failed");
            }

            try {
                if (readableMap.hasKey("largeIcon")) {
                    String iconName = readableMap.getString("largeIcon");
                    int iconId = getContext().getResources().getIdentifier(iconName, "drawable", getContext().getPackageName());
                    notificationConfig.setLargeIcon(iconId);
                }
            } catch (Exception e) {
                Log.i(LOG_TAG, "largeIcon parsing failed");
            }

            if (readableMap.hasKey("activityToLaunchOnFinish")) {
                notificationConfig.launchActivityOnFinish(readableMap.getString("activityToLaunchOnFinish"));
            }

            if (readableMap.hasKey("priority")) {
                notificationConfig.setPriority(readableMap.getInt("priority"));
            }

            if (readableMap.hasKey("importance")) {
                notificationConfig.setImportance(readableMap.getInt("importance"));
            }

            if (readableMap.hasKey("overrideNotificationClickListener")) {
                notificationConfig.setNotificationInterceptionEnabled(readableMap.getBoolean("overrideNotificationClickListener"));
            }

            Freshchat.getInstance(getContext()).setNotificationConfig(notificationConfig);
        } catch (Exception e) {
            Log.e(LOG_TAG, "setNotificationConfig error: " + e.toString());
        }
    }

    @ReactMethod
    public void registerForRestoreIdUpdates(boolean register) {
        Log.i(LOG_TAG, "enableRegisterForRestoreIdUpdates: " + register);

        if (register) {
            registerBroadcastReceiver(restoreIdUpdatesReceiver, Freshchat.FRESHCHAT_USER_RESTORE_ID_GENERATED);
        } else {
            unregisterBroadcastReceiver(restoreIdUpdatesReceiver);
        }
    }

    @ReactMethod
    public void registerForMessageCountUpdates(boolean register) {
        Log.i(LOG_TAG, "enableRegisterForMessageCountUpdates: " + register);
        if (register) {
            registerBroadcastReceiver(messageCountUpdatesReceiver, Freshchat.FRESHCHAT_ACTION_MESSAGE_COUNT_CHANGED);
        } else {
            unregisterBroadcastReceiver(messageCountUpdatesReceiver);
        }
    }

    @ReactMethod
    public void registerUserInteractionListerner(boolean register) {
        Log.i(LOG_TAG, "registerUserInteractionListerner: " + register);
        if (register) {
            Freshchat.getInstance(getContext()).setFreshchatUserInteractionListener(userInteractionListener);
        } else {
            Freshchat.getInstance(getContext()).setFreshchatUserInteractionListener(null);
        }
    }

    @ReactMethod
    public void openFreshchatDeeplink(String link) {
        Log.i(LOG_TAG, "openFreshchatDeeplink: " + link);
        if (getContext() instanceof Activity) {
            Log.i(LOG_TAG, "openFreshchatDeeplink: React: Activity Context");
        } else {
            Log.i(LOG_TAG, "openFreshchatDeeplink: React: Application Context");
        }
        Freshchat.openFreshchatDeeplink(getContext(), link);
    }

    private FreshchatUserInteractionListener userInteractionListener = new FreshchatUserInteractionListener() {

        @Override
        public void onUserInteraction() {
            emitEvent(getReactApplicationContext(), FRESHCHAT_ACTION_USER_INTERACTION, null);
        }

        @Override
        public void onUserLeaveHint() {
            emitEvent(getReactApplicationContext(), FRESHCHAT_ACTION_USER_INTERACTION, null);
        }
    };

    @ReactMethod
    public void registerForOpeningLink(boolean register) {
        Log.i(LOG_TAG, "registerForOpeningLink: " + register);
        if (register) {
            Freshchat.getInstance(getContext()).setCustomLinkHandler(linkHandler);
        } else {
            Freshchat.getInstance(getContext()).setCustomLinkHandler(null);
        }
    }

    @ReactMethod
    public void registerForLocaleChangedByWebview(boolean register) {
        Log.i(LOG_TAG, "registerForLocaleChangedByWebview: " + register);
        if (register) {
            Freshchat.getInstance(getContext()).setWebviewListener(webviewListener);
        } else {
            Freshchat.getInstance(getContext()).setWebviewListener(null);
        }
    }

    @ReactMethod
    public void registerForUserActions(boolean register) {
        Log.i(LOG_TAG, "registerForUserActions: " + register);
        if (register) {
            registerBroadcastReceiver(userActionsReceiver, Freshchat.FRESHCHAT_EVENTS);
        } else {
            unregisterBroadcastReceiver(userActionsReceiver);
        }
    }

    @ReactMethod
    public void registerNotificationClickListener(boolean register) {
        Log.i(LOG_TAG, "registerNotificationClickListener: " + register);
        if (register) {
            registerBroadcastReceiver(notificationClickReceiver, Freshchat.FRESHCHAT_ACTION_NOTIFICATION_INTERCEPTED);
        } else {
            unregisterBroadcastReceiver(notificationClickReceiver);
        }
    }

    @ReactMethod
    public void registerForJWTRefresh(boolean register) {
        Log.i(LOG_TAG, "registerForJWTRefresh: " + register);
        if (register) {
            registerBroadcastReceiver(jwtRefreshEventReceiver, Freshchat.FRESHCHAT_SET_TOKEN_TO_REFRESH_DEVICE_PROPERTIES);
        } else {
            unregisterBroadcastReceiver(jwtRefreshEventReceiver);
        }
    }

    @ReactMethod
    public void getUserIdTokenStatus(@NonNull final Callback callback) {
        JwtTokenStatus tokenStatus = Freshchat.getInstance(getContext()).getUserIdTokenStatus();

        WritableMap map = new WritableNativeMap();
        map.putString("user_id_token_status", tokenStatus.name());
        callback.invoke(map);
    }

    @ReactMethod
    public void getFreshchatUserId(@NonNull final Callback callback) {
        String alias = Freshchat.getInstance(getContext()).getFreshchatUserId();
        callback.invoke(alias);
    }

    @ReactMethod
    public void trackEvent(@NonNull String name, @NonNull ReadableMap readableMap) {
        HashMap<String, Object> params = null;
        try {
            params = readableMap.toHashMap();
        } catch (Exception e) {
            Log.e(LOG_TAG, e.toString());
        } finally {
            if (params == null) {
                params = new HashMap<>();
            }
        }
        Freshchat.trackEvent(getContext(), name, params);
    }

    @ReactMethod
    public void notifyAppLocaleChange() {
        Freshchat.notifyAppLocaleChange(getContext());
    }

    private void registerBroadcastReceiver(@NonNull FreshchatSDKBroadcastReceiver receiver, @NonNull String action) {
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(action);
        LocalBroadcastManager.getInstance(getContext()).registerReceiver(receiver, intentFilter);
    }

    private void unregisterBroadcastReceiver(@NonNull FreshchatSDKBroadcastReceiver receiver) {
        LocalBroadcastManager.getInstance(getContext()).unregisterReceiver(receiver);
    }

    private LinkHandler linkHandler = new LinkHandler() {
        @Override
        public boolean handleLink(@NonNull String url, @Nullable Bundle bundle) {
            WritableMap map = new WritableNativeMap();
            map.putString("url", url);
            emitEvent(getReactApplicationContext(), ACTION_OPEN_LINKS, map);
            return true;
        }
    };

    private FreshchatWebViewListener webviewListener = new FreshchatWebViewListener() {
        @Override
        public void onLocaleChangedByWebView(@NonNull WeakReference<Context> activityContext) {
            WritableMap map = new WritableNativeMap();
            emitEvent(getReactApplicationContext(), ACTION_LOCALE_CHANGED_BY_WEBVIEW, map);
        }
    };

    private class FreshchatSDKBroadcastReceiver extends BroadcastReceiver {

        private final ReactApplicationContext reactApplicationContext;
        private final String eventName;

        public FreshchatSDKBroadcastReceiver(@NonNull ReactApplicationContext reactApplicationContext, @NonNull String eventName) {
            this.reactApplicationContext = reactApplicationContext;
            this.eventName = eventName;
        }

        @Override
        public void onReceive(@NonNull Context context, @NonNull Intent intent) {
            String action = intent.getAction();
            Log.i(LOG_TAG, "Broadcast triggered: " + action);

            if (reactApplicationContext == null) {
                Log.e(LOG_TAG, "reactContext is null. Broadcast dropped.");
                return;
            }

            WritableMap map = new WritableNativeMap();
            if (intent.getExtras() != null) {
                if (Freshchat.FRESHCHAT_EVENTS.equals(eventName)) {
                    Event event = Freshchat.getEventFromBundle(intent.getExtras());
                    if (event != null) {
                        map.putString("event_name", event.getEventName().getName());
                        WritableNativeMap propertiesMap = new WritableNativeMap();
                        if (event.getProperties() != null && event.getProperties().size() > 0) {
                            for (Event.Property property : event.getProperties().keySet()) {
                                propertiesMap.putString(property.getName(), String.valueOf(event.getProperties().get(property)));
                            }
                        }
                        map.putMap("properties", propertiesMap);
                    }
                } else if (Freshchat.FRESHCHAT_ACTION_NOTIFICATION_INTERCEPTED.equals(eventName)) {
                    map.putString("url", intent.getExtras().getString("FRESHCHAT_DEEPLINK"));
                }
            }

            emitEvent(reactApplicationContext, eventName, map);
        }
    }

    private void emitEvent(@NonNull ReactApplicationContext reactApplicationContext, @NonNull String eventName, @Nullable WritableMap params) {
        if (params == null) {
            params = new WritableNativeMap();
        }
        reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @NonNull
    private void postError ( @Nullable final Callback errorCallback, @NonNull String module, @NonNull String errorMessage) {
        if (errorCallback != null) {
            WritableMap map = new WritableNativeMap();
            map.putString("module", module);
            map.putString("errorMessage", errorMessage);
            errorCallback.invoke(map);
        }
    }

    private Context getContext() {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            Log.d(LOG_TAG, "Using Activity Context");
            return activity;
        }
        Log.d(LOG_TAG, "Using React Application Context");
        return getReactApplicationContext();
    }
}