import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePageData } from "@sun/ssr/react";
import { Button, Card, CardBody, CardHeader, CardTitle, Figure } from "@sun/components";
import { PlusIcon } from "@heroicons/react/24/outline";
import Carousel from "~/components/shared/carousel";
import {
  requestImageUpload,
  confirmImageUpload,
} from "~/server/actions/gallery";
import { GalleryItem } from "~/generated/graphql";
import styles from "./entry-gallery.module.css";

type EntryGalleryProps = {
  entryId: string;
};

const GALLERY_PAGE_SIZE = 2;

/**
 * Gallery for an entry: displays attached images in a carousel and other
 * remote objects as a list, plus an upload control.
 */
const EntryGallery = ({ entryId }: EntryGalleryProps) => {
  const { t } = useTranslation("entry");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: galleryItems } = usePageData<GalleryItem[]>(
    "galleryItems",
    "entry/:id",
    { id: entryId },
  );
  const items: GalleryItem[] = galleryItems ?? [];

  const images = items.filter((i: GalleryItem) => i.imagePath);
  const others = items.filter((i: GalleryItem) => !i.imagePath);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      const { url, key } = await requestImageUpload(entryId, {
        name: file.name,
        type: file.type,
      });
      const res = await fetch(url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      if (!res.ok) {
        throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
      }
      await confirmImageUpload(entryId, key, file.name);
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Upload failed",
      );
    }
    setUploading(false);
    e.target.value = "";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("gallery")}</CardTitle>
      </CardHeader>
      <CardBody className={styles.body}>
        {images.length > 0 ? (
          <Carousel pageSize={GALLERY_PAGE_SIZE}>
            {images.map((item) => (
              <Figure
                key={item.id}
                src={`/gallery?key=${encodeURIComponent(item.imagePath!)}`}
                alt={item.title}
                className={styles.figure}
              />
            ))}
          </Carousel>
        ) : (
          !others.length && <p className={styles.empty}>{t("no-images")}</p>
        )}

        {others.length > 0 && (
          <ul className={styles.list}>
            {others.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong>
                {item.description && <span> — {item.description}</span>}
              </li>
            ))}
          </ul>
        )}

        {uploadError && <p className={styles.error}>{uploadError}</p>}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className={styles.file_input}
        />
        <Button
          variant="secondary"
          className={styles.upload_button}
          disabled={uploading}
          title={t("upload-image")}
          onClick={() => fileInputRef.current?.click()}
        >
          <PlusIcon width={16} height={16} />
          {uploading ? t("uploading-image") : t("upload-image")}
        </Button>
      </CardBody>
    </Card>
  );
};

export default EntryGallery;
