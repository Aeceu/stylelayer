import axios from "axios";

const baseURL = "https://stylelayer-h7gn.vercel.app";
// const baseURL = "http://localhost:4200";

export default axios.create({
  baseURL: `${baseURL}/api/v1`
});
