//
//  RNFreshchatSdk.m
//  RNFreshchatSdk
//

#import "RNFreshchatSdk.h"
#import "FreshchatSDK/FreshchatSDK.h"
#import <React/RCTLog.h>
#import <React/RCTConvert.h>
#import <AssetsLibrary/AssetsLibrary.h>
#import <AVFoundation/AVFoundation.h>
#import <Photos/Photos.h>
#import <React/RCTUtils.h>

@implementation RNFreshchatWindow

- (UIView *)hitTest:(CGPoint)point withEvent:(UIEvent *)event {
    [[NSNotificationCenter defaultCenter] postNotificationName:FRESHCHAT_USER_INTERACTED object:self];
    return [super hitTest:point withEvent:event];
}
@end

@interface RNFreshchatSdk()

@property (nonatomic, assign) BOOL hasRegisteredForNotificationInterception;

@end

@implementation RNFreshchatSdk

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[FRESHCHAT_USER_RESTORE_ID_GENERATED,
             FRESHCHAT_UNREAD_MESSAGE_COUNT_CHANGED,
             FRESHCHAT_USER_INTERACTED,
             FRESHCHAT_EVENTS,
             FRESHCHAT_OPEN_LINKS,
             FRESHCHAT_ACTION_NOTIFICATION_CLICK_LISTENER,
             FRESHCHAT_SET_TOKEN_TO_REFRESH_DEVICE_PROPERTIES];
}

- (NSDictionary *)constantsToExport
{
    return @{@"NotificationPriority":@{ @"PRIORITY_DEFAULT":[NSNumber numberWithInt:0],
                                        @"PRIORITY_HIGH": [NSNumber numberWithInt:1],
                                        @"PRIORITY_LOW": [NSNumber numberWithInt:-1],
                                        @"PRIORITY_MAX": [NSNumber numberWithInt:2],
                                        @"PRIORITY_MIN": [NSNumber numberWithInt:-2]},
             @"NotificationImportance":@{ @"NONE":[NSNumber numberWithInt:0],
                                        @"MIN": [NSNumber numberWithInt:1],
                                        @"LOW": [NSNumber numberWithInt:2],
                                        @"DEFAULT": [NSNumber numberWithInt:3],
                                        @"HIGH": [NSNumber numberWithInt:4],
                                        @"MAX": [NSNumber numberWithInt:5]},
             @"FilterType":@{@"ARTICLE": @"article",@"CATEGORY": @"category"},
             @"ACTION_USER_RESTORE_ID_GENERATED":FRESHCHAT_USER_RESTORE_ID_GENERATED,
             @"ACTION_UNREAD_MESSAGE_COUNT_CHANGED":FRESHCHAT_UNREAD_MESSAGE_COUNT_CHANGED,
             @"ACTION_USER_INTERACTION": FRESHCHAT_USER_INTERACTED,
             @"ACTION_FRESHCHAT_EVENTS": FRESHCHAT_EVENTS,
             @"ACTION_OPEN_LINKS": FRESHCHAT_OPEN_LINKS,
             @"FRESHCHAT_ACTION_NOTIFICATION_CLICK_LISTENER": FRESHCHAT_ACTION_NOTIFICATION_CLICK_LISTENER,
             @"ACTION_SET_TOKEN_TO_REFRESH_DEVICE_PROPERTIES":FRESHCHAT_SET_TOKEN_TO_REFRESH_DEVICE_PROPERTIES
    };
}

