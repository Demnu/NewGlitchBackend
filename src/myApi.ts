/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface OrderDtos {
  /** @example "array" */
  type?: string;
  items?: {
    /** @example "object" */
    type?: string;
    properties?: {
      id?: {
        /** @example "string" */
        type?: string;
        /** @example "123" */
        example?: string;
      };
      dateCreated?: {
        /** @example "string" */
        type?: string;
        /** @example "08/09/1998" */
        example?: string;
      };
      customerName?: {
        /** @example "string" */
        type?: string;
        /** @example "Harry" */
        example?: string;
      };
      orderStatus?: {
        /** @example "string" */
        type?: string;
        /** @example ["notCalculated","calculated"] */
        enum?: string[];
      };
      products?: {
        /** @example "array" */
        type?: string;
        items?: {
          /** @example "object" */
          type?: string;
          properties?: {
            productName?: {
              /** @example "string" */
              type?: string;
              /** @example "Haywire Blend" */
              example?: string;
            };
            id?: {
              /** @example "string" */
              type?: string;
              /** @example "12345" */
              example?: string;
            };
            possiblyCoffee?: {
              /** @example "boolean" */
              type?: string;
              /** @example true */
              example?: boolean;
            };
            price?: {
              /** @example "number" */
              type?: string;
              /** @example 123 */
              example?: number;
            };
            sku?: {
              /** @example "string" */
              type?: string;
              /** @example "HW_B" */
              example?: string;
            };
            amountOrdered?: {
              /** @example "number" */
              type?: string;
              /** @example 20 */
              example?: number;
            };
            hasRecipe?: {
              /** @example "boolean" */
              type?: string;
              /** @example true */
              example?: boolean;
            };
          };
          /** @example ["productName","id","possiblyCoffee","price","sku","amountOrdered","hasRecipe"] */
          required?: string[];
        };
      };
    };
    /** @example ["id","dateCreated","customerName","orderStatus","products"] */
    required?: string[];
  };
}

export interface OrderDto {
  /** @example "object" */
  type?: string;
  properties?: {
    id?: {
      /** @example "string" */
      type?: string;
      /** @example "123" */
      example?: string;
    };
    dateCreated?: {
      /** @example "string" */
      type?: string;
      /** @example "08/09/1998" */
      example?: string;
    };
    customerName?: {
      /** @example "string" */
      type?: string;
      /** @example "Harry" */
      example?: string;
    };
    orderStatus?: {
      /** @example "object" */
      type?: string;
      properties?: {
        type?: {
          /** @example "string" */
          type?: string;
          /** @example "string" */
          example?: string;
        };
        enum?: {
          /** @example "array" */
          type?: string;
          /** @example ["notCalculated","calculated"] */
          example?: string[];
          items?: {
            /** @example "string" */
            type?: string;
          };
        };
      };
    };
    products?: {
      /** @example "array" */
      type?: string;
      items?: {
        /** @example "object" */
        type?: string;
        properties?: {
          productName?: {
            /** @example "string" */
            type?: string;
            /** @example "Haywire Blend" */
            example?: string;
          };
          id?: {
            /** @example "string" */
            type?: string;
            /** @example "12345" */
            example?: string;
          };
          possiblyCoffee?: {
            /** @example "boolean" */
            type?: string;
            /** @example true */
            example?: boolean;
          };
          price?: {
            /** @example "number" */
            type?: string;
            /** @example 123 */
            example?: number;
          };
          sku?: {
            /** @example "string" */
            type?: string;
            /** @example "HW_B" */
            example?: string;
          };
          amountOrdered?: {
            /** @example "number" */
            type?: string;
            /** @example 20 */
            example?: number;
          };
          hasRecipe?: {
            /** @example "boolean" */
            type?: string;
            /** @example true */
            example?: boolean;
          };
        };
        /** @example ["productName","id","possiblyCoffee","price","sku","amountOrdered","hasRecipe"] */
        required?: string[];
      };
    };
  };
  /** @example ["id","dateCreated","customerName","orderStatus","products"] */
  required?: string[];
}

