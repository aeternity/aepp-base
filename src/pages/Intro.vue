<template>
  <div class="intro">
    <div class="wrapper">
      <main>
        <img :src="require('@/assets/intro.svg')" />
        <p>
          æternity gives you easy access to the magic of blockchain technology. Instantly login or see how it works.
        </p>
      </main>

      <footer>
        <router-link :to="{ name: 'setup' }">
          <ae-button type="exciting" size="medium">
            Login
          </ae-button>
        </router-link>
        <router-link :to="{ name: 'setup' }">
          <ae-button type="plain" size="medium" uppercase>
            See how it works
          </ae-button>
        </router-link>
      </footer>
    </div>
  </div>
</template>

<script>
  import { AeButton } from '@aeternity/aepp-components'

  export default {
    components: { AeButton }
  }
</script>

<style lang="scss" scoped>
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .intro {
    height: 100%;
    display: flex;
    overflow: auto;

    .wrapper {
      margin: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      max-height: 600px;

      main {
        text-align: center;
        margin: auto;

        img, p {
          margin: 12px;
        }

        p {
          max-width: 300px;
          font-size: 18px;
          line-height: 1.56;
          color: $anthracite;
        }
      }

      footer {
        .ae-button {
          width: 260px;
          display: block;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>

<style lang="scss">
  .intro .ae-button .inner .label {
    margin: 0 auto;
  }
</style>