RCT_EXPORT_METHOD(init:(NSDictionary *)options)
{
    NSString* domain = [options objectForKey:@"domain"];
    NSString* appId = [options objectForKey:@"appId"];
    NSString* appKey = [options objectForKey:@"appKey"];
    NSString* themeName = [options objectForKey:@"themeName"];
    NSString* stringsBundle = [options objectForKey:@"stringsBundle"];

    FreshchatConfig *config = [[FreshchatConfig alloc]initWithAppID:appId  andAppKey:appKey];

    if(![domain isEqual:[NSNull null]]) {
        // Adding null check, null overrides default domain in SDK. Need fix in SDK
        config.domain = domain;
    }
    
    if(![themeName isEqual:[NSNull null]]) {
        config.themeName = themeName;
    }
    
    if(![stringsBundle isEqual:[NSNull null]]) {
        config.stringsBundle = stringsBundle;
    }

    if(options [@"cameraCaptureEnabled"]) {
        config.cameraCaptureEnabled = [[options objectForKey:@"cameraCaptureEnabled"] boolValue];
    }
    if(options [@"gallerySelectionEnabled"]) {
        config.gallerySelectionEnabled = [[options objectForKey:@"gallerySelectionEnabled"] boolValue];
    }
    if(options [@"fileSelectionEnabled"]) {
        config.fileAttachmentEnabled = [[options objectForKey:@"fileSelectionEnabled"] boolValue];
    }

    if(options [@"notificationSoundEnabled"]) {
        config.notificationSoundEnabled = [[options objectForKey:@"notificationSoundEnabled"] boolValue];
    }
    
    if(options [@"errorLogsEnabled"]) {
        config.errorLogsEnabled = [[options objectForKey:@"errorLogsEnabled"] boolValue];
    }

    if(options [@"teamMemberInfoVisible"]) {
        config.teamMemberInfoVisible = [[options objectForKey:@"teamMemberInfoVisible"] boolValue];
    }

    if(options [@"showNotificationBanner"]) {
        config.showNotificationBanner = [[options objectForKey:@"showNotificationBanner"] boolValue];
    }

    if(options [@"responseExpectationEnabled"]) {
        config.responseExpectationVisible = [[options objectForKey:@"responseExpectationEnabled"] boolValue];
    }

    [[Freshchat sharedInstance] initWithConfig:config];
}

RCT_EXPORT_METHOD(showConversations)
{
    UIViewController *visibleVC = [[[UIApplication sharedApplication] keyWindow] rootViewController];
    [[Freshchat sharedInstance] showConversations:visibleVC];
}

RCT_EXPORT_METHOD(showConversationsWithOptions:(NSDictionary *)args)
{
    ConversationOptions *options = [ConversationOptions new];
    if(args.count > 0) {
        NSMutableArray *tagsList = [NSMutableArray array];
        NSArray* tags = ![[args objectForKey:@"tags"] isEqual:[NSNull null]] ? [args objectForKey:@"tags"] : @[];
        if(tags != nil && tags.count > 0) {
            for(int i=0; i<tags.count; i++) {
                [tagsList addObject:[tags objectAtIndex:i]];
            }
            NSString* title = ![[args objectForKey:@"filteredViewTitle"] isEqual:[NSNull null]] ? [args objectForKey:@"filteredViewTitle"] : @"";
            [options filterByTags:tagsList withTitle:title];
        }
    }
    UIViewController *visibleVC = [[[UIApplication sharedApplication] keyWindow] rootViewController];
    [[Freshchat sharedInstance] showConversations:visibleVC withOptions: options];
}

RCT_EXPORT_METHOD(showFAQs)
{
    UIViewController *visibleVC = [[[UIApplication sharedApplication] keyWindow] rootViewController];
    [[Freshchat sharedInstance] showFAQs:visibleVC];
}

RCT_EXPORT_METHOD(showFAQsWithOptions:(NSDictionary *)args)
{
    FAQOptions *options = [FAQOptions new];
    if(args [@"showFaqCategoriesAsGrid"]) {
        options.showFaqCategoriesAsGrid = [[args objectForKey:@"showFaqCategoriesAsGrid"] boolValue];
    }
    if(args [@"showContactUsOnFaqScreens"]) {
        options.showContactUsOnFaqScreens = [[args objectForKey:@"showContactUsOnFaqScreens"] boolValue];
    }
    if(args [@"showContactUsOnAppBar"]) {
        options.showContactUsOnAppBar = [[args objectForKey:@"showContactUsOnAppBar"] boolValue];
    }
    if(args [@"showContactUsOnFaqNotHelpful"]) {
        options.showContactUsOnFaqNotHelpful = [[args objectForKey:@"showContactUsOnFaqNotHelpful"] boolValue];
    }

    NSMutableArray *tagsList = [NSMutableArray array];
    NSArray* tags = ![[args objectForKey:@"tags"] isEqual:[NSNull null]] ? [args objectForKey:@"tags"] : @[];
    if(tags != nil && tags.count > 0) {
        for(int i=0; i<tags.count; i++) {
            [tagsList addObject:[tags objectAtIndex:i]];
        }
        
        NSString* filterType = ![[args objectForKey:@"filterType"] isEqual:[NSNull null]] ? [args objectForKey:@"filterType"] : @"";
        NSString* title = ![[args objectForKey:@"filteredViewTitle"] isEqual:[NSNull null]] ? [args objectForKey:@"filteredViewTitle"] : @"";
        if([@"category" isEqualToString:filterType]) {
            [options filterByTags:tagsList withTitle:title andType: CATEGORY];
        } else {
            [options filterByTags:tagsList withTitle:title andType: ARTICLE];
        }
    }

    NSMutableArray *contactusTagsList = [NSMutableArray array];
    NSArray* contactusTags = ![[args objectForKey:@"contactusFilterTags"] isEqual:[NSNull null]] ? [args objectForKey:@"contactusFilterTags"] : @[];
    if(contactusTags != nil && contactusTags.count > 0) {
        for(int i=0; i<contactusTags.count; i++) {
            [contactusTagsList addObject:[contactusTags objectAtIndex:i]];
        }
        NSString* contactusTitle = ![[args objectForKey:@"contactusFilterTitle"] isEqual:[NSNull null]] ? [args objectForKey:@"contactusFilterTitle"] : @"";
        [options filterContactUsByTags:contactusTagsList withTitle:contactusTitle];
    }

    UIViewController *visibleVC = [[[UIApplication sharedApplication] keyWindow] rootViewController];
    [[Freshchat sharedInstance] showFAQs:visibleVC withOptions:options];
}

