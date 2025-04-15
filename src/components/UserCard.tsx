import Button from "./Button";

interface CardProps {
  firstName: string;
  lastName?: string;
  status: 'active' | 'inactive' | 'pending' | string;
  dateOfBirth: string;
  email: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const Card = ({ 
  firstName, 
  lastName = '', 
  status, 
  dateOfBirth, 
  email,
  onEdit,
  onDelete
}: CardProps) => {
  const fullName = `${firstName} ${lastName}`.trim();
  const formattedDate = new Date(dateOfBirth).toLocaleDateString();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .filter(word => word.length > 0)
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 w-72 transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="flex justify-center mb-4">
        <div className="bg-[#3251D0] text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold">
          {getInitials(fullName) || '?'}
        </div>
      </div>
      
      <div className="space-y-2 text-center">
        <h3 className="text-lg font-semibold dark:text-white">{fullName || 'Unnamed User'}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 break-all">
          {email || 'No email provided'}
        </p>
        <div className="flex justify-center">
          <span className={`text-xs px-3 py-1 rounded-full ${
            statusColors[status as keyof typeof statusColors] || 'bg-gray-100 dark:bg-gray-700'
          }`}>
            {status || 'unknown'}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          DOB: {formattedDate || 'Unknown'}
        </p>
      </div>
      
      <div className="flex justify-center gap-3 mt-6">
        <Button 
          title="Edit" 
          textColor="text-white" 
          onClick={onEdit}
          className="hover:bg-blue-700 transition-colors"
        />
        <Button 
          title="Delete" 
          textColor="text-white" 
          bg="bg-red-600 hover:bg-red-700" 
          onClick={onDelete}
          className="transition-colors"
        />
      </div>
    </div>
  );
};

export default Card;