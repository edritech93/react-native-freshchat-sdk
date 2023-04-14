import ConversationOptions from "../../components/conversationOptions";
import FaqOptions from "../../components/faqOptions";
import FreshchatMessage from "../../components/freshchatMessage";
import FreshchatConfig from "../../components/freshchatConfig";
import FreshchatUser from "../../components/freshchatUser";

//error
import FreshchatNotificationConfig, {
  NotificationPriority,
  NotificationImportance,
} from "../../components/freshchatNotificationConfig";

// FreshchatMessage tes params pass
// describe("FreshchatMessage", () => {
//   it("should set tag and message properties correctly", () => {
//     const freshchatMessage = new FreshchatMessage();
//     freshchatMessage.tag = "TestTag";
//     freshchatMessage.message = "TestMessage";

//     expect(freshchatMessage.tag).toEqual("TestTag");
//     expect(freshchatMessage.message).toEqual("TestMessage");
//   });
// });

// ConversationOptions test params pass
// describe("ConversationOptions", () => {
//   it("should set tags and filteredViewTitle properties correctly", () => {
//     const props = {
//       tags: ["tag1", "tag2"],
//       filteredViewTitle: "Filtered View Title",
//     };
//     const conversationOptions = new ConversationOptions(props);
//     expect(conversationOptions.tags).toEqual(props.tags);
//     expect(conversationOptions.filteredViewTitle).toEqual(
//       props.filteredViewTitle
//     );
//   });
// });

// FaqOptions test params fail
// describe("FaqOptions", () => {
//   it("should have default values", () => {
//     const faqOptions = new FaqOptions();

//     expect(faqOptions.showFaqCategoriesAsGrid).toBe(true);
//     expect(faqOptions.showContactUsOnFaqScreens).toBe(true);
//     expect(faqOptions.showContactUsOnAppBar).toBe(false);
//     expect(faqOptions.showContactUsOnFaqNotHelpful).toBe(true);
//     expect(faqOptions.tags).toBe(null);
//     expect(faqOptions.contactusFilterTags).toBe(null);
//     expect(faqOptions.contactusFilterTitle).toBe(null);
//     expect(faqOptions.filteredViewTitle).toBe(null);
//     expect(faqOptions.filterType).toBe(null);
//   });

//   it("should return the correct filter types", () => {
//     expect(FaqOptions.FilterType.CATEGORY).toBe("category");
//     expect(FaqOptions.FilterType.ARTICLE).toBe("article");
//   });
// });

//freshchatConfig test pass
// describe("FreshchatConfig", () => {
//   it("should create a new instance of FreshchatConfig with the provided appId and appKey", () => {
//     const appId = "my-app-id";
//     const appKey = "my-app-key";
//     const config = new FreshchatConfig(appId, appKey);

//     expect(config.appId).toEqual(appId);
//     expect(config.appKey).toEqual(appKey);
//   });

// it("should prevent extending the instance of FreshchatConfig", () => {
//   const config = new FreshchatConfig("my-app-id", "my-app-key");

// expect(() => {
//   config.newProp = "new-value";
// }).toThrowError(TypeError);
// });

//   it("should set default values for optional properties", () => {
//     const config = new FreshchatConfig("my-app-id", "my-app-key");

//     expect(config.domain).toBeNull();
//     expect(config.themeName).toBeNull();
//     expect(config.stringsBundle).toBeNull();
//     expect(config.teamMemberInfoVisible).toBeTruthy();
//     expect(config.cameraCaptureEnabled).toBeTruthy();
//     expect(config.gallerySelectionEnabled).toBeTruthy();
//     expect(config.fileSelectionEnabled).toBeTruthy();
//     expect(config.responseExpectationEnabled).toBeTruthy();
//     expect(config.errorLogsEnabled).toBeTruthy();
//     expect(config.showNotificationBanner).toBeTruthy();
//     expect(config.notificationSoundEnabled).toBeTruthy();
//   });
// });

//FreshchatUser test pass
describe("FreshchatUser", () => {
  describe("getInstance", () => {
    it("should return the same instance", () => {
      const instance1 = FreshchatUser.getInstance();
      const instance2 = FreshchatUser.getInstance();
      expect(instance1).toBe(instance2);
    });
  });
});

describe("FreshchatNotificationConfig", () => {
  it("should create a new instance of FreshchatNotificationConfig", () => {
    const config = new FreshchatNotificationConfig();

    expect(config).toBeDefined();
    expect(config).toBeInstanceOf(FreshchatNotificationConfig);
  });

  it("should not allow adding new properties to the instance", () => {
    const config = new FreshchatNotificationConfig();
    expect(() => {
      config.newProp = "new value";
    }).toThrow();
  });

  it("should return NotificationPriority object", () => {
    const priority = FreshchatNotificationConfig.getNotificationPriority();
    expect(priority).toBeDefined();
    expect(priority.PRIORITY_DEFAULT).toBe(
      NotificationPriority.PRIORITY_DEFAULT
    );
  });

  it("should return NotificationImportance object", () => {
    const importance = FreshchatNotificationConfig.getNotificationImportance();
    expect(importance).toBeDefined();
    expect(importance.DEFAULT).toBe(NotificationImportance.DEFAULT);
  });
});
