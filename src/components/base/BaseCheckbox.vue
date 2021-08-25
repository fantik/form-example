<template>
  <label class="form-checkbox">
    <!--Input-->
    <input
      :id="id"
      ref="input"
      class="form-checkbox__input"
      :checked="value"
      type="checkbox"
      @input="onInput"
    >
    <div class="form-checkbox__icon" />

    <span class="form-checkbox__label" v-html="label" />

  </label>
</template>

<script>

  export default {
    name: 'BaseCheckbox',

    props: {
      value: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ''
      }
    },

    computed: {
      id () {
        return `input-${this._uid}`
      },
    },

    methods: {
      onInput (event) {
        this.$emit('input', event.target.checked)
      }
    }
  }
</script>

<style lang="scss">
.form-checkbox {
  position: relative;
  display: flex;
  align-items: center;

  &__label {
    display: flex;
    font-size: 11px;
    line-height: 13px;
    font-weight: 700;
    text-transform: uppercase;
    color: $c-text-color;
    letter-spacing: 1px;

    a {
      font-size: 11px;
      line-height: 13px;
      font-weight: 700;
      text-transform: uppercase;
      color: #5B62FF;
      letter-spacing: 1px;
      display: inline-block;
      margin-left: 5px;
      transition: 0.3s;

      @include hover {
        text-decoration: none;
      }
    }
  }

  &__input {
    display: none;

    &:checked + .form-checkbox__icon {
      background-color: $c-grey;
      border-color: $c-grey;

      &::before {
        opacity: 1;
      }
    }
  }

  &__icon {
    position: relative;
    width: 16px;
    height: 16px;
    border: 1px solid $c-grey;
    margin-right: 14px;
    transition: 0.3s;
    border-radius: 3px;
    cursor: pointer;

    &::before {
      position: absolute;
      top: 1px;
      left: 5px;
      width: 5px;
      height: 9px;
      border-right: 2px solid $c-white;
      border-bottom: 2px solid $c-white;
      opacity: 0;
      transition: 0.3s;
      content: '';
      transform: rotate(45deg);
    }
  }

    @include hover {
    .form-checkbox__icon {
      border-color: $c-black;
    }
  }
  &.input-wrapper--small .form-checkbox__label {
    max-width: 155px;
  }
}
</style>
