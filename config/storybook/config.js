/* eslint-disable import/no-extraneous-dependencies */
import { configure, addDecorator } from '@storybook/vue';
import { withBackgrounds } from '@storybook/addon-backgrounds';
import { withNotes } from '@storybook/addon-notes';

addDecorator(withBackgrounds);
addDecorator(withNotes);

const req = require.context('../../src/stories', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
