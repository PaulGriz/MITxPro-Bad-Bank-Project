import useGlobalStore from "../../store/global";

const AllData = () => {
  const { users } = useGlobalStore();

  return (
    <div className="px-5">
      <h1 className="text-xl font-bold">All Data</h1>
      <hr className="my-2 h-[2px] border-0 bg-gray-200"></hr>
      {users.map((user, index) => (
        <div key={index} className="font-semibold">
          <h3 className="underline">User #{index}</h3>
          <p>
            Name: <span className="font-normal">{user.name}</span>
          </p>
          <p>
            Email: <span className="font-normal">{user.email}</span>
          </p>
          <p>
            Password: <span className="font-normal">{user.password}</span>
          </p>
          <hr className="my-2 h-[2px] border-0 bg-gray-200"></hr>
        </div>
      ))}
    </div>
  );
};
export default AllData;
