class FreshchatUser {

    // TODO: Can we do something link FreshchatUser.getInstance() instead of a constructor that return a new object
    constructor() {
        this.email = null;
        this.firstName = null;
        this.lastName = null;
        this.phone = null;
        this.phoneCountryCode = null;

        Object.preventExtensions(this);
    }
}

export default FreshchatUser;
