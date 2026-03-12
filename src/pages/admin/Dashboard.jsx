import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const stats = [
    { label: 'Total Tours', value: '32', change: '+4 this month', iconColor: 'bg-blue-100 text-blue-600' },
    { label: 'Active Partners', value: '18', change: '2 pending', iconColor: 'bg-green-100 text-green-600' },
    { label: 'Inbound Messages', value: '145', change: '12 new today', iconColor: 'bg-purple-100 text-purple-600' },
    { label: 'Newsletter Subs', value: '1,240', change: '+85 growth', iconColor: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-tertiary-normal-default">Welcome back, {user?.name || 'Admin'}</h2>
        <p className="text-primary-dark-active">Here's what's happening with Elysium Tours today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-primary-dark-default shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.iconColor}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                   <path d="M12 20V10M18 20V4M6 20v-4" />
                </svg>
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
            </div>
            <h3 className="text-primary-dark-active text-sm font-medium">{stat.label}</h3>
            <p className="text-3xl font-bold text-tertiary-normal-default mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity / Bottom Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-primary-dark-default shadow-sm p-6">
          <h3 className="text-lg font-bold mb-6">Recent Tour Bookings</h3>
          <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="text-sm text-primary-dark-active border-b border-primary-normal-hover">
                   <th className="pb-4 font-semibold">Traveler</th>
                   <th className="pb-4 font-semibold">Tour</th>
                   <th className="pb-4 font-semibold">Date</th>
                   <th className="pb-4 font-semibold">Status</th>
                 </tr>
               </thead>
               <tbody className="text-sm">
                 {[1,2,3].map(i => (
                   <tr key={i} className="border-b border-primary-normal-hover last:border-0">
                     <td className="py-4">John Doe</td>
                     <td className="py-4">Kakum Canopy Walk</td>
                     <td className="py-4">Oct 24, 2025</td>
                     <td className="py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs">Confirmed</span></td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl border border-primary-dark-default shadow-sm p-6">
          <h3 className="text-lg font-bold mb-6">Support Tickets</h3>
          <div className="flex flex-col gap-4">
             {[1,2,3].map(i => (
               <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary-normal-default transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-secondary-light-default flex items-center justify-center text-secondary-normal-default font-bold">JD</div>
                  <div>
                    <p className="text-sm font-bold">Booking Inquiry</p>
                    <p className="text-xs text-primary-dark-active">2 hours ago</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
