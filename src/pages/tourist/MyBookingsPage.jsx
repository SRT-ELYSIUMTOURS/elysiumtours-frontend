import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  fetchMyBookingsThunk,
  selectBookingsList,
  selectBookingsListStatus,
} from "../../store/slices/bookingsSlice";

const STATUS_STYLES = {
  confirmed: "bg-green-100 text-green-700",
  pending_payment: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-600",
  completed: "bg-purple-100 text-purple-700",
};

function BookingCard({ booking }) {
  const statusClass = STATUS_STYLES[booking.status] || "bg-gray-100 text-gray-600";
  const tourName = booking.packageId?.title || booking.tourName || "Tour Booking";
  const date = booking.tourDate
    ? new Date(booking.tourDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "—";

  return (
    <Link
      to={`/account/bookings/${booking._id}`}
      className="block bg-white rounded-[16px] p-5 shadow-sm hover:shadow-md transition-shadow border border-[#f0e8fb]"
    >
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="font-raleway font-bold text-[16px] text-[#2b0f43] mb-1">{tourName}</h3>
          <p className="font-raleway text-[13px] text-[#6b7280]">Travel date: {date}</p>
          {booking.groupSize && (
            <p className="font-raleway text-[13px] text-[#6b7280]">{booking.groupSize} passenger{booking.groupSize !== 1 ? "s" : ""}</p>
          )}
        </div>
        <span className={`text-[12px] font-raleway font-semibold px-3 py-1 rounded-full whitespace-nowrap ${statusClass}`}>
          {booking.status?.replace(/_/g, " ")}
        </span>
      </div>
      {booking.totalAmount && (
        <p className="mt-3 font-raleway font-bold text-[15px] text-[#7b2cbf]">
          GHS {Number(booking.totalAmount).toLocaleString()}
        </p>
      )}
    </Link>
  );
}

export default function MyBookingsPage() {
  const dispatch = useAppDispatch();
  const bookings = useAppSelector(selectBookingsList);
  const status = useAppSelector(selectBookingsListStatus);

  useEffect(() => {
    dispatch(fetchMyBookingsThunk());
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-[#f9f5ff] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-raleway font-bold text-[28px] text-[#2b0f43] mb-2">My Bookings</h1>
        <p className="font-raleway text-[15px] text-[#6b7280] mb-8">Manage your tour bookings and travel history.</p>

        {status === "loading" && (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-[#7b2cbf] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {status === "failed" && (
          <div className="bg-[#fff0f0] border border-[#ffcccc] rounded-[12px] p-5 text-center">
            <p className="font-raleway text-[14px] text-[#cc0000]">Failed to load bookings. Please try again.</p>
            <button
              onClick={() => dispatch(fetchMyBookingsThunk())}
              className="mt-3 font-raleway text-[14px] font-semibold text-[#7b2cbf] hover:underline"
            >
              Retry
            </button>
          </div>
        )}

        {status === "succeeded" && bookings.length === 0 && (
          <div className="bg-white rounded-[16px] p-10 text-center border border-[#f0e8fb]">
            <p className="font-raleway text-[16px] text-[#6b7280] mb-4">You haven't made any bookings yet.</p>
            <Link
              to="/tours"
              className="inline-block bg-[#7b2cbf] text-white font-raleway font-semibold text-[15px] px-6 py-3 rounded-[40px] hover:opacity-90 transition-opacity"
            >
              Explore Tours
            </Link>
          </div>
        )}

        {status === "succeeded" && bookings.length > 0 && (
          <div className="flex flex-col gap-4">
            {bookings.map((b) => <BookingCard key={b._id} booking={b} />)}
          </div>
        )}
      </div>
    </main>
  );
}
