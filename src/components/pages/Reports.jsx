import React, { useState } from "react";
import MainLayout from "../common/MainLayout";
import UserReports from "../reports/UserReports";
import BookingsReports from "../reports/BookingsReports";
import ChatsReports from "../reports/ChatsReports";
import RevenueReports from "../reports/RevenueReports";

function Reports() {
  const [activeTab, setActiveTab] = useState("user");
  const [timeFilter, setTimeFilter] = useState("today");

  const tabs = [
    { id: "user", label: "User reports" },
    { id: "booking", label: "Booking reports" },
    { id: "chats", label: "Chats reports" },
    { id: "revenue", label: "Revenue reports" },
  ];

  return (
    <MainLayout>
      <div className="p-6 bg-[#f6f6f6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
              <p className="text-gray-600 mt-1 italic">
                View insights on user growth, bookings, and chat engagement.
              </p>
            </div>
            <div className="flex bg-gray-100 rounded-full border border-gray-200">
              <button
                onClick={() => setTimeFilter("today")}
                className={`py-1 text-gray-900 rounded-full text-sm font-semibold transition-colors ${
                  timeFilter === "today"
                    ? "bg-[#acbed7] px-10"
                    : "px-10 py-1 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setTimeFilter("total")}
                className={`py-1 text-gray-500 rounded-full text-sm font-medium hover:bg-gray-50 hover:text-gray-700 transition-colors ${
                  timeFilter === "total" ? "bg-[#acbed7] px-10" : "px-10 py-1"
                }`}
              >
                Total
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className=" border-[#e7e7e7] mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex px-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-6 px-2 border-b-2 text-base transition-colors text-center cursor-pointer ${
                      activeTab === tab.id
                        ? "border-[#abbcd6] "
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Report Content based on Active Tab */}
          {activeTab === "user" && <UserReports period={timeFilter} />}
          {activeTab === "booking" && (
            <BookingsReports
              startDate={
                timeFilter === "today"
                  ? new Date().toISOString().split("T")[0]
                  : "2024-01-01"
              }
              endDate={new Date().toISOString().split("T")[0]}
            />
          )}
          {activeTab === "chats" && <ChatsReports />}
          {activeTab === "revenue" && (
            <RevenueReports
              period={timeFilter === "today" ? "month" : "year"}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Reports;
