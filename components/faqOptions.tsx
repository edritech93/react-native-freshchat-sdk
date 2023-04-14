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
  showFaqCategoriesAsGrid: boolean = true;
  showContactUsOnFaqScreens: boolean = true;
  showContactUsOnAppBar: boolean = false;
  showContactUsOnFaqNotHelpful: boolean = true;
  tags: string[] | null = null;
  contactusFilterTags: string[] | null = null;
  contactusFilterTitle: string | null = null;
  filteredViewTitle: string | null = null;
  filterType: string | null = null;

  constructor() {
    Object.preventExtensions(this);
  }

  static get FilterType() {
    return FilterType;
  }
}

export default FaqOptions;
