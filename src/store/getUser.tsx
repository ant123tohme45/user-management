// src/api/users.ts
import { useAuthStore } from '../store/authStore';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
export interface GetUsersResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
interface GetUsersParams {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'email' | 'id';
  sortOrder?: 'asc' | 'desc';
}

export async function getUsers(params: GetUsersParams = {}): Promise<User[]> {
  const accessToken = useAuthStore.getState().accessToken;
  if (!accessToken) throw new Error('Authentication required');

  const { search, page, limit, sortBy, sortOrder } = params;
  const url = new URL('/api/users', window.location.origin);
  
  if (search) url.searchParams.append('search', search);
  if (page) url.searchParams.append('page', page.toString());
  if (limit) url.searchParams.append('limit', limit.toString());
  if (sortBy) url.searchParams.append('sortBy', sortBy);
  if (sortOrder) url.searchParams.append('sortOrder', sortOrder);

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch users');
  }

  const data = await response.json();
  return Array.isArray(data) ? data : data?.data || [];
}