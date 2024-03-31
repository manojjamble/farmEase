// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "ACbb47519977fb4d15d0cc3af36085e8c2";
const authToken = "0cd31304b60fb2fb225f0a8c6a215601";
const verifySid = "VA04b566db2076a20b408b7234a80ce96e";
const client = require("twilio")(accountSid, authToken);

client.verify.v2
  .services(verifySid)
  .verifications.create({ to: "+919150199696", channel: "sms" })
  .then((verification) => console.log(verification.status))
  .then(() => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question("Please enter the OTP:", (otpCode) => {
      client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: "+919150199696", code: otpCode })
        .then((verification_check) => console.log(verification_check.status))
        .then(() => readline.close());
    });
  });