export type Response<T = any> = {
  code: string;
  message: string,
  data: T;
}

export type PageResponse<T = any> = {
  code: string;
  message: string;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}
