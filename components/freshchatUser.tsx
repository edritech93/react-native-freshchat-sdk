class FreshchatUser {
  email: string | null = null;
  firstName: string | null = null;
  lastName: string | null = null;
  phone: string | null = null;
  phoneCountryCode: string | null = null;

  private static instance: FreshchatUser = new FreshchatUser();

  private constructor() {
    Object.preventExtensions(this);
  }

  public static getInstance(): FreshchatUser {
    return FreshchatUser.instance;
  }
}

export default FreshchatUser;
