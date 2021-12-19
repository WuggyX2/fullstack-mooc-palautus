import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getAll = async () => {
    const config = {
        headers: { Authorization: token },
    };

    const request = await axios.get(baseUrl, config);
    return request.data;
};

const update = async (id, newObject) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
    return response.data;
};

const createNew = async (newBlog) => {
    const config = {
        headers: { Authorization: token },
    };

    const result = await axios.post(baseUrl, newBlog, config);
    return result.data;
};

const remove = async (id) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
};

// eslint-disable-next-line
export default { getAll, setToken, createNew, update, remove };
