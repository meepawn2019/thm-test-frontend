import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getProfile, getUser, updateUser } from "../../api/user";
import { Formik } from "formik";
import FormInput from "../common/FormInput";
import AvatarUploader from "../AvatarUploader";
import * as Yup from "yup";
import withAuth from "../../middleware/withAuth";
import { useNavigate, useParams } from "react-router";
import { BASE_ROUTE } from "../../constant/route";

const UserForm = () => {
  // get user id from url react router
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch user data from api
  const { data, isLoading, isError, refetch } = useQuery(
    ["user", id],
    () => getUser(id),
    {
      retry: 0,
    }
  );

  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (data && data.avatar) {
      setPreview(data.avatar);
    }
  }, [data]);

  const { mutate, status } = useMutation(updateUser, {
    onSuccess: () => {
      // refetch user data after update success
      alert("Update success");
      refetch();
    },
  });

  const handleUpdateUser = (values) => {
    let avatarURL = null;
    let newValues = { ...values };
    if (newValues.avatar) {
      // create form data to send to s3
      const formData = new FormData();
      formData.append("file", values.avatar);
      formData.append("upload_preset", "avatar");
      // send file to cdn or bucket and get url
      avatarURL = "some_url";
    }
    newValues.avatar = avatarURL;
    mutate({ id: data.id, data: newValues });
  };

  const handleBack = () => {
    navigate(BASE_ROUTE);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen border border-gray-300 p-8 rounded-lg mx-auto">
      <h1 className="font-bold mb-8">User</h1>
      <Formik
        initialValues={{
          first_name: data.first_name,
          email: data.email,
          last_name: data.last_name || "",
          country: data.country || "",
          city: data.city || "",
          phone_number: data.phone_number || "",
          position: data.position || "",
          avatar: data.avatar || null,
        }}
        onSubmit={handleUpdateUser}
        validationSchema={Yup.object().shape({
          first_name: Yup.string(),
          email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
          last_name: Yup.string().nullable(),
          country: Yup.string().nullable(),
          city: Yup.string().nullable(),
          phone_number: Yup.string().nullable(),
          position: Yup.string().nullable(),
          avatar: Yup.object()
            .shape({
              file: Yup.object().shape({
                name: Yup.string(),
              }),
            })
            .nullable(),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            setFieldValue,
          } = props;
          // if upload avatar success, update preview
          useEffect(() => {
            if (values.avatar) {
              const selected = values.avatar;
              if (selected && selected.type.substr(0, 5) === "image") {
                setPreview(URL.createObjectURL(selected));
              } else {
                setPreview(null);
              }
            }
          }, [values.avatar]);

          return (
            <form
              onSubmit={handleSubmit}
              className="flex flex-row max-w-[500px] flex-wrap gap-y-4 justify-between text-left"
            >
              <AvatarUploader
                name="avatar"
                handleChange={(e) => {
                  setFieldValue("avatar", e.currentTarget.files[0]);
                }}
                error={errors.avatar}
                touched={touched.avatar}
                preview={preview}
              />
              <div className="flex flex-row max-w-[500px] flex-wrap gap-y-4 justify-between text-left">
                <FormInput
                  label="First Name"
                  name="first_name"
                  className={"w-5/12"}
                  value={values.first_name}
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.first_name}
                  touched={touched.first_name}
                />
                <FormInput
                  label="Email"
                  name="email"
                  className={"w-5/12"}
                  value={values.email}
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  touched={touched.email}
                />
                <FormInput
                  label="Last Name"
                  name="last_name"
                  className={"w-5/12"}
                  value={values.last_name}
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.last_name}
                  touched={touched.last_name}
                />
                <FormInput
                  label="Country"
                  name="country"
                  className={"w-5/12"}
                  value={values.country}
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.country}
                  touched={touched.country}
                />
                <FormInput
                  label="City"
                  name="city"
                  className={"w-5/12"}
                  value={values.city}
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.city}
                  touched={touched.city}
                />
                <FormInput
                  label="Phone Number"
                  name="phone_number"
                  className={"w-5/12"}
                  value={values.phone_number}
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.phone_number}
                  touched={touched.phone_number}
                />
                <FormInput
                  label="Position"
                  name="position"
                  className={"w-5/12"}
                  value={values.position}
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.position}
                  touched={touched.position}
                />
              </div>
              <div className="flex flex-row gap-x-4">
                <button
                  type="button"
                  className="bg-gray-600 text-white p-2 rounded-lg mt-4 hover:bg-gray-700 hover:shadow-lg"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-2 rounded-lg mt-4 hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={status === "loading"}
                >
                  Update
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default withAuth(UserForm);
