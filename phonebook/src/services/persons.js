import axios from 'axios'
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson)
}

const deleteEntry = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newPerson) => {
    return axios.put(`${baseUrl}/${id}`, newPerson)
}

export default {getAll, create, deleteEntry, update}