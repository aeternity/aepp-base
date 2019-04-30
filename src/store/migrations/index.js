import runMigrations, { registerMigration } from './runner';
import fixEasCounterIssue from './00-fix-aes-ctr-counter-issue';
import resetAppsStateField from './01-reset-apps-state-field';
import buildAccountsArray from './02-build-accounts-array';

registerMigration(fixEasCounterIssue);
registerMigration(resetAppsStateField);
registerMigration(buildAccountsArray);

export default runMigrations;
