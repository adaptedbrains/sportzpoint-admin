"use client";

import { useState } from "react";
import { FaEdit, FaEye, FaEllipsisV } from "react-icons/fa";
import { GoLink } from "react-icons/go";
import ActionMenu from "./ActionMenu";
import { useRouter } from "next/navigation";
import CalendarModal from "./CalendarModal";
import { formatDate } from "@/util/timeFormat";

export default function Table({ posts }) {
  const router = useRouter();

  const articles = [
    {
      title:
        "'You challenged me in ways no one else could': Roger Federer's special message on Rafael Nadal's retirement",
      category: "Tennis",
      author: "Payal Debnath",
      views: 11,
      wordCount: 591,
      seoScore: 93,
      publishedAt: "19 Nov 2024 16:07",
      type: "articles",
    },
    {
      title: "Clippers dominate second quarter to defeat the in-form Warriors.",
      category: "Basketball",
      author: "Muojindu Francis",
      views: 9,
      wordCount: 326,
      seoScore: 93,
      publishedAt: "19 Nov 2024 15:29",
      type: "articles",
    },
    {
      title: "The most Valuable U21 Football Players in 2024",
      category: "Football",
      author: "Muojindu Francis",
      views: 20,
      wordCount: 637,
      seoScore: 100,
      publishedAt: "18 Nov 2024 22:11",
      type: "articles",
    },
  ];
  const [filter, setFilter] = useState("Published");
  const [Action, setAction] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
            <h2 className="text-lg font-semibold">Article</h2>
            <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded">
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
            onClick={() => setFilter("Published")}
          >
            Published
          </button>
          <button
            className={`${
              filter === "Draft"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "border-b-2 border-transparent text-black"
            } transition-all linear duration-300 pb-2`}
            onClick={() => setFilter("Draft")}
          >
            Draft
          </button>
          <button
            className={`${
              filter === "PendingApproval"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "border-b-2 border-transparent text-black"
            } transition-all linear duration-300 pb-2`}
            onClick={() => setFilter("PendingApproval")}
          >
            Pending Approval
          </button>
          <button
            className={`${
              filter === "Scheduled"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "border-b-2 border-transparent text-black"
            } transition-all linear duration-300 pb-2`}
            onClick={() => setFilter("Scheduled")}
          >
            Scheduled
          </button>
        </div>
      </div>

      <div className="p-3 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Published Posts</h2>
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
            {posts.map((article, index) => (
              <tr key={index} className="hover:bg-gray-50 group">
                <td className="px-4 py-2 border border-gray-300  text-sm group-hover:text-blue-600 ">
                  {article.title}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <span className={`px-2 py-1 rounded   text-sm`}>
                    {article.categories.map((e, i) => {
                      return (
                        <div className="p-1" key={i}>
                          {e.name},
                        </div>
                      );
                    })}
                  </span>
                </td>
                <td className="px-4 py-2 border border-gray text-sm ">
                  {article.author && article.author.name && article.author.name}
                </td>

                <td className="px-4 py-2 text-center border border-gray-300 text-sm">
                  {article.content.split(" ").length}
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

                  {formatDate(article.updated_at_datetime)}

                </td>
                <td className="px-4 py-2 text-center border border-gray-300 relative">
                  <div className="flex justify-center space-x-2">
                    <FaEdit
                      className="text-blue-500 cursor-pointer"
                      onClick={() => {
                        const type = article?.type ?? "defaultType"; // Provide a default if undefined
                        const views = article?.views ?? "0"; // Provide a default if undefined
                        router.push(`/posts/${article.type}/${article._id}`);
                      }}
                    />
                    <FaEye className="text-blue-500 cursor-pointer" />
                    <GoLink className="text-blue-500 cursor-pointer" />

                    <FaEllipsisV
                      className="text-blue-500 cursor-pointer"
                      // onClick={() => actionText(article.views)}
                    />
                  </div>
                  {Action === article.views && (
                    <div className=" absolute shadow-2xl z-10 bottom-8 end-0">
                      {/* <ActionMenu actionText={actionText} /> */}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
