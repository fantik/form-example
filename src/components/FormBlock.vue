<template>
  <div class="form">
    <!-- form-hrader -->
    <div class="form-header">
      <div class="form__title">{{isSuccess ? 'Success' :title}}</div>
    </div>

    <form  
      ref="form"
      novalidate
      v-if="!isSuccess"
    >
      <!-- form-body -->
      <div class="form-body">
  
        <!-- firstName-input  -->
        <BaseInput 
          label="First name"
          type="text"
          class="input-wrapper--small"
          errorMsg="First name is required"
          v-model="formData.firstName"
          @blur="$v.formData.firstName.$touch"
          :isError="$v.formData.firstName.$error"
        />
  
        <!-- lastName-input  -->
        <BaseInput 
          label="Last name"
          type="text"
          class="input-wrapper--small"
          errorMsg="Last name is required"
          v-model="formData.lastName"
          @blur="$v.formData.lastName.$touch"
          :isError="$v.formData.lastName.$error"
        />
  
        <!-- email-input  -->
        <BaseInput 
          label="Email"
          type="email"
          class="input-wrapper--small"
          errorMsg="Email must be valid"
          v-model="formData.email"
          @blur="$v.formData.email.$touch"
          :isError="$v.formData.email.$error"
        />
  
        <!-- agreement-input  -->
        <BaseCheckbox
          v-model="formData.agreement"
          class="input-wrapper--small"
          label="Send me email in plain text"
        />
        
        <!-- personal-phone-number  -->
        <BasePhoneNumber 
          current="us"
          subtitle="Personal phone number"
          v-model="formData.personalPhone"
          @checkPhone="checkPhoneNumber($event,'personalPhone')"
          errorMsg="Wrong personal phone number"
          @blur="$v.formData.personalPhone.$touch"
          :isError="$v.formData.personalPhone.$error"
          :isClean="cleanNumber"
        />
  
        <!-- companyName-input  -->
        <BaseInput 
          label="Company name"
          type="text"
          errorMsg="Company name is required"
          v-model="formData.companyName"
          @blur="$v.formData.companyName.$touch"
          :isError="$v.formData.companyName.$error"
        />
  
        <!-- companyaddress-autocomplete -->
        <BasePlaces 
          label="Company address"
          errorMsg="Company address is required"
          v-model="formData.place"
          @blur="$v.formData.place.$touch"
          :isError="$v.formData.place.$error"
        />
        
        <!-- company-phone-number  -->
        <BasePhoneNumber 
          current="us"
          subtitle="Company phone number"
          v-model="formData.companyPhone"
          @checkPhone="checkPhoneNumber($event,'companyPhone')"
          errorMsg="Wrong company phone number"
          @blur="$v.formData.companyName.$touch"
          :isError="$v.formData.companyName.$error"
          :isClean="cleanNumber"
        />
  
        <!-- companyName-input  -->
        <BaseInput 
          label="Job title"
          type="text"
          errorMsg="Job title is required"
          v-model="formData.job"
          @blur="$v.formData.job.$touch"
          :isError="$v.formData.job.$error"
        />
  
        <!-- Password-input -->
        <BasePassword 
          label="Password"
          type="password"
          class="input-wrapper--small"
          errorMsg="Field is required(min 10 symbols)"
          v-model="formData.password"
          :showWeakness='true'
          @blur="$v.formData.password.$touch"
          :isError="$v.formData.password.$error"
        />
  
        <!-- Confirm password-input -->
        <BaseInput 
          label="Confirm password"
          type="password"
          class="input-wrapper--small"
          errorMsg="Field is required(min 10 symbols)"
          v-model="formData.confirmPassword"
          @blur="$v.formData.confirmPassword.$touch"
          :isError="$v.formData.confirmPassword.$error"
        />
  
  
        <BaseCheckbox
          v-model="formData.privacy"
          label="Accept <a target='_blank' href='./lorem-ipsum.pdf'>Privacy Policy</a>"
        />
  
      </div>
  
      <div class="form-footer">
        <button 
          class="form-submit"
          :class="[{'form-submit--disabled': !isDisabled && !formData.privacy}]"
          @click.prevent="submit"
        >
          {{btnLabel}}
        </button>
      </div>
    </form>

    <div class="form-success" v-if="isSuccess">
      <span class="form-success__description">Your Form has been submitted, return to the form? </span>
        <button 
          class="form-submit"
          @click.prevent="isSuccess = false"
        >
          return
        </button>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import { validationMixin } from 'vuelidate'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'



