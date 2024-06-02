import axios from "axios";
import config from "../config.json"

export const nova = axios.create({
	baseURL: "http://localhost:9082/api",
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
