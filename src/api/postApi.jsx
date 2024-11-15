import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

// get Data

export const getData = () => {
  return api.get("/posts");
};


// delete data 

export const deleteData = (id) =>{  
    return api.delete(`/posts/${id}`)
}

// update data post methods

export const postData = (post) =>{
    return api.post("/posts", post)
}

export const updateData = (id, post) =>{
  return api.put(`/posts/${id}`, post)
}