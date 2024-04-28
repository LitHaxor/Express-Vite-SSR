import React, { useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [token, setToken] = React.useState<string | null>(null);

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  const destroyToken = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    setToken(getToken());
  }, []);

  return (
    <div>
      <nav className="bg-gray-800 mb-20 md:mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-white">Task Manager</h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex justify-between items-baseline space-x-4">
                  <a
                    href="/tasks"
                    className="bg-cyan-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    View Tasks
                  </a>

                  {token ? (
                    <button
                      onClick={destroyToken}
                      className="bg-red-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Logout
                    </button>
                  ) : (
                    <div className="flex items-baseline space-x-4">
                      <a
                        href="/login"
                        className="bg-emerald-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        login
                      </a>
                      <a
                        href="/register"
                        className="bg-blue-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Register
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
