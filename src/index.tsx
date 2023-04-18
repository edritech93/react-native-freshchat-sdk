import ConversationOptions from "../components/conversationOptions";
import { NativeModules, Platform } from "react-native";
import type { ConversationOptionsType } from "types/ConversatioOptionsType";
import { setUserInfo, resetUserInfo } from "../components/freshchatJSWrapper";
import FreshchatNotificationConfig, {
  NotificationPriority,
} from "../components/freshchatNotificationConfig";
import type { FaqOptionsType } from "types/FaqOptionsType";
import FaqOptions from "../components/faqOptions";
const LINKING_ERROR =
  `The package 'react-native-freshchat-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: "" }) +
  "- You rebuilt the app after installing the package\n" +
  "- You are not using Expo Go\n";

const { RNFreshchatSdk } = NativeModules;
export function createConversationOptions({
  tags,
  filteredViewTitle,
}: ConversationOptionsType): ConversationOptions {
  return new ConversationOptions(tags, filteredViewTitle);
}

export const init = (freshchatConfig) => RNFreshchatSdk.init(freshchatConfig);

export function setUser(user, errorCallback) {
  console.log("rn===>", RNFreshchatSdk);
  RNFreshchatSdk.setUser(user, errorCallback);
}

export function resetUser() {
  RNFreshchatSdk.resetUser();
}

// export function createFaqOptions({
//   showFaqCategoriesAsGrid = true,
//   showContactUsOnFaqScreens = true,
//   showContactUsOnAppBar = false,
//   showContactUsOnFaqNotHelpful = true,
//   tags = null,
//   contactusFilterTags = null,
//   contactusFilterTitle = null,
//   filteredViewTitle = null,
//   filterType = null,
// }: FaqOptionsType): FaqOptions {
//   const faqOptions = new FaqOptions();
//   faqOptions.showFaqCategoriesAsGrid = showFaqCategoriesAsGrid;
//   faqOptions.showContactUsOnFaqScreens = showContactUsOnFaqScreens;
//   faqOptions.showContactUsOnAppBar = showContactUsOnAppBar;
//   faqOptions.showContactUsOnFaqNotHelpful = showContactUsOnFaqNotHelpful;
//   faqOptions.tags = tags;
//   faqOptions.contactusFilterTags = contactusFilterTags;
//   faqOptions.contactusFilterTitle = contactusFilterTitle;
//   faqOptions.filteredViewTitle = filteredViewTitle;
//   faqOptions.filterType = filterType;
//   return faqOptions;
// }
