<template>
  <div class="base-select__wrapper" :class="{'base-select__wrapper--error': isError}">
    <label
      v-if="subtitle"
      class="input__label"
    >
      {{ subtitle }}
    </label>
    <div class="base-select__body">
      <div :class="['base-select', {'is-active': isActive},]" v-click-outside="closeDropdown">
        
        <div class="base-select__box" :class="{'has-text': !label}" @click="isActive=!isActive">
          {{ label }}
        </div>
        <transition-group name="slide-from-top_short">
          <ul key="ul"
            v-if="isActive && items.length > 0"
            class="base-select__items">
            <li 
              class="base-select__item" 
              v-for="(item, index) in items" 
              :key="`base-select__item-${index}`"
            >
              <a class="" @click.prevent="setItem(item)">{{ item.country }} (+ {{item.dialCode}})</a>
            </li>
          </ul>
        </transition-group>
      </div>

      <div class="base-select__phone">
        <masked-input :mask="mask" ref="phoneMask" v-model="phone" @input="phoneHandler"/>
      </div>
    </div>

    <transition name="slide-from-top">
      <span
        v-if="isError"
        class="base-select__error"
      >
        {{ errorMsg }}
      </span>
    </transition>
  </div>
</template>

<script>
  import MaskedInput from 'vue-masked-input'
  import allCountries from '@/components/mock/country';
  import ClickOutside from 'vue-click-outside'
  export default {
    name: "BasePhoneNumber",

    directives: {
      ClickOutside
    },

    components: {
      MaskedInput
    },

    props: {
      subtitle: {
        type: String,
        default: ''
      },

      current: {
        type: String,
        default: ''
      },
      isError: {
        type: Boolean,
        default: false
      },
      errorMsg: {
        type: String,
        default: ''
      },
    },

    data() {
      return {
        items: allCountries.countries,
        isActive: false,
        label: null,
        mask: [],
        phone: null,
        currentCountry: null
      }
    },

    created() {
      this.createSelect();
    },

    mounted() {
    },
    
    
    methods: {
      setItem(item){
        this.$refs.phoneMask.$el.value = ''
        this.label = `${item.country} (+ ${item.dialCode})`
        this.currentCountry = item
        this.createMaskPhone(item.placeholder) 
        this.closeDropdown()
      },

      
      closeDropdown() {
        this.isActive = false;
      },

      createSelect() {
        if(!this.items && this.current) return
        this.currentCountry = this.items.find((item) => item.code.toLowerCase() === this.current.toLowerCase())
        this.label = `${this.currentCountry.country} (+ ${this.currentCountry.dialCode})`
        this.createMaskPhone(this.currentCountry.placeholder)
      },

      createMaskPhone(phone) {
        const arrayNumbers = phone.split('')
        const newString = []

        for (let i = 0; i < arrayNumbers.length; i++) {
          if(arrayNumbers[i] === ' ') {
            newString.push(' ')
          } else if(isNaN(arrayNumbers[i]) === true) {
            newString.push(arrayNumbers[i])
          } else {
            newString.push('1')
          }
        }
        this.mask = newString.join('')
      },

      phoneHandler() {
        this.$emit('checkPhone', {phone: this.phone, code: this.currentCountry.dialCode, mask: this.mask})
      },
    }
  }
</script>

<style lang="scss">
.base-select {
  display: flex;
  width: 100%;
  background: #FDFDFD;
  border: 1px solid #DBE2EB;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  max-width: 50%;
  position: relative;
  cursor: pointer;
  
  &__wrapper {
    width: 100%;
    margin-bottom: 25px;
  }

  &__body {
    display: flex;
    width: 100%;
  }

  &__box {
    display: flex;
    align-items: center;
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    line-height: 1.25;
    color: $c-text-color;
    width: 100%;
    height: 40px;
    padding: 0 12px;
    position: relative;

    &::after {
      display: block;
      position: absolute;
      right: 15px;
      top: 20px;
      width: 8px;
      height: 8px;
      border: 6px solid transparent; 
      border-top: 6px solid $c-text-color;
      content: '';
      transition: 0.3s;
    }
  }

  &__items {
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
  }

  &__item {
    display: flex;
    border-top: none;
    transition: 0.2s;

    &:not(:last-child) {
      border-bottom: 1px solid #f5f7fa;
    }


    a {
      padding: 10px 15px;
      display: flex;
      width: 100%;
      text-decoration: none;
      color: #333;
      cursor: pointer;

    }
  }

  &.is-active {
    .base-select__container {
      display: flex;
    }

    .base-select__box::after {
      transform: rotate(180deg);
      top: 15px;
    }
  }

  &--disabled {
    pointer-events: none;
    border-color: #f2f4f8;
  }

  &--error {
    border-color: $c-red;
  }

  &__phone {
    height: 42px;
    outline: none;
    max-width: calc(50% + 1px);
    margin-left: -1px;
    width: 100%;
    border: 1px solid #D8D8D8;
    padding: 0 12px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;

    input {
      border: none;
      outline: none;
      width: 100%;
      height: 100%;
      font-family: 'Lato', sans-serif;
      font-size: 16px;
      line-height: 1.25;
      color: $c-text-color;
    }
  }
}

.slide-from-top_short {
  &-leave-active {
    transition: 0.2s ease-in;
  }

  &-enter-active {
    transition: 0.4s ease-in;
  }

  &-enter-to,
  &-leave {
    opacity: 1;
    transform: translateY(0);
  }

  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(-25px);
  }
}

.slide-from-bottom_short {
  &-leave-active {
    transition: 0.2s ease-in;
  }

  &-enter-active {
    transition: 0.4s ease-in;
  }

  &-enter-to,
  &-leave {
    opacity: 1;
    transform: translateY(0);
  }

  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(+25px);
  }
}
</style>