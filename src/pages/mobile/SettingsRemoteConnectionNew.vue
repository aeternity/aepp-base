<template>
  <div />
</template>

<script>
export default {
  async mounted() {
    let data;
    do {
      if (data) {
        await this.$store.dispatch('modals/open', {
          name: 'alert',
          text: this.$t('remote-connection.settings.new.wrong-qr-code'),
        });
      }

      try {
        data = await this.$store.dispatch('modals/open', {
          name: 'readQrCode',
          title: this.$t('remote-connection.settings.new.title'),
        });
      } catch (e) {
        this.$router.push({ name: 'settings-remote-connection' });
        return;
      }

      data = Buffer.from(data, 'base64');
    } while (data.length !== 15);

    this.$store.commit('addFollower', {
      id: data.toString('base64'),
      name:
        prompt(this.$t('remote-connection.settings.new.prompt-name')) ||
        this.$t('remote-connection.settings.new.default-name'),
    });
    this.$router.push({ name: 'settings-remote-connection' });
  },
};
</script>
