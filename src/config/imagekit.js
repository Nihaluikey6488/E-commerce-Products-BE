import dotenv from "dotenv";
dotenv.config();

import ImageKit from "imagekit";

/**
 * Initialize ImageKit instance using credentials from environment variables
 * This instance will be used to upload files to ImageKit CDN
 */
const storageInstance = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
});

/**
 * Uploads a file to ImageKit cloud storage
 *
 * @param {Buffer | String} file - The file data (Buffer or base64 string depending on usage)
 * @param {String} fileName - Name to assign to the uploaded file
 * @returns {Promise<Object>} - Response from ImageKit after upload
 */
const sendFilesToImageKit = async (file, fileName) => {
  // Options required by ImageKit for uploading file
  let options = {
    file, // actual file content
    fileName, // name of the file in ImageKit
    folder: "e-commerce-products", // folder where file will be stored
  };

  // Upload file to ImageKit and return response
  return await storageInstance.upload(options);
};

export default sendFilesToImageKit;