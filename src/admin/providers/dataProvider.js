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
  gallery: "/gallery",
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
  console.debug("[dataProvider] unwrapRecord input keys:", Object.keys(data));
  if (data._id || data.id) return data;
  const unwrapped =
    data.booking ||
    data.package ||
    data.user ||
    data.destination ||
    data.hotel ||
    data.attraction ||
    data.provider ||
    data.guide ||
    data.review ||
    data.interest ||
    data.notification ||
    data.organization ||
    data.data ||
    data.template ||
    data.contract ||
    data.gallery ||
    data;
  console.debug("[dataProvider] unwrapRecord resolved to:", unwrapped?._id || unwrapped?.id || "(no id)");
  return unwrapped;
};

const handleResponse = async (response, context = "") => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    console.error(`[dataProvider] ${response.status} ${response.url}:`, error);
    console.error(`[dataProvider] Context: ${context}`);
    const err = new Error(error.message || `API error: ${response.status}`);
    err.status = response.status;
    err.body = error;
    throw err;
  }
  const data = await response.json();
  const summary = Array.isArray(data) ? `[Array(${data.length})]` : Object.keys(data).join(", ");
  console.debug(`[dataProvider] ${response.status} ${response.url} => keys: ${summary}`);
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
    console.debug(`[dataProvider] GET getList ${resource}: ${url}`);
    console.debug(`[dataProvider] getList query params:`, query);
    const response = await fetch(url, { headers: getHeaders(), signal: params.signal });
    const data = await handleResponse(response, `getList(${resource})`);

    // Handle inconsistent response shapes from different backend services
    const records = data.rows || data.bookings || data.payments || data.results || data.organizations || data.queue || data.data || (Array.isArray(data) ? data : []);
    console.debug(`[dataProvider] getList ${resource}: ${records.length} records, total=${data.total || data.totalCount || records.length}`);

    return {
      data: records.map(transformRecord),
      total: data.total || data.totalCount || records.length,
    };
  },

  getOne: async (resource, params) => {
    const url = `${getResourceUrl(resource)}/${params.id}`;
    console.debug(`[dataProvider] GET getOne ${resource}/${params.id}: ${url}`);
    const response = await fetch(url, { headers: getHeaders(), signal: params.signal });
    const data = await handleResponse(response, `getOne(${resource}, ${params.id})`);

    const record = unwrapRecord(data);
    return { data: transformRecord(record) };
  },

  getMany: async (resource, params) => {
    console.debug(`[dataProvider] GET getMany ${resource}: ids=[${params.ids.join(", ")}]`);
    const records = await Promise.all(
      params.ids.map(async (id) => {
        try {
          const url = `${getResourceUrl(resource)}/${id}`;
          console.debug(`[dataProvider] GET getMany ${resource}/${id}: ${url}`);
          const response = await fetch(url, { headers: getHeaders() });
          const data = await handleResponse(response, `getMany(${resource}, ${id})`);
          const record = unwrapRecord(data);
          return transformRecord(record);
        } catch (err) {
          console.warn(`[dataProvider] getMany ${resource}/${id} failed:`, err.message, err.status, err.body);
          return { id }; // Return stub record so react-admin doesn't crash
        }
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
    console.debug(`[dataProvider] GET getManyReference ${resource}: ${url}`);
    console.debug(`[dataProvider] getManyReference query params:`, query);
    const response = await fetch(url, { headers: getHeaders(), signal: params.signal });
    const data = await handleResponse(response, `getManyReference(${resource}, ${params.target}=${params.id})`);

    const records = data.rows || data.bookings || data.payments || data.results || data.organizations || data.queue || data.data || (Array.isArray(data) ? data : []);
    return {
      data: records.map(transformRecord),
      total: data.total || records.length,
    };
  },

  create: async (resource, params) => {
    // Staff/user creation uses POST /users → user.createStaffUser (admin endpoint)
    const url = getResourceUrl(resource);
    const body = params.data;
    console.debug(`[dataProvider] POST create ${resource}: ${url}`, body);
    const response = await fetch(url, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    const data = await handleResponse(response, `create(${resource})`);
    const record = unwrapRecord(data);
    return { data: transformRecord(record) };
  },

  update: async (resource, params) => {
    const url = `${getResourceUrl(resource)}/${params.id}`;
    console.debug(`[dataProvider] PUT update ${resource}/${params.id}: ${url}`, params.data);
    const response = await fetch(url, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(params.data),
    });
    const data = await handleResponse(response, `update(${resource}, ${params.id})`);
    const record = unwrapRecord(data);
    return { data: transformRecord(record) };
  },

  updateMany: async (resource, params) => {
    console.debug(`[dataProvider] PUT updateMany ${resource}: ids=[${params.ids.join(", ")}]`, params.data);
    const results = await Promise.all(
      params.ids.map(async (id) => {
        const url = `${getResourceUrl(resource)}/${id}`;
        console.debug(`[dataProvider] PUT updateMany ${resource}/${id}: ${url}`);
        const response = await fetch(url, {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify(params.data),
        });
        await handleResponse(response, `updateMany(${resource}, ${id})`);
        return id;
      })
    );
    return { data: results };
  },

  delete: async (resource, params) => {
    const url = `${getResourceUrl(resource)}/${params.id}`;
    console.debug(`[dataProvider] DELETE delete ${resource}/${params.id}: ${url}`);
    const response = await fetch(url, {
      method: "DELETE",
      headers: getHeaders(),
    });
    await handleResponse(response, `delete(${resource}, ${params.id})`);
    return { data: { id: params.id } };
  },

  deleteMany: async (resource, params) => {
    console.debug(`[dataProvider] DELETE deleteMany ${resource}: ids=[${params.ids.join(", ")}]`);
    await Promise.all(
      params.ids.map(async (id) => {
        const url = `${getResourceUrl(resource)}/${id}`;
        console.debug(`[dataProvider] DELETE deleteMany ${resource}/${id}: ${url}`);
        const response = await fetch(url, {
          method: "DELETE",
          headers: getHeaders(),
        });
        await handleResponse(response, `deleteMany(${resource}, ${id})`);
      })
    );
    return { data: params.ids };
  },
};

export default dataProvider;
