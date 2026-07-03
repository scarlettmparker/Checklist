import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Checkbox,
} from "@sun/components";
import { RectangleStackIcon } from "@heroicons/react/24/outline";
import Icon from "~/components/shared/icon";
import { createEntryFromTemplates } from "~/server/actions/checklist-entry";
import styles from "./compose-from-templates.module.css";

type ComposeTemplateItem = {
  itemId: string;
  name?: string | null;
  icon?: string | null;
  position: number;
};

type ComposeData = {
  templates: { id: string; name: string; description?: string | null }[];
  templateItems: Record<string, ComposeTemplateItem[]>;
};

type ComposeFromTemplatesProps = {
  /**
   * Route pattern used by getPageData.
   */
  pattern: string;
};

const ICON_SIZE = 16;

/**
 * Multi-select template composer. Selected templates' items are merged
 * (de-duplicated by item id) into a preview, and "Create checklist" composes a
 * new entry from them.
 */
const ComposeFromTemplates = ({ pattern }: ComposeFromTemplatesProps) => {
  const { t } = useTranslation("entry");
  const { data } = getPageData<ComposeData>("composeData", pattern);
  const templates = data?.templates ?? [];
  const templateItems = data?.templateItems ?? {};
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [creating, setCreating] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const preview = (() => {
    const seen = new Set<string>();
    const merged: ComposeTemplateItem[] = [];
    for (const templateId of selected) {
      for (const item of templateItems[templateId] ?? []) {
        if (seen.has(item.itemId)) {
          continue;
        }
        seen.add(item.itemId);
        merged.push(item);
      }
    }
    return merged;
  })();

  return (
    <div className={styles.container}>
      <div className={styles.selector}>
        {templates.map((template) => (
          <div key={template.id} className={styles.row}>
            <Checkbox
              checked={selected.has(template.id)}
              onChange={() => toggle(template.id)}
              className={styles.label_wrapper}
              label={
                <div className={styles.label}>
                  <RectangleStackIcon
                    className={styles.icon}
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                  />
                  <span className={styles.name}>{template.name}</span>
                </div>
              }
            />
          </div>
        ))}
        <p>{t("templates-count", { count: templates.length })}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("compose-preview")}</CardTitle>
        </CardHeader>
        <CardBody className={styles.preview_body}>
          {preview.length === 0 ? (
            <p className={styles.empty}>{t("compose-no-items")}</p>
          ) : (
            <>
              <p>{t("compose-items-count", { count: preview.length })}</p>
              {preview.map((item) => (
                <div key={item.itemId} className={styles.preview_row}>
                  <Icon
                    name={item.icon}
                    className={styles.preview_icon}
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                  />
                  <span className={styles.preview_name}>{item.name}</span>
                </div>
              ))}
            </>
          )}
        </CardBody>
      </Card>

      <Button
        className={styles.submit}
        disabled={selected.size === 0 || creating}
        title={creating ? t("compose-composing") : t("compose-submit")}
        onClick={() => {
          setCreating(true);
          createEntryFromTemplates([...selected]);
        }}
      >
        {creating ? t("compose-composing") : t("compose-submit")}
      </Button>
    </div>
  );
};

export default ComposeFromTemplates;
