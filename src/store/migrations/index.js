import runMigrations, { registerMigration } from './runner';
import fixEasCounterIssue from './00-fix-aes-ctr-counter-issue';
import resetAppsStateField from './01-reset-apps-state-field';

registerMigration(fixEasCounterIssue);
registerMigration(resetAppsStateField);

export default runMigrations;
