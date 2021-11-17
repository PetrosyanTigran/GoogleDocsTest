import axios from 'axios';

export const createTemplateURL = '/api/docflow/create_template';
export const editOrGetTemplateURL = (id: string) =>
  `/api/docflow/templates/${id}`;

export const axiosInstance = axios.create({
  baseURL: 'localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});
