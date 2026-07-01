import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { ListChecklistItemsQuery } from "~/generated/graphql";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@sun/components";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Icon from "~/components/icon";
import styles from "./item-list.module.css";

type ItemListProps = {
  /**
   * Route pattern used by getPageData.
   */
  pattern: string;
};

/**
 * Displays checklist items in a card list with edit dropdown and double-click.
 */
const ItemList = ({ pattern }: ItemListProps) => {
  const { t } = useTranslation("items");
  const navigate = useNavigate();
  const { data } = getPageData<
    ListChecklistItemsQuery["checklistQueries"]["items"]
  >("checklistItems", pattern);
  const items = data?.items ?? [];

  const handleDoubleClick = (id: string) => {
    navigate(`/items/${id}/edit`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("items-title")}</CardTitle>
      </CardHeader>
      <CardBody className={styles.list_body}>
        {items.length === 0 ? (
          <p className={styles.no_items}>{t("no-items-found")}</p>
        ) : (
          items.map((item) => (
            <Link
              key={item.id}
              to={`/items/${item.id}`}
              className={styles.item_link}
            >
              <Button
                variant="secondary"
                className={styles.item_button}
                onDoubleClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  handleDoubleClick(item.id);
                }}
              >
                <Icon
                  name={item.icon}
                  className={styles.item_icon}
                  width={16}
                  height={16}
                />
                <span className={styles.item_name}>{item.name}</span>
                <span className={styles.item_actions}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <EllipsisVerticalIcon
                        width={16}
                        height={16}
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => navigate(`/items/${item.id}/edit`)}
                      >
                        <PencilSquareIcon width={16} height={16} />
                        {t("edit-label")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </span>
              </Button>
            </Link>
          ))
        )}
      </CardBody>
      <CardFooter>{t("items-count", { count: items.length })}</CardFooter>
    </Card>
  );
};

export default ItemList;
