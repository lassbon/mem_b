var parseXlsx = require("excel");
const multer = require("multer");
var base64 = require("base-64");

module.exports = {
  testEmail: function(req, res) {
    User.find({
      select: ["membershipId", "email", "companyName"],
      where: { oldMember: true, email: "sogbolutoluwalase@yahoo.com" }
    }).exec(function(err, users) {
      if (err) {
        sails.log.error(err);
        return res.json(404, { status: "error", err: err });
      }

      users.forEach(function(user) {
        var emailData = {
          email: process.env.SITE_EMAIL,
          from: process.env.SITE_NAME,
          subject: "Your " + process.env.SITE_NAME + " membership onboarding.",

          body:
            "Hello " +
            user.companyName +
            "!<br><br>" +
            "Welcome to " +
            process.env.SITE_NAME +
            " Membership platform.<br><br>" +
            "You can now easily access your membership account with ease and get all information on on-going, completed and past events/projects.<br><br>" +
            "You can also track your financial reports and pay your annual dues on the go.<br><br>" +
            'Kindly click on the "Onboard" button to be redirected to the onboarding form.<br><br>' +
            '<a href=" ' +
            process.env.ONBOARD_LINK +
            base64.encode(user.membershipId) +
            ' " style="color: green;">Onboard</a>.<br><br>' +
            'Your generic password is <strong>"password"</strong>.<br><br>' +
            "<strong>Kindly change your password once logged on.</strong><br><br>" +
            "Thank you for your time.<br><br>" +
            process.env.SITE_NAME,

          to: user.email
        };

        azureEmail.send(emailData, function(resp) {
          if (resp === "success") {
            return sails.log.info(resp);
          }

          if (resp === "error") {
            sails.log.error(resp);
          }
        });
      });
    });
  },

  oldData: function(req, res) {
    // req.file('avatar').upload({
    //     dirname: require('path').resolve(sails.config.appPath, 'assets/images')
    // }, function(err, uploadedFiles) {
    //     if (err) return res.negotiate(err);

    //     // return res.json({
    //     //     message: uploadedFiles.length + ' file(s) uploaded successfully!'
    //     // });
    // });

    parseXlsx("assets/images/old_member.xlsx", function(err, oldMembers) {
      if (err) {
        sails.log.error(err);

        return res.json(401, { status: "error", err: "wahala dey" });
      }

      oldMembers.splice(0, 3);

      let count = 0;

      oldMembers.forEach(oldMemberData => {
        try {
          const date = new Date();

          const oldMember = {
            oldMember: true,
            password: "password",
            membershipStatus: "active",
            membershipFee: "paid",
            membershipDue: "paid",
            registrationFee: "paid",
            role: "User",
            verified: true,
            approved: true,
            referred1: true,
            referred2: true
          };

          if (oldMemberData[1].length !== 0 && oldMemberData[8].length !== 0) {
            if (oldMemberData[1].length !== 0) {
              oldMember.membershipId = oldMemberData[1].toUpperCase();
            }

            if (oldMemberData[2].length !== 0) {
              oldMember.companyName = oldMemberData[2];
            }

            if (oldMemberData[5].length !== 0) {
              oldMember.membershipPlan = oldMemberData[5];
            }

            if (oldMemberData[7].length !== 0) {
              oldMember.companyAddress = oldMemberData[7];
            }

            if (oldMemberData[8].length !== 0) {
              oldMember.email = oldMemberData[8]
                .split(",")[0]
                .replace(/^\s+|\s+$/g, "");
            }else{
              if (oldMemberData[2].length !== 0) {
                console.log(oldMemberData[2]);
              }
            }

            if (oldMemberData[9].length !== 0) {
              oldMember.companyPhone = oldMemberData[9].split(" ").join(" ");
            }

            if (oldMemberData[11].length !== 0) {
              oldMember.tradeGroup = oldMemberData[11];
            }

            if (oldMemberData[13].length !== 0) {
              oldMember.dueDate = `${oldMemberData[13].split("/")[0]}/${
                oldMemberData[13].split("/")[1]
              }/${date.getFullYear() + 1}`;
            }

            //console.log(oldMember);

            // User.findOne({ membershipId: oldMember.membershipId })
            //   .then(function(user, err) {
            //     if (err) {
            //       sails.log.error(err);
            //       return res.json(err.status, { err: err });
            //     }

            //     if (!user) {
            //       console.log(oldMember.companyName);
            //       //console.log(count++);
            //     }

            //     // if (!user) {
            //     //   User.create(oldMember).exec(function(err, member) {
            //     //     if (err) {
            //     //       sails.log.error(err);
            //     //       //return res.json(err.status, { err: err });
            //     //     }

            //     //     console.log(member);
            //     //   });
            //     // }
            //   })
            //   .catch(function(err) {
            //     sails.log.error(err);
            //     //return res.json(500, { err: err });
            //   });
          }
        } catch (err) {
          sails.log.error(err);
          return res.json(500, { err: err });
        }
      });

      return res.json(200, { status: "success", message: "success" });
    });
  },

  alertOldMembers: function(req, res) {
    User.find({
      select: ["membershipId", "email", "companyName"],
      where: { oldMember: true }
    })
      .then(function(users, err) {
        if (err) {
          sails.log.error(err);
          return res.json(404, { status: "error", err: err });
        }

        users.forEach(function(user) {
          var emailData = {
            email: process.env.SITE_EMAIL,
            from: process.env.SITE_NAME,
            subject:
              "Your " + process.env.SITE_NAME + " membership onboarding.",

            body:
              "Hello " +
              user.companyName +
              "!<br><br>" +
              "Welcome to " +
              process.env.SITE_NAME +
              " Membership platform.<br><br>" +
              "You can now easily access your membership account with ease and get all information on on-going, completed and past events/projects.<br><br>" +
              "You can also track your financial reports and pay your annual dues on the go.<br><br>" +
              'Kindly click on the "Onboard" button to be redirected to the onboarding form.<br><br>' +
              '<a href=" ' +
              process.env.ONBOARD_LINK +
              base64.encode(user.membershipId) +
              ' " style="color: green;">Onboard</a>.<br><br>' +
              'Your generic password is <strong>"password"</strong>.<br><br>' +
              "<strong>Kindly change your password once logged on.</strong><br><br>" +
              "Thank you for your time.<br><br>" +
              process.env.SITE_NAME,

            to: user.email
          };

          azureEmail.send(emailData, function(resp) {
            if (resp === "success") {
              sails.log.info(resp);
            }

            if (resp === "error") {
              sails.log.error(resp);
            }
          });
        });
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  },

  testPage: function(req, res) {
    const users = [
      {
        email: "okolilemuel@gmail.com",
        membershipId: "ABUCCI/MEM/098",
        companyName: "Ownage Media"
      },
      {
        email: "roshbon@gmail.com",
        membershipId: "ABUCCI/MEM/345",
        companyName: "Ownage Media"
      },
      {
        email: "sogbolutoluwalase@gmail.com",
        membershipId: "ABUCCI/MEM/00098",
        companyName: "Ownage Media"
      }
    ];

    // const users = [
    //   {
    //     email: "okolilemuel@gmail.com",
    //     membershipId: "ABUCCI/MEM/098",
    //     companyName: "Ownage Media"
    //   },
    //   {
    //     email: "hannah@accinigeria.com",
    //     membershipId: "ABUCCI/MEM/57",
    //     companyName: "abc motors"
    //   },
    //   {
    //     email: "hameed@accinigeria.com",
    //     membershipId: "ABUCCI/MEM/56",
    //     companyName: "apimashup"
    //   },
    // ];

    users.forEach(function(user) {
      var emailData = {
        email: process.env.SITE_EMAIL,
        from: process.env.SITE_NAME,
        subject: "Your " + process.env.SITE_NAME + " membership onboarding.",

        body:
          "Hello " +
          user.companyName +
          "!<br><br>" +
          "Welcome to " +
          process.env.SITE_NAME +
          " Membership platform.<br><br>" +
          "You can now easily access your membership account with ease and get all information on on-going, completed and past events/projects.<br><br>" +
          "You can also track your financial reports and pay your annual dues on the go.<br><br>" +
          'Kindly click on the "Onboard" button to be redirected to the onboarding form.<br><br>' +
          '<a href=" ' +
          process.env.ONBOARD_LINK +
          base64.encode(user.membershipId) +
          ' " style="color: green;">Onboard</a>.<br><br>' +
          'Your generic password is <strong>"password"</strong>.<br><br>' +
          "<strong>Kindly change your password once logged on.</strong><br><br>" +
          "Thank you for your time.<br><br>" +
          process.env.SITE_NAME,

        to: user.email
      };

      azureEmail.send(emailData, function(resp) {
        if (resp === "success") {
          sails.log.info(resp);
        }

        if (resp === "error") {
          sails.log.error(resp);
        }
      });
    });
  },

  testOldmember: function(req, res) {
    const userData = {
      oldMember: true,
      password: "password",
      membershipStatus: "active",
      membershipFee: "paid",
      membershipDue: "paid",
      registrationFee: "paid",
      role: "User",
      verified: true,
      approved: true,
      referred1: true,
      referred2: true,
      membershipId: "ABUCCI/MEM/081",
      companyName: "Simxians Co. Ltd.",
      membershipPlan: "Brass",
      companyAddress: "P.O. Box 2808 Abuja.",
      email: "sogbolutoluwalase@gmail.com",
      tradeGroup: "Gen Merch, Small Scale Bus",
      dueDate: "22/04/2019"
    };

    User.create(userData)
      .then(function(member, err) {
        if (err) {
          sails.log.error(err);
          return res.json(err.status, { err: err });
        }

        console.log(member);

        var emailData = {
          email: process.env.SITE_EMAIL,
          from: process.env.SITE_NAME,
          subject: "Your " + process.env.SITE_NAME + " membership onboarding.",

          body:
            "Hello " +
            userData.companyName +
            "!<br><br>" +
            "Welcome to " +
            process.env.SITE_NAME +
            " Membership platform.<br><br>" +
            "You can now easily access your membership account with ease and get all information on on-going, completed and past events/projects.<br><br>" +
            "You can also track your financial reports and pay your annual dues on the go.<br><br>" +
            'Kindly click on the "Onboard" button to be redirected to the onboarding form.<br><br>' +
            '<a href=" ' +
            process.env.ONBOARD_LINK +
            base64.encode(userData.membershipId) +
            ' " style="color: green;">Onboard</a>.<br><br>' +
            'Your generic password is <strong>"password"</strong>.<br><br>' +
            "<strong>Kindly change your password once logged on.</strong><br><br>" +
            "Thank you for your time.<br><br>" +
            process.env.SITE_NAME,

          to: userData.email
        };

        azureEmail.send(emailData, function(resp) {
          if (resp === "success") {
            sails.log.info(resp);

            return res.json(200, {
              status: "success",
              message: member
            });
          }

          if (resp === "error") {
            sails.log.error(resp);
          }
        });
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  }
};
