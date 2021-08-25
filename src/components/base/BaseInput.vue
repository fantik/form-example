<template>
  <div :class="['input-wrapper', { 'input-wrapper--error': isError }, { 'input-wrapper--disabled': disabled }]">
    <label
      v-if="label"
      :for="id"
      class="input__label"
    >
      {{ label }}
    </label>
    <div class="input__field-container">
      <input
        :id="id"
        v-if="!isEmail"
        ref="input"
        :value="value"
        v-bind="$attrs"
        :class="['input__field', {textarea: isEmail}, textFieldClasses]"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      >
      <input
        :id="id"
        v-else
        ref="input"
        v-bind="$attrs"
        :value="value"
        :class="['input__field', {textarea: isEmail}, textFieldClasses]"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur" 
      />

    </div>
    <transition name="slide-from-top">
      <span
        v-if="isError"
        class="input__error-msg"
      >
        {{ errorMsg }}
      </span>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'BaseInput',

    inheritAttrs: false,

    props: {
      value: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      },
      errorMsg: {
        type: String,
        default: ''
      },
      isError: {
         type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
    },
    data () {
      return {
        isOnFocus: false,
      }
    },
    computed: {
      id () {
        return `input-${this._uid}`
      },

      required () {
        return 'required' in this.$attrs && this.$attrs.required
      },

      isEmail () {
        return this.$attrs.type === 'email'
      },

      textFieldClasses () {
        return [
          { 'input__field_focus': this.isOnFocus },
          { 'input__field_has-content': this.value }
        ]
      },
    },


    watch: {
    },

    methods: {
      onInput (e) {
        this.$emit('input', e.target.value)
        if (this.isEmail) {
          this.valueLength = e.target.value.length
        }
      },

      onChange (e) {
        this.$emit('change', e.target.value)
      },

      onFocus () {
        this.isOnFocus = true

        this.$emit('focus')
      },

      onBlur () {
        this.isOnFocus = false

        this.$emit('blur')
      },
    }
  }
</script>

<style lang="scss">
  .input {
    &-wrapper {
      position: relative;
      width: 100%;
      padding-bottom: 25px;

      &--error {
        .input__field {
          border-color: $c-red;

          @include placeholder {
            color: $c-red;
          }
        }
      }

      &--small {
        width: calc(50% - 15px);
      }
    }

    &_disabled {
      pointer-events: none;
    }

    &__label {
      display: inline-block;
      font-size: 11px;
      line-height: 13px;
      text-transform: uppercase;
      color: $c-text-color;
      margin-bottom: 8px;
      font-weight: 700;
    }

    &__field {
      display: block;
      width: 100%;
      font-size: 16px;
      line-height: 1.25;
      padding: 10px 12px;
      border: 1px solid #D8D8D8;
      border-radius: 5px;
      outline: none;
      appearance: none;
      transition: 0.3s;

      @include mobile {
        padding: 11px;
        font-size: 16px;
      }


      @include placeholder {
        @include mobile {
          font-size: 14px;
        }
      }

      &:invalid {
        box-shadow: none;
      }

      &-container {
        position: relative;
      }

      @include hover {
        border-color: $c-black;
      }


      &_has-content,
      &_focus {
        border-color: $c-black;
      }

      &-password {
        padding-right: 35px;
      }
    }

    &__error-msg {
      position: absolute;
      bottom: 5px;
      left: 0;
      font-size: 14px;
      line-height: 1.34;
      color: $c-red;
    }
  }
</style>
