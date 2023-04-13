interface ConversationOptionsProps {
  tags: string[] | null;
  filteredViewTitle: string | null;
}

class ConversationOptions {
  public tags: string[] | null;
  public filteredViewTitle: string | null;

  constructor(props: ConversationOptionsProps) {
    this.tags = props.tags;
    this.filteredViewTitle = props.filteredViewTitle;

    Object.preventExtensions(this);
  }
}

export default ConversationOptions;
