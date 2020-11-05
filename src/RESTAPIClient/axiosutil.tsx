import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
import * as firebase from "../FirebaseClient";
import React from "react";
import { AppContext } from "App";
import { AppStateActionTypes } from "AppReducer";

enum HTTPMethod {
  GET = "get",
  DELETE = "delete",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
}

class AuthedRequest {
  private static getAxiosWithHeaders = async (): Promise<AxiosInstance> => {
    const jwtToken =
      firebase.firebaseAuth.currentUser &&
      (await firebase.firebaseAuth.currentUser.getIdTokenResult()).token;
    return axios.create({ headers: { "X-Auth-Token": jwtToken } });
  };

  private static handleAuthErrorIfNecessary = async (
    response: any,
  ): Promise<void> => {
    if (
      response.data.error &&
      response.data.error === "Unable to authenticate user. Invalid JWT."
    ) {
      const [_, dispatch] = React.useContext(AppContext);
      dispatch({
        type: AppStateActionTypes.SET_INVALID_AUTH_TOKEN_ERROR,
        invalidAuthTokenError: response.data.error as Error,
      });
      return await firebase.firebaseAuth.signOut();
    }
  };

  static request = async ({
    method,
    url,
    data,
    config,
  }: {
    method: string;
    url: string;
    data?: any;
    config?: AxiosRequestConfig;
  }): Promise<AxiosResponse<any>> => {
    const axiosWithHeaders = await AuthedRequest.getAxiosWithHeaders();
    const response = await axiosWithHeaders.request({
      ...config,
      url,
      data,
      method,
    });
    await AuthedRequest.handleAuthErrorIfNecessary(response);

    return response;
  };

  static get = async (
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<any>> => {
    return await AuthedRequest.request({
      method: HTTPMethod.GET,
      url: url,
      data: null,
      config: config,
    });
  };

  static delete = async (
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<any>> => {
    return await AuthedRequest.request({
      method: HTTPMethod.DELETE,
      url: url,
      data: null,
      config: config,
    });
  };

  static post = async (
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<any>> => {
    return await AuthedRequest.request({
      method: HTTPMethod.POST,
      url: url,
      data: data,
      config: config,
    });
  };

  static put = async (
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<any>> => {
    return await AuthedRequest.request({
      method: HTTPMethod.PUT,
      url: url,
      data: data,
      config: config,
    });
  };

  static patch = async (
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<any>> => {
    return await AuthedRequest.request({
      method: HTTPMethod.PATCH,
      url: url,
      data: data,
      config: config,
    });
  };
}

export { AuthedRequest };
