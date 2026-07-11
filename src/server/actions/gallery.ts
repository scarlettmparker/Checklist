import { executeMutation, MutationResult } from "@sun/ssr";

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
  const result = await executeMutation("filestore/get-presigned-upload-url", {
    bucket: GALLERY_BUCKET,
    key,
    contentType: file.type,
  });

  if (result.__typename !== "QuerySuccess" || !result.id) {
    throw new Error(
      (result.__typename === "StandardError" && result.message) ||
        "Failed to get upload URL",
    );
  }

  return { url: result.id, key };
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
      const result = await executeMutation("filestore/get-presigned-upload-url", {
        bucket: GALLERY_BUCKET,
        key,
        contentType: file.type,
      });
      if (result.__typename !== "QuerySuccess" || !result.id) {
        throw new Error(
          (result.__typename === "StandardError" && result.message) ||
            "Failed to get upload URL",
        );
      }
      return { url: result.id, key };
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
): Promise<MutationResult> {
  const createResult = await executeMutation("gallery/create", {
    title,
    imagePath: key,
  });

  if (createResult.__typename !== "QuerySuccess" || !createResult.id) {
    return createResult;
  }

  return executeMutation("checklist/attachObject", {
    source: entryId,
    target: createResult.id,
    ownerType: "ENTRY",
  });
}
