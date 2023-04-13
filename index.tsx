import FreshchatConfig from "react-native-freshchat-sdk/components/freshchatConfig";
import FaqOptions from "react-native-freshchat-sdk/components/faqOptions";
import ConversationOptions from "react-native-freshchat-sdk/components/conversationOptions";
import FreshchatUser from "react-native-freshchat-sdk/components/freshchatUser";
import FreshchatMessage from "react-native-freshchat-sdk/components/freshchatMessage";
import FreshchatNotificationConfig from "react-native-freshchat-sdk/components/freshchatNotificationConfig";
import FreshchatJSWrapper from "react-native-freshchat-sdk/components/freshchatJSWrapper";

const FreshchatComponents = {
  Freshchat: FreshchatJSWrapper,
  FreshchatConfig,
  FaqOptions,
  ConversationOptions,
  FreshchatUser,
  FreshchatMessage,
  FreshchatNotificationConfig,
};

export default FreshchatComponents;
