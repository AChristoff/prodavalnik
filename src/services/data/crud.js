function request(method) {

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVXNlciIsIm5hbWUiOiJBbGV4IiwiZW1haWwiOiJkc2Fkc2FAbWFpbC5iZyIsInVzZXJJZCI6IjVmMGI4OTkwNzM0ZjJmNWI4Y2FjODBmNCIsImlhdCI6MTU5NTUzNzAxNSwiZXhwIjoxNTk1NTQwNjE1fQ.54slp0ZOb-4xz7V7rp5aKWkvl7fKCYnNvkHs8b7p6wg';

  return async (url = '', data, options) => {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
      ...options
    });

    return response.json();
  }
}

export const get = request('get');
export const post = request('post');
export const put = request('put');
export const del = request('delete');
