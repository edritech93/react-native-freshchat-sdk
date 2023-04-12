# Freshchat React Native SDK
## 4.2.2 (2023-03-08)

### Bug Fixes :
* Fix for updating user details along with user creation in iOS.
* Fix to stop auto scrolling of Carousel cards to initial card in iOS.
* Fix for overlapping new message indicator with reply editor in iOS.
* Fix to allow sending attachment only when bot requests an attachment in iOS.
* Fix for localisation of FAQ search bar cancel text in iOS.
* Fix to stop FAQ content from shaking while scrolling with less content in iOS.
* Fix for send button being enabled when only empty spaces are entered in Android.
* Fix for extra space being displayed below multiline bot messages in Android.
* Fix for a crash which occurs while attaching images in Android.

## 4.2.1 (2023-01-31)

### Enhancement :
* Support for Read Only and Single Select carousel for bot flow in Android.
* Support for star rate feedback from users during bot interactions in iOS.

### Bug Fixes :
* Fix to initiate bot for resolved conversations when chat screen opens in Android

## 4.2.0 (2022-12-04)

### Enhancement :
* Changes to support Push notifications with P8 certification.

### Bug Fixes :
* Support for image in bot flow messages in iOS.
* Fix for agent/bot message timestamp aligning to the right end of the message bubble in Android.
* Fix CFBundleSupportedPlatforms issue while submitting app to store in iOS.

## 4.1.3 (2022-11-24)

### Improvement :
* Updated targetSdkVersion to Android 12.

### Bug Fixes :
* Fix for the next bot flow to trigger on selecting carousel in Android.
* Fix for clearing error message for invalid input in bot flow in Android.
* Fix for handling empty messages for Android.
* Fix for handling quick actions menu overlapping in landscape mode for Android.
* Fix for custom attachment icons appearing too large in Android.

## 4.1.2 (2022-11-09)

### Improvement :
* Minor UI changes and improvements to accomodate for ios devices and versions in iOS.

### Bug Fixes :
* Fix for Quick Action Pre-defined buttons in iOS.
* Fix impacting CSAT users for RTL users for iOS.

## 4.1.1 (2022-10-26)

### Feature Enhancement
* Added ability to control file attachment using `fileSelectionEnabled` config.
* This version lets you receive feedback (opinion polls & comments) from users during bot interactions in iOS

## 4.1.0 (2022-10-18)

### Bug Fix:
* Fix for keyboard hiding last few messages for Android.

## 4.0.9 (2022-10-15)

### Bug Fix:
* Better handling of HTML content in messages.
* Allow encoded strings with quick actions and replies in messages.

## 4.0.8 (2022-09-30)

### Feature Enhancement
* Bot will now be able to validate text in Mobile number, Email-ID and Number input types from customer in the conversation.
* Customer can upload file for bot flows and attachment option.

## 4.0.7 (2022-08-24)

### Feature Enhancement
* Redesign of "Powered by Freshworks" banner for both iOS and Android.

### Bug Fix:
* Fix for orientation change crash in Android Quick Actions.
* Add TOKEN_NOT_PROCESSED state for JWT auth users in iOS.

## 4.0.6 (2022-08-11)

### Bug Fix:
* Fix for orientation change crash which was introduced in version 5.1.0 in Android.

## 4.0.5 (2022-08-09)

### Feature Enhancement
* Support for quick options in bot flow.
* Support for read-only and single select carousel in bots flow in iOS.
* Display missing suggested articles in initial bot flow in iOS.
* New device models added to track user devices in iOS.

### Bug Fix:
* Fix for ConnectivityManager leak in Android.
* Fixed notification not being shown in the notification tray, when the app is in the background for Android.
* Fixed an issue with restoring a user using JWT in Android.
* Fix for dismissing keyboard when moving from Chat screen to App screen in Android.
* Fix for handing empty CSAT in Android.
* Display timestamp value for bot messages in iOS.
* Theme fix for CSAT prompt in iOS.
* Support for <li>,<ol> and <ul> html tags in messages in iOS.
* Update custom response expectation message with locale change in iOS.
* Other minor bug fixes.

## 4.0.4 (2022-04-06)

### Bug Fix:
* Stop bot from triggering messages in wrong scenarios.

## 4.0.3 (2022-01-28)

### Bug Fix:
* Unread count overlap for topic list.
* Black navigation bar appearance on navigating via push notification.
* Rare invalid domain prompt during sdk initialization.
* Fix for displaying notifications in Android 12.

## 4.0.2 (2021-12-06)

### Enhancement
* Display complete name for messages created using API
* Resouces path update and minor changes for other framework bundle

