/**
 * azureBlob
 *
 * @description :: Azure Blob Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

var azure = require('azure-storage');

var blobSvc = azure.createBlobService(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY);

// Delete blob from a container
module.exports.delete = function(container, blob) {

    if (container && blob) {
        blobSvc.deleteBlob(container, blob, function(error, response) {
            if (!error) {
                return true;
            }
        });
    }
};

// Create a container if not exist

var access = { publicAccessLevel: 'blob' };
module.exports.createContainerIfNotExists = function(container, callback) {

    if (container) {
        blobSvc.createContainerIfNotExists(container, access, function(error, result, response) {
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