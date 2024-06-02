import axios from "axios";
import config from "../config.json"

const initialLink = 'http://localhost:9082/'

export const calendario = axios.create({
	baseURL: initialLink,
	headers: {
		'Content-Type': 'application/json'
	}
})

export const filesApi = axios.create({
	baseURL: config.backend_url,
	headers: {
		'Content-Type': 'multipart/form-data'
	}
})
