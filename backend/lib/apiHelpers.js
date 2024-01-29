import axios from "axios";

export async function fetchNgrams(id1, id2) {
  const response = await axios.post('http://127.0.0.1:8000/ngrams/', { id1, id2 });
  return response.data;
}