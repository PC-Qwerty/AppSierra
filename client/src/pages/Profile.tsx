import { useAtom } from "jotai";
import { userAtom } from "../jotai/atoms";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { authService } from "../services";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      country: "",
    },
  });

  // Sync form with user data when component mounts or user data changes
  useEffect(() => {
    reset(user?.user);
  }, [user, reset]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const onSubmit = async (data: {
    name: string;
    email: string;
    country: string;
  }) => {
    if (!user?.token) return;
    try {
      const updatedUser = await authService.editProfile(user.token, data);
      setUser(updatedUser);
      reset(updatedUser.user); // ✅ manually reset form with updated data
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update user profile:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Profile</h1>
        <button
          onClick={handleEditToggle}
          className="bg-white text-blue-600 font-semibold px-4 py-1 rounded hover:bg-gray-100"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block font-medium">Name:</label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full border rounded-md p-2"
                    disabled={!isEditing}
                  />
                )}
              />
            </div>
            <div>
              <label className="block font-medium">Email:</label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    className="mt-1 block w-full border rounded-md p-2"
                    disabled={!isEditing}
                  />
                )}
              />
            </div>
            <div>
              <label className="block font-medium">Country:</label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full border rounded-md p-2"
                    disabled={!isEditing}
                  />
                )}
              />
            </div>
            {isEditing && (
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
