interface ConversationOptionsProps {
  tags: string[] | null;
  filteredViewTitle: string | null;
}

class ConversationOptions {
  constructor(
    public tags: string[] | null,
    public filteredViewTitle: string | null
  ) {
    Object.preventExtensions(this);
  }
}

export default ConversationOptions;
