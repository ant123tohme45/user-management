import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { Card } from "../molecules/Card/card";
import SearchInput from "../molecules/SearchInput/SearchInput";
import CardsContainer from "../organisms/CardsContainer/CardsContainer";
import NavBar from "../organisms/NavBar/NavBar";
import Loading from "../organisms/Loading/Loading";

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  status: string;
};
const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const accessToken = useAuthStore((state) => state.accessToken);

  const fetchUsers = async (query = "") => {
    try {
      setLoading(true);
      setError(""); // Clear previous error
      const url = query
        ? `/api/users?search=${encodeURIComponent(query)}`
        : "/api/users";

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.result.data.users); // Set users data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
      setUsers([]); // Clear users in case of error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const handleSearch = (query: string) => {
    if (accessToken) {
      fetchUsers(query);
    }
  };
  return (
    <div className="min-h-screen dark:bg-primary-dark">
      <NavBar />
      <SearchInput onSearch={handleSearch} />
      {loading && <Loading />}
      {!loading && users.length === 0 && !error && (
        <p className="user-nf">User Not Found</p>
      )}

      {error && <p className="error-msg">{error}</p>}

      {!loading && !error && users.length > 0 && (
        <CardsContainer>
          {users.map((user) => (
            <Card
              key={user.id}
              email={user.email}
              name={`${user.firstName} ${
                user.lastName ? " " + user.lastName : ""
              }`}
              date_of_birth={user.dateOfBirth}
              initial={`${user.firstName[0]}${
                user.lastName ? user.lastName[0] : ""
              }`}
              status={user.status}
            />
          ))}
        </CardsContainer>
      )}
    </div>
  );
};
export default Dashboard;
