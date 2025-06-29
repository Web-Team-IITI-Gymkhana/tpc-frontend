"use client";

import React from "react";

const FacultyHelpCenter = () => {
  return (
    <div className="min-h-screen w-full bg-slate-50 p-2 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden">
          {/* Header */}
          <div className="bg-slate-800 text-white p-4 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 opacity-90"></div>
            <div className="relative flex flex-col sm:flex-row items-center gap-3 md:gap-4">
              <div className="w-12 md:w-16 h-12 md:h-16 bg-slate-700/40 rounded-xl flex items-center justify-center backdrop-blur-sm border border-slate-600/30">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-slate-100 md:w-8 md:h-8"
                >
                  <path
                    d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21ZM23 15V17H17V15H23ZM20 19V21H14V19H20ZM21 11V13H15V11H21Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-slate-100">
                  Help Center
                </h1>
                <p className="text-slate-300 text-base md:text-lg font-medium">
                  Faculty Support
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-8">
            <div className="text-center">
              <div className="mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 md:mb-4">
                  Need Help? We're Here for You!
                </h2>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                  If you have any questions about approvals, student
                  assessments, accessing placement data, or need assistance with
                  the platform, our dedicated web team is ready to help you.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 md:p-8 border border-slate-200">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-4">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-slate-800 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white md:w-6 md:h-6"
                    >
                      <path
                        d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800">
                    Contact Our Team
                  </h3>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <p className="text-slate-700 font-semibold text-sm md:text-base">
                    For any questions about approval processes, technical
                    support, or platform assistance:
                  </p>

                  <div className="bg-white rounded-lg p-3 md:p-4 border border-slate-300 shadow-sm">
                    <a
                      href="mailto:tpcwebteam@iiti.ac.in"
                      className="text-slate-800 hover:text-slate-600 font-bold text-base md:text-lg transition-colors duration-200 break-all"
                    >
                      tpcwebteam@iiti.ac.in
                    </a>
                  </div>

                  <p className="text-slate-500 text-xs md:text-sm font-medium">
                    We typically respond within 24 hours during business days.
                  </p>
                </div>
              </div>

              <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-white border border-slate-200 rounded-lg p-4 md:p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-emerald-600 md:w-6 md:h-6"
                    >
                      <path
                        d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 text-sm md:text-base">
                    Approval Process
                  </h4>
                  <p className="text-slate-600 text-xs md:text-sm">
                    Help with student placement approvals and reviews
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-4 md:p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-violet-600 md:w-6 md:h-6"
                    >
                      <path
                        d="M19 14C19.5523 14 20 14.4477 20 15V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V15C4 14.4477 4.44772 14 5 14C5.55228 14 6 14.4477 6 15V19H18V15C18 14.4477 18.4477 14 19 14ZM13 12.0001L15.5858 9.41436L14.1716 8.00014L13 9.17157V3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V9.17157L9.82843 8.00014L8.41421 9.41436L11 12.0001H13Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 text-sm md:text-base">
                    Data Access
                  </h4>
                  <p className="text-slate-600 text-xs md:text-sm">
                    Assistance with accessing student and placement data
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-4 md:p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-amber-600 md:w-6 md:h-6"
                    >
                      <path
                        d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 text-sm md:text-base">
                    Academic Support
                  </h4>
                  <p className="text-slate-600 text-xs md:text-sm">
                    Platform guidance for academic-related functions
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

export default FacultyHelpCenter;
