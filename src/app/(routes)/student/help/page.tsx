"use client";

import React from "react";

const StudentHelpCenter = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21ZM23 15V17H17V15H23ZM20 19V21H14V19H20ZM21 11V13H15V11H21Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Help Center</h1>
                <p className="text-white/80 text-lg">Student Support</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                  Need Help? We're Here for You!
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
                  If you have any questions about placements, job applications,
                  resume uploads, or need assistance with the platform, our
                  dedicated web team is ready to help you.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-blue-600"
                    >
                      <path
                        d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    Contact Our Team
                  </h3>
                </div>

                <div className="space-y-4">
                  <p className="text-slate-700 font-medium">
                    For any questions about placements, technical support, or
                    platform assistance:
                  </p>

                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <a
                      href="mailto:tpcwebteam@iiti.ac.in"
                      className="text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors duration-200"
                    >
                      tpcwebteam@iiti.ac.in
                    </a>
                  </div>

                  <p className="text-slate-600 text-sm">
                    We typically respond within 24 hours during business days.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-green-600"
                    >
                      <path
                        d="M16 4H18C20.2091 4 22 5.79086 22 8V16C22 18.2091 20.2091 20 18 20H6C3.79086 20 2 18.2091 2 16V8C2 5.79086 3.79086 4 6 4H8M16 4V2M16 4V6M8 4V2M8 4V6M6 10H18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">
                    Placement Support
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Help with job applications and placement process
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-purple-600"
                    >
                      <path
                        d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17ZM17 21V11H13V7H7V19H17Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">
                    Resume Help
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Assistance with resume uploads and formats
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-orange-600"
                    >
                      <path
                        d="M8.5 14.5L16 7L18 9L10.5 16.5L6 12L8 10L8.5 14.5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">
                    Platform Guidance
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Technical support for using the portal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHelpCenter;
