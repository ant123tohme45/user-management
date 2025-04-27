import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../store/authStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import NavBar from "../organisms/NavBar/NavBar";

const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  status: z.enum(["active", "locked"]),
});

type UserFormData = z.infer<typeof userSchema>;

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const token = useAuthStore((state) => state.accessToken);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  // ✅ Fetch user data by ID
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", id],
    enabled: !!id && !!token,
    queryFn: async () => {
      const res = await fetch(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("📦 Raw user API response:", data);
      if (!res.ok) throw new Error(data.message || "User not found");

      return data.result.data.user;
    },
  });

  // ✅ Pre-fill form when user data is available
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        status: user.status,
      });
    }
  }, [user, reset]);

  const mutation = useMutation({
    mutationFn: async (formData: UserFormData) => {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update user");

      return data.result.data.user;
    },
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/dashboard");
    },
    onError: (err: unknown) => {
      toast.error((err as Error).message || "Update failed");
    },
  });

  const onSubmit = (data: UserFormData) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="loading-page">
        <p className="text-center text-gray-600">Loading user data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-600">
        Failed to load user: {(error as Error).message}
      </p>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="outter-form">
        <form onSubmit={handleSubmit(onSubmit)} className="main-form">
          <h2 className="form-header">Edit User</h2>

          <div>
            <label className="input-header">First Name *</label>
            <input {...register("firstName")} className="form-input" />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="input-header">Last Name (optional)</label>
            <input {...register("lastName")} className="form-input" />
          </div>

          <div>
            <label className="input-header">Email *</label>
            <input type="email" {...register("email")} className="form-input" />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="input-header">Date of Birth *</label>
            <input
              type="date"
              {...register("dateOfBirth")}
              className="form-input"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          <div>
            <label className="input-header">Status *</label>
            <select {...register("status")} className="form-input">
              <option value="active">Active</option>
              <option value="locked">Locked</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Updating..." : "Update User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
