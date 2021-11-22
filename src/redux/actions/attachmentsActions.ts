import {
  CREATE_ATTACHMENT,
  REMOVE_ATTACHMENT,
  UPDATE_ATTACHMENT,
} from '../actionTypes';

export const createAttachment = () => {
  return {
    type: CREATE_ATTACHMENT,
    payload: {
      title: '',
      required: true,
      attachment_error_text: '',
    },
  };
};

export const removeAttachment = (idx: number) => {
  return {
    type: REMOVE_ATTACHMENT,
    payload: {
      idx,
    },
  };
};

export const updateAttachment = (
  idx: number,
  updateInput: {
    title: string;
    required: boolean;
  }
) => {
  return {
    type: UPDATE_ATTACHMENT,
    payload: {
      idx,
      ...updateInput,
    },
  };
};
