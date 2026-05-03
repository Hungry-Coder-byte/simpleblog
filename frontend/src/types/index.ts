export interface IArticle {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateArticle {
  title: string;
  content: string;
  tags?: string[];
}

export interface IUpdateArticle {
  title?: string;
  content?: string;
  tags?: string[];
}

export interface IApiResponse<T> {
  data: T;
  message: string;
}

export interface IErrorResponse {
  error: string;
  message: string;
}