RCT_EXPORT_METHOD(resetUser)
{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        [[Freshchat sharedInstance]resetUserWithCompletion:^{}];
    });
}


RCT_EXPORT_METHOD(getUnreadCountAsync:(RCTResponseSenderBlock)callback)
{
    // TODO: native SDK should send status along with count
    [[Freshchat sharedInstance] unreadCountWithCompletion:^(NSInteger unreadCount) {
        @try {
            NSMutableDictionary *dic = [[NSMutableDictionary alloc] init];
            [dic setObject:[NSNumber numberWithBool:YES] forKey:@"status"];
            [dic setValue:[NSNumber numberWithInteger:unreadCount] forKey:@"count"];
            callback(@[dic]);
        } @catch (NSException *exception) {
            NSLog(@"getUnreadCountAsyncForTags CRASH: %@ %@", exception.name, exception.reason);
        }
    }];
}

RCT_EXPORT_METHOD(getUnreadCountAsyncForTags:(NSDictionary *)args callback:(RCTResponseSenderBlock)callback)
{
    // TODO: native SDK should send status along with count
    NSArray* tags = [args objectForKey:@"tags"];
    [[Freshchat sharedInstance] unreadCountForTags:tags withCompletion:^(NSInteger unreadCount) {
        @try {
            NSMutableDictionary *dic = [[NSMutableDictionary alloc] init];
            [dic setObject:[NSNumber numberWithBool:YES] forKey:@"status"];
            [dic setValue:[NSNumber numberWithInteger:unreadCount] forKey:@"count"];
            callback(@[dic]);
        } @catch (NSException *exception) {
            NSLog(@"getUnreadCountAsyncForTags CRASH: %@ %@", exception.name, exception.reason);
        }
    }];
}

RCT_EXPORT_METHOD(getUser:(RCTResponseSenderBlock)callback)
{
    NSMutableDictionary *dic = [[NSMutableDictionary alloc] init];
    [dic setValue:[FreshchatUser sharedInstance].firstName forKey:@"firstName"];
    [dic setValue:[FreshchatUser sharedInstance].lastName forKey:@"lastName"];
    [dic setValue:[FreshchatUser sharedInstance].email forKey:@"email"];
    [dic setValue:[FreshchatUser sharedInstance].phoneNumber forKey:@"phone"];
    [dic setValue:[FreshchatUser sharedInstance].phoneCountryCode forKey:@"phoneCountryCode"];
    [dic setValue:[FreshchatUser sharedInstance].externalID forKey:@"externalId"];
    [dic setValue:[FreshchatUser sharedInstance].restoreID forKey:@"restoreId"];

    callback(@[dic]);
}

