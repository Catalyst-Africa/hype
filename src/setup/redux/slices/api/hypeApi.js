import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const hypeApi = createApi({
  reducerPath: "hypeApi",
  baseQuery: fakeBaseQuery(),
  keepUnusedDataFor: 180,
  endpoints: (builder) => ({}),
});