export interface RecipeDtos {
  /** @example "array" */
  type?: string;
  items?: {
    /** @example "object" */
    type?: string;
    properties?: {
      id?: {
        /** @example "number" */
        type?: string;
        /** @example 1234 */
        example?: number;
      };
      productId?: {
        /** @example "string" */
        type?: string;
        /** @example "Blurger" */
        example?: string;
      };
      recipeName?: {
        /** @example "string" */
        type?: string;
        /** @example "Yummy Blend" */
        example?: string;
      };
      recipe_beans?: {
        /** @example "array" */
        type?: string;
        items?: {
          /** @example "object" */
          type?: string;
          properties?: {
            id?: {
              /** @example "number" */
              type?: string;
              /** @example 1 */
              example?: number;
            };
            beanId?: {
              /** @example "number" */
              type?: string;
              /** @example 2 */
              example?: number;
            };
            recipeId?: {
              /** @example "number" */
              type?: string;
              /** @example 3 */
              example?: number;
            };
            amountOrdered?: {
              /** @example "number" */
              type?: string;
              /** @example 100 */
              example?: number;
            };
            bean?: {
              /** @example "object" */
              type?: string;
              properties?: {
                id?: {
                  /** @example "number" */
                  type?: string;
                  /** @example 2 */
                  example?: number;
                };
                beanName?: {
                  /** @example "string" */
                  type?: string;
                  /** @example "Roasty bean" */
                  example?: string;
                };
              };
            };
          };
        };
      };
    };
  };
}

export interface RecipeRequestDto {
  /** @example "object" */
  type?: string;
  properties?: {
    productId?: {
      /** @example "string" */
      type?: string;
      /** @example "2" */
      example?: string;
    };
    recipeName?: {
      /** @example "string" */
      type?: string;
      /** @example "Yummy recipe" */
      example?: string;
    };
    beans?: {
      /** @example "array" */
      type?: string;
      items?: {
        /** @example "object" */
        type?: string;
        properties?: {
          beanId?: {
            /** @example "number" */
            type?: string;
            /** @example 4 */
            example?: number;
          };
          beanAmount?: {
            /** @example "number" */
            type?: string;
            /** @example 400 */
            example?: number;
          };
        };
      };
    };
  };
}

export interface MakeCalculationRequestDto {
  /** @example "object" */
  type?: string;
  properties?: {
    orderIds?: {
      /** @example "array" */
      type?: string;
      /** @example ["a0d1b2b9-b532-477f-a9a5-f4158d49f28c","95119cbc-2430-430e-be94-1fbf2906824c"] */
      example?: string[];
      items?: {
        /** @example "string" */
        type?: string;
      };
    };
  };
}

export interface MakeCalculationResponseDto {
  /** @example "object" */
  type?: string;
  properties?: {
    ordersCalculatedInformation?: {
      /** @example "array" */
      type?: string;
      items?: {
        /** @example "object" */
        type?: string;
        properties?: {
          orderId?: {
            /** @example "string" */
            type?: string;
            /** @example "2b156adb-78fc-43d8-a7c8-24b018f5818f" */
            example?: string;
          };
          createdAt?: {
            /** @example "string" */
            type?: string;
            /** @example "10/12/2023" */
            example?: string;
          };
          customerName?: {
            /** @example "string" */
            type?: string;
            /** @example "Autumn Rooms" */
            example?: string;
          };
        };
      };
    };
    productsTally?: {
      /** @example "array" */
      type?: string;
      items?: {
        /** @example "object" */
        type?: string;
        properties?: {
          productId?: {
            /** @example "string" */
            type?: string;
            /** @example "2" */
            example?: string;
          };
          productName?: {
            /** @example "string" */
            type?: string;
            /** @example "Sweet Kicks Blend 1kg" */
            example?: string;
          };
          amountOrdered?: {
            /** @example "number" */
            type?: string;
            /** @example 50 */
            example?: number;
          };
          hasRecipe?: {
            /** @example "boolean" */
            type?: string;
            /** @example true */
            example?: boolean;
          };
        };
      };
    };
    beansTally?: {
      /** @example "array" */
      type?: string;
      items?: {
        /** @example "object" */
        type?: string;
        properties?: {
          beanId?: {
            /** @example "number" */
            type?: string;
            /** @example 2 */
            example?: number;
          };
          beanName?: {
            /** @example "string" */
            type?: string;
            /** @example "Indonesia" */
            example?: string;
          };
          amountNeededToBeRoasted?: {
            /** @example "number" */
            type?: string;
            /** @example 50000 */
            example?: number;
          };
        };
      };
    };
  };
}