RCT_EXPORT_METHOD(setUser:(NSDictionary *)args :(RCTResponseSenderBlock)errorCallback)
{
    NSArray *keys = [args allKeys];
    if(keys.count == 0) {
        NSLog(@"Please provide valid field in object to updateUser");
    } else {
        
        @try {
            FreshchatUser *user = [FreshchatUser sharedInstance];

            user.firstName = ![[args objectForKey:@"firstName"] isEqual:[NSNull null]] ? [args objectForKey:@"firstName"] : @"";
            user.lastName = ![[args objectForKey:@"lastName"] isEqual:[NSNull null]] ? [args objectForKey:@"lastName"] : @"";
            user.email = ![[args objectForKey:@"email"] isEqual:[NSNull null]] ? [args objectForKey:@"email"] : @"";
            user.phoneCountryCode = ![[args objectForKey:@"phoneCountryCode"] isEqual:[NSNull null]] ? [args objectForKey:@"phoneCountryCode"] : @"";
            user.phoneNumber = ![[args objectForKey:@"phone"] isEqual:[NSNull null]] ? [args objectForKey:@"phone"] : @"";
            
            dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
                [[Freshchat sharedInstance] setUser:user];
                NSLog(@" update User Successfully");
            });
        } @catch (NSException *exception) {
            [self postError:errorCallback :@"setUser" :exception.debugDescription];
        }
    }
}

RCT_EXPORT_METHOD(setUserWithIdToken:(NSString *)jwt)
{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
            [[Freshchat sharedInstance] setUserWithIdToken:jwt];
            NSLog(@" update User Successfully");
        });
}

RCT_EXPORT_METHOD(setUserProperties:(NSDictionary *)args :(RCTResponseSenderBlock)errorCallback)
{
    NSArray *keys = [args allKeys];
    if(keys.count == 0){
        NSLog(@"Please provide valid field in object to updateUserProperties");
    } else {

        @try {
            NSArray *arrayOfKeys = [args allKeys];
            NSArray *arrayOfValues = [args allValues];

            NSString *key;
            NSString *value;
            for(int i=0; i<arrayOfKeys.count; i++) {
                key = [arrayOfKeys objectAtIndex:i];
                value = [arrayOfValues objectAtIndex:i];
                [[Freshchat sharedInstance] setUserPropertyforKey:key withValue:value];
            }
        } @catch (NSException *exception) {
            [self postError:errorCallback :@"setUserProperties" :exception.debugDescription];
        }
    }
}

RCT_EXPORT_METHOD(getSDKVersionCode:(RCTResponseSenderBlock)callback)
{
    NSString* versionNumber = [Freshchat SDKVersion];
    callback(@[versionNumber]);
}

RCT_EXPORT_METHOD(getUserIdTokenStatus:(RCTResponseSenderBlock)callback)
{
    NSString* idTokenStatus = [[Freshchat sharedInstance] getUserIdTokenStatus];
    NSMutableDictionary *dic = [[NSMutableDictionary alloc] init];
    [dic setValue:idTokenStatus forKey:@"user_id_token_status"];
    callback(@[dic]);
}

RCT_EXPORT_METHOD(getFreshchatUserId:(RCTResponseSenderBlock)callback)
{
    NSString* alias = [[Freshchat sharedInstance] getFreshchatUserId];
    callback(@[alias]);
}

RCT_EXPORT_METHOD(setPushRegistrationToken:(NSString *)devToken)
{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        [[Freshchat sharedInstance] setPushRegistrationToken:devToken];
    });
}

RCT_EXPORT_METHOD(isFreshchatNotification:(NSDictionary *)args callback:(RCTResponseSenderBlock)callback)
{
    // TODO: Handle args if null, reuse args instead of keys
    NSArray *keys = [args allKeys];
    if(keys.count == 0) {
        callback(@[@false]);
        return;
    }
    if([[Freshchat sharedInstance]isFreshchatNotification:args]) {
        callback(@[@true]);
    }else{
        callback(@[@false]);
    }
}

RCT_EXPORT_METHOD(handlePushNotification:(NSDictionary *)args)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        
        UIApplicationState state = UIApplicationStateActive;
        
        if ([self hasRegisteredForNotificationInterception]) {
            state = UIApplicationStateInactive;
        }
        
        if(args [@"isActive"]) {
            BOOL isActive = [[args objectForKey:@"isActive"] boolValue];
            if (isActive) {
                state = UIApplicationStateActive;
            } else {
                state = UIApplicationStateInactive;
            }
        }
        
        [[Freshchat sharedInstance]handleRemoteNotification:args andAppstate:state];
    });
}

