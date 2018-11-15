import runMigrations, { registerMigration } from './runner';
import fixEasCounterIssue from './fix-aes-ctr-counter-issue';

registerMigration(fixEasCounterIssue);

export default runMigrations;
