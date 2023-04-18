export default class ConversationOptions {
  constructor(
    public tags: string[] | null,
    public filteredViewTitle: string | null
  ) {
    Object.preventExtensions(this);
  }
}
