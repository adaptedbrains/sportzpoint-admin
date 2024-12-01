"use client";

import { useState } from "react";
import { FaEdit, FaEye, FaEllipsisV } from "react-icons/fa";
import { GoLink } from "react-icons/go";
import { useRouter, usePathname } from "next/navigation";
import CalendarModal from "./CalendarModal";
import { formatDate } from "../util/timeFormat";

export default function Table({
  posts,
  type,
  onStatusChange,
  currentPage,
  onNextPage,
  onPreviousPage,
  totalPage,
  loading,
}) {
  const router = useRouter();

  const [filter, setFilter] = useState("Published");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const pathname = usePathname();
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleDateRangeChange = ({ startDate, endDate }) => {
    // Handle the date range selection here
    console.log("Date Range:", { startDate, endDate });
    // Update your table data based on the selected date range
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold text-gray-800"> {type} </h2>
            <button
              className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-medium h-8 w-8 rounded-full transition-colors duration-150 flex items-center justify-center shadow-sm"
              onClick={() => {
                router.push(`/posts/${type}/new-post`);
              }}
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-4">
            <CalendarModal onApply={handleDateRangeChange} />
          </div>
        </div>

        <div className="flex mt-6 border-b gap-6">
          <button
            className={`${
              filter === "Published"
                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                : "border-b-2 border-transparent text-gray-600 hover:text-gray-800"
            } transition-all duration-200 pb-3 px-2`}
            onClick={() => {
              setFilter("Published"), onStatusChange("published");
            }}
          >
            Published
          </button>
          <button
            className={`${
              filter === "Draft"
                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                : "border-b-2 border-transparent text-gray-600 hover:text-gray-800"
            } transition-all duration-200 pb-3 px-2`}
            onClick={() => {
              setFilter("Draft");
              onStatusChange("draft");
            }}
          >
            Draft
          </button>
          <button
            className={`${
              filter === "PendingApproval"
                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                : "border-b-2 border-transparent text-gray-600 hover:text-gray-800"
            } transition-all duration-200 pb-3 px-2`}
            onClick={() => {
              setFilter("PendingApproval");
              onStatusChange("pending-approval");
            }}
          >
            Pending Approval
          </button>
          <button
            className={`${
              filter === "Scheduled"
                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                : "border-b-2 border-transparent text-gray-600 hover:text-gray-800"
            } transition-all duration-200 pb-3 px-2`}
            onClick={() => {
              setFilter("Scheduled");
              onStatusChange("scheduled");
            }}
          >
            Scheduled
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categories
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Credits
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Word Count
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                SEO Score
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timeline
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts?.map((article, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-4 py-3">
                  <div className="text-sm font-medium text-gray-900 truncate max-w-md">
                    {article.title}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-500">
                    {article.primary_category?.map((e, i) => (
                      <div key={i}>
                        {e.name}
                        {i < article.primary_category.length - 1 && ", "}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-500">
                    {article.credits?.map((c, i) => (
                      <span key={i}>
                        {c.name}
                        {i < article.credits.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="text-sm text-gray-500">
                    {article.content && article.content.split(" ").length}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      article.seoScore === 100
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {10}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-500">
                    {formatDate(article.published_at_datetime)}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        const type = article?.type ?? "defaultType";
                        const views = article?.views ?? "0";
                        router.push(`/posts/${type}/${article._id}`);
                      }}
                      className="p-1 text-gray-600 hover:text-blue-600 transition-colors duration-150"
                    >
                      <FaEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        router.push(`/posts/${type}/edit/${article._id}`);
                      }}
                      className="p-1 text-gray-600 hover:text-blue-600 transition-colors duration-150"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        const url = `${process.env.NEXT_PUBLIC_API_URL2}/${article.primary_category[0].slug}/${article.slug}`;
                        navigator.clipboard
                          .writeText(url)
                          .then(() => {
                            alert("Copied");
                          })
                          .catch((err) => {
                            alert("Failed to copy!");
                          });
                      }}
                      className="p-1 text-gray-600 hover:text-blue-600 transition-colors duration-150"
                    >
                      <GoLink className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
