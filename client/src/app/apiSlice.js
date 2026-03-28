import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { logOut, selectCurrentToken, setCredentials } from "../features/Auth/AuthSlice"

const baseQuery = fetchBaseQuery({
    baseUrl : "https://facebookbd.onrender.com/",
    prepareHeaders : (Headers, { getState }) => {
        const token = selectCurrentToken(getState())

        if (token) {
            Headers.set('authorizattion', `Bearer ${token}`)
        }
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // First, attempt the original request
  let result = await baseQuery(args, api, extraOptions);

  // If the request fails with a 401 (Unauthorized)
  if (result.error) {
    // Try to get a new token using the refresh token
    console.log("Sending refresh token");
    
    const refreshResult = await baseQuery('/login/refrash-token', api, extraOptions);

    if (refreshResult.data) {
      // Store the new token in your Redux state
      api.dispatch(setCredentials({token : refreshResult.data.token}));
      
      // Retry the initial query with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed (e.g., refresh token also expired) - log the user out
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
    reducerPath : "api",
    tagTypes : ["users", "user"],
    baseQuery  : baseQueryWithReauth,
    endpoints : builder => ({
        login : builder.mutation({
            query : data => ({
                url : "/api/auth/login",
                method : "POST",
                body : data
            })
        }),
        createUser : builder.mutation({
            query : (data) => ({
                url : "api/auth/register",
                method : "POST",
                body : data
            })
        }),
        verifyAccount : builder.mutation({
            query : ({code, id}) => ({
                url : `api/auth/activetion-with-code/${id}`,
                method : "POST", 
                body : {code}
            })
        }),
        sendCode : builder.mutation({
            query : (id) => ({
                url : `api/auth/activetion-code/${id}`,
                method : "PATCH"
            })
        }),
        getAllUsers : builder.query({
            query : () => ({
                url : "/api/user",
                method : "GET"
            }),
            providesTags : ["users"]
        }),
        getSingleUser : builder.query({
            query : (id) => ({
                url : `/api/user/${id}`,
                method : "GET"
            })
        })
    })
})

export const {useLoginMutation, useGetAllUsersQuery, useGetSingleUserQuery, useCreateUserMutation, useVerifyAccountMutation, useSendCodeMutation} = apiSlice
