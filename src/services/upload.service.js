const sharp = require("sharp");
const { v4: uuid } = require("uuid");
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const r2 = require("../config/r2");

async function uploadImage(file, folder = "images") {
  const filename = `${uuid()}.webp`;

  const buffer = await sharp(file.buffer)
    .resize(1200, 1200, {
      fit: "inside",
      withoutEnlargement: true,
    })

    .webp({
      quality: 80,
    })

    .toBuffer();

  const key = `${folder}/${filename}`;

  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,

      Key: key,

      Body: buffer,

      ContentType: "image/webp",
    }),
  );

  return `${process.env.R2_PUBLIC_URL}/${key}`;
}

async function deleteImage(url) {
  if (!url) return;

  const key = url.split(`${process.env.R2_PUBLIC_URL}/`)[1];

  if (!key) return;

  await r2.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET,

      Key: key,
    }),
  );
}

module.exports = {
  uploadImage,
  deleteImage,
};
