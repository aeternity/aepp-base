<template>
  <div
    class="guide"
    :class="[fill, size, { 'has-icon': $slots.icon }]"
  >
    <span
      v-if="$slots.icon"
      class="icon"
    >
      <slot name="icon" />
    </span>

    <TemplateRenderer
      v-if="template"
      class="content"
      :node="templateRootNode"
      :slots="$slots"
    />
    <div
      v-else
      class="content"
    >
      <slot />
    </div>
  </div>
</template>

<script>
const renderNodeContent = (createElement, node, slots) => (!node.childNodes.length
  ? node.textContent
  : Array.from(node.childNodes)
    .filter((n) => [Node.ELEMENT_NODE, Node.TEXT_NODE].includes(n.nodeType))
    .map((n) => {
      switch (n.tagName) {
        case 'primary':
          return createElement('em', renderNodeContent(createElement, n, slots));
        case 'secondary':
          return createElement('mark', renderNodeContent(createElement, n, slots));
        case 'alternative':
          return createElement('strong', renderNodeContent(createElement, n, slots));
        case 'br':
          return createElement('br');
        case 'p':
          return createElement('p', renderNodeContent(createElement, n, slots));
        case undefined:
          return n.textContent;
        default:
          return slots[n.tagName];
      }
    }));

const TemplateRenderer = {
  functional: true,
  props: {
    node: { type: Node, required: true },
    slots: { type: Object, required: true },
  },
  render(createElement, { data, props }) {
    return createElement(
      'div',
      { class: data.staticClass },
      renderNodeContent(createElement, props.node, props.slots),
    );
  },
};

export default {
  components: { TemplateRenderer },
  props: {
    fill: {
      type: String,
      validator: (value) => [
        'primary',
        'alternative',
        'neutral',
      ].includes(value),
      default: 'primary',
    },
    size: {
      type: String,
      validator: (value) => ['small', 'medium', 'big'].includes(value),
      default: 'medium',
    },
    template: {
      type: String,
      default: '',
    },
  },
  computed: {
    templateRootNode() {
      return new DOMParser()
        .parseFromString(`<root>${this.template}</root>`, 'text/xml').childNodes[0];
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../styles/variables';
@use '../styles/functions';
@use '../styles/typography';

.guide {
  display: flex;
  margin-bottom: functions.rem(27px);

  &.small {
    @extend %face-sans-base;
    margin-bottom: functions.rem(20px);
  }

  &.medium {
    @extend %face-sans-l;
  }

  &.big {
    font-family: variables.$font-sans;
    font-size: functions.rem(30px);
    line-height: functions.rem(39px);
    margin-bottom: functions.rem(15px);
  }

  > .icon {
    flex-shrink: 0;
    width: functions.rem(30px);
    padding-left: functions.rem(6px);
  }

  .content {
    font-weight: 500;
    letter-spacing: -0.5px;

    img {
      width: functions.rem(23px);
    }

    img, .ae-identicon {
      vertical-align: middle;
    }

    em {
      font-style: normal;
    }

    mark, strong {
      font-weight: 500;
    }

    mark {
      color: variables.$color-secondary;
      background: none;
    }

    strong {
      color: variables.$color-alternative;
    }

    p {
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &.primary {
    > .icon {
      color: variables.$color-primary;
    }

    .content {
      color: variables.$color-neutral-negative-3;

      em {
        color: variables.$color-primary;
      }
    }
  }

  &.neutral {
    > .icon {
      color: variables.$color-neutral-maximum;
    }

    .content {
      color: rgba(255, 255, 255, 0.66846);

      em,
      .account-inline {
        color: variables.$color-neutral-maximum;
      }
    }
  }

  &.alternative {
    > .icon {
      color: variables.$color-alternative;
    }

    .content {
      color: variables.$color-neutral-negative-3;

      em {
        color: variables.$color-alternative-negative-1;
      }
    }
  }
}
</style>
