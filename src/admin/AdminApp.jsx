import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import LuggageIcon from "@mui/icons-material/Luggage";
import MapIcon from "@mui/icons-material/Map";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PaymentIcon from "@mui/icons-material/Payment";
import HotelIcon from "@mui/icons-material/Hotel";
import AttractionsIcon from "@mui/icons-material/Attractions";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import PeopleIcon from "@mui/icons-material/People";
import BadgeIcon from "@mui/icons-material/Badge";
import BusinessIcon from "@mui/icons-material/Business";
import DescriptionIcon from "@mui/icons-material/Description";
import StarIcon from "@mui/icons-material/Star";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

import dataProvider from "./providers/dataProvider";
import authProvider from "./providers/authProvider";
import { adminTheme, adminDarkTheme } from "./theme/adminTheme";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./dashboard/Dashboard";

// Resource views
import { TourPackageList, TourPackageCreate, TourPackageEdit, TourPackageShow } from "./resources/tours";
import { DestinationList, DestinationCreate, DestinationEdit } from "./resources/destinations";
import { CountryList, CountryCreate, CountryEdit } from "./resources/countries";
import PublicIcon from "@mui/icons-material/Public";
import { BookingList, BookingShow, BookingEdit } from "./resources/bookings";
import { CustomerList, CustomerShow } from "./resources/customers";
import { HotelList, HotelCreate, HotelEdit } from "./resources/partners/hotels";
import { AttractionList, AttractionCreate, AttractionEdit } from "./resources/partners/attractions";
import { DiningList, DiningCreate, DiningEdit } from "./resources/partners/dining";
import { TransportList, TransportCreate, TransportEdit } from "./resources/partners/transport";
import { StaffList, StaffCreate, StaffEdit } from "./resources/staff";
import { PaymentList, PaymentShow } from "./resources/payments";
import { OrganizationList, OrganizationShow, OrganizationCreate, OrganizationEdit } from "./resources/organizations";
import { ContractTemplateList, ContractTemplateCreate, ContractTemplateEdit } from "./resources/contracts";
import { ReviewList, ReviewShow } from "./resources/reviews";
import { GalleryList, GalleryCreate, GalleryEdit } from "./resources/gallery";
import { TemplateList, TemplateCreate, TemplateEdit } from "./resources/templates";
import EmailIcon from "@mui/icons-material/Email";

// Custom pages
import PricingDeskList from "./pages/pricingDesk/PricingDeskList";
import QuoteDetail from "./pages/pricingDesk/QuoteDetail";
import AnalyticsDashboard from "./pages/analytics/AnalyticsDashboard";
import SlaDashboard from "./pages/sla/SlaDashboard";
import PlatformSettings from "./pages/settings/PlatformSettings";
import NotificationLog from "./pages/communications/NotificationLog";
import PlatformHealth from "./pages/platformHealth/PlatformHealth";

/**
 * AdminApp — All Resources are always registered.
 *
 * Visibility is controlled by authProvider.canAccess() which reads
 * permissions fetched from the backend at login. react-admin v5
 * automatically hides menu items, create/edit buttons, and routes
 * when canAccess returns false for a resource+action.
 *
 * The backend enforces access via rbacPermissions.middleware.js
 * as the ultimate authority — the frontend just hides UI elements.
 */
const AdminApp = () => (
  <Admin
    basename="/admin"
    dataProvider={dataProvider}
    authProvider={authProvider}
    theme={adminTheme}
    darkTheme={adminDarkTheme}
    layout={AdminLayout}
    dashboard={Dashboard}
    requireAuth
  >
    {/* Tour Management */}
    <Resource
      name="tours"
      list={TourPackageList}
      create={TourPackageCreate}
      edit={TourPackageEdit}
      show={TourPackageShow}
      icon={LuggageIcon}
      recordRepresentation="title"
    />
    <Resource
      name="destinations"
      list={DestinationList}
      create={DestinationCreate}
      edit={DestinationEdit}
      icon={MapIcon}
      recordRepresentation="name"
    />
    <Resource
      name="countries"
      list={CountryList}
      create={CountryCreate}
      edit={CountryEdit}
      icon={PublicIcon}
      recordRepresentation="name"
    />

    {/* Operations */}
    <Resource
      name="bookings"
      list={BookingList}
      show={BookingShow}
      edit={BookingEdit}
      icon={BookOnlineIcon}
      recordRepresentation="bookingRef"
    />
    <Resource
      name="payments"
      list={PaymentList}
      show={PaymentShow}
      icon={PaymentIcon}
      recordRepresentation="transactionRef"
    />

    {/* Partners */}
    <Resource name="hotels" list={HotelList} create={HotelCreate} edit={HotelEdit} icon={HotelIcon} recordRepresentation="name" />
    <Resource name="attractions" list={AttractionList} create={AttractionCreate} edit={AttractionEdit} icon={AttractionsIcon} recordRepresentation="name" />
    <Resource name="dining" list={DiningList} create={DiningCreate} edit={DiningEdit} icon={RestaurantIcon} recordRepresentation="name" />
    <Resource name="transport" list={TransportList} create={TransportCreate} edit={TransportEdit} icon={DirectionsBusIcon} recordRepresentation="companyName" />

    {/* People */}
    <Resource name="customers" list={CustomerList} show={CustomerShow} icon={PeopleIcon} recordRepresentation={(r) => `${r.firstName} ${r.lastName}`} />
    <Resource name="staff" list={StaffList} create={StaffCreate} edit={StaffEdit} icon={BadgeIcon} recordRepresentation={(r) => `${r.firstName} ${r.lastName}`} />

    {/* Platform — super_admin only (authProvider.canAccess controls visibility) */}
    <Resource name="organizations" list={OrganizationList} show={OrganizationShow} create={OrganizationCreate} edit={OrganizationEdit} icon={BusinessIcon} recordRepresentation="name" />

    {/* Administration */}
    <Resource name="contract-templates" list={ContractTemplateList} create={ContractTemplateCreate} edit={ContractTemplateEdit} icon={DescriptionIcon} recordRepresentation="name" />
    <Resource name="templates" list={TemplateList} create={TemplateCreate} edit={TemplateEdit} icon={EmailIcon} recordRepresentation="name" />
    <Resource name="reviews" list={ReviewList} show={ReviewShow} icon={StarIcon} recordRepresentation="title" />
    <Resource name="gallery" list={GalleryList} create={GalleryCreate} edit={GalleryEdit} icon={PhotoLibraryIcon} recordRepresentation="title" />

    {/* Custom Pages */}
    <CustomRoutes>
      <Route path="/pricing-desk" element={<PricingDeskList />} />
      <Route path="/pricing-desk/:quoteId" element={<QuoteDetail />} />
      <Route path="/analytics" element={<AnalyticsDashboard />} />
      <Route path="/sla-dashboard" element={<SlaDashboard />} />
      <Route path="/settings" element={<PlatformSettings />} />
      <Route path="/communications" element={<NotificationLog />} />
      <Route path="/platform-health" element={<PlatformHealth />} />
    </CustomRoutes>
  </Admin>
);

export default AdminApp;
