import axios from 'axios'
const BASE_URL = 'http://localhost:8080/'
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})


const carApi = {
    get: () => instance.get('/car/get'),
    add:(car)=>instance.post('/car/add',car),
    update:(car)=>instance.post('/car/update',car),
    delete:(car)=>instance.post('/car/delete',car),
    search:(brand:String)=>instance.post('/car/search',brand)
}

export const api = {
  carApi : carApi
}
