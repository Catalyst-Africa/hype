const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.addAdminRole = functions.https.onCall(async (data, context) => {
  try {
    // Check that a request is made by the chief admin
    if (context.auth.token.email.toLowerCase() !== "control@catalyst.africa") {
      return { error: "Only super admin can add other admins :(" };
    }
    // Get the user and add custom claim(admin)
    const user = await admin.auth().getUserByEmail(data.email);
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
    });

    return {
      message: `${data.email} is now an admin!`,
    };
  } catch (err) {
    return err;
  }
});

exports.deleteUser = functions.https.onCall(async (data, context) => {
  try {
    if (context.auth.token.admin !== true) {
      return { error: "Only admins can delete users" };
    }
    await admin.auth().deleteUser(data.uid);
  } catch (err) {
    return err;
  }
});
