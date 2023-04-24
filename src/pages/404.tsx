import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="sm:py-8 lg:py-12 bg-white py-6">
      <div className="max-w-screen-2xl md:px-8 mx-auto px-4">
        <div className="flex flex-col items-center">
          <h1 className="md:text-3xl mb-4 text-center text-2xl font-bold text-indigo-500">
            404 - Page not found
          </h1>

          <p className="max-w-screen-md md:text-lg mb-4 text-center text-gray-500">
            The page you’re looking for doesn’t exist.
          </p>
          <button className="mt-2 w-[16rem] self-center rounded bg-indigo-500 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-30">
            <Link to="/">Let's go back home</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
