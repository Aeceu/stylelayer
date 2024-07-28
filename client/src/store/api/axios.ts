import axios from "axios";

const production_url = "https://sstylelayer-h7gn.vercel.app";
// const local_url = "http://localhost:4200";

export default axios.create({
  baseURL: `${production_url}/api/v1`,
  withCredentials: true,
});
