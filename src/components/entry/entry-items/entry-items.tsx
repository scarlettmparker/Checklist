import EntryChecklist from "~/components/entry/entry-checklist";

type EntryItemsProps = {
  /**
   * The entry id.
   */
  id: string;
};

/**
 * Renders the interactive checklist for an entry.
 */
const EntryItems = ({ id }: EntryItemsProps) => {
  return <EntryChecklist entryId={id} />;
};

export default EntryItems;
