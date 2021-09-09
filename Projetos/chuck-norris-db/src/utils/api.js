import axios from "axios"

const api = axios.create({
    baseURL: 'https://api.icndb.com/',
    timeout: 5000
})

const getAllCategories = () => api.get('/categories')

const getRandomJoke = ({ count = 1, firstName = null, lastName = null, categories = null, categoryAction = 'include' } = {}) => {
    const params = {}
    if (firstName) {
        params.firstName = firstName
    }
    if (lastName) {
        params.lastName = lastName
    }
    if (categories) {
        params[categoryAction] = `[${encodeURI(categories)}]`
    }
    return api.get(`/jokes/random/${count}`, { params })
}

export {
    getAllCategories,
    getRandomJoke
}