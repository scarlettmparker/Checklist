import { Suspense } from "react";
import { Link, useLocation, useOutlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@sun/components";
import { PlusIcon } from "@heroicons/react/24/outline";
import TemplateList from "~/components/templates/template-list";
import TemplateDetailPlaceholder from "~/components/templates/template-detail-placeholder";
import {
  TemplatesPageSkeleton,
  TemplateDetailsPageSkeleton,
} from "~/components/templates/skeletons";
import styles from "./templates-page.module.css";

const TemplatesPage = () => {
  const { t } = useTranslation("templates");
  const outlet = useOutlet();
  const location = useLocation();
  const ICON_SIZE = 16;

  return (
    <Suspense fallback={<TemplatesPageSkeleton />}>
      <div className={styles.templates_layout}>
        <div className={styles.templates_list_panel}>
          <TemplateList pattern="templates" />
        </div>
        <div className={styles.templates_detail_panel}>
          <Suspense fallback={<TemplateDetailsPageSkeleton />}>
            {outlet ?? <TemplateDetailPlaceholder />}
          </Suspense>
          <Link
            to={`/templates/create?from=${encodeURIComponent(location.pathname)}`}
            className={styles.create_template_button}
          >
            <Button title={t("create-new-template-label")}>
              <PlusIcon
                className={styles.create_template_icon}
                width={ICON_SIZE}
                height={ICON_SIZE}
              />
              <p>{t("create-new-template-label")}</p>
            </Button>
          </Link>
        </div>
      </div>
    </Suspense>
  );
};

export default TemplatesPage;
