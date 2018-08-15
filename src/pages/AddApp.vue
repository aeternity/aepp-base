<template>
  <mobile-page
    class="add-app"
    title="Add an æpp">
    <form @submit.prevent="addAppByUrl">
      <ae-label
        :for="`${_uid}-url`"
        :help-text="errors.first('url')"
        help-type="dramatic"
      >
        Enter æpp URL
      </ae-label>
      <ae-input
        v-validate="'url_http'"
        :id="`${_uid}-url`"
        v-model="url"
        name="url"
        placeholder="Æpp URL"
      />
      <div class="add-button-wrapper">
        <ae-button
          :inactive="!url || appAddingByUrl || errors.has('url')"
          class="add"
          plain
          type="dramatic"
          size="smaller"
          uppercase
        >
          <ae-icon
            v-if="!appAddingByUrl"
            slot="icon"
            name="plus"
            type="dramatic"
            size="small" />
          {{ appAddingByUrl ? 'Adding' : 'Add' }} æpp
        </ae-button>
      </div>
    </form>

    <ae-label :for="`${_uid}-search-term`">
      Search By Name
    </ae-label>
    <ae-input
      :id="`${_uid}-search-term`"
      v-model="searchTerm"
      placeholder="Æpp Name"
    >
      <ae-button
        v-show="searchTerm"
        slot="right"
        type="exciting"
        size="small"
        @click="searchTerm = ''"
      >
        <ae-icon
          slot="icon"
          type="exciting"
          invert
          name="close" />
      </ae-button>
    </ae-input>
    <ae-label>{{ searchTerm ? 'Search results' : 'All æpps' }}</ae-label>
    <template v-for="(app, idx) in apps">
      <ae-divider
        v-if="idx"
        :key="`${app.id}-divider`" />
      <div
        :key="`${app.id}-app`"
        :class="{ inactive: app.added }"
        class="app"
        @click="addApp(app.id)">
        <ae-app-icon
          :src="app.icon"
          :full-size="app.iconFullSize" />
        <div class="content">
          <h2>{{ app.name }}</h2>
          <ae-button
            :inactive="app.added"
            type="dramatic"
            size="smaller"
            uppercase>
            <ae-icon
              slot="icon"
              :name="app.added ? 'check' : 'plus'"
              type="dramatic"
              size="small"
            />
            {{ app.added ? 'Added' : 'Add æpp' }}
          </ae-button>
        </div>
      </div>
    </template>
  </mobile-page>
</template>

<script>
import Fuse from 'fuse.js';
import { mapState, mapActions } from 'vuex';
import {
  AeLabel,
  AeInput,
  AeButton,
  AeIcon,
  AeAppIcon,
  AeDivider,
} from '@aeternity/aepp-components';
import { DEFAULT_ICON, appsRegistry } from '../lib/appsRegistry';
import MobilePage from '../components/MobilePage';

const allApps = Object.entries(appsRegistry)
  .filter(([, { unremovable }]) => !unremovable)
  .map(([id, d]) => ({
    icon: DEFAULT_ICON,
    ...d,
    id,
  }));

const fuse = new Fuse(allApps, {
  tokenize: true,
  matchAllTokens: true,
  keys: ['name'],
});

export default {
  components: {
    AeLabel,
    AeInput,
    AeButton,
    AeAppIcon,
    AeIcon,
    AeDivider,
    MobilePage,
  },
  data: () => ({
    url: '',
    appAddingByUrl: false,
    searchTerm: '',
  }),
  computed: mapState({
    apps({ apps }) {
      return (this.searchTerm ? fuse.search(this.searchTerm) : allApps)
        .map(app => ({
          ...app,
          added: apps.some(a => a === app.id),
        }));
    },
  }),
  methods: {
    ...mapActions(['addApp']),
    async addAppByUrl() {
      if (!this.url || this.appAddingByUrl || !await this.$validator.validateAll()) return;
      this.appAddingByUrl = true;
      await this.addApp(this.url);
      this.$router.push({ name: 'apps' });
      this.appAddingByUrl = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@aeternity/aepp-components/dist/variables";

.add-app.mobile-page {
  /deep/ .panel {
    margin-top: 0;
  }

  .ae-button._size_smaller {
    padding-right: 0;
    padding-left: 0;

    .ae-icon {
      margin-left: 0;
      margin-right: 6px;
    }
  }

  .add-button-wrapper {
    text-align: right;
    margin-top: -20px;
    margin-bottom: 20px;
  }

  .app {
    display: flex;
    cursor: pointer;

    &.inactive {
      cursor: not-allowed;
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 15px;

      &:before, &:after {
        content: '';
      }

      h2 {
        margin: 0;
      }
    }
  }

  .ae-divider {
    margin: 16px 0;
  }
}
</style>
