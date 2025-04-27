import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../store/authStore";
import NavBar from "../organisms/NavBar/NavBar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

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

const AddUser = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.accessToken);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      status: "active",
    },
  });

  const mutation = useMutation({
    mutationFn: async (user: UserFormData) => {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add user");
      }

      return data;
    },
    onSuccess: () => {
      toast.success("User created successfully");
      // ✅ Refresh the users list
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      navigate("/dashboard");
    },
    onError: (err: unknown) => {
      toast.error((err as Error).message || "Something went wrong");
    },
  });

  const onSubmit = (data: UserFormData) => {
    console.log("Submitting:", data);
    // TODO: trigger mutation
    mutation.mutate(data);
  };

  return (
    <div>
      <NavBar />
      <div className="outter-form">
        <form onSubmit={handleSubmit(onSubmit)} className="main-form">
          <h2 className="form-header">Add New User</h2>

          {/* First Name */}
          <div>
            <label className="input-header">First Name *</label>
            <input
              {...register("firstName")}
              className="form-input"
              placeholder="e.g. John"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="input-header">Last Name (optional)</label>
            <input
              {...register("lastName")}
              className="form-input"
              placeholder="e.g. Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="input-header">Email *</label>
            <input
              {...register("email")}
              type="email"
              className="form-input"
              placeholder="e.g. john@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="input-header">Date of Birth *</label>
            <input
              {...register("dateOfBirth")}
              type="date"
              className="form-input"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="input-header">Status *</label>
            <select {...register("status")} className="form-input">
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="locked">Locked</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          {/* Submit */}
          <button type="submit" className="submit-btn">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
