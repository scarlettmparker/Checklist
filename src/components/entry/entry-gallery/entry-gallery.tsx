import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePageData } from "@sun/ssr/react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Figure,
} from "@sun/components";
import { CameraIcon } from "@heroicons/react/24/outline";
import Carousel from "~/components/shared/carousel";
import {
  requestImageUploads,
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
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    setUploadError(null);
    try {
      const presigned = await requestImageUploads(entryId, files);
      await Promise.all(
        presigned.map(async ({ url, key }, i) => {
          const res = await fetch(url, {
            method: "PUT",
            body: files[i],
            headers: { "Content-Type": files[i].type },
          });
          if (!res.ok) {
            throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
          }
          await confirmImageUpload(entryId, key, files[i].name);
        }),
      );
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
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
          multiple
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
          <CameraIcon width={16} height={16} className={styles.icon} />
          {uploading ? t("uploading-image") : t("upload-image")}
        </Button>
      </CardBody>
    </Card>
  );
};

export default EntryGallery;
