// action type บอกว่า Redux ตัวนี้ สามารถทำอะไรได้บ้าง
export const actionTypes = {
  UPDATE_CURRENT_PRODUCTGROUP: "[UPDATE_CURRENT_PRODUCTGROUP] Action",
  RESET_PRODUCTGROUP: "[RESET_PRODUCTGROUP] Action",
};

// state ค่าที่ถูกเก็บไว้
const initialState = {
  currentProductGroupToAdd: {
    name: "",
  },
};

// reducer แต่ละ Action จะไป update State อย่างไร
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CURRENT_PRODUCTGROUP: {
      return { ...state, currentProductGroupToAdd: action.payload };
    }

    case actionTypes.RESET_PRODUCTGROUP: {
      return {
        ...state,
        currentProductGroupToAdd: initialState.currentProductGroupToAdd,
      };
    }

    default:
      return state;
  }
};

//action เอาไว้เรียกจากข้างนอก เพื่อเปลี่ยน state
export const actions = {
  updateProductGroup: (payload) => ({
    type: actionTypes.UPDATE_CURRENT_PRODUCTGROUP,
    payload,
  }),
  resetProductGroup: () => ({ type: actionTypes.RESET_PRODUCTGROUP }),
};
