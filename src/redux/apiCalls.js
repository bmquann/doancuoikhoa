import { loginFailure, loginStart, loginSuccess, logout } from "./UserRedux";
import { publicRequest, userRequest } from "../utils/RequestMethod";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, findProductStart, findProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./ProductRedux";
import { clear } from "./shopping-cart/cartItemsSlide";
import { addOrder,getOrdersSuccess, orderClear } from "./shopping-cart/CheckOutInFo";
// import { addCartFailure, addCartSuccess } from "./shopping-cart/CheckOutInFo";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);

    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const fbLogin = async (dispatch, user) => {
  // const register = await {
  //   id: user.user.id,
  //   username: user.user.accessToken,

  // }

  // if (user) {
  //   const res = await publicRequest.post("/auth/register", register)
  //   try {
  //     if (res.status === 201) {
  //       const login = {
  //         username: res.data.username,
  //         password: 123
  //       }

  //       const res1 = await publicRequest.post("/auth/login", login);
  //       dispatch(loginSuccess(res1.data));
  //     }
  //   } catch (error) {
  //       const login = {
  //         username: user.user.accessToken,
  //         password: 123
  //       }
  //       const res = await publicRequest.post("/auth/login", login);

  //       dispatch(loginSuccess(res.data));

  //   }
  // }

  if (user) {
    const res = await publicRequest.get(`/users/find/${user.user.id}`)
    if (res.data === "") {
      const register = await {
        id: user.user.id,
        username: user.user.id,
        email: user.user.email,
        password: "123"
      }
      try {
        const res1 = await publicRequest.post("/auth/register", register)
      if (res1.status === 201) {
        const login = {
          username: res1.data.username,
          password: "123"
        }
        const update = await {
          picture: user.user.picture
        }
        await publicRequest.put(`/users/update/${user.user.id}`, update)
        const res2 = await publicRequest.post("/auth/login", login);
        dispatch(loginSuccess(res2.data));
      }
      } catch (error) {
        alert("Email da ton tai")
      }

    }
    else {

      const login = await {
        username: res.data.username,
        password: "123"
      }
      const res1 = await publicRequest.post("/auth/login", login);

      dispatch(loginSuccess(res1.data));
    }
    // dispatch(loginSuccess(user));
  }
  else {
    dispatch(loginFailure());
  }
};

export const logOut = async (dispatch, user) => {
  dispatch(logout());
  try {
    dispatch(clear());
    dispatch(orderClear())
  } catch (err) {
  }
};


//PRODUCT

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};


export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // eslint-disable-next-line no-unused-vars
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};
// FIND
export const findProduct = async (slug, dispatch) => {
  dispatch(findProductStart());
  try {
    const res = await publicRequest.get("/products?slug=" + slug)
    dispatch(findProductSuccess(res.data));
  } catch (err) {

  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

//CART
export const createOrder = async (order, dispatch) => {
  const res = await userRequest.post("/carts/", order);
  try {
    dispatch(clear());
    dispatch(addOrder(res.data))
  } catch (error) {
    alert(error)
  }
}


export const getOrders = async (id,dispatch) => {
  try {
    const res = await publicRequest.get(`/carts/find/${id}`);
    dispatch(getOrdersSuccess(res.data));
  } catch (err) {
    alert(err.message)
  }
};





