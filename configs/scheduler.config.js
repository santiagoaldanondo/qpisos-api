var schedule = require('node-schedule');
const nestoriaJob = require('../jobs/nestoria.job');
var rule_quotations = new schedule.RecurrenceRule();
rule_quotations.hours = 12;


schedule.scheduleJob(rule_quotations, nestoriaJob.run);
