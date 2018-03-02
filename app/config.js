 const config = {};

 config.twilio = {};
 config.nodemailer = {};
 config.shoutcast = {};
 config.bigtable = {};

 config.emergency_message = "Emergency, I need help!";

 config.twilio.account_sid = "AC442c56fea3e04cd8b759e7829182d21e";
 config.twilio.auth_token = "cc711b134b85db4c0e1c453a8c6152ae";
 config.twilio.sender = "+1289-270-0989";
 config.twilio.phoneNumbers = ["+12265005320", "+919206694797", "+917411603497", "+919206694700"];

 config.nodemailer.username = "nurobotiks@gmail.com";
 config.nodemailer.password = "nurobotiksx9";
 config.nodemailer.mailList = ['imxgod@gmail.com', 'abhinav@nuro.ca', 'blykmonky@gmail.com'];

 config.neuroskyAppName = "NodeNeuroSky";
 config.neuroskyAppKey = "0fc4141b4b45c675cc8d3a765b8d71c5bde9390";
 
 config.bigtable.projectId = 'nuos-clinical-trials-global';
 config.bigtable.instanceId = 'nctg-bigtable-central';
 config.bigtable.userEventsTableId = 'userEventsTable';
 config.bigtable.userEventsFamilyId = 'superset';
 config.bigtable.z1SignalsTableId = 'z1SignalsTable';
 config.bigtable.z1SignalsFamilyId = 'superset';
 config.bigtable.neuroskySignalsTableId = 'neuroskySignalsTable';
 config.bigtable.neuroskySignalsFamilyId = 'superset';
 config.bigtable.username = 'abhinavkr';

 module.exports = config;