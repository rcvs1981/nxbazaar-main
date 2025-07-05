import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  categoryImageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("file uploaded", file);
    }),

  bannerImageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("banner uploaded", file);
    }),

   farmerProfileUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("file uploaded", file);
    }),
  // more routes...
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
