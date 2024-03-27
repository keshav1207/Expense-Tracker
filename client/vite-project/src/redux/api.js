// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const expenseTrackerApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => `getAllCategories`,
      providesTags: ['Post'],
    }),

    getCategory: builder.query({
      query: (categoryId) => `getCategory/${categoryId}`,
      providesTags: ['Post'],
    }),

    createCategory: builder.mutation({
      query: (userData) => ({
        url: 'createCategory',
        method:'POST',
        body: userData,
      }),
      invalidatesTags: ['Post'],
    }),

    deleteCategory: builder.mutation({
      query: (userData) => ({
        url: 'deleteCategory',
        method:'DELETE',
        body: userData,
      }),
      invalidatesTags: ['Post'],
    }),



    getAllTransactions: builder.query({
      query: () => 'getAllTransactions',
      providesTags: ['Post'],
    }),

    getTransaction: builder.query({
      query: (TransactionId) => `getCategory/${TransactionId}`,
      providesTags: ['Post'],
    }),

    createTransaction: builder.mutation({
      query: (userData) => ({
        url: 'createTransaction',
        method:'POST',
        body: userData,
      }),

      invalidatesTags: ['Post'],
    }),

    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `deleteTransaction/${id}`,
        method:'DELETE'
       
      }),

      invalidatesTags: ['Post'],
    }),

    

   
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllTransactionsQuery,
  useGetTransactionQuery,
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
} = expenseTrackerApi;