import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { ListChecklistItemsQuery } from "~/generated/graphql";
import { Checkbox } from "@sun/components";
import Icon from "~/components/icon";
import styles from "./create-template-form.module.css";
import { CardBody } from "@sun/components";
import { Card } from "@sun/components";

const ICON_SIZE = 16;

type ItemPickerProps = {
  selected: Set<string>;
  setItem: (id: string, value: boolean) => void;
};

/**
 * Lists every checklist item with a checkbox + icon.
 */
const ItemPicker = ({ selected, setItem }: ItemPickerProps) => {
  const { t } = useTranslation("templates");
  const { data } = getPageData<
    ListChecklistItemsQuery["checklistQueries"]["items"]
  >("checklistItems", "checklist");
  const items = data?.items ?? [];
  const [drag, setDrag] = useState<{ active: boolean; target: boolean } | null>(
    null,
  );

  useEffect(() => {
    const end = () => setDrag(null);
    window.addEventListener("mouseup", end);
    return () => window.removeEventListener("mouseup", end);
  }, []);

  const onRowMouseDown = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const target = !selected.has(id);
    setDrag({ active: true, target });
    setItem(id, target);
  };

  const onRowMouseEnter = (id: string) => () => {
    if (drag?.active) {
      setItem(id, drag.target);
    }
  };

  if (items.length === 0) {
    return <p className={styles.no_picker_items}>{t("no-picker-items")}</p>;
  }

  return (
    <Card className={styles.picker}>
      <CardBody>
        {items.map((item) => (
          <div
            key={item.id}
            className={styles.picker_row}
            onMouseDown={onRowMouseDown(item.id)}
            onMouseEnter={onRowMouseEnter(item.id)}
          >
            <Checkbox checked={selected.has(item.id)} readOnly />
            <Icon
              name={item.icon}
              className={styles.picker_icon}
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
            <span className={styles.picker_name}>{item.name}</span>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export default ItemPicker;