RCT_EXPORT_METHOD(sendMessage:(NSDictionary *)args)
{
    // TODO: handle tag and message being null in SDK. Null values are crashing.
    NSString* tag = [args objectForKey:@"tag"];
    if([tag isEqual:[NSNull null]]) {
        tag = @"";
    }

    NSString* message = [args objectForKey:@"message"];
    if([message isEqual:[NSNull null]]) {
        message = @"";
    }

    FreshchatMessage *userMessage = [[FreshchatMessage alloc] initWithMessage:message andTag:tag];
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        [[Freshchat sharedInstance] sendMessage:userMessage];
    });
}

RCT_EXPORT_METHOD(identifyUser:(NSString *)externalId :(NSString *)restoreId :(RCTResponseSenderBlock)errorCallback)
{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        @try {
            [[Freshchat sharedInstance] identifyUserWithExternalID:externalId restoreID:restoreId];
        } @catch (NSException *exception) {
            [self postError:errorCallback :@"identifyUser" :exception.debugDescription];
        }
    });
}

RCT_EXPORT_METHOD(restoreUser:(NSString *)jwt)
{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        [[Freshchat sharedInstance] restoreUserWithIdToken:jwt];
    });
}

/**
 *  Function to dismiss Freshchat SDK screens
 *
 *  @since 0.4.5
 */
RCT_EXPORT_METHOD(dismissFreshchatViews)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [[Freshchat sharedInstance] dismissFreshchatViews];
    });
}

RCT_EXPORT_METHOD(setNotificationConfig:(NSDictionary *)args)
{
}

RCT_EXPORT_METHOD(registerForRestoreIdUpdates:(BOOL)shouldRegister)
{
    if (shouldRegister == YES) {
        NSLog(@"registerForRestoreIdUpdates YES");
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(userRestoreIdGenerated:)
                                                     name:FRESHCHAT_USER_RESTORE_ID_GENERATED
                                                   object:nil];
    } else {
        NSLog(@"registerForRestoreIdUpdates NO");
        [[NSNotificationCenter defaultCenter] removeObserver:self name:FRESHCHAT_USER_RESTORE_ID_GENERATED object:nil];
    }
}

RCT_EXPORT_METHOD(registerForMessageCountUpdates:(BOOL)shouldRegister)
{
    if (shouldRegister == YES) {
        NSLog(@"registerForMessageCountUpdates YES");
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(messageCountUpdated:)
                                                     name:FRESHCHAT_UNREAD_MESSAGE_COUNT_CHANGED
                                                   object:nil];
    } else {
        NSLog(@"registerForMessageCountUpdates NO");
        [[NSNotificationCenter defaultCenter] removeObserver:self name:FRESHCHAT_UNREAD_MESSAGE_COUNT_CHANGED object:nil];
    }
}

RCT_EXPORT_METHOD(registerUserInteractionListerner:(BOOL)shouldRegister)
{
    if (shouldRegister == YES) {
        NSLog(@"registerUserInteractionListerner YES");
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(userInteracted:)
                                                     name:FRESHCHAT_USER_INTERACTED
                                                   object:nil];
    } else {
        NSLog(@"registerUserInteractionListerner NO");
        [[NSNotificationCenter defaultCenter] removeObserver:self name:FRESHCHAT_USER_INTERACTED object:nil];
    }
}

RCT_EXPORT_METHOD(registerForOpeningLink:(BOOL)shouldRegister)
{
    if (shouldRegister == YES) {
        NSLog(@"registerForOpeningLink YES");
        [Freshchat sharedInstance].customLinkHandler = ^BOOL(NSURL * url) {
            NSMutableDictionary *dic = [[NSMutableDictionary alloc] init];
                        [dic setValue:url.description forKey:@"url"];
                        [self sendEventWithName:FRESHCHAT_OPEN_LINKS body:dic];
                        return YES;
        };
    } else {
        NSLog(@"registerForOpeningLink NO");
        [Freshchat sharedInstance].customLinkHandler = nil;
    }
}

RCT_EXPORT_METHOD(registerForUserActions:(BOOL)shouldRegister)
{
    if (shouldRegister == YES) {
        NSLog(@"registerUserInteractionListerner YES");
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(userActions:)
                                                     name:FRESHCHAT_EVENTS
                                                   object:nil];
    } else {
        NSLog(@"registerUserInteractionListerner NO");
        [[NSNotificationCenter defaultCenter] removeObserver:self name:FRESHCHAT_EVENTS object:nil];
    }
}

