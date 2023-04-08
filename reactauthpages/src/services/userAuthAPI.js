import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// here always pass the data as object to work. 
// for example -> query: (user) => here user should be javascript object
export const userAuthAPI = createApi({
  reducerPath: "userAuthAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/account/" }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: "register/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json"
          },
        };
      },
    }),
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: "login/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json"
          },
        };
      },
    }),
    getUserProfile: builder.query({
      query: (accessToken) => {
        return {
          url: "profile/",
          method: "GET",
          headers: {
            "authorization": `Bearer ${accessToken}`
          },
        };
      },
    }),
    changeUserPassword: builder.mutation({
      query: ({data, access}) => {
        return {
          url: "change-password/",
          method: "POST",
          body: data,
          headers: {
            "authorization": `Bearer ${access}`
          },
        };
      },
    }),
    resetEmailPassword: builder.mutation({
      query: (email) => {
        return {
          url: "send-password-reset-email/",
          method: "POST",
          body: email,
          headers: {
            "Content-type": "application/json"
          },
        };
      },
    }),
    resetPassword: builder.mutation({
      query: ({ data, id, token }) => {
        return {
          url: `/reset-password/${id}/${token}/`,
          method: "POST",
          body: data,
          headers: {
            "Content-type": "application/json"
          },
        };
      },
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useGetUserProfileQuery, useChangeUserPasswordMutation, useResetEmailPasswordMutation, useResetPasswordMutation } = userAuthAPI;
