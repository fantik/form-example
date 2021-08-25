import axios from 'axios'

const $axios = axios.create({
  baseURL: process.env.VUE_API_URL
})

export default $axios
