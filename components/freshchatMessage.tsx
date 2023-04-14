class FreshchatMessage {
  tag: string | null = null;
  message: string | null = null;

  constructor() {
    Object.seal(this);
  }
}

export default FreshchatMessage;
