import { useRouter } from "next/router";

import { useState } from "react";
export default function Navbar() {
  // get the current page from the url
  // set the current page to true
  // set all other pages to false
  // const { useAppStore } = useStore();
  // const store = useAppStore();
  // store.test();
  const currentPath = useRouter().pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pages = [
    { name: "Home", href: "/", current: currentPath === "/" },
    // { name: "Stocks", href: "stocks", current: currentPath === "/stocks" },
    {
      name: "Multi-search",
      href: "multisearch",
      current: currentPath === "/multisearch",
    },
    // { name: "Sealed", href: "sealed", current: currentPath === "/sealed" },
    { name: "About", href: "about", current: currentPath === "/about" },
  ];
  return (
    <div>
      <nav className="shadow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed. */}
                {/* Menu open: "hidden", Menu closed: "block" */}
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
                {/* Icon when menu is open. */}
                {/* Menu open: "block", Menu closed: "hidden" */}
                <svg
                  className="hidden h-6 w-6"
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
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="block lg:hidden h-8 w-auto"
                  src="/favicon.ico"
                  alt="Workflow"
                />
                <img
                  className="hidden lg:block h-8 w-auto"
                  src="/logo.png"
                  alt="Workflow"
                />
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      // stocks page should have red background
                      // current page should have gray background (even for stocks page)
                      className={`
text-white rounded-md py-2 px-3 text-sm font-medium hover:bg-gray-700
${
  page.current
    ? "bg-gray-600 hover:bg-gray-500"
    : page.name === "Stocks" && "bg-purple-900 hover:bg-purple-700"
} 
`}
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/*  mobile menu opens when mobileMenuOpen = true */}
          <div
            className={`${
              mobileMenuOpen ? "block h-fit" : "hidden"
            } sm:hidden`}
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {pages.map((page) => (
                <a
                  key={page.name}
                  href={page.href}
                  className={`
text-white block rounded-md py-2 px-3 text-base font-medium hover:bg-gray-700
${
  page.current
    ? "bg-gray-600 hover:bg-gray-500"
    : page.name === "Stocks" && "bg-purple-900 hover:bg-purple-700"
}
`}
                >
                  {page.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
