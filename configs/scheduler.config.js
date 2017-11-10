var schedule = require('node-schedule');
const nestoriaJob = require('../jobs/nestoria.job');
const nestoriaJobRent = require('../jobs/nestoriaRent.job');
var rule_quotations = new schedule.RecurrenceRule();
rule_quotations.hour = 1;


schedule.scheduleJob(rule_quotations, nestoriaJob.run);
schedule.scheduleJob(rule_quotations, nestoriaJobRent.run);