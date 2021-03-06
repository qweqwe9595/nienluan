import { useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Icon from "@material-tailwind/react/Icon";
import H6 from "@material-tailwind/react/Heading6";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState("-left-64");
  return (
    <>
      <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
      >
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="mt-2 text-center w-full inline-block"
          >
            <H6 color="gray">TRANG QUẢN TRỊ</H6>
          </a>

          <div className="flex flex-col">
            <hr className="my-4 min-w-full" />

            <ul className="flex-col min-w-full flex list-none">
              <li className="rounded-lg mb-4">
                <Link
                  to="/"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                >
                  <Icon name="home" size="2xl" />
                  Trang chủ
                </Link>
              </li>
              <li className="rounded-lg mb-4">
                <Link
                  to="/admin"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                >
                  <Icon name="dashboard" size="2xl" />
                  Dashboard
                </Link>
              </li>
              <li className="rounded-lg mb-2">
                <Link
                  to="/admin/event-manager"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                >
                  <Icon name="event" size="2xl" />
                  Quản lý sự kiện
                </Link>
              </li>
              <li className="rounded-lg mb-2">
                <Link
                  to="/admin/job-manager"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                >
                  <Icon name="work" size="2xl" />
                  Quản lý tuyển dụng
                </Link>
              </li>
              <li className="rounded-lg mb-2 ">
                <Link
                  to="/admin/doc-manager"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                >
                  <Icon name="list_alt" size="2xl" />
                  Quản lý tài liệu
                </Link>
              </li>
              <li className="rounded-lg mb-2 ">
                <Link
                  to="/admin/report-manager"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                >
                  <Icon name="report" size="2xl" />
                  Quản lý báo cáo
                </Link>
              </li>
              {/* <li className="rounded-lg mb-2 text-gray-700">
                <Link
                  to="/admin/maps"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                >
                  <Icon name="map" size="2xl" />
                  Maps
                </Link>
              </li>
              <li className="px-4 rounded-lg mb-2 text-gray-700">
                <a
                  href="https://demos.creative-tim.com/material-tailwind-kit-react/#/landing"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 text-sm font-light py-3"
                >
                  <Icon name="web" size="2xl" />
                  Landing Page
                </a>
              </li>
              <li className="px-4 rounded-lg mb-2 text-gray-700">
                <a
                  href="https://demos.creative-tim.com/material-tailwind-kit-react/#/profile"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 text-sm font-light py-3"
                >
                  <Icon name="account_circle" size="2xl" />
                  Profile Page
                </a>
              </li>
            </ul>

            <ul className="flex-col min-w-full flex list-none absolute bottom-0">
              <li className="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 px-4 rounded-lg text-white mb-2">
                <a
                  href="https://material-tailwind.com/documentation/quick-start"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 text-sm font-light py-3"
                >
                  <Icon name="description" size="2xl" />
                  Documentation
                </a>
              </li>
              <li className="bg-gradient-to-tr from-purple-500 to-purple-700 px-4 rounded-lg text-white">
                <a
                  href="https://www.creative-tim.com/product/material-tailwind-dashboard-react"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-4 text-sm font-light py-3"
                >
                  Free Download
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
