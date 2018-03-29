<template>
  <ae-modal class="add-app" title="Add an æpp" @close="goToApps">
    <form @submit.prevent="addAppByUrl">
      <ae-label
        :for="`${_uid}-url`"
        help-type="danger"
        :help-text="errors.first('url')"
      >
        Enter æpp URL
      </ae-label>
      <ae-input
        :id="`${_uid}-url`"
        name="url"
        placeholder="Æpp URL"
        v-model="url"
        v-validate="'url_http'"
      />
      <div class="add-button-wrapper">
        <ae-button
          class="add"
          plain
          type="dramatic"
          size="smaller"
          uppercase
          :inactive="!url || appAddingByUrl || errors.has('url')"
        >
          <ae-icon v-if="!appAddingByUrl" slot="icon" name="plus" type="dramatic" size="small" />
          {{appAddingByUrl ? 'Adding' : 'Add'}} æpp
        </ae-button>
      </div>
    </form>

    <ae-label :for="`${_uid}-search-term`">
      Search By Name
    </ae-label>
    <ae-input
      :id="`${_uid}-search-term`"
      placeholder="Æpp Name"
      v-model="searchTerm"
    >
      <ae-button
        slot="right"
        type="exciting"
        size="small"
        @click="searchTerm = ''"
        v-show="searchTerm"
      >
        <ae-icon slot="icon" type="exciting" invert name="close" />
      </ae-button>
    </ae-input>
    <ae-label>{{searchTerm ? 'Search results' : 'All æpps'}}</ae-label>
    <template v-for="(app, idx) in apps">
      <ae-divider v-if="idx" />
      <div class="app" :class="{ inactive: app.added }" @click="addApp(app)">
        <ae-app-icon :src="app.icon" />
        <div class="content">
          <h2>{{app.name}}</h2>
          <ae-button type="dramatic" size="smaller" uppercase :inactive="app.added">
            <ae-icon
              slot="icon"
              :name="app.added ? 'check' : 'plus'"
              type="dramatic"
              size="small"
            />
            {{app.added ? 'Added' : 'Add æpp'}}
          </ae-button>
        </div>
      </div>
    </template>

    <quick-id />
  </ae-modal>
</template>

<script src="./AddApp.js" />
<style lang="scss" src="./AddApp.scss" scoped />
