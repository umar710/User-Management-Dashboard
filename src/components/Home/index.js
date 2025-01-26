import { useState } from "react";
import UserList from "../../utils/UserList";

import UserCard from "../UserCard";
import { updateUserDetails } from "../../utils/updateUserDetails";
import Shimmer from "../Shimmer";
import { deleteUserDetails } from "../../utils/deleteUserDetails";
import { creatNewUserDetails } from "../../utils/creatNewUserDetails";
import { v4 as uuidv4 } from "uuid";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const user = {
  name: "Umer Faruque",
  email: "umarsyed082@gmail.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/syed-umer-faruque-20901823b/",
    current: false,
  },
  { name: "GitHub", href: "https://github.com/umar710", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { usersData, errorMsg, setUsersData } = UserList();
  const [udpateDataError, setUpdateDataError] = useState("");
  const [showLoaderOnUpdate, setShowLoaderOnupdate] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [creatingNewUser, setCreatingNewUser] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    website: "",
    id: "",
  });
  // console.log(usersData)

  const handelDeleteUser = async (id) => {
    setDeletingId(id);
    try {
      const resp = await deleteUserDetails(id);
      if (resp.status) {
        setDeletingId(null);
        const newData = usersData.filter((e) => id !== e.id);
        setUsersData(newData);
      }
    } catch (error) {
      setDeletingId(null);
      alert(error.message + " unable to delete user");
    }
  };

  const handelEditUser = (user) => {
    setUpdateDataError(false);
    setCreatingNewUser(false);
    const { name, website, email, companyName, id } = user;
    console.log(user);
    setFormData({
      name: name,
      email: email,
      companyName: companyName,
      website: website,
      id: id,
    });
    setShowPopup(true);
  };

  const handelInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onUpadteAndSaveChanges = async (e) => {
    e.preventDefault();

    if (!creatingNewUser) {
      setShowLoaderOnupdate(true);
      setUpdateDataError("");
      console.log(typeof formData.id);

      if (typeof formData.id === "number") {
        try {
          const resp = await updateUserDetails(formData.id, formData);
          if (resp.status) {
            const formatformData = {
              ...formData,
              company: { name: formData.companyName },
            };
            const newList = usersData.map((e) =>
              formatformData.id === e.id ? { ...e, ...formatformData } : e
            );
            setShowLoaderOnupdate(false);
            setUsersData(newList);
            setShowPopup(false);
            setFormData({
              name: "",
              email: "",
              companyName: "",
              website: "",
              id: "",
            });
          }
        } catch (error) {
          setShowLoaderOnupdate(false);
          setUpdateDataError(error.message);
        }
      }
      if (typeof formData.id === "string") {
        const formatformData = {
          ...formData,
          company: { name: formData.companyName },
        };
        const newList = usersData.map((e) =>
          formatformData.id === e.id ? { ...e, ...formatformData } : e
        );
        setUsersData(newList);
        setShowLoaderOnupdate(false);
        setShowPopup(false);
      }
    }
    if (creatingNewUser) {
      setShowLoaderOnupdate(true);
      setUpdateDataError("");
      const uniqueId = uuidv4();
      const newUserData = { ...formData, id: uniqueId.slice(1, 3) };

      try {
        const resp = await creatNewUserDetails(newUserData);
        if (resp.status === 201) {
          setShowLoaderOnupdate(false);
          setUsersData([
            { ...newUserData, company: { name: formData.companyName } },
            ...usersData,
          ]);
          setFormData({
            name: "",
            email: "",
            companyName: "",
            website: "",
            id: "",
          });
          setShowPopup(false);
        }
        console.log(resp.data);
      } catch (error) {
        setShowLoaderOnupdate(false);
        setUpdateDataError(true);
        setUpdateDataError(error.message);
      }
    }
  };

  const onCanceledit = () => {
    setFormData({ name: "", email: "", companyName: "", website: "", id: "" });
    setShowPopup(false);
    setUpdateDataError("");
  };

  const handelNewUser = () => {
    setShowPopup(true);
    setCreatingNewUser(true);
  };

  if (errorMsg) {
    return (
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 min-h-screen">
        <p className="md:w-3/4 w-4/5 mx-auto text-red-600 font-semibold text-center p-6 mt-3">
          {errorMsg}
        </p>
      </div>
    );
  }

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    alt="Your Company"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                    className="size-8"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt=""
                          src={user.imageUrl}
                          className="size-8 rounded-full"
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <a
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                          >
                            {item.name}
                          </a>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-6 group-data-open:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-6 group-data-open:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img
                    alt=""
                    src={user.imageUrl}
                    className="size-10 rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base/5 font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {user.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              User-Management-Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 min-h-screen">
              <div className="md:w-3/4 w-11/12 mx-auto flex flex-col pb-6">
                <button
                  onClick={handelNewUser}
                  className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded-full  text-base md:text-lg self-center font-semibold flex items-center px-6 md:py-2 py-2 mt-5 rounded-full"
                >
                  Add New User
                </button>

                {usersData ? (
                  usersData.length === 0 ? (
                    <div
                      class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 mt-5"
                      role="alert"
                    >
                      <svg
                        class="fill-current w-4 h-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                      </svg>
                      <p>Click 'Add New User' to add a user...!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                      {usersData.map((each) => (
                        <UserCard
                          key={each.id}
                          showLoaderOfDelete={deletingId === each.id}
                          handelDeleteUser={handelDeleteUser}
                          handelEditUser={handelEditUser}
                          userDetails={each}
                        />
                      ))}
                    </div>
                  )
                ) : (
                  <Shimmer />
                )}
              </div>
              {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center ">
                  <div className="bg-white md:w-1/3 p-8 rounded-lg flex flex-col gap-5">
                    <h1 className="text-3xl font-bold bg-gradient-to-r text-purple-500  to-pink-600 bg-clip-text text-transparent">
                      {creatingNewUser ? "Add New User" : "Edit User Details"}
                    </h1>
                    <form
                      className="flex flex-col gap-3"
                      onSubmit={onUpadteAndSaveChanges}
                    >
                      <div className="flex flex-col gap-1">
                        <label htmlFor="newName" className="font-semibold">
                          Name
                        </label>
                        <input
                          required
                          name="name"
                          value={formData.name}
                          onChange={handelInputChange}
                          id="newName"
                          className="px-3 py-1 border-2 border-gray-400 rounded-lg"
                          placeholder="Name"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="newEmail" className="font-semibold">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handelInputChange}
                          id="newEmail"
                          className="px-3 py-1 border-2 border-gray-400 rounded-lg"
                          placeholder="Email"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="newCompany" className="font-semibold">
                          Company
                        </label>
                        <input
                          required
                          name="companyName"
                          value={formData.companyName}
                          onChange={handelInputChange}
                          id="newCompany"
                          className="px-3 py-1 border-2 border-gray-400 rounded-lg"
                          placeholder="Company"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="newWebsite" className="font-semibold">
                          Website
                        </label>
                        <input
                          required
                          name="website"
                          value={formData.website}
                          onChange={handelInputChange}
                          id="newWebsite"
                          className="px-3 py-1 border-2 border-gray-400 rounded-lg"
                          placeholder="Website"
                        />
                      </div>
                      <div className="flex justify-end gap-6 pt-4">
                        <button
                          onClick={onCanceledit}
                          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        >
                          Cancel
                        </button>

                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                          {creatingNewUser ? "Add New User" : "Update User"}
                        </button>
                      </div>
                    </form>

                    {udpateDataError && (
                      <p className="text-red-600 font-semibold text-center">
                        {udpateDataError}
                      </p>
                    )}
                    {showLoaderOnUpdate && (
                      <p className="text-blue-600 font-semibold text-center">
                        Please Wait ...
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
