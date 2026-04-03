/**
 * Frontend RBAC helpers — reads permissions fetched from backend at login.
 *
 * Permissions are stored in localStorage as "permissions" after calling
 * GET /api/v2/users/permissions. The backend derives them from
 * config/permissions.config.js using the same role hierarchy as
 * rbacPermissions.middleware.js.
 *
 * Shape of stored permissions:
 * {
 *   role: "admin",
 *   roleLevel: 2,
 *   resourceAccess: { tourPackage: { list: true, create: true, ... }, ... },
 *   pageAccess: { dashboard: true, analytics: true, ... }
 * }
 */

const getStoredPermissions = () => {
  try {
    return JSON.parse(localStorage.getItem("permissions") || "null");
  } catch {
    return null;
  }
};

/**
 * Check if user can perform an action on a resource.
 * Maps react-admin resource names to backend permission keys.
 */
const RESOURCE_TO_BACKEND = {
  tours: "tourPackage",
  destinations: "destination",
  bookings: "booking",
  payments: "payment",
  hotels: "partner",
  attractions: "partner",
  dining: "partner",
  transport: "partner",
  customers: "user",
  staff: "admin",
  interests: "interest",
  contracts: "contract",
  templates: "admin",
};

// Some frontend resources map to non-standard backend permission names
const SPECIAL_PERMISSION_MAP = {
  "staff.list": "admin.staffManagement",
  "staff.create": "admin.staffManagement",
  "staff.edit": "admin.staffManagement",
  "customers.list": "user.listUsers",
  "customers.show": "user.listUsers",
  "templates.list": "admin.settings",
  "templates.create": "admin.settings",
  "templates.edit": "admin.settings",
};

export const canAccess = (resource, action) => {
  const perms = getStoredPermissions();
  if (!perms) return false;

  // super_admin always has access
  if (perms.role === "super_admin") return true;

  // Check special mappings first
  const specialKey = `${resource}.${action}`;
  if (SPECIAL_PERMISSION_MAP[specialKey]) {
    const [res, act] = SPECIAL_PERMISSION_MAP[specialKey].split(".");
    return perms.resourceAccess?.[res]?.[act] === true;
  }

  const backendResource = RESOURCE_TO_BACKEND[resource] || resource;
  return perms.resourceAccess?.[backendResource]?.[action] === true;
};

/**
 * Check if user can view a page
 */
export const canViewPage = (page) => {
  const perms = getStoredPermissions();
  if (!perms) return false;
  if (perms.role === "super_admin") return true;
  return perms.pageAccess?.[page] === true;
};

/**
 * Get the current user's role
 */
export const getCurrentRole = () => {
  const perms = getStoredPermissions();
  return perms?.role || "customer";
};

/**
 * Check if current user is at least admin level
 */
export const isAdmin = () => {
  const perms = getStoredPermissions();
  return (perms?.roleLevel || 0) >= 2;
};

/**
 * Check if current user is super_admin
 */
export const isSuperAdmin = () => {
  const perms = getStoredPermissions();
  return perms?.role === "super_admin";
};

/**
 * Fetch permissions from backend and store them.
 * Called at login and can be refreshed.
 */
export const fetchAndStorePermissions = async (apiUrl, token) => {
  const res = await fetch(`${apiUrl}/users/permissions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    console.error("[permissions] Failed to fetch:", res.status);
    return null;
  }
  const perms = await res.json();
  localStorage.setItem("permissions", JSON.stringify(perms));
  console.debug("[permissions] Stored for role:", perms.role);
  return perms;
};
