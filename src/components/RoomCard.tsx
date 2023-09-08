import React from 'react';

interface User {
  imageUrl: string;
}

interface Room {
  title: string;
  language: string;
  users?: User[];
}

interface RoomCardProps {
  item: Room;
  index: number;
}

const RoomCard: React.FC<RoomCardProps> = ({ item, index }) => {
  return (
    <div key={index} className="mt-4 h-36 flex justify-between rounded-lg w-96 p-3 border border-gray-400">
      <div className="bg-transparent">
        <h3 className="h3 cursor-pointer  text-sm text-gray-700 bg-transparent">
          {item.title.length > 40 ? `${item.title.slice(0, 40)}...` : item.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{item.language}</p>

        <div className="flex -space-x-2 overflow-hidden mt-6 bg-transparent">
          {item.users?.map((user, imgIndex) => (
            imgIndex < 6 && (
              <img key={user.toString() + imgIndex + imgIndex} className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={user.imageUrl} alt="" />
            )
          ))}
          {item.users?.length && item.users.length > 6 &&
            <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white flex items-center justify-center" style={{ backgroundColor: '#F0F0F0', fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>
              +{item.users.length - 6}
            </div>
          }
        </div>
      </div>
      <p className="text-sm font-medium text-gray-900">{item.users?.length}</p>
    </div>
  );
};

export default RoomCard;
