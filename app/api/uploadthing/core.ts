import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    trainingImageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("training image uploaded", file);
    }),
  categoryImageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("file uploaded", file);
    }),

       subcategoryImageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("file uploaded", file);
    }),

  bannerImageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("banner uploaded", file);
    }),

   farmerProfileUploader: f({ image: { maxFileSize: "2MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("file uploaded", file);
    }),
   
      marketLogoUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("file uploaded", file);
    }),
     multipleProductsUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 5 } })
    .onUploadComplete(async ({ file }) => {
      console.log("Upload complete for product:", file);
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
