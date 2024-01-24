import runMigrations, { registerMigration } from './runner';
import removed from './00-removed';

registerMigration(removed);
registerMigration(removed);
registerMigration(removed);
registerMigration(removed);
registerMigration(removed);
registerMigration(removed);

export default runMigrations;