### Bug Fix:
* Fix for Topic name and image being empty
* FAQ contactUs tags filter

## 4.0.1 (2021-11-08)

### Bug Fix:
* Fix CFBundleSupportedPlatforms issue while submitting app to store.

## 4.0.0 (2021-10-28)

### Enhancement:
* Introducing self-service via bots on the SDK. Bots built using the Unified Bot Builder will now be accessible on the SDK too. Learn more about the capability [here](https://support.freshchat.com/en/support/solutions/articles/50000003778-bots-on-freshdesk-messaging-mobile-sdk).

## 3.3.5 (2021-08-31)

### Bug Fix:
* A fix to honour FAQ category icons in all accounts.

## 3.3.4 (2021-07-07)

### Enhancement:
* iOS performance improvements in rendering messages.

### Bug Fix:
* Fix for CSAT UI bug in iOS.

## 3.3.3 (2021-06-21)

### Bug Fix:
* Fix for data encryption issue due to changes made in v4.3.2.

## 3.3.2 (2021-04-09)

### Enhancement:
* Exposed NotificationImportanceConfig for Android.
* Updated cryptographic encryption pattern used for encrypting shared preferences in Android.
* Upgraded picasso library version to 2.8.

## 3.3.1 (2021-02-24)

### Bug Fix:
* Support for custom reply text in quick reply options.

## 3.3.0 (2021-02-03)

### Enhancement:
* Omni Kbase support for bundled accounts.

## 3.2.0 (2021-01-19)

### Enhancements:
* Upgraded Android targetSDKVersion to 29.
* Updated the algorithm used for encrypting Shared Preferences in Android.

### Bug Fix:
* Fix for CSAT UI bug in iOS.

## 3.1.1 (2021-01-04)

### Bug Fix:
* Fix for FAQs content visibility in iOS.

## 3.1.0 (2020-12-16)

### Feature
* Omni Kbase support for bundled accounts in iOS.

### Enhancements
* Improved polling mechanism in iOS.

### Bug Fix
* Bug fixes in iOS JWT accounts.

## 3.0.0 (2020-11-23)

### Enhancements
* Support for live translation of messages.
* Pre-populate caption text while attaching images.
* Proactive warning for incorrect app domain.
* Added extra space around send button in iOS chat screen.
* Support sub locale of languages in iOS.
* Removed extra padding for images in iOS.
* Support for custom line spacing of messages in chat screen in Android.

### Bug Fix
* iOS Thread related crashes.
* Better handling of system font for HTML messages in iOS.

## 2.6.4 (2020-09-07)

### Bug Fixes
* Better handling of "&" in iOS messages.
* Removed search icon when FAQ search is open in Android.
* Added “Still looking for help? Talk to us” string for FAQ downvote in Android. 

## 2.6.3 (2020-08-07)

### Enhancement
* Android and iOS performance improvements in rendering messages.

### Bug Fix
* Android and iOS Fix to honor showContactUsOnFaqNotHelpful config

## 2.6.2 (2020-07-07)

### Enhancement
* Android performance improvements in rendering messages.

### Bug Fix
* iOS UI Bug fixes.


## 2.6.1 (2020-06-18)

### Enhancement
* Support for multiline placeholder text in feedback view.

## 2.6.0 (2020-06-15)

### Feature
* Support to book meetings.

### Enhancement
* Optimisation for iOS 13.

### Bug Fixes
* Show agent first name alone instead of full name.
* Fixed image resize issue in Android.
* Minor bug fixes in iOS.

## 2.5.0 (2020-05-13)

### Feature
* Support for messages with Carousel options.

## 2.4.0 (2020-05-04)

### Feature
* Support for multi choice question with dropdown.

## 2.3.1 (2020-03-17)

### Bug Fix
* Fixed rendering of newlines in message text.

## 2.3.0 (2020-02-03)

### Feature
* Add user events from your app to Freshchat Timeline to give your agents context on user's journey and problems.

## 2.2.0 (2019-11-18)

### Enhancement
* Ability to search through FAQs filtered by tags.
* Increased CSAT message view maximum height to 4 lines.

## 2.1.1 (2019-10-10)

### Bug Fix
* Handled iOS 13 push tokens.

## 2.1.0 (2019-9-27)

### Enhancement
* Added Freshchat events
* Support for showing proactive reply suggestions

### Breaking Change
* Freshchat.FRESHCHAT_EVENTS event name variable user_action is changed to event_name.

### Bug Fix
* Resolved iOS variable name conflict with react-native-navigation library.

## 2.0.0 (2019-7-26)

### Enhancement
* Comapatible with RN v0.60 and above.

## 1.1.2 (2019-5-27)

### Enhancement :
* Improvements in keychain store.

### Bug Fix
* Stopped message list from auto scrolling to bottom
* Improvements in JWT timer timeout logic

## 1.1.1 (2019-5-14)

### Bug Fix
* Graceful handling of non freshchat notification payload.

## 1.1.0 (2019-5-10)

### Enhancement
* Improvements in keychain store.

### Bug Fixes
* Improved user experience during API failures
* Open SDK screens in same task irrespective of the context passed

## 1.0.2 (2019-5-3)

### Enhancement
* Updated README with latest documentation

## 0.5.8 (2019-3-7)

### Enhancement
* Improvements in logic to load new messages for conversations

## 0.5.7 (2019-2-15)

### Enhancement
* Added API to dismiss Freshchat screens in Android
* Upgrade Freshchat Android SDK version to 2.4.0
* Upgrade Freshchat iOS SDK version to 2.4.1

## 0.5.6 (2019-1-10)

### Enhancement
* Upgrade Freshchat Android SDK version to 2.2.0
* Upgrade Freshchat iOS SDK version to 2.2.0

### Bug Fixes
* Trigger unread count count callback only once

### Breaking Change

* If you have modified strings.xml to hide response expectation messages, it will continue to work in all cases except when away. You can set `responseExpectationEnabled` flag in FreshchatConfig as `false` to completely hide response expectations.

## 0.5.5 (2018-12-29)

### Enhancement
* Upgrade Freshchat Android SDK version to 2.1.0
* Upgrade Freshchat iOS SDK version to 2.1.0

## 0.5.4 (2018-12-13)

### Breaking Changes
* Application state has to be send as part of notification payload in iOS. Please refer documentation for more details. This is needed to determine whether to open conversations or show in-app notifications.

### Bug Fixes
* Trigger Notification interception broadcast when app is in background Android Oreo and above.

### Enhancement
* Added transformPushNotificationIOSPayloadToNativePayload API

## 0.5.3 (2018-12-04)

### Breaking Changes
* Event name changed from `Freshchat.FRESHCHAT_IOS_NOTIFICATION_CLICKED` to `Freshchat.FRESHCHAT_NOTIFICATION_CLICKED`
* `FreshchatNotificationConfig.activityToLaunchOnClick` is removed. Added `FreshchatNotificationConfig.overrideNotificationClickListener` which accepts a boolean value.

### Enhancement
* Unified approach to listen to notification click in Android and iOS

### Bug Fixes
* Ability to hide agent response time (iOS fix)
* Ability to launch Freshchat SDK screens within same task (Android fix)

## 0.5.2 (2018-11-29)

### Enhancement
* Exposed event to handle external links
* Exposed event to handle ios notification click
* Exposed ways to intercept notifications in Android

## 0.5.1 (2018-11-21)

### Bug fixes
* Ignore Null Objects while sending to native iOS SDK

## 0.5.0 (2018-11-15)

### Breaking Change
* Added error callback for setUser, setUserProperties and identifyUser API.

### Enhancement
* Securely identify and restore users using Id Tokens (JWT)

## 0.4.5 (2018-10-30)

### Enhancement
* Expose APIs dismiss Freshchat views in iOS

### Bug fixes
* Remove event listener crash fix

## 0.4.4 (2018-10-14)

### Enhancement
* Expose APIs to support custom localizable string file in iOS
* Updated Freshchat iOS SDK version to 1.5.5
* Updated Freshchat Android SDK version to 1.5.3

### Bug fixes
* Open SDK screens in the same task of running application instead of creating new task.

## 0.4.3 (2018-10-06)

### Enhancement
* Updated Freshchat iOS SDK version to 1.5.4

## 0.4.2 (2018-10-01)

### Enhancement
* Updated Freshchat iOS SDK version to 1.5.3
* Expose APIs to support custom theme file in iOS
* Expose event to listen to user interaction

## 0.4.1 (2018-09-24)

### Enhancement
* Updated Freshchat Android SDK version to 1.5.2

## 0.4.0 (2018-08-07)

### Enhancement
* Expose APIs to handle SDK push notifications

### Breaking Change
* Native module name is changed to `RNFreshchatSdkPackage` from `FreshchatSDKPackage`

## 0.3.1 (2018-06-15)

### Bug fixes
* Run native module instance in Main thread
* Fixed broken constant `FreshchatNotificationConfig.NotificationPriority.PRIORITY_HIGH`

## 0.3.0 (2018-06-14)

### Enhancement
* Enable capabilities to listen to change in unread message count and restore id generated event
* Allow FAQs and Channels to be filtered by tags

## 0.2.0 (2018-05-10)

* Initial alpha release of the Freshchat React Native SDK
