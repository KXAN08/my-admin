import { useParams } from 'react-router-dom';
import useGetGroups from '../../service/getGroups';
import { useEffect, useState } from 'react';

const Group = () => {
  const { groupId } = useParams();
  const { data: groups, isLoading } = useGetGroups();
  const [currentGroup, setCurrentGroup] = useState(null);

  useEffect(() => {
    if (groups && groupId) {
      const found = groups.find(g => g._id?.toString() === groupId);
      setCurrentGroup(found);
    }
  }, [groups, groupId]);

  if (isLoading) return <div className="p-6">⏳ Yuklanmoqda...</div>;

  if (!currentGroup) {
    return <div className="p-6 text-red-600">Guruh topilmadi 😢</div>;
  }

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold text-violet-700 mb-4">
          {currentGroup.name}
        </h2>
        <p className="text-gray-600">Group ID: {currentGroup._id}</p>
      </div>
    </div>
  );
};

export default Group;
