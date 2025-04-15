import { MockMethod } from 'vite-plugin-mock';

const mockUsers = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    status: 'active',
    dob: '1990-05-15'
  },
  // Add more users from your assignment
];

export default [
  {
    url: '/api/users',
    method: 'get',
    response: ({ query }) => {
      if (query.search) {
        const search = query.search.toLowerCase();
        return {
          code: 200,
          data: mockUsers.filter(u => 
            u.firstName.toLowerCase().includes(search) ||
            u.lastName.toLowerCase().includes(search) ||
            u.email.toLowerCase().includes(search)
          ),
        };
      }
      return { code: 200, data: mockUsers };
    },
  },
] as MockMethod[];