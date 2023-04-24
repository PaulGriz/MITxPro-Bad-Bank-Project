const Footer = () => {
  return (
    <footer className="m-3 rounded-lg bg-gray-100 shadow">
      <div className="max-w-screen-xl mx-auto flex w-full flex-col p-4">
        <span className="sm:text-center text-sm text-gray-500">
          © 2023 Paul Griz. All Rights Reserved.
        </span>
        <ul className="mt-[2px] text-sm font-medium text-gray-500">
          <li>
            <a
              href="https://github.com/PaulGriz/MITxPro-Bad-Bank-Project"
              target="_blank"
              className="md:mr-6 mr-4 hover:text-blue-400 hover:underline "
            >
              Link to Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
