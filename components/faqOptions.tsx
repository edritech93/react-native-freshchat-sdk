import { NativeModules } from "react-native";

interface RNFreshchatSdk {
  FilterType: {
    CATEGORY: string;
    ARTICLE: string;
  };
}

const { RNFreshchatSdk } = NativeModules;

const FilterType = {
  CATEGORY: RNFreshchatSdk.FilterType.CATEGORY,
  ARTICLE: RNFreshchatSdk.FilterType.ARTICLE,
};

class FaqOptions {
  public showFaqCategoriesAsGrid: boolean = true;
  public showContactUsOnFaqScreens: boolean = true;
  public showContactUsOnAppBar: boolean = false;
  public showContactUsOnFaqNotHelpful: boolean = true;
  public tags: string[] | null = null;
  public contactusFilterTags: string[] | null = null;
  public contactusFilterTitle: string | null = null;
  public filteredViewTitle: string | null = null;
  public filterType: string | null = null;

  public static get FilterType() {
    return FilterType;
  }

  constructor() {
    Object.preventExtensions(this);
  }
}

export default FaqOptions;
