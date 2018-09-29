function extractApiErrorMessage(args) {
  return typeof args[1] === 'string'
    ? args[1] : args[0].message || args[0] || 'Unknown API error.';
}

function parseApiErrorArguments(args) {
  if (typeof args[0] === 'object') {
    return args[0];
  }

  if (args.length === 1) {
    return { message: args[0] }
  }

  if (args.length === 2) {
    if (typeof args[1] === 'number') {
      const [message, status] = args;
      return { message, status };
    }

    const [name, message] = args;
    return { name, message };
  }

  const [name, message, status] = args;
  return { name, message, status };
}

exports.ApiError = class ApiError extends Error {
  /**
   * Example:
   * new ApiError('Message only');
   * new ApiError('Message and', status);
   * new ApiError('Name', 'and message');
   * new ApiError('Name', 'message', andStatus);
   * new ApiError({ name, message, status });
   */
  constructor(...args) {
    super(extractApiErrorMessage(args));

    const { name, status } = parseApiErrorArguments(args);
    this.name = name || 'ApiError';
    this.status = status || exports.codes.server.INTERNAL_SERVER_ERROR;
  }
};

exports.codes = {
  informational: {
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    PROCESSING: 102,
  },
  successful: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    MULTI_STATUS: 207,
  },
  redirection: {
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANENTLY: 301,
    MOVED_TEMPORARILY: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    USE_PROXY: 305,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,
  },
  client: {
    BAD_REQUEST: 400,
    PAYMENT_REQUIRED: 402,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    REQUEST_TOO_LONG: 413,
    REQUEST_URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    REQUESTED_RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    IM_A_TEAPOT: 418,
    INSUFFICIENT_SPACE_ON_RESOURCE: 419,
    METHOD_FAILURE: 420,
    UNPROCESSABLE_ENTITY: 422,
    LOCKED: 423,
    FAILED_DEPENDENCY: 424,
    PRECONDITION_REQUIRED: 428,
    TOO_MANY_REQUESTS: 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  },
  server: {
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
    INSUFFICIENT_STORAGE: 507,
    NETWORK_AUTHENTICATION_REQUIRED: 511,
  },
};
