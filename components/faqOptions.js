const {NativeModules} = require('react-native');
const {RNFreshchatSdk} = NativeModules;

const FilterType = {
    "CATEGORY": RNFreshchatSdk.FilterType.CATEGORY,
    "ARTICLE": RNFreshchatSdk.FilterType.ARTICLE
};

class FaqOptions {

    constructor() {
        this.showFaqCategoriesAsGrid = true;
        this.showContactUsOnFaqScreens = true;
        this.showContactUsOnAppBar = false;
        this.showContactUsOnFaqNotHelpful = true;

        this.tags = null; //TODO: How can we force this to be an array always
        this.contactusFilterTags = null; //TODO: How can we force this to be an array always

        this.contactusFilterTitle = null;
        this.filteredViewTitle = null;
        this.filterType = null; //TODO: How to force enum type

        Object.preventExtensions(this);
    }

    static get FilterType() {
        return FilterType;
    }
}

export default FaqOptions;
