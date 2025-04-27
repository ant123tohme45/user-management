import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/authStore";
import { Card } from "../molecules/Card/card";
import SearchInput from "../molecules/SearchInput/SearchInput";
import CardsContainer from "../organisms/CardsContainer/CardsContainer";
import NavBar from "../organisms/NavBar/NavBar";
import Loading from "../organisms/Loading/Loading";
import { useLocation, useNavigate } from "react-router";

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  status: string;
};
const useDebounce = (value: string, delay: number) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounced;
};

const Dashboard = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 400);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  const {
    data: users = [],
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", debouncedSearch, accessToken],
    queryFn: async () => {
      const url = debouncedSearch
        ? `/api/users?search=${encodeURIComponent(debouncedSearch)}`
        : "/api/users";

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("📦 Raw user API response:", data); // ✅ Add this log
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      return data.result.data.users;
    },
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      navigate("/dashboard", { replace: true });
    } else {
      navigate(`/dashboard?q=${encodeURIComponent(query)}`, { replace: true });
    }
  };

  return (
    <div className="min-h-screen dark:bg-primary-dark">
      <NavBar />
      <SearchInput onSearch={handleSearch} />

      {loading && <Loading />}

      {!loading && isError && (
        <p className="error-msg">{(error as Error).message}</p>
      )}

      {!loading && !isError && users.length === 0 && (
        <p className="user-nf">User Not Found</p>
      )}

      {!loading && !isError && users.length > 0 && (
        <CardsContainer>
          {users.map((user: User) => (
            <Card
              key={user.id}
              id={user.id}
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
