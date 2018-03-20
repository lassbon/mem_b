/**
 * azureBlob
 *
 * @description :: Azure Blob Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

var azure = require('azure-storage');

var randomString = require("randomstring");

var blobSvc = azure.createBlobService(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY);

// Upload blob from a container
module.exports.upload = (container, text, callback) => {

    if (container && text) {
        const blob = randomString.generate();

        blobSvc.createBlockBlobFromText(container, blob, text, (error, result, response) => {
            
            if (!error) {
                if (typeof callback === "function") {
                    const url = blobSvc.getUrl(container, blob);
                    callback(url);
                }
            } else {
                if (typeof callback === "function") {
                    callback(error);
                }
            }
        });
    }
};

// Delete blob from a container
module.exports.delete = (container, blob) => {

    if (container && blob) {
        blobSvc.deleteBlob(container, blob, (error, response) => {
            if (!error) {
                return true;
            } 
        });
    }
};

// Create a container if not exist
var access = { publicAccessLevel: 'blob' };
module.exports.createContainerIfNotExists = (container, callback) => {

    if (container) {
        blobSvc.createContainerIfNotExists(container, access, (error, result, response) => {
            if (!error) {
                if (typeof callback === "function") {
                    callback(true);
                }
            } else {
                if (typeof callback === "function") {
                    callback(error);
                }
            }
        });
    }
};