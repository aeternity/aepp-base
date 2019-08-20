<template>
  <MobilePage
    :right-button-to="{ name: 'intro' }"
    right-button-icon-name="close"
    fill="neutral"
    hide-tab-bar
    header-fill="alternative"
    :title="$t('terms-and-conditions.title')"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Pellentesque porttitor, ipsum nec fermentum congue, mi magna feugiat odio,
    id fermentum sem nisi in enim. Proin leo felis, efficitur vel augue aliquam,
    vestibulum euismod nibh. Nulla tristique leo quis enim iaculis tempus.
    Ut scelerisque mollis ligula, sed maximus felis lobortis ut.
    Sed porta leo quis mauris ultrices sollicitudin. Nam risus eros, varius ac posuere eget,
    convallis quis elit. Nulla eu magna dolor.Duis ut tortor blandit, pulvinar mi vitae,
    lobortis nisl. Donec nisl lectus, imperdiet ac molestie in, scelerisque sed metus.
    Sed varius viverra felis, a rutrum turpis pharetra et.
    Interdum et malesuada fames ac ante ipsum primis in faucibus. In sed consectetur nulla.
    Praesent dictum elementum iaculis.
    Class aptent taciti sociosqu ad litora torquent per conubia nostra,
    per inceptos himenaeos. Integer rhoncus arcu sapien, eget vulputate sapien fermentum sit amet.
    Nulla ac leo eu libero iaculis tristique. Pellentesque a arcu vestibulum, viverra lorem nec,
    vehicula lacus. Cras non sagittis neque. Vestibulum volutpat enim quis nunc pulvinar,
    a tempus magna efficitur. Proin mi sem, porta tempus rutrum auctor, condimentum vitae velit.
    Ut porta neque in urna venenatis posuere. Duis a rutrum ipsum. In hac habitasse platea dictumst.
    Maecenas quis libero sed nibh eleifend euismod vel at diam.
    Suspendisse cursus ex non libero scelerisque, a condimentum metus aliquam.
    Ut aliquet, risus in placerat faucibus, sem felis aliquet massa,
    eget pretium enim dui nec diam. Quisque mollis augue tellus,
    vitae bibendum turpis vestibulum eget. Sed vitae dignissim orci, ac varius orci.
    Ut eget nisi enim. Nunc sit amet justo vitae nunc tempor condimentum in id ligula.
    Proin consectetur ullamcorper velit viverra ultrices.
    Phasellus sollicitudin urna ac est tristique maximus.
    Vivamus tincidunt turpis lorem, ut gravida enim aliquet aliquam.
    Curabitur tincidunt quis justo ac posuere. Duis commodo odio magna,
    vel consequat metus viverra nec. Vestibulum lobortis maximus augue id ornare.
    Mauris in tellus sapien. Suspendisse faucibus rutrum ultricies.
    Proin ullamcorper fringilla mi ac iaculis.
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
    Donec placerat elementum vulputate. Praesent justo augue, finibus et massa ac,
    mollis molestie quam. Orci varius natoque penatibus et magnis dis parturient montes,
    nascetur ridiculus mus. Cras malesuada malesuada nulla quis elementum.
    Vestibulum id convallis mauris. Aliquam enim risus, aliquam nec malesuada id,
    eleifend quis nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus.
    Nullam cursus libero turpis, vel rhoncus nunc finibus in.
    Cras tincidunt velit id mollis hendrerit.
    Praesent sed arcu sit amet est mattis facilisis eget at neque.
    Vivamus vitae eleifend libero, a viverra ligula. Donec vel elementum nisl.
    Duis purus lectus, placerat et accumsan blandit, semper vel massa.
    Mauris id nisi eu lacus lacinia gravida.
  </MobilePage>
</template>

<script>
import MobilePage from '../../components/mobile/Page.vue';

export default {
  components: { MobilePage },
};
</script>

<style lang="scss" scoped>
@import '../../styles/placeholders/typography.scss';

.mobile-page {
  /deep/ {
    main {
      padding-top: rem(32px);
    }
  }
  @extend %face-sans-s;
}
</style>
