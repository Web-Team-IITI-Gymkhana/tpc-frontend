"use client";

import React from "react";

const RecruiterHelpCenter = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-8">
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
                <p className="text-white/80 text-lg">Recruiter Support</p>
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
                  If you have any questions about posting jobs, managing
                  applications, accessing student profiles, or need assistance
                  with the platform, our dedicated web team is ready to help
                  you.
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
                    For any questions about recruitment process, technical
                    support, or platform assistance:
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
                        d="M5 7H19C20.1046 7 21 7.89543 21 9V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V9C3 7.89543 3.89543 7 5 7ZM5 7V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V7M9 11V13M15 11V13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">
                    Job Posting
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Help with creating and managing job postings
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
                        d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7ZM23 21V19C22.9993 17.1137 21.9284 15.4226 20.3 14.6M16 3.13C17.9659 3.83481 19.2726 5.69677 19.2726 7.85C19.2726 10.0033 17.9659 11.8652 16 12.57"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">
                    Student Access
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Assistance with accessing student profiles and data
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
                        d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">
                    Application Management
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Support for managing applications and recruitment
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

export default RecruiterHelpCenter;
