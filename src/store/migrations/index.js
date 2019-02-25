import runMigrations, { registerMigration } from './runner';
import fixEasCounterIssue from './fix-aes-ctr-counter-issue';
import resetAppsStateField from './reset-apps-state-field';

registerMigration(fixEasCounterIssue);
registerMigration(resetAppsStateField);

export default runMigrations;
