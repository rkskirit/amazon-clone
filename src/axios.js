import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:5001/challenge-7a56c/us-central1/api", //Api url (cloud function)
});

export default instance;
