import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  // useLocation() returns the react-router location object
  const location = useLocation();
  // highlightText is used with a ternary operator to highlight the active link
  const highlightText = "text-indigo-500";

  return (
    <header className="body-font mx-2 max-w-full text-gray-600">
      <div className="flex flex-col flex-wrap items-center justify-between py-5 mobile:mx-4 mobile:flex-row mobile:p-5">
        <Link
          to="/"
          className="mb-4 flex items-center font-medium text-gray-900  mobile:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-10 w-10 rounded-full bg-indigo-500 p-2 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
            />
          </svg>
          <span className="ml-3 text-[1.5em]">Bad Bank</span>
        </Link>
        <nav className="md:ml-auto flex cursor-pointer flex-wrap items-center justify-center text-base">
          <Link
            to="/"
            className={`mr-5 hover:text-blue-500 hover:underline ${
              location.pathname === "/" ? highlightText : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/createaccount"
            className={`mr-5 hover:text-blue-500 hover:underline ${
              location.pathname === "/createaccount" ? highlightText : ""
            }`}
          >
            Create Account
          </Link>
          <Link
            to="/deposit"
            className={`mr-5 hover:text-blue-500 hover:underline ${
              location.pathname === "/deposit" ? highlightText : ""
            }`}
          >
            Deposit
          </Link>
          <Link
            to="/withdraw"
            className={`mr-5 hover:text-blue-500 hover:underline ${
              location.pathname === "/withdraw" ? highlightText : ""
            }`}
          >
            Withdraw
          </Link>
          <Link
            to="/alldata"
            className={`mr-5 hover:text-blue-500 hover:underline ${
              location.pathname === "/alldata" ? highlightText : ""
            }`}
          >
            AllData
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
