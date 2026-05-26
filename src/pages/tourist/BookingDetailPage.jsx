import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  fetchMyBookingThunk,
  cancelBookingThunk,
  initiatePaymentThunk,
  selectCurrentBooking,
  selectCurrentBookingStatus,
  selectPaymentUrl,
  selectPaymentStatus,
} from "../../store/slices/bookingsSlice";

const STATUS_STYLES = {
  confirmed: "bg-green-100 text-green-700",
  pending_payment: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-600",
  completed: "bg-purple-100 text-purple-700",
};

export default function BookingDetailPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const booking = useAppSelector(selectCurrentBooking);
  const status = useAppSelector(selectCurrentBookingStatus);
  const paymentUrl = useAppSelector(selectPaymentUrl);
  const paymentStatus = useAppSelector(selectPaymentStatus);
  const [cancelReason, setCancelReason] = useState("");
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    dispatch(fetchMyBookingThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (paymentUrl) window.location.href = paymentUrl;
  }, [paymentUrl]);

  const handlePay = () => {
    if (!booking) return;
    dispatch(initiatePaymentThunk({ bookingId: booking._id, amount: booking.totalAmount }));
  };

  const handleCancel = async () => {
    setCancelling(true);
    await dispatch(cancelBookingThunk({ id: booking._id, reason: cancelReason }));
    setCancelling(false);
    setShowCancelForm(false);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#f9f5ff] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#7b2cbf] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "failed" || !booking) {
    return (
      <div className="min-h-screen bg-[#f9f5ff] flex items-center justify-center px-4">
        <div className="bg-white rounded-[16px] p-8 max-w-md w-full text-center">
          <p className="font-raleway text-[16px] text-[#cc0000] mb-4">Booking not found.</p>
          <Link to="/account/bookings" className="font-raleway text-[14px] font-semibold text-[#7b2cbf] hover:underline">
            Back to My Bookings
          </Link>
        </div>
      </div>
    );
  }

  const statusClass = STATUS_STYLES[booking.status] || "bg-gray-100 text-gray-600";
  const tourName = booking.packageId?.title || booking.tourName || "Tour Booking";
  const travelDate = booking.tourDate
    ? new Date(booking.tourDate).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    : "—";

  return (
    <main className="min-h-screen bg-[#f9f5ff] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link to="/account/bookings" className="font-raleway text-[13px] font-semibold text-[#7b2cbf] hover:underline mb-6 inline-block">
          ← Back to My Bookings
        </Link>

        <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#f0e8fb]">
          <div className="flex justify-between items-start mb-6">
            <h1 className="font-raleway font-bold text-[22px] text-[#2b0f43]">{tourName}</h1>
            <span className={`text-[12px] font-raleway font-semibold px-3 py-1 rounded-full ${statusClass}`}>
              {booking.status?.replace(/_/g, " ")}
            </span>
          </div>

          <dl className="grid grid-cols-2 gap-y-4 gap-x-6 mb-6">
            <div>
              <dt className="font-raleway text-[12px] text-[#9b8aab] uppercase tracking-wide">Travel Date</dt>
              <dd className="font-raleway text-[15px] font-semibold text-[#2b0f43]">{travelDate}</dd>
            </div>
            <div>
              <dt className="font-raleway text-[12px] text-[#9b8aab] uppercase tracking-wide">Passengers</dt>
              <dd className="font-raleway text-[15px] font-semibold text-[#2b0f43]">{booking.groupSize || 1}</dd>
            </div>
            {booking.totalAmount && (
              <div>
                <dt className="font-raleway text-[12px] text-[#9b8aab] uppercase tracking-wide">Total</dt>
                <dd className="font-raleway text-[15px] font-bold text-[#7b2cbf]">GHS {Number(booking.totalAmount).toLocaleString()}</dd>
              </div>
            )}
            {(booking.bookingRef || booking.bookingReference) && (
              <div>
                <dt className="font-raleway text-[12px] text-[#9b8aab] uppercase tracking-wide">Reference</dt>
                <dd className="font-raleway text-[15px] font-semibold text-[#2b0f43]">{booking.bookingRef || booking.bookingReference}</dd>
              </div>
            )}
          </dl>

          {booking.specialRequests && (
            <div className="mb-6 p-4 bg-[#f9f5ff] rounded-[12px]">
              <p className="font-raleway text-[12px] text-[#9b8aab] uppercase tracking-wide mb-1">Special Requests</p>
              <p className="font-raleway text-[14px] text-[#565656]">{booking.specialRequests}</p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {booking.status === "pending_payment" && (
              <button
                onClick={handlePay}
                disabled={paymentStatus === "loading"}
                className="w-full h-[52px] bg-[#7b2cbf] rounded-[40px] font-raleway font-semibold text-[16px] text-white hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {paymentStatus === "loading" ? "Redirecting to payment…" : "Pay Now"}
              </button>
            )}
            {["pending_payment", "confirmed"].includes(booking.status) && !showCancelForm && (
              <button
                onClick={() => setShowCancelForm(true)}
                className="w-full h-[52px] border border-[#d6beeb] rounded-[40px] font-raleway font-semibold text-[16px] text-[#7b2cbf] hover:bg-[#f9f5ff] transition-colors"
              >
                Cancel Booking
              </button>
            )}
            {showCancelForm && (
              <div className="flex flex-col gap-3 p-4 bg-[#fff8f8] border border-[#ffcccc] rounded-[12px]">
                <p className="font-raleway text-[14px] font-semibold text-[#cc0000]">Cancel this booking?</p>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Reason for cancellation (optional)"
                  className="w-full h-[80px] p-3 font-raleway text-[13px] text-[#565656] border border-[#e2d4f0] rounded-[10px] outline-none resize-none"
                />
                <div className="flex gap-3">
                  <button onClick={handleCancel} disabled={cancelling} className="flex-1 h-[44px] bg-red-500 rounded-[40px] font-raleway font-semibold text-[14px] text-white hover:opacity-90 disabled:opacity-60">
                    {cancelling ? "Cancelling…" : "Yes, Cancel"}
                  </button>
                  <button onClick={() => setShowCancelForm(false)} className="flex-1 h-[44px] border border-[#d6beeb] rounded-[40px] font-raleway font-semibold text-[14px] text-[#7b2cbf]">
                    Keep Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
