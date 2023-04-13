class FreshchatMessage {
  public tag: string | null = null;
  public message: string | null = null;

  constructor() {
    Object.preventExtensions(this);
  }
}

export default FreshchatMessage;
