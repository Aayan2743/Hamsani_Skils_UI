// src/api/AuthAPI.js
import apiClient from "./apiClient"; // no token needed
import { ENDPOINTS } from "./endpoints";
import apiAuthClient from  "./apiAuthClient"

export const AuthAPI = {
  login: (data) => apiClient.post(ENDPOINTS.NOAUTH.LOGIN, data),
  
  signup: (data) => apiClient.post(ENDPOINTS.NOAUTH.signin, data),
 


  /////profile
  getMyDetails: () => apiAuthClient.get(ENDPOINTS.AUTH.GET_MY_DETAILS),
  updateCandidateDetails: (payload) =>
    apiAuthClient.put(ENDPOINTS.AUTH.UPDATE_CANDIDATE_DETAILS, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  changePassword: (data) => apiAuthClient.put(ENDPOINTS.AUTH.CHANGE_PASSWORD, data),

 

//coupons
getcoupons:()=>apiAuthClient.get(ENDPOINTS.AUTH.getcoupons),

//categories
 getcategories:()=>apiAuthClient.get(ENDPOINTS.AUTH.getcategories),
  
 //products
 getproducts:(params)=>apiAuthClient.get("/all-products", {
      params 
    }),
 getsingleproduct:(id)=>apiAuthClient.get(ENDPOINTS.AUTH.getsingleproductss(id)),

//address
createaddress:(data)=>apiAuthClient.post(ENDPOINTS.AUTH.createaddres,data),
getaddress:()=>apiAuthClient.get(ENDPOINTS.AUTH.getaddress),
getsignleadress:(id)=>apiAuthClient.get(ENDPOINTS.AUTH.getsignleaddress(id)),
updateaddress:(id,data)=>apiAuthClient.put(ENDPOINTS.AUTH.updateaddress(id),data),
deleteaddress:(id)=>apiAuthClient.delete(ENDPOINTS.AUTH.deleteaddress(id)),



//cart
withoulogincart:(data)=>apiClient.post(ENDPOINTS.AUTH.withoutlogin,data),
withlogincart:(data)=>apiAuthClient.post(ENDPOINTS.AUTH.withlogin,data),
afterlogincart:()=>apiAuthClient.get(ENDPOINTS.AUTH.afterlogin),
addtocart:(data)=>apiAuthClient.post(ENDPOINTS.AUTH.addtocar,data),
updatecart:(id,data)=>apiAuthClient.put(ENDPOINTS.AUTH.updatecart(id),data),
deletecart:(id)=>apiAuthClient.delete(ENDPOINTS.AUTH.deletecart(id)),


//wishlist
addtowishlist:(id)=>apiAuthClient.get(ENDPOINTS.AUTH.getwishlisoradd(id)),
getindashboard:()=>apiAuthClient.get(ENDPOINTS.AUTH.getindashoabr),



//couponapply
couponapply:(data)=>apiAuthClient.post(ENDPOINTS.AUTH.couponsaply,data),


//createorder
createorder:(data)=>apiAuthClient.post(ENDPOINTS.AUTH.createorder,data),
verifypayment:(data)=>apiAuthClient.post(ENDPOINTS.AUTH.verifypayment,data),



//purchasehistory
getallpurchase:()=>apiAuthClient.get(ENDPOINTS.AUTH.getpurchaseorder),
getsiglepurchaseorder:(id)=>apiAuthClient.get(ENDPOINTS.AUTH.getsignlepurchaseorder(id)),


 // forgot password
 otp:(data)=>apiClient.post(ENDPOINTS.NOAUTH.otp,data),
 verityotp:(data)=>apiClient.post(ENDPOINTS.NOAUTH.verifyotp,data),
 reset:(data)=>apiClient.post(ENDPOINTS.NOAUTH.rest,data),

//contactus
createcontantus:(data)=>apiAuthClient.post(ENDPOINTS.NOAUTH.createcontactus,data),

//dashboard
dashboard:()=>apiAuthClient.get(ENDPOINTS.AUTH.dashboard),

};
