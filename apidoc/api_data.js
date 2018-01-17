define({ "api": [
  {
    "type": "put",
    "url": "/api/v1/admin/change/:token",
    "title": "Change admin password",
    "name": "Change",
    "description": "<p>This is where an admin password is changed.</p>",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Admin email token.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>New password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Confirm the new password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Click on the link sent to your email to change your password'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/AdminController.js",
    "groupTitle": "Admin",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AdminTokenNotProvided",
            "description": "<p>No token provided.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No token provided!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/admin",
    "title": "Create a new admin",
    "name": "CreateAdmin",
    "description": "<p>This is where a new admin is created.</p>",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the admin.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email addresse of the admin.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the admin.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Confirm password of the admin.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>First of the admin.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Last name of the admin.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "permission",
            "description": "<p>Permission level of the admin.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"id\": \"59dce9c16b54d91c38847825\",\n  \"role\": \"Admin\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PasswordDoNotmatch",
            "description": "<p>Password do not match.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"Password doesn\\'t match, What a shame!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/AdminController.js",
    "groupTitle": "Admin"
  },
  {
    "type": "delete",
    "url": "/api/v1/admin/:id",
    "title": "Delete a admin",
    "name": "DeleteAdmin",
    "description": "<p>This is where an admin is deleted</p>",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Admin ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Admin with id 59dce9d56b54d91c38847825 has been deleted'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/AdminController.js",
    "groupTitle": "Admin",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AdminIdNotProvided",
            "description": "<p>No admin id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AdminNotFound",
            "description": "<p>The admin was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No admin id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No admin with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/v1/admin/:id",
    "title": "Forgot admin password",
    "name": "Forgot",
    "description": "<p>This is where an admin forgoten password is taken care of.</p>",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Admin email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>Url to the password change page.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Click on the link sent to your email to change your password'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/AdminController.js",
    "groupTitle": "Admin",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AdminEmailNotProvided",
            "description": "<p>No admin email provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AdminNotFound",
            "description": "<p>The admin was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No admin email provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No admin with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/admin/:id",
    "title": "Get admin(s)",
    "name": "GetAdmin_s_",
    "description": "<p>This is where admins are retrieved.</p>",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>admin ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "admin",
            "description": "<p>Admin response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \".........\": \"....................\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/AdminController.js",
    "groupTitle": "Admin",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AdminNotFound",
            "description": "<p>The admin was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No admin with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/v1/admin/:id",
    "title": "Update an admin",
    "name": "UpdateAdmin",
    "description": "<p>This is where an admin is updated</p>",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Admin ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>Password of the admin.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "firstname",
            "description": "<p>First of the admin.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lastname",
            "description": "<p>Last name of the admin.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "permission",
            "description": "<p>Permission level of the admin.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Admin with id 59dce9d56b54d91c38847825 has been updated'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/AdminController.js",
    "groupTitle": "Admin",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AdminIdNotProvided",
            "description": "<p>No admin id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AdminNotFound",
            "description": "<p>The admin was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No admin id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No admin with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/advert",
    "title": "Create a new advert",
    "name": "CreateAdvert",
    "description": "<p>This is where a new advert is created.</p>",
    "group": "Advert",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the advert.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "banner",
            "description": "<p>Cloud Url of Picture banner for the advert.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>URL of the advert.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"id\": \"59dce9c16b54d91c38847825\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AdvertInfoNotComplete",
            "description": "<p>Advert info not complete.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No { title | banner | url | fee} provided!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/AdvertController.js",
    "groupTitle": "Advert"
  },
  {
    "type": "delete",
    "url": "/api/v1/advert/:id",
    "title": "Delete a advert",
    "name": "DeleteAdvert",
    "description": "<p>This is where an advert is deleted</p>",
    "group": "Advert",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Advert Id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Advert with id 59dce9d56b54d91c38847825 has been deleted'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/AdvertController.js",
    "groupTitle": "Advert",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AdvertIdNotProvided",
            "description": "<p>No Advert id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AdvertNotFound",
            "description": "<p>The Advert was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Advert id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Advert with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/advert/:id",
    "title": "Get advert(s)",
    "name": "GetAdvert",
    "description": "<p>This is where adverts are retrieved.</p>",
    "group": "Advert",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Advert id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "advert",
            "description": "<p>Post response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \".........\": \"....................\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/AdvertController.js",
    "groupTitle": "Advert",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AdvertNotFound",
            "description": "<p>The Advert was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Advert with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/v1/advert/:id",
    "title": "Update a advert",
    "name": "UpdateAdvert",
    "description": "<p>This is where a advert is updated.</p>",
    "group": "Advert",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of the advert.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "banner",
            "description": "<p>Cloud Url of Picture banner for the advert.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "url",
            "description": "<p>Url of the advert.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Advert with id 59dce9d56b54d91c38847825 has been updated'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/AdvertController.js",
    "groupTitle": "Advert",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AdvertIdNotProvided",
            "description": "<p>No Advert id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AdvertNotFound",
            "description": "<p>The Advert was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Advert id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Advert with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/advert/upload",
    "title": "Upload a advert banner",
    "name": "UploadBanner",
    "description": "<p>This is where a advert image banner is uploaded (Make sure image file extension is either jpg or png).</p>",
    "group": "Advert",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "banner",
            "description": "<p>Banner image file to be uploaded.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"bannerUrl\": \"https://accicloud.blob.core.windows.net/advert/27ba91b3-ab78-4240-aa6c-a1f32230227c.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AdvertImageNotUploaded",
            "description": "<p>No image uploaded.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No image uploaded!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/AdvertController.js",
    "groupTitle": "Advert"
  },
  {
    "type": "post",
    "url": "/api/v1/approver",
    "title": "Approve a user",
    "name": "Approve",
    "description": "<p>This is where a newly registered user is approved instead of beign rejected by an admin.</p>",
    "group": "Approver",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User id of the the user to be approved.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"User with id 59dce9d56b54d91c38847825 has been approved'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ApproverController.js",
    "groupTitle": "Approver",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIdNotProvided",
            "description": "<p>No User id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No User id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No User with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/social/approver/:id",
    "title": "Get unapproved user(s)",
    "name": "Get",
    "description": "<p>This is where unapproved users are retrieved.</p>",
    "group": "Approver",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>user ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>Post response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \".........\": \"....................\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ApproverController.js",
    "groupTitle": "Approver",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No User with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/v1/approver",
    "title": "Reject a user",
    "name": "Reject",
    "description": "<p>This is where a newly registered user is rejected instead of beign approved by an admin.</p>",
    "group": "Approver",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User id of the the user to be rejected.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "reason",
            "description": "<p>Reason for the user to be rejected.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"User with id 59dce9d56b54d91c38847825 has been rejected'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ApproverController.js",
    "groupTitle": "Approver",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIdNotProvided",
            "description": "<p>No User id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No User id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No User with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/audit/excel",
    "title": "Get audit Excel document",
    "name": "GetExcel",
    "description": "<p>This is where audit records are obtained in excel format.</p>",
    "group": "Audit",
    "version": "0.0.0",
    "filename": "api/controllers/AuditController.js",
    "groupTitle": "Audit"
  },
  {
    "type": "get",
    "url": "/api/v1/audits/:id",
    "title": "Get project(s)",
    "name": "GetAudit",
    "description": "<p>This is where audits are retrieved.</p>",
    "group": "Audits",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "term",
            "description": "<p>Search term.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "field",
            "description": "<p>Search field.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "audits",
            "description": "<p>Response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \".........\": \"....................\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/AuditController.js",
    "groupTitle": "Audits",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuditNotFound",
            "description": "<p>The record was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"err\": 'No audit matched your search term'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/auth/admin",
    "title": "Login a user",
    "name": "Login",
    "description": "<p>This is where a user is logged in, and a token generated and returned.</p>",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>Details of the logged in user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Access token for accessing all parts of the plartform.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"user\": {},\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9rb2xpbGVtdWVsM\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/AuthController.js",
    "groupTitle": "Auth",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PasswordOrUsernameInvalid",
            "description": "<p>Username or password invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PasswordAndUsernameRequired",
            "description": "<p>Username and password required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'username or password invalid.'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'Username and password required.'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/auth/user",
    "title": "Login a user",
    "name": "Login",
    "description": "<p>This is where a user is logged in, and a token generated and returned.</p>",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "email",
            "description": "<p>Username of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>Details of the logged in user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Access token for accessing all parts of the plartform.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"user\": {},\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9rb2xpbGVtdWVsM\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/AuthController.js",
    "groupTitle": "Auth",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PasswordOrEmailInvalid",
            "description": "<p>Email or password invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PasswordAndEmailRequired",
            "description": "<p>Email and password required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'Email or password invalid.'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'Email and password required.'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/donation",
    "title": "Create a new donation",
    "name": "CreateDonation",
    "description": "<p>This is where a new donation is created.</p>",
    "group": "Donation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the donation.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "banner",
            "description": "<p>Cloud Url of Picture banner for the donation.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Full description of the donation.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "minAmount",
            "description": "<p>Minimum amount acceptable as donation.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"id\": \"59dce9c16b54d91c38847825\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DonationInfoNotComplete",
            "description": "<p>Donation info not complete.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No { title | banner | description | minAmount} provided!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/DonationController.js",
    "groupTitle": "Donation"
  },
  {
    "type": "post",
    "url": "/api/v1/donation/payment",
    "title": "Pay for a donation",
    "name": "CreatePayment",
    "description": "<p>This is where a donation payment is created.</p>",
    "group": "Donation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "amount",
            "description": "<p>Amount to be paid for donation.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "donator",
            "description": "<p>User id of the donator.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "donation",
            "description": "<p>donation id of the donation beign paid for.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>State/status of the payment. Must be any of 'pending', 'approved', 'denied', 'free'.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"id\": \"59dce9d56b54d91c38847825\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/DonationController.js",
    "groupTitle": "Donation",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DonationIdNotProvided",
            "description": "<p>No Donation id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DonationNotFound",
            "description": "<p>The Donation was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PayerIdNotProvided",
            "description": "<p>No Payer id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AmountNotProvided",
            "description": "<p>No Amount provided.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Donation id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Donation with such id existing'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Payer id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Amount provided!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/v1/donation/:id",
    "title": "Delete a donation",
    "name": "DeleteDonation",
    "description": "<p>This is where a donation is deleted</p>",
    "group": "Donation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Donation Id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Donation with id 59dce9d56b54d91c38847825 has been deleted'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/DonationController.js",
    "groupTitle": "Donation",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DonationIdNotProvided",
            "description": "<p>No Donation id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DonationNotFound",
            "description": "<p>The Donation was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Donation id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Donation with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/donation/:id",
    "title": "Get donation(s)",
    "name": "GetDonation",
    "description": "<p>This is where donations are retrieved.</p>",
    "group": "Donation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>Donation id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "donation",
            "description": "<p>Post response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \".........\": \"....................\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/DonationController.js",
    "groupTitle": "Donation",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DonationNotFound",
            "description": "<p>The Donation was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Donation with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/donation/:id",
    "title": "Get payment(s)",
    "name": "GetPayment",
    "description": "<p>This is where donation payments are retrieved.</p>",
    "group": "Donation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>Payment id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "payment",
            "description": "<p>Payment response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \".........\": \"....................\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/DonationController.js",
    "groupTitle": "Donation",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PaymentNotFound",
            "description": "<p>The Payment was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Payment with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/v1/donation/:id",
    "title": "Update a donation",
    "name": "UpdateDonation",
    "description": "<p>This is where a donation is updated.</p>",
    "group": "Donation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of the donation.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "banner",
            "description": "<p>Cloud Url of Picture banner for the donation.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Full description of the donation.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "minAmount",
            "description": "<p>Minimum amount acceptable as donation.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Donation with id 59dce9d56b54d91c38847825 has been updated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/DonationController.js",
    "groupTitle": "Donation",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DonationIdNotProvided",
            "description": "<p>No Donation id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DonationNotFound",
            "description": "<p>The Donation was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Donation id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Donation with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/v1/donation/payment/:id",
    "title": "Update a donation payment",
    "name": "UpdatePayment",
    "description": "<p>This is where a donation payment is updated.</p>",
    "group": "Donation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the donation payment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>State/status of the donation payment. Must be any of 'pending', 'approved', 'denied'.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Donation payment with id 59dce9d56b54d91c38847825 has been updated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/DonationController.js",
    "groupTitle": "Donation",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PaymentIdNotProvided",
            "description": "<p>No Payment id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PaymentNotFound",
            "description": "<p>The Payment was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Payment id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Payment with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/donation/upload",
    "title": "Upload a donation banner",
    "name": "UploadBanner",
    "description": "<p>This is where a donation image banner is uploaded (Make sure image file extension is either jpg or png).</p>",
    "group": "Donation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "banner",
            "description": "<p>Banner image file to be uploaded.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"bannerUrl\": \"https://accicloud.blob.core.windows.net/donation/27ba91b3-ab78-4240-aa6c-a1f32230227c.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BannerImageNotUploaded",
            "description": "<p>No image uploaded.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No image uploaded!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/DonationController.js",
    "groupTitle": "Donation"
  },
  {
    "type": "post",
    "url": "/api/v1/events",
    "title": "Create a new event",
    "name": "CreateEvent",
    "description": "<p>This is where a new event is created.</p>",
    "group": "Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the event.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "banner",
            "description": "<p>Cloud Url of Picture banner for the event.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Full description of the event.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "date",
            "description": "<p>Date/Duration of the event.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "venue",
            "description": "<p>Venue of the event.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "fee",
            "description": "<p>Fee for the event.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"id\": \"59dce9c16b54d91c38847825\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EventInfoNotComplete",
            "description": "<p>Event info not complete.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No { title | banner | description | fee} provided!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/EventsController.js",
    "groupTitle": "Event"
  },
  {
    "type": "post",
    "url": "/api/v1/event/payment",
    "title": "Pay for an event",
    "name": "CreatePayment",
    "description": "<p>This is where an event payment is created.</p>",
    "group": "Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "amount",
            "description": "<p>Amount to be paid for event.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "payer",
            "description": "<p>User id of the payer.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "event",
            "description": "<p>Event id of the training beign paid for.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>State/status of the payment. Must be any of 'pending', 'approved', 'denied', 'free'.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"id\": \"59dce9d56b54d91c38847825\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/EventsController.js",
    "groupTitle": "Event",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EventIdNotProvided",
            "description": "<p>No Event id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EventNotFound",
            "description": "<p>The Event was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PayerIdNotProvided",
            "description": "<p>No Payer id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AmountNotProvided",
            "description": "<p>No Amount provided.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Event id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Event with such id existing'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Payer id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Amount provided!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/v1/event/:id",
    "title": "Delete a event",
    "name": "DeleteEvent",
    "description": "<p>This is where a event is deleted</p>",
    "group": "Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Event Id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Event with id 59dce9d56b54d91c38847825 has been deleted'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/EventsController.js",
    "groupTitle": "Event",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EventIdNotProvided",
            "description": "<p>No Event id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EventNotFound",
            "description": "<p>The Event was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Event id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Event with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/event/:id",
    "title": "Get event(s)",
    "name": "GetEvent",
    "description": "<p>This is where events are retrieved.</p>",
    "group": "Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>Event id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "event",
            "description": "<p>Post response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \".........\": \"....................\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/EventsController.js",
    "groupTitle": "Event",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EventNotFound",
            "description": "<p>The Event was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Event with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/event/:id",
    "title": "Get payment(s)",
    "name": "GetPayment",
    "description": "<p>This is where payments are retrieved.</p>",
    "group": "Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>Payment id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "payment",
            "description": "<p>Payment response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \".........\": \"....................\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/EventsController.js",
    "groupTitle": "Event",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PaymentNotFound",
            "description": "<p>The Payment was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Payment with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/v1/event/:id",
    "title": "Update an event",
    "name": "UpdateEvent",
    "description": "<p>This is where an event is updated.</p>",
    "group": "Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of the event.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "banner",
            "description": "<p>Cloud Url of Picture banner for the event.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Full description of the event.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "date",
            "description": "<p>Date/Duration of the event.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "venue",
            "description": "<p>Venue of the event.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "fee",
            "description": "<p>Fee for the event.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Event with id 59dce9d56b54d91c38847825 has been updated'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/EventsController.js",
    "groupTitle": "Event",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EventIdNotProvided",
            "description": "<p>No Event id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EventNotFound",
            "description": "<p>The Event was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Event id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Event with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/v1/event/payment/:id",
    "title": "Update a payment",
    "name": "UpdatePayment",
    "description": "<p>This is where a payment is updated.</p>",
    "group": "Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the payment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>State/status of the payment. Must be any of 'pending', 'approved', 'denied', 'free'.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Payment with id 59dce9d56b54d91c38847825 has been updated'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/EventsController.js",
    "groupTitle": "Event",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PaymentIdNotProvided",
            "description": "<p>No Payment id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PaymentNotFound",
            "description": "<p>The Payment was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Payment id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Payment with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/event/upload",
    "title": "Upload an event banner",
    "name": "UploadBanner",
    "description": "<p>This is where a event image banner is uploaded (Make sure image file extension is either jpg or png).</p>",
    "group": "Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "banner",
            "description": "<p>Banner image file to be uploaded.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"bannerUrl\": \"https://accicloud.blob.core.windows.net/event/27ba91b3-ab78-4240-aa6c-a1f32230227c.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EventImageNotUploaded",
            "description": "<p>No image uploaded.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No image uploaded!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/EventsController.js",
    "groupTitle": "Event"
  },
  {
    "type": "post",
    "url": "/api/v1/forum/comment",
    "title": "Create a new forum comment",
    "name": "CreateComment",
    "description": "<p>This is where a new forum comment is created.</p>",
    "group": "Forum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>the content of the comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "owner",
            "description": "<p>the user id of the commentor.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "post",
            "description": "<p>the forum post to comment on.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"id\": \"59dce9c16b54d91c38847825\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CommenttOwnerIdNotProvided",
            "description": "<p>No comment creator user id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PostIdNotProvided",
            "description": "<p>No post id provided.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Creator/Owner user id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Post id provided!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ForumController.js",
    "groupTitle": "Forum"
  },
  {
    "type": "post",
    "url": "/api/v1/forum/post",
    "title": "Create a new forum post",
    "name": "CreatePost",
    "description": "<p>This is where a new forum post is created.</p>",
    "group": "Forum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the forum post.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>the content of the post.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "creator",
            "description": "<p>User id of the post creator.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "topic",
            "description": "<p>Id of forum topic to which the post  will belong.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"id\": \"59dce9c16b54d91c38847825\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PostOwnerIdNotProvided",
            "description": "<p>No post creator user id provided.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Creator/Owner user id provided!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ForumController.js",
    "groupTitle": "Forum"
  },
  {
    "type": "post",
    "url": "/api/v1/forum/topic",
    "title": "Create a new forum topic",
    "name": "CreateTopic",
    "description": "<p>This is where a new forum topic is created.</p>",
    "group": "Forum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the forum topic.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Full description of the topic.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "creator",
            "description": "<p>User ID of the topic creator.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"id\": \"59dce9c16b54d91c38847825\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TopicOwnerIdNotProvided",
            "description": "<p>No forum topic owner id provided.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Creator/Owner user id provided!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ForumController.js",
    "groupTitle": "Forum"
  },
  {
    "type": "delete",
    "url": "/api/v1/forum/comment/:id",
    "title": "Delete a forum comment",
    "name": "DeleteComment",
    "description": "<p>This is where a forum comment is deleted</p>",
    "group": "Forum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Comment Id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Comment with id 59dce9d56b54d91c38847825 has been deleted'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ForumController.js",
    "groupTitle": "Forum",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CommentIdNotProvided",
            "description": "<p>No comment id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CommentNotFound",
            "description": "<p>The id of the Comment was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Comment id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Comment with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/v1/forum/post/:id",
    "title": "Delete a forum post",
    "name": "DeletePost",
    "description": "<p>This is where a forum post is deleted</p>",
    "group": "Forum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Post Id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Post with id 59dce9d56b54d91c38847825 has been deleted'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ForumController.js",
    "groupTitle": "Forum",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PostIdNotProvided",
            "description": "<p>No post id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PostNotFound",
            "description": "<p>The id of the Post was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Post id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Post with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/v1/forum/topic/:id",
    "title": "Delete a forum topic",
    "name": "DeleteTopic",
    "description": "<p>This is where a forum topic is deleted</p>",
    "group": "Forum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Topic Id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Topic with id 59dce9d56b54d91c38847825 has been deleted'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ForumController.js",
    "groupTitle": "Forum",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TopicIdNotProvided",
            "description": "<p>No Topic id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TopicNotFound",
            "description": "<p>The id of the Topic was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Topic id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Topic with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/forum/comment/:id",
    "title": "Get comment(s)",
    "name": "GetComment_s_",
    "description": "<p>This is where forum comment(s) is retrieved</p>",
    "group": "Forum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>Comment Id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>Comment response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \"........\": \"..................\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ForumController.js",
    "groupTitle": "Forum",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CommentNotFound",
            "description": "<p>The id of the Comment was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Comment with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/forumcount",
    "title": "Get forum counts",
    "name": "GetCount",
    "description": "<p>This is where forum counts are obtained.</p>",
    "group": "Forum",
    "version": "0.0.0",
    "filename": "api/controllers/ForumController.js",
    "groupTitle": "Forum"
  },
  {
    "type": "get",
    "url": "/api/v1/forum/post/:id",
    "title": "Get post(s)",
    "name": "GetPost_s_",
    "description": "<p>This is where forum post(s) is retrieved</p>",
    "group": "Forum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>Post Id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "post",
            "description": "<p>Post response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \"........\": \"..................\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ForumController.js",
    "groupTitle": "Forum",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PostNotFound",
            "description": "<p>The id of the Post was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Post with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/forum/topic/:id",
    "title": "Get topic(s)",
    "name": "GetTopic_s_",
    "description": "<p>This is where forum topic(s) is retrieved</p>",
    "group": "Forum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>Topic Id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "topic",
            "description": "<p>Topic response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \"........\": \"..................\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ForumController.js",
    "groupTitle": "Forum",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TopicNotFound",
            "description": "<p>The id of the Topic was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Topic with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/v1/forum/comment/:id",
    "title": "Update a forum comment",
    "name": "UpdateComment",
    "description": "<p>This is where a forum comment is updated.</p>",
    "group": "Forum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>topic Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "comment",
            "description": "<p>the content of the comment.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Comment with id 59dce9d56b54d91c38847825 has been updated'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ForumController.js",
    "groupTitle": "Forum",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CommentIdNotProvided",
            "description": "<p>No comment id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CommentNotFound",
            "description": "<p>The id of the Comment was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Comment id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Comment with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/v1/forum/post/:id",
    "title": "Update a forum post",
    "name": "UpdatePost",
    "description": "<p>This is where a forum post is updated.</p>",
    "group": "Forum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>topic Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of the forum post.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "content",
            "description": "<p>the content of the post.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "topic",
            "description": "<p>Id of forum topic to which the post  will belong.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Post with id 59dce9d56b54d91c38847825 has been updated'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ForumController.js",
    "groupTitle": "Forum",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PostIdNotProvided",
            "description": "<p>No post id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PostNotFound",
            "description": "<p>The id of the Post was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Post id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Post with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/v1/forum/topic/:id",
    "title": "Update a forum topic",
    "name": "UpdateTopic",
    "description": "<p>This is where a forum topic is updated.</p>",
    "group": "Forum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>topic Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of the forum topic.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Full description of the topic.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "creator",
            "description": "<p>User ID of the topic creator.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Topic with id 59dce9d56b54d91c38847825 has been updated'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ForumController.js",
    "groupTitle": "Forum",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TopicIdNotProvided",
            "description": "<p>No Topic id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TopicNotFound",
            "description": "<p>The id of the Topic was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Topic id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Topic with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/knowledgebase/doccount",
    "title": "Get document count",
    "name": "GetCount",
    "description": "<p>This is where document count is obtained.</p>",
    "group": "KnowledgeBase",
    "version": "0.0.0",
    "filename": "api/controllers/KnowledgeBaseController.js",
    "groupTitle": "KnowledgeBase"
  },
  {
    "type": "post",
    "url": "/api/v1/knowledgebase/category",
    "title": "Create a new category",
    "name": "CreateCategory",
    "description": "<p>This is where a new category is created.</p>",
    "group": "Knowledgebase",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the category.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Full description of the category.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"id\": \"59dce9c16b54d91c38847825\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/KnowledgeBaseController.js",
    "groupTitle": "Knowledgebase"
  },
  {
    "type": "post",
    "url": "/api/v1/knowledgebase/document",
    "title": "Create a new document",
    "name": "CreateDocument",
    "description": "<p>This is where a new document is created.</p>",
    "group": "Knowledgebase",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the document.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Full description of the document.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "docUrl",
            "description": "<p>Cloud storage url of the document.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uploader",
            "description": "<p>Id of the user who uploaded the docment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Id of category the document will belong to.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"id\": \"59dce9c16b54d91c38847825\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/KnowledgeBaseController.js",
    "groupTitle": "Knowledgebase",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CategoryIdNotProvided",
            "description": "<p>No Category id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UploaderIdNotProvided",
            "description": "<p>No Uploader id provided.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Category id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Uploader id provided!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/v1/knowledgebase/category/:id",
    "title": "Delete a category",
    "name": "DeleteCategory",
    "description": "<p>This is where a category is deleted</p>",
    "group": "Knowledgebase",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Category ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Category with id 59dce9d56b54d91c38847825 has been deleted'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/KnowledgeBaseController.js",
    "groupTitle": "Knowledgebase",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CategoryIdNotProvided",
            "description": "<p>No Category id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CategoryNotFound",
            "description": "<p>The Category was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Category id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Category with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/v1/knowledgebase/document/:id",
    "title": "Delete a document",
    "name": "DeleteDocument",
    "description": "<p>This is where a document is deleted</p>",
    "group": "Knowledgebase",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Document ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Document with id 59dce9d56b54d91c38847825 has been deleted'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/KnowledgeBaseController.js",
    "groupTitle": "Knowledgebase",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DocumentIdNotProvided",
            "description": "<p>No Document id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DocumentNotFound",
            "description": "<p>The Document was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Document id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Document with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/knowledgebase/category/:id",
    "title": "Get category(s)",
    "name": "GetCategory",
    "description": "<p>This is where categories are retrieved.</p>",
    "group": "Knowledgebase",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>Category id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Category response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \".........\": \"....................\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/KnowledgeBaseController.js",
    "groupTitle": "Knowledgebase",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CategoryNotFound",
            "description": "<p>The Category was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Category with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/knowledgebase/document/:id",
    "title": "Get document(s)",
    "name": "GetDocument",
    "description": "<p>This is where documents are retrieved.</p>",
    "group": "Knowledgebase",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>Document id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "document",
            "description": "<p>Document response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \".........\": \"....................\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/KnowledgeBaseController.js",
    "groupTitle": "Knowledgebase",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DocumentNotFound",
            "description": "<p>The Document was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Document with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/v1/knowledgebase/category/:id",
    "title": "Update a category",
    "name": "UpdateCategory",
    "description": "<p>This is where a category is updated</p>",
    "group": "Knowledgebase",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Category ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Category with id 59dce9d56b54d91c38847825 has been updated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/KnowledgeBaseController.js",
    "groupTitle": "Knowledgebase",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CategoryIdNotProvided",
            "description": "<p>No Category id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CategoryNotFound",
            "description": "<p>The Category was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Category id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Category with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/v1/knowledgebase/document/:id",
    "title": "Update a document",
    "name": "UpdateDocument",
    "description": "<p>This is where a document is updated</p>",
    "group": "Knowledgebase",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Document ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of the document.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Full description of the document.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "docUrl",
            "description": "<p>Cloud storage url of the document.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "uploader",
            "description": "<p>Id of the user who uploaded the docment.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Document with id 59dce9d56b54d91c38847825 has been updated'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/KnowledgeBaseController.js",
    "groupTitle": "Knowledgebase",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DocumentIdNotProvided",
            "description": "<p>No Document id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DocumentNotFound",
            "description": "<p>The Document was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Document id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Document with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/knowledgebase/document/upload",
    "title": "Upload a document",
    "name": "UploadDocument",
    "description": "<p>This is where a knowledgebase document is uploaded (Make sure image file extension is either jpg or png).</p>",
    "group": "Knowledgebase",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "document",
            "description": "<p>Document to be uploaded.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"docUrl\": \"https://accicloud.blob.core.windows.net/knowledgebase/27ba91b3-ab78-4240-aa6c-a1f32230227c.pdf\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DocumentNotUploaded",
            "description": "<p>No document uploaded.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No document uploaded!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/KnowledgeBaseController.js",
    "groupTitle": "Knowledgebase"
  },
  {
    "type": "post",
    "url": "/api/v1/projects/post",
    "title": "Create a new level",
    "name": "CreateLevel",
    "description": "<p>This is where a new level is created.</p>",
    "group": "Levels",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the membership level.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fee",
            "description": "<p>Fee for the memebership level.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Full description of the membership level.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "levels",
            "description": "<p>Level name and id returned from the API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9c16b54d91c38847825\",\n  \"....\": \"......................\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LevelsInfoNotComplete",
            "description": "<p>Post info not complete.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No { name | fee | description } provided!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/LevelsController.js",
    "groupTitle": "Levels"
  },
  {
    "type": "post",
    "url": "/api/v1/levels",
    "title": "Create a new level",
    "name": "CreateLevel",
    "description": "<p>This is where a new level is created.</p>",
    "group": "Levels",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Name of the membership level.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "fee",
            "description": "<p>Fee for the memebership level.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Full description of the membership level.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Level with id 59dce9d56b54d91c38847825 has been updated'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/LevelsController.js",
    "groupTitle": "Levels",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LevelIdNotProvided",
            "description": "<p>No Level id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LevelNotFound",
            "description": "<p>The Level was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Level id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Level with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/v1/levels/:id",
    "title": "Delete a level",
    "name": "DeleteLevel",
    "description": "<p>This is where a level is deleted</p>",
    "group": "Levels",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Post ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Level with id 59dce9d56b54d91c38847825 has been deleted'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/LevelsController.js",
    "groupTitle": "Levels",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LevelIdNotProvided",
            "description": "<p>No Level id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LevelNotFound",
            "description": "<p>The Level was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Level id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Level with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/levels/:id",
    "title": "Get project(s)",
    "name": "GetLevel",
    "description": "<p>This is where levels are retrieved.</p>",
    "group": "Levels",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>Level id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "level",
            "description": "<p>Level response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \".........\": \"....................\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/LevelsController.js",
    "groupTitle": "Levels",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ProjectNotFound",
            "description": "<p>The Project was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Project with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/notifications/",
    "title": "Create a new notification",
    "name": "CreateProject",
    "description": "<p>This is where a new notification is created.</p>",
    "group": "Notifications",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User id of the recipient.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Actual content of the notification.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "from",
            "description": "<p>Sender of the notification.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "type",
            "description": "<p>Type of notification (notificaton or message).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the new notification.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\"\n  \"id\": \"59dce9c16b54d91c38847825\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotificationsInfoNotComplete",
            "description": "<p>Post info not complete.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No { id | message | type } provided!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/NotificationsController.js",
    "groupTitle": "Notifications"
  },
  {
    "type": "delete",
    "url": "/api/v1/notifications/:id",
    "title": "Delete a notification",
    "name": "DeleteNotification",
    "description": "<p>This is where a notification is deleted</p>",
    "group": "Notifications",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Notification ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Level with id 59dce9d56b54d91c38847825 has been deleted'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/NotificationsController.js",
    "groupTitle": "Notifications",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotificationIdNotProvided",
            "description": "<p>No Notification id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotificationNotFound",
            "description": "<p>The Notification was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Notification id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Notification with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/notification/:id",
    "title": "Get notification(s)",
    "name": "GetLevel",
    "description": "<p>This is where notification are retrieved.</p>",
    "group": "Notifications",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>Notifications id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification",
            "description": "<p>Notifications response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \".........\": \"....................\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/NotificationsController.js",
    "groupTitle": "Notifications",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotificationNotFound",
            "description": "<p>The Notification was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Notification with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/payments/donations",
    "title": "Get donation payments",
    "name": "Donations",
    "description": "<p>This is where donation payment records are obtained.</p>",
    "group": "Payments",
    "version": "0.0.0",
    "filename": "api/controllers/PaymentsController.js",
    "groupTitle": "Payments"
  },
  {
    "type": "get",
    "url": "/api/v1/payments/events",
    "title": "Get event payments",
    "name": "Events",
    "description": "<p>This is where event payment records are obtained.</p>",
    "group": "Payments",
    "version": "0.0.0",
    "filename": "api/controllers/PaymentsController.js",
    "groupTitle": "Payments"
  },
  {
    "type": "get",
    "url": "/api/v1/payments/donation/excel",
    "title": "Get donation payment Excel document",
    "name": "GetDonationExcel",
    "description": "<p>This is where donation payment records are obtained in excel format.</p>",
    "group": "Payments",
    "version": "0.0.0",
    "filename": "api/controllers/PaymentsController.js",
    "groupTitle": "Payments"
  },
  {
    "type": "get",
    "url": "/api/v1/payments/event/excel",
    "title": "Get event payment Excel document",
    "name": "GetEventExcel",
    "description": "<p>This is where event payment records are obtained in excel format.</p>",
    "group": "Payments",
    "version": "0.0.0",
    "filename": "api/controllers/PaymentsController.js",
    "groupTitle": "Payments"
  },
  {
    "type": "get",
    "url": "/api/v1/payments/:id",
    "title": "Get Payment Excel document",
    "name": "GetExcel",
    "description": "<p>This is payment records are obtained in excel format.</p>",
    "group": "Payments",
    "version": "0.0.0",
    "filename": "api/controllers/DonationController.js",
    "groupTitle": "Payments"
  },
  {
    "type": "get",
    "url": "/api/v1/payments/excel",
    "title": "Get Payment Excel document",
    "name": "GetExcel",
    "description": "<p>This is where payment records are obtained in excel format.</p>",
    "group": "Payments",
    "version": "0.0.0",
    "filename": "api/controllers/PaymentsController.js",
    "groupTitle": "Payments"
  },
  {
    "type": "get",
    "url": "/api/v1/payments/membership/excel",
    "title": "Get membership payment Excel document",
    "name": "GetMembershipExcel",
    "description": "<p>This is where membership payment records are obtained in excel format.</p>",
    "group": "Payments",
    "version": "0.0.0",
    "filename": "api/controllers/PaymentsController.js",
    "groupTitle": "Payments"
  },
  {
    "type": "get",
    "url": "/api/v1/payments/:id",
    "title": "Get payments(s)",
    "name": "GetPayment",
    "description": "<p>This is where paymet records are retrieved.</p>",
    "group": "Payments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "term",
            "description": "<p>Search term.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "field",
            "description": "<p>Search field.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "offset",
            "description": "<p>Search offset for pagination.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "limit",
            "description": "<p>Search limit for pagination.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "payments",
            "description": "<p>Response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \".........\": \"....................\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/PaymentsController.js",
    "groupTitle": "Payments",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PaymentNotFound",
            "description": "<p>The Payment was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Payment with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/payments/registration/excel",
    "title": "Get registration payment Excel document",
    "name": "GetRegistrationExcel",
    "description": "<p>This is where registration payment records are obtained in excel format.</p>",
    "group": "Payments",
    "version": "0.0.0",
    "filename": "api/controllers/PaymentsController.js",
    "groupTitle": "Payments"
  },
  {
    "type": "get",
    "url": "/api/v1/payments/totals",
    "title": "Get Payment summary/totals",
    "name": "GetTotals",
    "description": "<p>This is payment totals are obtained.</p>",
    "group": "Payments",
    "version": "0.0.0",
    "filename": "api/controllers/PaymentsController.js",
    "groupTitle": "Payments"
  },
  {
    "type": "get",
    "url": "/api/v1/payments/training/excel",
    "title": "Get training payment Excel document",
    "name": "GetTrainingExcel",
    "description": "<p>This is where training payment records are obtained in excel format.</p>",
    "group": "Payments",
    "version": "0.0.0",
    "filename": "api/controllers/PaymentsController.js",
    "groupTitle": "Payments"
  },
  {
    "type": "get",
    "url": "/api/v1/payments/memberships",
    "title": "Get registration payments",
    "name": "Memberships",
    "description": "<p>This is where registration payment records are obtained.</p>",
    "group": "Payments",
    "version": "0.0.0",
    "filename": "api/controllers/PaymentsController.js",
    "groupTitle": "Payments"
  },
  {
    "type": "get",
    "url": "/api/v1/payments/registrations",
    "title": "Get registration payments",
    "name": "Registrations",
    "description": "<p>This is where registration payment records are obtained.</p>",
    "group": "Payments",
    "version": "0.0.0",
    "filename": "api/controllers/PaymentsController.js",
    "groupTitle": "Payments"
  },
  {
    "type": "get",
    "url": "/api/v1/payments/trainings",
    "title": "Get event payments",
    "name": "Trainings",
    "description": "<p>This is where training payment records are obtained.</p>",
    "group": "Payments",
    "version": "0.0.0",
    "filename": "api/controllers/PaymentsController.js",
    "groupTitle": "Payments"
  },
  {
    "type": "delete",
    "url": "/api/v1/projects/:id",
    "title": "Delete a project",
    "name": "DeleteProject",
    "description": "<p>This is where a project is deleted</p>",
    "group": "Project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Post ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Project with id 59dce9d56b54d91c38847825 has been deleted'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ProjectsController.js",
    "groupTitle": "Project",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ProjectIdNotProvided",
            "description": "<p>No Project id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ProjectNotFound",
            "description": "<p>The Project was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Project id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Project with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/projects/:id",
    "title": "Get project(s)",
    "name": "Get",
    "description": "<p>This is where projects are retrieved.</p>",
    "group": "Project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>Project id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "project",
            "description": "<p>Post response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \".........\": \"....................\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ProjectsController.js",
    "groupTitle": "Project",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ProjectNotFound",
            "description": "<p>The Project was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Project with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/projects/upload",
    "title": "Upload a project banner",
    "name": "UploadBanner",
    "description": "<p>This is where a project image banner is uploaded (Make sure image file extension is either jpg or png).</p>",
    "group": "Project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "banner",
            "description": "<p>Banner image file to be uploaded.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"bannerUrl\": \"https://accicloud.blob.core.windows.net/project/27ba91b3-ab78-4240-aa6c-a1f32230227c.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ProjectImageNotUploaded",
            "description": "<p>No image uploaded.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No image uploaded!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ProjectsController.js",
    "groupTitle": "Project"
  },
  {
    "type": "post",
    "url": "/api/v1/projects",
    "title": "Create a new project",
    "name": "CreateProject",
    "description": "<p>This is where a new project is created.</p>",
    "group": "Projects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "banner",
            "description": "<p>Cloud Url of Picture banner for the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Full description of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "date",
            "description": "<p>Date/Duration of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "venue",
            "description": "<p>Venue of the project.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"id\": \"59dce9c16b54d91c38847825\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ProjectInfoNotComplete",
            "description": "<p>Post info not complete.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No { title | banner | description } provided!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ProjectsController.js",
    "groupTitle": "Projects"
  },
  {
    "type": "put",
    "url": "/api/v1/projects",
    "title": "Update a project",
    "name": "UpdateProject",
    "description": "<p>This is where a project is updated.</p>",
    "group": "Projects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "banner",
            "description": "<p>Cloud Url of Picture banner for the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Full description of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "date",
            "description": "<p>Date/Duration of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "venue",
            "description": "<p>Venue of the project.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Project with id 59dce9d56b54d91c38847825 has been updated'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ProjectsController.js",
    "groupTitle": "Projects",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ProjectIdNotProvided",
            "description": "<p>No Project id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ProjectNotFound",
            "description": "<p>The Project was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Project id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Project with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/referrer",
    "title": "Approve a user",
    "name": "Approve",
    "description": "<p>This is where a newly registered user is confirmed instead of beign rejected by a referee.</p>",
    "group": "Referrer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User id of the the user to be confirmed.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "refereeId",
            "description": "<p>Member id of the referee.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Confirmed!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ReferrerController.js",
    "groupTitle": "Referrer",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIdNotProvided",
            "description": "<p>No User id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No User id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No User with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/social/reerrer/:id",
    "title": "Get unapproved user(s)",
    "name": "Get",
    "description": "<p>This is where unverified users are retrieved.</p>",
    "group": "Referrer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>user ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>Post response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \".........\": \"....................\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ReferrerController.js",
    "groupTitle": "Referrer",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No User with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/v1/referrer",
    "title": "Reject a user",
    "name": "Reject",
    "description": "<p>This is where a newly registered user is rejected instead of beign confirmed by a referrer.</p>",
    "group": "Referrer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User id of the the user to be rejected.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "refereeId",
            "description": "<p>Member id of the referee.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"User with id 59dce9d56b54d91c38847825 has been rejected'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/ReferrerController.js",
    "groupTitle": "Referrer",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIdNotProvided",
            "description": "<p>No User id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No User id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No User with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/social/accept",
    "title": "Accept a friend request",
    "name": "Accept",
    "description": "<p>This is where the requestee accepts a friend request from a requester</p>",
    "group": "Social",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "requester",
            "description": "<p>ID of the requester.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "requestee",
            "description": "<p>ID of the requestee.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Friend request accepted\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/SocialController.js",
    "groupTitle": "Social",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RequesterIdNotProvided",
            "description": "<p>No Requester id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RequesteeIdNotProvided",
            "description": "<p>No Requestee id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Requester id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Requestee id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No User with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/social/cancel",
    "title": "Cancel a friend request",
    "name": "Cancel",
    "description": "<p>This is where a friend request is canceled befor it is accepted by the requestee</p>",
    "group": "Social",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "requester",
            "description": "<p>ID of the requester.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "requetee",
            "description": "<p>ID of the requestee.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"'Friend request canceled\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/SocialController.js",
    "groupTitle": "Social",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RequesterIdNotProvided",
            "description": "<p>No Requester id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RequesteeIdNotProvided",
            "description": "<p>No Requestee id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Requester id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Requestee id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No User with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/social/comment",
    "title": "Create a new comment",
    "name": "CreateComment",
    "description": "<p>This is where a comment on post is created</p>",
    "group": "Social",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>The comment to be made on a post.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "owner",
            "description": "<p>User id of the commentor.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "post",
            "description": "<p>Post id of the post to be commented on.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>the comment id of the newly created comment.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"id\": \"59dce9c16b54d91c38847825\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "OwnerIdNotProvided",
            "description": "<p>No Owner/User id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CommentNotProvided",
            "description": "<p>No comment provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PostIdNotProvided",
            "description": "<p>No post id provided.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No post content provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No comment provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Post id provided!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/SocialController.js",
    "groupTitle": "Social"
  },
  {
    "type": "post",
    "url": "/api/v1/social/post",
    "title": "Create a new social post",
    "name": "CreatePost",
    "description": "<p>This is where a new social post is created.</p>",
    "group": "Social",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "postText",
            "description": "<p>Text content of the post.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "owner",
            "description": "<p>User ID of the post creator.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "postImage",
            "description": "<p>Url of images associated with the post.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"id\": \"59dce9c16b54d91c38847825\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PostOwnerIdNotProvided",
            "description": "<p>No post owner id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PostContentNotProvided",
            "description": "<p>No post content provided.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Creator/Owner user id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No post content provided!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/SocialController.js",
    "groupTitle": "Social"
  },
  {
    "type": "delete",
    "url": "/api/v1/social/comment/:id",
    "title": "Delete a comment",
    "name": "DeleteComment",
    "description": "<p>This is where a comment on post is deleted.</p>",
    "group": "Social",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Comment ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Comment with id 59dce9d56b54d91c38847825 has been deleted'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/SocialController.js",
    "groupTitle": "Social",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CommentIdNotProvided",
            "description": "<p>No comment id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CommentNotFound",
            "description": "<p>The id of the Comment was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Comment id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Comment with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/v1/social/post/:id",
    "title": "Delete a post",
    "name": "DeletePost",
    "description": "<p>This is where a social post is deleted</p>",
    "group": "Social",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Post ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Post with id 59dce9d56b54d91c38847825 has been deleted'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/SocialController.js",
    "groupTitle": "Social",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PostIdNotProvided",
            "description": "<p>No post id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PostNotFound",
            "description": "<p>The id of the Post was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Post id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Post with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/social/comment/:id",
    "title": "Get comment(s)",
    "name": "GetComment",
    "description": "<p>This is where a comment on post is retrieved.</p>",
    "group": "Social",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Comment ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>Postresponse from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \".........\": \"....................\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/SocialController.js",
    "groupTitle": "Social",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CommentNotFound",
            "description": "<p>The id of the Comment was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Comment with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/socialcount",
    "title": "Get social counts",
    "name": "GetCount",
    "description": "<p>This is where social counts are obtained.</p>",
    "group": "Social",
    "version": "0.0.0",
    "filename": "api/controllers/SocialController.js",
    "groupTitle": "Social"
  },
  {
    "type": "get",
    "url": "/api/v1/social/feed/:id",
    "title": "Get user's feed",
    "name": "GetFeed",
    "description": "<p>This is where a user's feed is retrieved.</p>",
    "group": "Social",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>Postresponse from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \".........\": \"....................\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/SocialController.js",
    "groupTitle": "Social"
  },
  {
    "type": "get",
    "url": "/api/v1/social/post/:id",
    "title": "Get post(s)",
    "name": "GetPost",
    "description": "<p>This is where a social post(s) is retrieved</p>",
    "group": "Social",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>Post ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "post",
            "description": "<p>Postresponse from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \"postImage\": \"http://w............\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/SocialController.js",
    "groupTitle": "Social",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PostNotFound",
            "description": "<p>The id of the Post was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Post with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/social/post/like",
    "title": "Like a post",
    "name": "LikePost",
    "description": "<p>This is where a social post is liked</p>",
    "group": "Social",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Post ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "liker",
            "description": "<p>User id of the post liker.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Post liked\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/SocialController.js",
    "groupTitle": "Social",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PostIdNotProvided",
            "description": "<p>No post id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PostNotFound",
            "description": "<p>The id of the Post was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Post id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Post with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/social/remove",
    "title": "Terminate a friendship",
    "name": "Remove",
    "description": "<p>This is where a friendship is terminated or destroyed</p>",
    "group": "Social",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "requester",
            "description": "<p>ID of the requester.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "requestee",
            "description": "<p>ID of the requestee.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Friendship terminated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/SocialController.js",
    "groupTitle": "Social",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RequesterIdNotProvided",
            "description": "<p>No Requester id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RequesteeIdNotProvided",
            "description": "<p>No Requestee id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Requester id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Requestee id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No User with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/social/request",
    "title": "Send a friend request",
    "name": "Request",
    "description": "<p>This is where the friend request is registered to the database</p>",
    "group": "Social",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "requester",
            "description": "<p>ID of the requester.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "requestee",
            "description": "<p>ID of the requestee.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Friend request sent\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/SocialController.js",
    "groupTitle": "Social",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RequesterIdNotProvided",
            "description": "<p>No Requester id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RequesteeIdNotProvided",
            "description": "<p>No Requestee id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Requester id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Requestee id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No User with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/social/comment/search",
    "title": "Search for post(s)",
    "name": "SearchComment",
    "description": "<p>This is where a comment on post is searched.</p>",
    "group": "Social",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "searchTerm",
            "description": "<p>Search term to be searched.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "limit",
            "description": "<p>Number of search items per page.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "result",
            "description": "<p>Result of the search.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "page",
            "description": "<p>Current page of the search result.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "limit",
            "description": "<p>Number of search items per page.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Result of the search.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"page\": \"1\",\n  \"limit\": \"50\",\n  \"result\": [{}]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/SocialController.js",
    "groupTitle": "Social",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SearchTermNotProvided",
            "description": "<p>No search term provided.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No search term provided!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/social/post/search",
    "title": "Search for post(s)",
    "name": "SearchPost",
    "description": "<p>This is where a social post is searched.</p>",
    "group": "Social",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "searchTerm",
            "description": "<p>Search term to be searched.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "page",
            "description": "<p>Current page of the search result.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "limit",
            "description": "<p>Number of search items per page.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "page",
            "description": "<p>Current page of the search result.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "limit",
            "description": "<p>Number of search items per page.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Result of the search.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"page\": \"1\",\n  \"limit\": \"50\",\n  \"result\": [{}]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/SocialController.js",
    "groupTitle": "Social",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SearchTermNotProvided",
            "description": "<p>No search term provided.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No search term provided!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/social/post/unlike",
    "title": "Unlike a post",
    "name": "UnlikePost",
    "description": "<p>This is where a social post is unliked</p>",
    "group": "Social",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Post ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "liker",
            "description": "<p>User id of the post liker.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Post unliked\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/SocialController.js",
    "groupTitle": "Social",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PostIdNotProvided",
            "description": "<p>No post id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PostNotFound",
            "description": "<p>The id of the Post was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Post id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Post with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/v1/social/post",
    "title": "Update a comment",
    "name": "UpdateComment",
    "description": "<p>This is where a comment on post is updated.</p>",
    "group": "Social",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Comment ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>The comment to be made on a post.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Comment with id 59dce9d56b54d91c38847825 has been updated'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/SocialController.js",
    "groupTitle": "Social",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CommentIdNotProvided",
            "description": "<p>No comment id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CommentNotFound",
            "description": "<p>The id of the Comment was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Comment id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Comment with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/v1/social/post",
    "title": "Update a post",
    "name": "UpdatePost",
    "description": "<p>This is where a social post is updated.</p>",
    "group": "Social",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Post ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "postText",
            "description": "<p>Text content of the post.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "postImage",
            "description": "<p>Url of images associated with the post.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Post with id 59dce9d56b54d91c38847825 has been updated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/SocialController.js",
    "groupTitle": "Social",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PostIdNotProvided",
            "description": "<p>No post id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PostNotFound",
            "description": "<p>The id of the Post was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Post id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Post with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/social/upload",
    "title": "Upload an image",
    "name": "UploadImage",
    "description": "<p>This is where a social image is uploaded (Make sure image file extension is either jpg or png).</p>",
    "group": "Social",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Image file to be uploaded.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"bannerUrl\": \"https://accicloud.blob.core.windows.net/social/27ba91b3-ab78-4240-aa6c-a1f32230227c.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ImageNotUploaded",
            "description": "<p>No image uploaded.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No image uploaded!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/SocialController.js",
    "groupTitle": "Social"
  },
  {
    "type": "post",
    "url": "/api/v1/training/payment",
    "title": "Pay for a training",
    "name": "CreatePayment",
    "description": "<p>This is where a training payment is created.</p>",
    "group": "Training",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "amount",
            "description": "<p>Amount to be paid for training.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "payer",
            "description": "<p>User id of the payer.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "training",
            "description": "<p>Training id of the training beign paid for.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "status",
            "description": "<p>State/status of the payment. Must be any of 'pending', 'approved', 'denied', 'free'.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"id\": \"59dce9d56b54d91c38847825\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/TrainingController.js",
    "groupTitle": "Training",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TrainingIdNotProvided",
            "description": "<p>No Training id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TrainingNotFound",
            "description": "<p>The Training was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PayerIdNotProvided",
            "description": "<p>No Payer id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AmountNotProvided",
            "description": "<p>No Amount provided.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Training id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Training with such id existing'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Payer id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Amount provided!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/training",
    "title": "Create a new training",
    "name": "CreateTraining",
    "description": "<p>This is where a new training is created.</p>",
    "group": "Training",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the training.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "banner",
            "description": "<p>Cloud Url of Picture banner for the training.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Full description of the training.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "date",
            "description": "<p>Date/Duration of the training.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "venue",
            "description": "<p>Venue of the training.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fee",
            "description": "<p>Fee for the training.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"id\": \"59dce9c16b54d91c38847825\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TrainingInfoNotComplete",
            "description": "<p>Training info not complete.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No { title | banner | description | fee} provided!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/TrainingController.js",
    "groupTitle": "Training"
  },
  {
    "type": "delete",
    "url": "/api/v1/training/:id",
    "title": "Delete a training",
    "name": "DeleteTraining",
    "description": "<p>This is where a training is deleted</p>",
    "group": "Training",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Training Id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Training with id 59dce9d56b54d91c38847825 has been deleted'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/TrainingController.js",
    "groupTitle": "Training",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TrainingIdNotProvided",
            "description": "<p>No Training id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TrainingNotFound",
            "description": "<p>The Training was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Training id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Training with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/training/:id",
    "title": "Get payment(s)",
    "name": "GetPayment",
    "description": "<p>This is where payments are retrieved.</p>",
    "group": "Training",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Payment id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "payment",
            "description": "<p>Payment response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \".........\": \"....................\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/TrainingController.js",
    "groupTitle": "Training",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PaymentNotFound",
            "description": "<p>The Payment was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Payment with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/training/:id",
    "title": "Get training(s)",
    "name": "GetTraining",
    "description": "<p>This is where trainings are retrieved.</p>",
    "group": "Training",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Training id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "training",
            "description": "<p>Post response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \".........\": \"....................\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/TrainingController.js",
    "groupTitle": "Training",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TrainingNotFound",
            "description": "<p>The Training was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Training with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/v1/training/payment/:id",
    "title": "Update a payment",
    "name": "UpdatePayment",
    "description": "<p>This is where a payment is updated.</p>",
    "group": "Training",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the payment.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>State/status of the payment. Must be any of 'pending', 'approved', 'denied', 'free'.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Payment with id 59dce9d56b54d91c38847825 has been updated'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/TrainingController.js",
    "groupTitle": "Training",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PaymentIdNotProvided",
            "description": "<p>No Payment id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PaymentNotFound",
            "description": "<p>The Payment was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Payment id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Payment with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/v1/training/:id",
    "title": "Update a training",
    "name": "UpdateTraining",
    "description": "<p>This is where a training is updated.</p>",
    "group": "Training",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of the training.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "banner",
            "description": "<p>Cloud Url of Picture banner for the training.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Full description of the training.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "date",
            "description": "<p>Date/Duration of the training.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "venue",
            "description": "<p>Venue of the training.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "fee",
            "description": "<p>Fee for the training.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Training with id 59dce9d56b54d91c38847825 has been updated'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/TrainingController.js",
    "groupTitle": "Training",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TrainingIdNotProvided",
            "description": "<p>No Training id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TrainingNotFound",
            "description": "<p>The Training was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No Training id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No Training with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/training/upload",
    "title": "Upload a training banner",
    "name": "UploadBanner",
    "description": "<p>This is where a training image banner is uploaded (Make sure image file extension is either jpg or png).</p>",
    "group": "Training",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "banner",
            "description": "<p>Banner image file to be uploaded.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"bannerUrl\": \"https://accicloud.blob.core.windows.net/training/27ba91b3-ab78-4240-aa6c-a1f32230227c.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TrainingImageNotUploaded",
            "description": "<p>No image uploaded.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No image uploaded!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/TrainingController.js",
    "groupTitle": "Training"
  },
  {
    "type": "delete",
    "url": "/api/v1/alertreferee",
    "title": "Alert a referee",
    "name": "AlertReferee",
    "description": "<p>This is where a referee is alerted to confirm a new membership applicant.</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the user to be conformed by referees</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "referrerUrl",
            "description": "<p>Url to redirect the referee to (must have a trailing slash).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"The referees has been alerted.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/UserController.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/api/v1/user/change/:token",
    "title": "Change user password",
    "name": "Change",
    "description": "<p>This is where an user password is changed.</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User email token.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>New password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Confirm the new password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Click on the link sent to your email to change your password'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/UserController.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserTokenNotProvided",
            "description": "<p>No User token provided.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No token provided!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/user",
    "title": "Create a new user",
    "name": "CreateUser",
    "description": "<p>This is where a new user is created.</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the new user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the new user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Confirm the password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Addresse of the business.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bizNature",
            "description": "<p>Nature of business.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "company",
            "description": "<p>Name of company.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyCOIUrl",
            "description": "<p>Document URL of company certificate if incoporation.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone number of company.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyRepName1",
            "description": "<p>Name of first company representative.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyRepPhone1",
            "description": "<p>Phone number of first company representative.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyRepEmail1",
            "description": "<p>Email of first company representative.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyRepPassportUrl1",
            "description": "<p>Passport URL of first company representative.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyRepCVUrl1",
            "description": "<p>CV URL of first company representative.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyRepName2",
            "description": "<p>Name of second company representative.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyRepPhone2",
            "description": "<p>Phonenumber of second company representative.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyRepEmail2",
            "description": "<p>Email of second company representative.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyRepPassportUrl2",
            "description": "<p>Passport URL of second company representative.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyRepCVUrl2",
            "description": "<p>CV URL of second company representative.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tradeGroup",
            "description": "<p>Trade group of company.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "annualReturn",
            "description": "<p>Annual return of company.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "annualProfits",
            "description": "<p>Annual profits of company.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "employees",
            "description": "<p>Employee count of company.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "referrer1",
            "description": "<p>Email of first referrer.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "referrer2",
            "description": "<p>Email of second referrer.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "profileImage",
            "description": "<p>Profile image for the company/member.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"id\": \"59dce9c16b54d91c38847825\",\n  \"....\": \".....................\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/UserController.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PasswordNotMatch",
            "description": "<p>Password doesn't match, What a shame!.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserInfoNotComplete",
            "description": "<p>User info not complete.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'Password doesn\\'t match, What a shame!'\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No { title | banner | description } provided!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/v1/user",
    "title": "Reject a user",
    "name": "DeleteUser",
    "description": "<p>This is where a user's info is updated.</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User id of the the user to be updated.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the new user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the new user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Confirm the password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Addresse of the business.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bizNature",
            "description": "<p>Nature of business.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "company",
            "description": "<p>Name of company.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyCOIUrl",
            "description": "<p>Document URL of company certificate if incoporation.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone number of company.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyRepName1",
            "description": "<p>Name of first company representative.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyRepPhone1",
            "description": "<p>Phone number of first company representative.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyRepEmail1",
            "description": "<p>Email of first company representative.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyRepPassportUrl1",
            "description": "<p>Passport URL of first company representative.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyRepCVUrl1",
            "description": "<p>CV URL of first company representative.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyRepName2",
            "description": "<p>Name of second company representative.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyRepPhone2",
            "description": "<p>Phonenumber of second company representative.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyRepEmail2",
            "description": "<p>Email of second company representative.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyRepPassportUrl2",
            "description": "<p>Passport URL of second company representative.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyRepCVUrl2",
            "description": "<p>CV URL of second company representative.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tradeGroup",
            "description": "<p>Trade group of company.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "annualReturn",
            "description": "<p>Annual return of company.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "annualProfits",
            "description": "<p>Annual profits of company.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "employees",
            "description": "<p>Employee count of company.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "referrer1",
            "description": "<p>Email of first referrer.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "referrer2",
            "description": "<p>Email of second referrer.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "profileImage",
            "description": "<p>Profile image for the company/member.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"User with id 59dce9d56b54d91c38847825 has been updated'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/UserController.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIdNotProvided",
            "description": "<p>No User id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No User id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No User with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/v1/user",
    "title": "Reject a user",
    "name": "DeleteUser",
    "description": "<p>This is where a user is deleted.</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User id of the the user to be deleted.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"User with id 59dce9d56b54d91c38847825 has been deleted'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/UserController.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIdNotProvided",
            "description": "<p>No User id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No User id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No User with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/v1/user/:id",
    "title": "Forgot user password",
    "name": "Forgot",
    "description": "<p>This is where an user forgoten password is taken care of.</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>Url to the password change page.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"Click on the link sent to your email to change your password'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/UserController.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserEmailNotProvided",
            "description": "<p>No User email provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No User Email provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No User with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/v1/user/usercount",
    "title": "Get User count",
    "name": "GetCount",
    "description": "<p>This is where user count is obtained.</p>",
    "group": "User",
    "version": "0.0.0",
    "filename": "api/controllers/UserController.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/v1/user/:id",
    "title": "Get User(s)",
    "name": "GetUser_s_",
    "description": "<p>This is where users are retrieved.</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>user ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>Post response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \".........\": \"....................\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/UserController.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No User with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/user/upload",
    "title": "Upload a file",
    "name": "UploadFile",
    "description": "<p>This is where a file is uploaded .</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "file",
            "description": "<p>File to be uploaded.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"bannerUrl\": \"https://accicloud.blob.core.windows.net/userfiles/27ba91b3-ab78-4240-aa6c-a1f32230227c.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FileNotUploaded",
            "description": "<p>No file uploaded.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No file uploaded!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/UserController.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/api/v1/validatereferee",
    "title": "Validate a referee",
    "name": "ValidateReferee",
    "description": "<p>This is where a referee is validated.</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the referee to be validated.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"The referee is valid\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/UserController.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/v1/social/verifier/:id",
    "title": "Get unverified user(s)",
    "name": "Get",
    "description": "<p>This is where unverified users are retrieved.</p>",
    "group": "Verifier",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>user ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>Post response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"59dce9d56b54d91c38847825\",\n  \".........\": \"....................\"\n   .................................\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/VerifierController.js",
    "groupTitle": "Verifier",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No User with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/v1/verifier",
    "title": "Verify a user",
    "name": "Verify",
    "description": "<p>This is where a newly registered user is verified instead  of beign rejected.</p>",
    "group": "Verifier",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User id of the the user to be verified.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"User with id 59dce9d56b54d91c38847825 has been verified'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/VerifierController.js",
    "groupTitle": "Verifier",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIdNotProvided",
            "description": "<p>No User id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No User id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No User with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/v1/verifier",
    "title": "Reject a user",
    "name": "Verify",
    "description": "<p>This is where a newly registered user is rejected instead of beign verified.</p>",
    "group": "Verifier",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User id of the the user to be verified.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "reason",
            "description": "<p>Reason for the user to be rejected.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the response from API.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message response from API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"message\": \"User with id 59dce9d56b54d91c38847825 has been rejected'\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/VerifierController.js",
    "groupTitle": "Verifier",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIdNotProvided",
            "description": "<p>No User id provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"error\",\n  \"err\": \"No User id provided!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"error\",\n  \"message\": 'No User with such id existing'\n}",
          "type": "json"
        }
      ]
    }
  }
] });
