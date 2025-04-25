import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = !!accessToken;

  // Function to generate initials
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      
      try {
        const url = search ? `/api/users?search=${search}` : '/api/users';
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setUsers(data.data || []);
        } else {
          setError(data.message || 'Failed to fetch users');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, accessToken, isAuthenticated]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management Dashboard</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-lg dark:bg-red-900 dark:text-red-100">
          {error}
        </div>
      )}
      
      {!loading && users.length === 0 && !error && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No users found
        </div>
      )}
      
      {!loading && users.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map((user) => (
            <div 
              key={user.id}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 transition-all hover:shadow-lg"
            >
              <div className="flex flex-col items-center">
                {/* Initials Avatar */}
                <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mb-3">
                  {getInitials(user.firstName, user.lastName)}
                </div>
                
                {/* User Info */}
                <h3 className="text-lg font-semibold text-center dark:text-white">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-1 break-all">
                  {user.email}
                </p>
                
                {/* User ID */}
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  ID: {user.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}