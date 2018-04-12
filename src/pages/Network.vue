<template>
  <div class="network screen">
    <h1>Network</h1>
    <ae-panel
      v-if="ready"
      v-for='o, i in options'
    >
      <header>
        <h2>{{ o.label }}</h2>
      </header>
      <code>
        <span v-if='o.nodeSettings.secured'>https</span><span v-else>http</span>://{{o.nodeSettings.host}}:{{o.nodeSettings.port}}
      </code>
      <div class="grid">
        <ae-button :inactive='nodeSettings.host === o.nodeSettings.host' @click="removeNetwork(i)" type='dramatic'>
          <ae-icon slot='icon' invert type='dramatic' name='close' />
          remove
        </ae-button>
        <ae-button :inactive='nodeSettings.host === o.nodeSettings.host' @click="updateNetwork(o)" type='exciting'>
          <ae-icon slot='icon' invert type='exciting' name='check' />
          activate
        </ae-button>
      </div>
    </ae-panel>
    <fixed-add-button @click='showAddOverlay = true'/>

    <ae-modal v-if='showAddOverlay' title="Add Network">
      <ae-label>Label</ae-label>
      <ae-input v-model="newOptionToAdd.label"/>
      <ae-label>Secure</ae-label>
      <label class="container">Secure
        <input type="radio" v-model="newOptionToAdd.secured" :value="true">
        <span class="checkmark"></span>
      </label>
      <label class="container">
        Non Secure
        <input type="radio" v-model="newOptionToAdd.secured" :value="false">
        <span class="checkmark"></span>
      </label>
      <ae-label>Host</ae-label>
      <ae-input placeholder='example.com' v-model="newOptionToAdd.host"/>
      <ae-label>Port</ae-label>
      <ae-input v-model="newOptionToAdd.port"/>
      <div class="grid">
        <ae-button @click='showAddOverlay = false' type='boring'>
          Cancel
        </ae-button>
        <ae-button @click='addNetwork' type='dramatic'>
          Add
        </ae-button>
      </div>
    </ae-modal>
    <quick-id showBackButton/>
  </div>
</template>


<script>
import { mapState } from 'vuex'
import {
  AeSwitch,
  AeButton,
  AeInput,
  AePanel,
  AeLabel,
  AeModal,
  AeIcon,
  AeAmountInput
} from '@aeternity/aepp-components'
import QuickId from '@/components/QuickId.vue'
import FixedAddButton from '@/components/FixedAddButton.vue'
import ModalPage from '@/components/ModalPage.vue'

export default {
  name: 'network',
  data () {
    return {
      addCustom: false,
      custom: '',
      current: 0,
      ready: false,
      showAddOverlay: false,
      newOptionToAdd: {

        label: 'New Network',
        host: '',
        port: 443,
        secured: true
      },
      options: [
        {
          label: 'Devnet',
          value: 0,
          nodeSettings: {
            host: 'sdk-testnet.aepps.com',
            port: 443,
            secured: true
          }
        },
        {
          label: 'Localhost',
          value: 1,
          nodeSettings: {
            host: 'localhost',
            port: 3013,
            secured: false
          }
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'nodeSettings'
    ])
  },
  methods: {
    updateNetwork (newVal) {
      this.$store.commit('setNodeSettings', newVal.nodeSettings)
    },
    removeNetwork (index) {
      this.options.splice(index, 1)
      this.saveNetworks()
      console.log(index)
    },
    saveNetworks () {
      localStorage.setItem(
        'networks',
        JSON.stringify(this.options)
      )
    },
    addNetwork () {
      this.options.push({
        label: this.newOptionToAdd.label,
        value: this.options.length,
        nodeSettings: {
          host: this.newOptionToAdd.host,
          port: this.newOptionToAdd.port,
          secured: this.newOptionToAdd.secured
        }
      })
      this.saveNetworks()
      this.showAddOverlay = false
    }
  },
  components: {
    AeSwitch,
    AeButton,
    AePanel,
    AeIcon,
    AeInput,
    AeLabel,
    AeModal,
    FixedAddButton,
    ModalPage,
    AeAmountInput,
    QuickId
  },
  mounted () {
    // let url = this.$store.state.rpcUrl
    let host = this.nodeSettings.host
    let key = this.options.findIndex((option) => option.nodeSettings.host.toLowerCase() === host.toLowerCase())
    if (key > -1) {
      this.current = key
    }
    try {
      let options = JSON.parse(localStorage.getItem('networks'))
      if (options.length > 0) {
        this.options = options
      }
    } catch (e) {
      /* handle error */
    }
    this.ready = true
  },
  destroyed () {
    this.ready = false
  }
}
</script>

<style lang="scss" scoped>
.network button, .network input, .network h1 {
  margin:20px auto;
  display: block;
  text-align: center;
}
.network .status {
  margin: 20px auto;
  max-width: 600px;
}
.grid {
  display:flex;
}
/* The container */
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.container input[type=radio] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.container .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container:hover input[type=radio] ~ .checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.container input[type=radio]:checked ~ .checkmark {
  $aubergine: #311b58;
  background-color: $aubergine;
}
</style>
