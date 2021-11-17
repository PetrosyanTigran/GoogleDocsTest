import { axiosInstance, createTemplateURL } from '../../utils/axios';
import { CREATE_TEMPLATE } from '../actionTypes';
import { AppDispatch } from '../store';

export const createTemplate = (data: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: CREATE_TEMPLATE.PENDING });
    const res = await axiosInstance.post(createTemplateURL, data);
    dispatch({ type: CREATE_TEMPLATE.SUCCESS, payload: res });
  } catch (e) {
    dispatch({ type: CREATE_TEMPLATE.ERROR, payload: e });
  } finally {
    dispatch({ type: CREATE_TEMPLATE.PENDING });
  }
};
