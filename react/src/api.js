import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://plzoe.8866.org:18889",
  }),
  endpoints(build) {
    return {
      getZhenghouId: build.mutation({
        query(stu) {
          console.log(stu);
          return {
            url: `/zhenghou/${stu}`,
            method: "GET",
          };
        },
      }),

      getRealityDataById: build.mutation({
        query(id) {
          return {
            url: `/reality/${id}`,
            methon: "GET",
          };
        },
        transformErrorResponse(data) {
          console.log("yoo gte me");
          const tem = data.data.reduce((acc, cur) => {
            acc.push(cur.中草药编);
            return acc;
          }, []);
          return tem;
        },
      }),

      getPredictionDataById: build.mutation({
        query(id) {
          return {
            url: `/prediction/${id}`,
            methon: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useGetZhenghouIdMutation,
  useGetRealityDataByIdMutation,
  useGetPredictionDataByIdMutation,
} = api;
