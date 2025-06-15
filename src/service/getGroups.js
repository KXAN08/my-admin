import { useQuery } from '@tanstack/react-query';
import axios from '../api/axiosInstance';

const useGetGroups = () => {
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const res = await axios.get('/groups');
      return res.data;
    },
  });

  return { data, isLoading, isError };
};

export default useGetGroups;
