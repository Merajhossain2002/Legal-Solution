import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import Header from "../Shared/Header/Header";

const Register = () => {
  const { providerLogin, createUser, updateUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();

  // ? google signup
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignin = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const detaileduser = result.user;
        const user = {
          uid: detaileduser.uid,
          displayName: detaileduser.displayName,
          photoURL: detaileduser.photoURL,
          email: detaileduser.email,
          userReview: [],
        };
        fetch("http://localhost:5000/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.error(err));

        navigate("/");
      })
      .catch((error) => console.log(error));
  };
  // ? register with email and password
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoUrl = form.url.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        const detaileduser = result.user;
        const user = {
          uid: detaileduser.uid,
          displayName: name,
          photoURL: photoUrl,
          email: detaileduser.email,
          userReview: [],
        };
        fetch("http://localhost:5000/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.error(err));

        handleUpdateUserProfile(name, photoUrl);
        form.reset();
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateUserProfile = (name, photoUrl) => {
    const profile = {
      displayName: name,
      photoURL: photoUrl,
    };
    updateUserProfile(profile)
      .then(() => {})
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Header></Header>
      <div className="grid grid-cols-2 justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="p-8 w-2/4 mx-auto shadow-xl rounded-lg border"
        >
          <button
            onClick={handleGoogleSignin}
            type="button"
            className="text-firstColor w-full hover:text-white bg-white border border-firstColor hover:bg-secondColor/70  font-semibold rounded-lg text-md px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
          >
            <svg
              className="mr-2 -ml-1 w-4 h-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign in with Google
          </button>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-firstColor focus:border-secondColor block w-full p-2.5"
              placeholder="John doe"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="url"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Photo URL
            </label>
            <input
              type="text"
              id="url"
              name="url"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-firstColor focus:border-secondColor block w-full p-2.5"
              placeholder="URL Here"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-firstColor focus:border-secondColor block w-full p-2.5"
              placeholder="name@gmail.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-firstColor focus:border-secondColor block w-full p-2.5"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-secondColor hover:bg-firstColor focus:ring-4 focus:outline-none focus:ring-firstColor font-semibold rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
        <img
          className="w-full object-cover"
          src="https://t3.ftcdn.net/jpg/03/39/70/90/360_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Register;
