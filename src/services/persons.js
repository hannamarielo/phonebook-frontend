import React from "react";
import axios from 'axios'

const baseURL = 'http://localhost:3001/api/persons'


const getAllPersons = () => {
    const request = axios.get(baseURL)
    return request.then(response => {
      return response.data
    })
  }

const createPerson = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => {
        return response.data
    })
}

const updatePerson = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject);
    return request.then(response => response.data);
  };
  

const removePerson = id => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => {
        return response.data
    })
}

export default { getAllPersons, createPerson, updatePerson, removePerson}