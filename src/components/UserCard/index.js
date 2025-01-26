import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const UserCard = ({
  userDetails,
  handelEditUser,
  handelDeleteUser,
  showLoaderOfDelete,
}) => {
  const { name, id, email, company, website } = userDetails;
  // console.log(userDetails)

  const handelEditInCard = () => {
    const userInfo = {
      name,
      id,
      email,
      companyName: company.name,
      website,
    };

    handelEditUser(userInfo);
  };

  const handelDeleteInCard = () => {
    // console.log(id)
    handelDeleteUser(id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 hover:scale-105 hover:shadow-2xl  flex flex-col gap-4">
      <div>
        <h1 className="md:text-2xl text-xl font-bold bg-gradient-to-r text-purple-500 from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {name}0
        </h1>
        <p className="text-sm md:text-base text-gray-400">ID : {id}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-gray-700">
          Email : <span className="font-normal">{email}</span>
        </p>
        <p className="font-semibold text-gray-700">
          Company : <span className="font-normal">{company.name}</span>
        </p>
        <p className="font-semibold text-gray-700">
          Website : <span className="font-normal">{website}</span>
        </p>
      </div>
      <div className="flex items-center gap-5 justify-end">
        <button
          className="text-purple-600 text-xl md:text-xl"
          onClick={handelEditInCard}
        >
          {" "}
          <FaRegEdit />
        </button>
        <button
          className="text-pink-600 text-xl md:text-2xl"
          onClick={handelDeleteInCard}
        >
          <MdDelete />
        </button>
      </div>
      {showLoaderOfDelete && (
        <p className="font-semibold text-blue-600 text-sm md:text-base">
          Please wait...!
        </p>
      )}
    </div>
  );
};

export default UserCard;
