class FreshchatUser {
  public email: string | null = null;
  public firstName: string | null = null;
  public lastName: string | null = null;
  public phone: string | null = null;
  public phoneCountryCode: string | null = null;

  private static instance: FreshchatUser = new FreshchatUser();

  private constructor() {
    Object.preventExtensions(this);
  }

  public static getInstance(): FreshchatUser {
    return FreshchatUser.instance;
  }
}

export default FreshchatUser;
