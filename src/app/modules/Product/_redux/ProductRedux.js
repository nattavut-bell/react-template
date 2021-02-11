require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

//http://uat.siamsmile.co.th:9188/swagger/index.html
//https://json-to-js.com/
// action type บอกว่า Redux ตัวนี้ สามารถทำอะไรได้บ้าง
export const actionTypes = {
  // ADD_PLAYER: '[Add player] Action',
  //   SET_CURRENTPAGE: '[SET_CURRENTPAGE] Action',
  //   UPDATE_CURRENT_EMPLOYEE: '[UPDATE_CURRENT_EMPLOYEE] Action',
  //   RESET_EMPLOYEE: '[RESET_EMPLOYEE] Action'

  UPDATE_CURRENT_PRODUCT: "[UPDATE_CURRENT_PRODUCT] Action",
  RESET_PRODUCT: "[RESET_PRODUCT] Action",
};

// state ค่าที่ถูกเก็บไว้
const initialState = {
  currentProductToAdd: {
    id: "",
    name: "",
    productGroupId: "",
    price: 0,
    stock: 0,
  },
};

// reducer แต่ละ Action จะไป update State อย่างไร
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CURRENT_PRODUCT: {
      return { ...state, currentProductToAdd: action.payload };
    }

    // case actionTypes.RESET_PRODUCT: {
    //   return {
    //     ...state,
    //     currentEmployeeToAdd: initialState.currentEmployeeToAdd,
    //     currentPage: 0,
    //   };
    // }

    default:
      return state;
  }
};

//action เอาไว้เรียกจากข้างนอก เพื่อเปลี่ยน state
export const actions = {
  //   setCurrentPage: (payload) => ({ type: actionTypes.SET_CURRENTPAGE, payload }),
  //   updateCurrentEmployee: (payload) => ({type: actionTypes.UPDATE_CURRENT_EMPLOYEE,payload}),
  //   resetCurrentEmployee: () => ({ type: actionTypes.RESET_EMPLOYEE }),

  //   setCurrentPage: (payload) => ({ type: actionTypes.SET_CURRENTPAGE, payload }),
  updateProduct: (payload) => ({
    type: actionTypes.UPDATE_CURRENT_PRODUCT,
    payload,
  }),
  resetProduct: () => ({ type: actionTypes.RESET_PRODUCT }),
};