RCT_EXPORT_METHOD(registerNotificationClickListener:(BOOL)shouldRegister)
{
    if (shouldRegister == YES) {
        NSLog(@"registerIosNotificationClickLister YES");
        self.hasRegisteredForNotificationInterception = true;
        [Freshchat sharedInstance].onNotificationClicked = ^BOOL(NSString * url) {
            NSLog(@"%@", url);
            [self onNotificationClicked :url];
            return YES;
        };
    } else {
         NSLog(@"registerIosNotificationClickLister NO");
        self.hasRegisteredForNotificationInterception = false;
        [Freshchat sharedInstance].onNotificationClicked = nil;
    }
}

RCT_EXPORT_METHOD(registerForJWTRefresh:(BOOL)shouldRegister)
{
    if (shouldRegister == YES) {
        NSLog(@"registerForJWTRefresh YES");
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(jwtTokenRefreshEventTriggered:)
                                                     name:FRESHCHAT_SET_TOKEN_TO_REFRESH_DEVICE_PROPERTIES
                                                   object:nil];
    } else {
        NSLog(@"registerForJWTRefresh NO");
        [[NSNotificationCenter defaultCenter] removeObserver:self name:FRESHCHAT_SET_TOKEN_TO_REFRESH_DEVICE_PROPERTIES object:nil];
    }
}

RCT_EXPORT_METHOD(openFreshchatDeeplink:(NSString *)link)
{
    UIViewController *visibleVC = [self topMostController];
    [[Freshchat sharedInstance] openFreshchatDeeplink:link viewController:visibleVC];
}

RCT_EXPORT_METHOD(trackEvent:(NSString *)name :(NSDictionary *)properties)
{
    [[Freshchat sharedInstance] trackEvent:name withProperties:properties];
}

RCT_EXPORT_METHOD(notifyAppLocaleChange)
{
    [[NSNotificationCenter defaultCenter] postNotificationName:FRESHCHAT_USER_LOCALE_CHANGED object:self];
}

- (void) userRestoreIdGenerated:(NSNotification *) notification{
    NSLog(@"userRestoreIdGenerated triggered");
    [self sendEventWithName:FRESHCHAT_USER_RESTORE_ID_GENERATED body:nil];
}

- (void) messageCountUpdated:(NSNotification *) notification{
    NSLog(@"messageCountUpdated triggered");
    [self sendEventWithName:FRESHCHAT_UNREAD_MESSAGE_COUNT_CHANGED body:nil];
}

- (void) userInteracted:(NSNotification *) notification{
    NSLog(@"userInteracted triggered");
    [self sendEventWithName:FRESHCHAT_USER_INTERACTED body:nil];
}

- (void) postError:(RCTResponseSenderBlock) errorCallback :(NSString *)module :(NSString *)errorMessage{
    if (errorCallback) {
        NSMutableDictionary *dic = [[NSMutableDictionary alloc] init];
        [dic setValue:module forKey:@"module"];
        [dic setValue:errorMessage forKey:@"errorMessage"];
        errorCallback(@[dic]);
    }
}

- (void) userActions:(NSNotification *)notif {
    NSDictionary *eventName = (id)notif.userInfo;
    if (eventName!=nil) {
        NSMutableDictionary *dic = [[NSMutableDictionary alloc] init];
        FreshchatEvent *event = eventName[@"event"];
        NSString *eventName = [event getEventName];
        
        [dic setValue:eventName forKey:@"event_name"];
        
        if (event.properties) {
            [dic setValue:event.properties forKey:@"properties"];
        }
        // Token status not exposed in iOS yet
        [self sendEventWithName:FRESHCHAT_EVENTS body:dic];
    }
}

- (void) onNotificationClicked :(NSString *) url {
    NSMutableDictionary *dic = [[NSMutableDictionary alloc] init];
    [dic setValue:url forKey:@"url"];
    [self sendEventWithName:FRESHCHAT_ACTION_NOTIFICATION_CLICK_LISTENER body:dic];
}

- (UIViewController*) topMostController {
    UIViewController *topController = [UIApplication sharedApplication].keyWindow.rootViewController;
    
    while (topController.presentedViewController) {
        topController = topController.presentedViewController;
    }
    
    return topController;
}

- (void) jwtTokenRefreshEventTriggered:(NSNotification *) notification {
    NSLog(@"jwtTokenRefreshEventTriggered triggered");
    [self sendEventWithName:FRESHCHAT_SET_TOKEN_TO_REFRESH_DEVICE_PROPERTIES body:nil];
}

@end
