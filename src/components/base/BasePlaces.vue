<template>
  <div :class="['input-wrapper', { 'input-wrapper--error': isError }]">
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
        ref="input"
        :value="value"
        v-bind="$attrs"
        :class="['input__field', textFieldClasses]"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      >
    <transition name="slide-from-top">
      <ul class="input-list" v-if="items && isActive" v-click-outside="closeDropdown">
        <li 
          class="input-list__item"
          v-for="item in items"
          :key="item.place_id"
          @click="selectAddress(item.description)"
        >
          {{item.description}}
        </li>
      </ul>
    </transition>
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
import axios from '@/plugins/axios'
import ClickOutside from 'vue-click-outside'

  const TOKEN = 'AIzaSyBWpKHiyXYW4A4K789n0hTBNLJB-N1bmIE'

  export default {
    name: 'BasePlaces',

    directives: {
      ClickOutside
    },

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
    },
    data () {
      return {
        isOnFocus: false,
        isActive: false,
        items: null,
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
        this.value.length > 0 ? this.getPlaces(this.value) : this.items = null
      },
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

      async getPlaces(place) {
        this.isActive = true
        const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=${TOKEN}&input=${place}`
          )

        this.items = {...this.items, ...data.predictions}

      },

      closeDropdown() {
        this.items = null
        this.isActive = false
      },

      selectAddress(address) {
        this.$emit('input', address)
        setTimeout(() => {
          this.closeDropdown()
        }, 100);
      }
    }
  }
</script>

<style lang="scss">
  .input {

    &-list {
      position: absolute;
      left: 0;
      top: calc(100% + 1px);
      left: -1px;
      display: flex;
      width: calc(100% + 2px);
      flex-direction: column;
      max-height: 200px;
      overflow-y: scroll;
      background-color: $c-white;
      box-shadow: 0px 4px 11px rgba(8, 79, 131, 0.11);
      border-radius: 5px;
      border: 1px solid #D8D8D8;
      z-index: 1;

      &__item {
        display: flex;
        border-top: none;
        padding: 10px 15px;
        transition: 0.2s;
        font-family: 'Lato', sans-serif;
        font-size: 16px;
        line-height: 1.25;
        color: $c-text-color;
        cursor: pointer;

        &:not(:last-child) {
          border-bottom: 1px solid #f5f7fa;
        }
      }
    }
  }
</style>
