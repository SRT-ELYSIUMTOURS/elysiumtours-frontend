const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/v2";

const buildQuery = (params) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value != null && value !== "") {
      searchParams.set(key, String(value));
    }
  });
  return searchParams.toString();
};

// Map react-admin resource names to backend API paths
const resourceMap = {
  tours: "/tours/packages",
  destinations: "/destinations",
  bookings: "/bookings",
  payments: "/payments/transactions",
  hotels: "/partners/hotels",
  attractions: "/partners/attractions",
  dining: "/partners/dining",
  transport: "/partners/transport/providers",
  users: "/users",
  customers: "/users",
  staff: "/users",
  templates: "/admin/templates",
  contracts: "/admin/contracts",
  "contract-templates": "/admin/contract-templates",
  "pricing-desk": "/pricing-desk/queue",
  interests: "/interests",
  guides: "/guides",
  reviews: "/reviews",
  notifications: "/notifications",
  organizations: "/platform/organizations",
};

const getResourceUrl = (resource) => {
  const path = resourceMap[resource] || `/${resource}`;
  return `${API_URL}${path}`;
};

const getHeaders = () => {
  const headers = { "Content-Type": "application/json" };
  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

// Normalize MongoDB _id to id — destructure both _id and id to prevent overwrite
const transformRecord = (record) => {
  if (!record) return record;
  if (Array.isArray(record)) return record.map(transformRecord);
  if (typeof record !== "object") return record;
  const { _id, id, ...rest } = record;
  return { id: _id || id, ...rest };
};

// Unwrap nested response — only if top-level has no _id (i.e., it's a wrapper object)
// If the response already has _id, it IS the record (e.g., tour with populated destination)
const unwrapRecord = (data) => {
  if (data._id || data.id) return data;
  return data.booking || data.package || data.data || data.template || data.contract || data;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    console.error(`[dataProvider] API ${response.status}:`, error);
    const err = new Error(error.message || `API error: ${response.status}`);
    err.status = response.status;
    err.body = error;
    throw err;
  }
  const data = await response.json();
  console.debug(`[dataProvider] Response:`, data);
  return data;
};

const dataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const query = {
      page,
      pageSize: perPage,
      sort: `${order === "DESC" ? "-" : ""}${field}`,
      ...params.filter,
    };

    const url = `${getResourceUrl(resource)}?${buildQuery(query)}`;
    console.debug(`[dataProvider] getList ${resource}:`, url);
    const response = await fetch(url, { headers: getHeaders(), signal: params.signal });
    const data = await handleResponse(response);

    // Handle inconsistent response shapes from different backend services
    const records = data.rows || data.bookings || data.results || data.organizations || data.data || (Array.isArray(data) ? data : []);

    return {
      data: records.map(transformRecord),
      total: data.total || data.totalCount || records.length,
    };
  },

  getOne: async (resource, params) => {
    const url = `${getResourceUrl(resource)}/${params.id}`;
    console.debug(`[dataProvider] getOne ${resource}/${params.id}:`, url);
    const response = await fetch(url, { headers: getHeaders(), signal: params.signal });
    const data = await handleResponse(response);

    const record = unwrapRecord(data);
    return { data: transformRecord(record) };
  },

  getMany: async (resource, params) => {
    console.debug(`[dataProvider] getMany ${resource}:`, params.ids);
    const records = await Promise.all(
      params.ids.map(async (id) => {
        const url = `${getResourceUrl(resource)}/${id}`;
        const response = await fetch(url, { headers: getHeaders() });
        const data = await handleResponse(response);
        const record = unwrapRecord(data);
        return transformRecord(record);
      })
    );
    return { data: records };
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const query = {
      page,
      pageSize: perPage,
      sort: `${order === "DESC" ? "-" : ""}${field}`,
      [params.target]: params.id,
      ...params.filter,
    };

    const url = `${getResourceUrl(resource)}?${buildQuery(query)}`;
    console.debug(`[dataProvider] getManyReference ${resource}:`, url);
    const response = await fetch(url, { headers: getHeaders(), signal: params.signal });
    const data = await handleResponse(response);

    const records = data.rows || data.bookings || data.results || data.organizations || data.data || (Array.isArray(data) ? data : []);
    return {
      data: records.map(transformRecord),
      total: data.total || records.length,
    };
  },

  create: async (resource, params) => {
    const url = getResourceUrl(resource);
    console.debug(`[dataProvider] create ${resource}:`, params.data);
    const response = await fetch(url, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(params.data),
    });
    const data = await handleResponse(response);
    const record = unwrapRecord(data);
    return { data: transformRecord(record) };
  },

  update: async (resource, params) => {
    const url = `${getResourceUrl(resource)}/${params.id}`;
    console.debug(`[dataProvider] update ${resource}/${params.id}:`, params.data);
    const response = await fetch(url, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(params.data),
    });
    const data = await handleResponse(response);
    const record = unwrapRecord(data);
    return { data: transformRecord(record) };
  },

  updateMany: async (resource, params) => {
    console.debug(`[dataProvider] updateMany ${resource}:`, params.ids);
    const results = await Promise.all(
      params.ids.map(async (id) => {
        const url = `${getResourceUrl(resource)}/${id}`;
        const response = await fetch(url, {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify(params.data),
        });
        await handleResponse(response);
        return id;
      })
    );
    return { data: results };
  },

  delete: async (resource, params) => {
    const url = `${getResourceUrl(resource)}/${params.id}`;
    console.debug(`[dataProvider] delete ${resource}/${params.id}`);
    const response = await fetch(url, {
      method: "DELETE",
      headers: getHeaders(),
    });
    await handleResponse(response);
    return { data: { id: params.id } };
  },

  deleteMany: async (resource, params) => {
    console.debug(`[dataProvider] deleteMany ${resource}:`, params.ids);
    await Promise.all(
      params.ids.map(async (id) => {
        const url = `${getResourceUrl(resource)}/${id}`;
        const response = await fetch(url, {
          method: "DELETE",
          headers: getHeaders(),
        });
        await handleResponse(response);
      })
    );
    return { data: params.ids };
  },
};

export default dataProvider;
