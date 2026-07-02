import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { ListChecklistItemsQuery } from "~/generated/graphql";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
  Pagination,
} from "@sun/components";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Icon from "~/components/shared/icon";
import styles from "./item-list.module.css";

type ItemListProps = {
  /**
   * Route pattern used by getPageData.
   */
  pattern: string;
} & React.PropsWithChildren;

/**
 * Displays checklist items in a card list with edit dropdown and double-click.
 */
const ItemList = ({ pattern, children }: ItemListProps) => {
  const { t } = useTranslation("items");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const { data } = getPageData<
    ListChecklistItemsQuery["checklistQueries"]["items"]
  >("checklistItems", pattern, { page: String(page) });
  const items = data?.items ?? [];
  const pageInfo = data?.pageInfo;

  const handleDoubleClick = (id: string) => {
    navigate(`/items/${id}/edit`);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className={styles.title}>
            {t("items-title")}
            {children}
          </CardTitle>
        </CardHeader>
        <CardBody className={styles.list_body}>
          {items.length === 0 ? (
            <p className={styles.no_items}>{t("no-items-found")}</p>
          ) : (
            items.map((item) => (
              <Link
                key={item.id}
                to={{ pathname: `/items/${item.id}`, search: searchParams.toString() }}
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
        <CardFooter className={styles.footer}>
          <span>
            {t("items-count", { count: pageInfo?.totalCount ?? items.length })}
          </span>
        </CardFooter>
      </Card>
      {pageInfo && (
        <Pagination
          className={styles.pagination}
          page={pageInfo.page + 1}
          totalPages={pageInfo.totalPages}
          onPageChange={(next: number) => {
            const params = new URLSearchParams(searchParams);
            params.set("page", String(next));
            setSearchParams(params);
          }}
        />
      )}
    </>
  );
};

export default ItemList;
