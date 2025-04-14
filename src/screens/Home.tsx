// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStores';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuthStore();
  
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users?search=${search}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        setUsers(data.data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [search, accessToken]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management Dashboard</h1>
      
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : users.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map((user) => (
            <UserCard 
              key={user} 
              user={user}  // Make sure user object matches UserCard props
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {search ? 'No matching users found' : 'No users available'}
        </div>
      )}
    </div>
  );
}