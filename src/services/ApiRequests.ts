/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { REQUEST_METHODS } from "../constants/api-constants";
import { CustomError } from "../types/types";

type CallbackFunction<T> = (data: T) => void;
type ErrorCallbackFunction = (error: CustomError) => void;

const httpClient = axios.create();

export const makeApiCall = (
  apiCallType: string,
  urlPath: string,
  successCb: CallbackFunction<any>,
  errorCb: ErrorCallbackFunction,
  body: any = {},
  headers: any = {},
  params: any = {},
  customTimeoutInMs: number = 30000
) => {
  const url = urlPath;

  switch (apiCallType) {
    case REQUEST_METHODS.GET:
      makeApiGetCall(
        url,
        successCb,
        errorCb,
        headers,
        params,
        customTimeoutInMs
      );
      break;
    case REQUEST_METHODS.POST:
      makeApiPostCall(
        url,
        successCb,
        errorCb,
        body,
        headers,
        params,
        customTimeoutInMs
      );
      break;
    default:
      makeApiGetCall(url, successCb, errorCb);
  }
};

const makeApiGetCall = (
  urlPath: string,
  callback: CallbackFunction<any>,
  errorCallBack: ErrorCallbackFunction,
  headers = {},
  params = {},
  timeoutInMs = 30000
) => {
  httpClient
    .get(urlPath, {
      timeout: timeoutInMs,
      headers,
      params,
    })
    .then((result: AxiosResponse<any>) => callback(result.data))
    .catch((error: CustomError) => {
      if (errorCallBack) errorCallBack(error);
      console.log(error);
    });
};

const makeApiPostCall = (
  urlPath: string,
  callback: CallbackFunction<any>,
  errorCallBack: ErrorCallbackFunction,
  body: any,
  headers = {},
  params = {},
  timeoutInMs: number
) => {
  return httpClient
    .post(urlPath, body, {
      timeout: timeoutInMs,
      headers,
      params,
    })
    .then((result: AxiosResponse<any>) => callback(result.data))
    .catch((error: CustomError) => {
      if (errorCallBack) errorCallBack(error);
      console.log(error);
    });
};
