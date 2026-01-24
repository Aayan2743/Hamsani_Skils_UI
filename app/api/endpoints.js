// src/api/endpoints.js
export const ENDPOINTS = {
  NOAUTH: {
    LOGIN: "/login",
    signin:"/register",


  //forgotpassword
  otp:"/otp-for-forgot-password",
  verifyotp:"/verify-otp",
  rest:"/reset-password",

  //contactus
  createcontactus:"/contact-us"

  },



  AUTH: {
   
  //profile
  GET_MY_DETAILS:"/get-user-details",
  UPDATE_CANDIDATE_DETAILS:"/update-user-details",
  CHANGE_PASSWORD:"/change-password",


//coupons
getcoupons:"/get-coupons",

//categories
getcategories:"/active-categories",

//product
getproduct:()=>"/all-products",
getsingleproductss:(id)=>`/product-details/${id}`,

//address
createaddres:"/create-address",
getaddress:"/get-all-address",
updateaddress:(id)=>`/update-address/${id}`,
deleteaddress:(id)=>`/delete-address/${id}`,
getsignleaddress:(id)=>`/singe-address/${id}`,


//cart
withoutlogin:"/guest-cart-items",
withlogin:"/cart-sync-items",
afterlogin:"/get-cart-items",
updatecart:(id)=>`/cart-update-item/${id}`,
deletecart:(id)=>`/cart-delete-item/${id}`,
addtocar:"/cart-add-item",


//wishlist
getwishlisoradd:(id)=>`/wishlist-toggle/${id}`,
getindashoabr:"/my-wishlist-products",



//copunsapply
couponsaply:"checkout-preview",

//createorder
createorder:"/create-payment-order",
verifypayment:"/verify-payment",

//hetorder
getpurchaseorder:"/my-orders",
getsignlepurchaseorder:(id)=>`/my-order-details/${id}`,

//dashboard
dashboard:"/overview-dashboard",
  },
};