export interface ProductExtendedJsonSchema {
  /** @example "object" */
  type?: string;
  properties?: {
    productName?: {
      /** @example "string" */
      type?: string;
      /** @example "Haywire Blend" */
      example?: string;
    };
    id?: {
      /** @example "string" */
      type?: string;
      /** @example "12345" */
      example?: string;
    };
    possiblyCoffee?: {
      /** @example "boolean" */
      type?: string;
      /** @example true */
      example?: boolean;
    };
    price?: {
      /** @example "number" */
      type?: string;
      /** @example 123 */
      example?: number;
    };
    sku?: {
      /** @example "string" */
      type?: string;
      /** @example "HW_B" */
      example?: string;
    };
    amountOrdered?: {
      /** @example "number" */
      type?: string;
      /** @example 20 */
      example?: number;
    };
    hasRecipe?: {
      /** @example "boolean" */
      type?: string;
      /** @example true */
      example?: boolean;
    };
  };
  /** @example ["productName","id","possiblyCoffee","price","sku","amountOrdered","hasRecipe"] */
  required?: string[];
}

export interface OrderStatusEnum {
  /** @example "object" */
  type?: string;
  properties?: {
    orderStatus?: {
      /** @example "string" */
      type?: string;
      /** @example ["notCalculated","calculated"] */
      enum?: string[];
    };
  };
  /** @example ["orderStatus"] */
  required?: string[];
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType
} from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || 'http://localhost:9000'
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem)
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData
          ? { 'Content-Type': type }
          : {})
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path
    });
  };
}

/**
 * @title Glitch Backend
 * @version 1.0.0
 * @baseUrl http://localhost:9000
 */
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  orders = {
    /**
     * No description
     *
     * @tags Orders
     * @name ListOrdersList
     * @request GET:/orders/listOrders
     */
    listOrdersList: (params: RequestParams = {}) =>
      this.request<OrderDtos, any>({
        path: `/orders/listOrders`,
        method: 'GET',
        ...params
      })
  };
  ordermentum = {
    /**
     * No description
     *
     * @tags Ordermentum
     * @name SaveProductsFromOrdermentumCreate
     * @request POST:/ordermentum/saveProductsFromOrdermentum
     */
    saveProductsFromOrdermentumCreate: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/ordermentum/saveProductsFromOrdermentum`,
        method: 'POST',
        ...params
      }),

    /**
     * No description
     *
     * @tags Ordermentum
     * @name SaveOrdersFromOrdermentumCreate
     * @request POST:/ordermentum/saveOrdersFromOrdermentum
     */
    saveOrdersFromOrdermentumCreate: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/ordermentum/saveOrdersFromOrdermentum`,
        method: 'POST',
        ...params
      })
  };
  recipes = {
    /**
     * No description
     *
     * @tags Recipes
     * @name ListRecipesList
     * @request GET:/recipes/listRecipes
     */
    listRecipesList: (params: RequestParams = {}) =>
      this.request<OrderDtos, any>({
        path: `/recipes/listRecipes`,
        method: 'GET',
        ...params
      }),

    /**
     * No description
     *
     * @tags Recipes
     * @name CreateRecipeCreate
     * @request POST:/recipes/createRecipe
     */
    createRecipeCreate: (body: RecipeRequestDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/recipes/createRecipe`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        ...params
      })
  };
  calculations = {
    /**
     * No description
     *
     * @tags Calculations
     * @name MakeCalculationCreate
     * @request POST:/calculations/makeCalculation
     */
    makeCalculationCreate: (
      body: MakeCalculationRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<MakeCalculationResponseDto, any>({
        path: `/calculations/makeCalculation`,
        method: 'POST',
        body: body,
        type: ContentType.Json,
        ...params
      })
  };
}
