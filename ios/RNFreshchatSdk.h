
//
//  RNFreshchatSdk.h
//  RNFreshchatSdk
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#if __has_include("FreshchatSDK.h")
#import "FreshchatSDK.h"
#else
#import "FreshchatSDK/FreshchatSDK.h"
#endif
#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>
#define FRESHCHAT_USER_INTERACTED @"com.freshchat.consumer.sdk.reactnative.actions.UserInteraction"
#define FRESHCHAT_OPEN_LINKS @"com.freshchat.consumer.sdk.reactnative.actions.OpenLink"
#define FRESHCHAT_ACTION_JWT @"com.freshchat.consumer.sdk.reactnative.actions.jwt"
#define FRESHCHAT_ACTION_NOTIFICATION_CLICK_LISTENER @"com.freshchat.consumer.sdk.reactnative.actions.IosNotificationClickListener"

@interface RNFreshchatWindow : UIWindow
    
@end

@interface RNFreshchatSdk : RCTEventEmitter<RCTBridgeModule>

@end
