<template>
  <div :class="['input-wrapper', { 'input-wrapper--error': isError }, info && showWeakness ? `input-wrapper--${info}` : '']">
    <label
      v-if="label"
      :for="id"
      class="input__label"
    >
      {{ label }}
    </label>
    <span class="input-info" v-if="info && showWeakness">{{info}}</span>
    <div class="input__field-container">
      <input
        :id="id"
        ref="input"
        :value="value"
        v-bind="$attrs"
        :class="['input__field', 'input__field-password', textFieldClasses]"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      >
        <svg width="24" height="24" class="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="changeTypeField">
          <path d="M20 11.5C20 12.8686 19.19 14.2192 17.6528 15.2709C16.1205 16.3193 13.9482 17 11.5 17C9.05185 17 6.87953 16.3193 5.34717 15.2709C3.81002 14.2192 3 12.8686 3 11.5C3 10.1314 3.81002 8.78085 5.34717 7.72911C6.87953 6.68066 9.05185 6 11.5 6C13.9482 6 16.1205 6.68066 17.6528 7.72911C19.19 8.78085 20 10.1314 20 11.5Z" fill="white" stroke="#979797" stroke-width="2"/>
          <circle cx="11.5" cy="11.5" r="2.5" fill="white" stroke="#979797" stroke-width="2"/>
          <path d="M3.5 17.5L19.3064 5.90863" stroke="#979797" stroke-linecap="square" v-if="!showPassword"/>
        </svg>
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
    name: 'BasePassword',

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
      showWeakness: {
        type: Boolean,
        default: false
      },
    },
    data () {
      return {
        isOnFocus: false,
        showPassword: false,
        info: '',
        weakness: {
          weak: false,
          medium: false,
          strong: false,
        }
      }
    },
    computed: {
      id () {
        return `input-${this._uid}`
      },

      required () {
        return 'required' in this.$attrs && this.$attrs.required
      },

      textFieldClasses () {
        return [
          { 'input__field_focus': this.isOnFocus },
          { 'input__field_has-content': this.value }
        ]
      },
    },


    watch: {
      value() {
        if(this.value.length > 9) {
          this.checkWeakness(this.value)
        } else {
          this.resetWeakness()
          this.info = ''
        }
      }
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

      resetWeakness(param) {
        for (const key in this.weakness) {
          this.weakness[key] = false
        }
        this.weakness[param] = true
        this.info = param
      },

      checkWeakness(str) {
        this.resetWeakness('weak')
        // eslint-disable-next-line
        if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str)) {
          this.resetWeakness('strong')
      // eslint-disable-next-line
        } else if(/[A-Z]/.test(str)) {
          this.resetWeakness('medium')
        }
      },

      changeTypeField() {
        this.showPassword = !this.showPassword
        this.$refs.input.type = this.$refs.input.type === 'password' ? 'text' : 'password'
      }
    }
  }
</script>

<style lang="scss">
  .input {
    &-icon {
      cursor: pointer;
      z-index: 1;
      position: absolute;
      right: 10px;
      top: 10px;
    }

    &-wrapper {
      &--weak {
        .input-info {
          color: $c-red;
        }

        .input__field {
          border-bottom: 3px solid $c-red;
        }
      }

      &--medium {
        .input-info {
          color: #E9C864;
        }

        .input__field {
          border-bottom: 3px solid #E9C864;
        }
      }

      &--strong {
        .input-info {
          color: #008405;
        }

        .input__field {
          border-bottom: 3px solid #008405;
        }
      }
    }

    &-info {
      position: absolute;
      right: 0;
      top: 5px;
      font-size: 11px;
      line-height: 13px;
      text-transform: uppercase;
    }
  }
</style>