export default {
  name: 'FormBlock',

  mixins: [validationMixin],

  props: {
    title: {
      type: String,
      default: ''
    },
    btnLabel: {
      type: String,
      default: ''
    },
  },

  data() {
    return {
      isDisabled: false,
      isSuccess: true,
      cleanNumber: false,
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        agreement: false,
        companyName: '',
        personalPhone: '',
        place: '',
        companyPhone: '',
        job: '',
        password: '',
        confirmPassword: '',
        privacy: false,
      },
    }
  },
  
  validations: {
    formData: {
      firstName: {
        required,
        minLength: minLength(3),
      },
      lastName: {
        required,
        minLength: minLength(3),
      },
      email: {
        required,
        email
      },
      companyName: {
        required,
        minLength: minLength(3),
      },
      personalPhone: {
        required,
        minLength: minLength(5),
      },
      companyPhone: {
        required,
        minLength: minLength(5),
      },
      place: {
        required,
      },
      job: {
        required,
        minLength: minLength(3),
      },
      password: {
        required,
        minLength: minLength(10),
      },
      confirmPassword: {
        required,
        minLength: minLength(10),
        sameAsPassword: sameAs('password')
      }
    }
  },

  mounted() {
  },

  methods: {
    checkPhoneNumber(e, param) {
      this.formData[param] = `+${e.code} ${e.phone}`
    },

    resetForm () {
      Object.keys(this.formData).forEach(param => {
        if (param === 'type') return
        if (Array.isArray(this.formData[param])) {
          this.formData[param] = []
        } else if (this.formData[param] instanceof Object) {
          this.formData[param] = {}
        } else {
          this.formData[param] = ''
        }
      })
      this.cleanNumber = true

      // if (this.$refs.form) this.$refs.form.reset()
    },

    submit() {
      this.$v.$touch()
      if(this.$v.$error) return
      console.log('azazazaza')

      const body = new FormData()
      Object.entries(this.formData).forEach(([param, data]) => {
          body.append(param, data)
      })

     this.post(body)
      // this.resetForm() 

      // setTimeout(() => {
      //   this.$v.$reset();
      // }, 4000);
    },

    async post (body) {
      console.log('opapapap')
      this.isDisabled = true
      try {
        const { data } = await axios.post('http://httpstat.us/200', body, {
          headers: {
            'content-type': 'application/vnd.api+json'
          }
        })
        // this.$emit('success', data)

        console.log(data)

        this.resetForm() 
        this.$v.$reset();
      } catch (e) {
        this.$emit('error')
      } finally {
        this.isDisabled = false
      }
    }
  }
}
</script>

<style lang="scss">
.form {
  background-color: $c-white;
  width: 100%;
  max-width: 670px;
  margin: auto;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
  padding: 50px;

  &__title {
    text-align: center;
    font-size: 24px;
    line-height: 29px;
    font-weight: 700;
    color: $c-text-color;
  }

  &-body {
    margin-top: 40px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  &-footer {
    margin-top: 15px;
    border-top: 1px solid #DADADA;
    display: flex;
  }

  &-submit {
    cursor: pointer;
    background-color: #E9C864;
    color: $c-text-color;
    font-size: 16px;
    line-height: 42px;
    min-width: 270px;
    border-radius: 5px;
    border: none;
    margin-top: 25px;
    margin-left: auto;
    transition: 0.4s ease;

    @include hover {
      background-color: #e2b736;
    }

    &--disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }

  &-success {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__description {
      margin-top: 30px;
      margin-bottom: 20px;
    }

    .form-submit {
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
