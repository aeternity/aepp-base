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

<script src="./AddApp.js" />
<style lang="scss" src="./AddApp.scss" scoped />
