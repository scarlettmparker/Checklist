import { executeMutation } from "@sun/ssr";
import type {
  AttachChecklistObjectResponse,
  CreateGalleryItemResponse,
  DeleteFileResponse,
  DetachObjectResponse,
  GalleryItem,
  GetPresignedUploadUrlResponse,
} from "~/generated/graphql";

const GALLERY_BUCKET = "gallery";

/**
 * Sanitises a filename for use in an S3 key (strips path separators and
 * unsafe characters, keeps the extension).
 */
function sanitizeFileName(name: string): string {
  const base = name.split("/").pop() ?? name;
  return base.replace(/[^a-zA-Z0-9._-]/g, "_");
}

/**
 * Requests a presigned PUT URL for uploading an image to the gallery bucket
 * under checklist/checklist-entries/{entryId}/{file}. The browser PUTs the
 * file to the returned URL between this and confirmImageUpload.
 */
export async function requestImageUpload(
  entryId: string,
  file: { name: string; type: string },
): Promise<{ url: string; key: string }> {
  const key = `checklist/checklist-entries/${entryId}/${sanitizeFileName(file.name)}`;
  const response = await executeMutation<GetPresignedUploadUrlResponse>(
    "filestore/get-presigned-upload-url",
    {
      bucket: GALLERY_BUCKET,
      key,
      contentType: file.type,
    },
  );

  return { url: response.url, key };
}

/**
 * Requests presigned PUT URLs for multiple files in parallel.
 */
export async function requestImageUploads(
  entryId: string,
  files: { name: string; type: string }[],
): Promise<{ url: string; key: string }[]> {
  return Promise.all(
    files.map(async (file) => {
      const key = `checklist/checklist-entries/${entryId}/${sanitizeFileName(file.name)}`;
      const response = await executeMutation<GetPresignedUploadUrlResponse>(
        "filestore/get-presigned-upload-url",
        {
          bucket: GALLERY_BUCKET,
          key,
          contentType: file.type,
        },
      );
      return { url: response.url, key };
    }),
  );
}

/**
 * After the browser has PUT the file, wraps it in a Cerberus GalleryItem and
 * attaches that item to the entry's detail.
 */
export async function confirmImageUpload(
  entryId: string,
  key: string,
  title: string,
): Promise<{ item: GalleryItem; attach: AttachChecklistObjectResponse }> {
  const createResult = await executeMutation<CreateGalleryItemResponse>(
    "gallery/create",
    {
      title,
      imagePath: key,
    },
  );

  const attach = await executeMutation<AttachChecklistObjectResponse>(
    "checklist/attachObject",
    {
      source: entryId,
      target: createResult.item.id,
      ownerType: "ENTRY",
    },
  );

  return { item: createResult.item, attach };
}

/**
 * Detaches a gallery item from an entry (breaks the remote-object link).
 */
export async function detachImage(
  entryId: string,
  galleryItemId: string,
): Promise<DetachObjectResponse> {
  return executeMutation<DetachObjectResponse>("checklist/detachObject", {
    source: entryId,
    target: galleryItemId,
    ownerType: "ENTRY",
  });
}

/**
 * Deletes a file from the gallery bucket.
 */
export async function deleteImageFile(
  imagePath: string,
): Promise<DeleteFileResponse> {
  return executeMutation<DeleteFileResponse>("filestore/deleteFile", {
    bucket: GALLERY_BUCKET,
    key: imagePath,
  });
}
