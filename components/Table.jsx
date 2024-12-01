"use client";

import { useState } from "react";
import { FaEdit, FaEye, FaEllipsisV } from "react-icons/fa";
import { GoLink } from "react-icons/go";
import ActionMenu from "./ActionMenu";
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
  const [action, setAction] = useState("");
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
  const actionText = (text) => {
    setAction(text);
  };

  const handleDateRangeChange = ({ startDate, endDate }) => {
    // Handle the date range selection here
    console.log("Date Range:", { startDate, endDate });
    // Update your table data based on the selected date range
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg mb-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold"> {type} </h2>
            <button
              className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded"
              onClick={() => {
                router.push(`/posts/${type}/new-post`);
              }}
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <CalendarModal onApply={handleDateRangeChange} />
          </div>
        </div>

        <div className="flex mt-4 border-b gap-3">
          <button
            className={`${
              filter === "Published"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "border-b-2 border-transparent text-black"
            } transition-all linear duration-300 pb-2`}
            onClick={() => {
              setFilter("Published"), onStatusChange("published");
            }}
          >
            Published
          </button>
          <button
            className={`${
              filter === "Draft"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "border-b-2 border-transparent text-black"
            } transition-all linear duration-300 pb-2`}
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
                ? "border-b-2 border-blue-600 text-blue-600"
                : "border-b-2 border-transparent text-black"
            } transition-all linear duration-300 pb-2`}
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
                ? "border-b-2 border-blue-600 text-blue-600"
                : "border-b-2 border-transparent text-black"
            } transition-all linear duration-300 pb-2`}
            onClick={() => {
              setFilter("Scheduled");
              onStatusChange("scheduled");
            }}
          >
            Scheduled
          </button>
        </div>
      </div>

      <div className="p-3 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Published Posts</h2>
        <div className=" float-end"></div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-sm text-left border border-gray-300">
                Title
              </th>
              <th className="px-4 py-2 text-sm text-left border border-gray-300">
                Categories
              </th>
              <th className="px-4 py-2 text-sm text-left border border-gray-300">
                Credits
              </th>

              <th className="px-4 py-2 text-sm text-center border border-gray-300">
                Word Count
              </th>
              <th className="px-4 py-2 text-sm text-center border border-gray-300">
                SEO Score
              </th>
              <th className="px-4 py-2 text-sm text-left border border-gray-300">
                Timeline
              </th>
              <th className="px-4 py-2 text-sm text-center border border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((article, index) => {
              const renderingCategories = [
                ...(article.primary_category || []),
                ...(article.categories || []),
              ];
              const uniqueRenderingCategories = Array.from(
                new Map(
                  renderingCategories.map((item) => [item._id, item])
                ).values()
              );

              return (
                <tr key={index} className="hover:bg-gray-50 group">
                  <td className="px-4 py-2 border border-gray-300  text-sm group-hover:text-blue-600 ">
                    {article.title}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <span className={`px-2 py-1 rounded   text-sm`}>
                      {uniqueRenderingCategories.map((e, i) => (
                        <div className="p-1" key={i}>
                          {e.name}
                          {i < uniqueRenderingCategories.length - 1 && ", "}
                        </div>
                      ))}
                    </span>
                  </td>
                  <td className="px-4 py-2 border border-gray text-sm ">
                    {article.credits?.map((c, i) => (
                      <span key={i}>
                        {c.name}
                        {i < article.credits.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </td>

                  <td className="px-4 py-2 text-center border border-gray-300 text-sm">
                    {article &&
                      article.content &&
                      article.content.split(" ").length}
                  </td>
                  <td className="px-4 py-2 text-center border border-gray-300 text-sm">
                    <span
                      className={`px-2 py-1 rounded ${
                        article.seoScore === 100
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {10}
                    </span>
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-sm">
                    {formatDate(article.published_at_datetime)}
                  </td>
                  <td className="px-4 py-2 text-center border border-gray-300 relative">
                    <div className="flex justify-center space-x-2">
                      <FaEdit
                        className="text-blue-500 cursor-pointer"
                        onClick={() => {
                          const type = article?.type ?? "defaultType"; // Provide a default if undefined
                          const views = article?.views ?? "0"; // Provide a default if undefined
                          router.push(`/posts/${type}/${article._id}`);
                        }}
                      />
                      <FaEye
                        className="text-blue-500 cursor-pointer"
                        onClick={() => {
                          const url = `${process.env.NEXT_PUBLIC_API_URL2}/${article.primary_category[0].slug}/${article.slug}`;
                          window.open(url, "_blank");
                        }}
                      />
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
                      >
                        <GoLink className="text-blue-500 cursor-pointer" />
                      </button>

                      {/* <FaEllipsisV
                        className="text-blue-500 cursor-pointer"
                        onClick={() => actionText(article._id)}
                      /> */}
                    </div>
                    {action === article._id && (
                      <div className=" absolute shadow-2xl z-10 bottom-8 end-0">
                        <ActionMenu
                          actionText={actionText}
                          id={article._id}
                          type={article.type}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
