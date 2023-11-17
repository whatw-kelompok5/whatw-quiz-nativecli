import {useQuery} from '@tanstack/react-query';
import {API} from '../libs/api';
import {AvatarType} from '../types/Avatar';

export function useAvatar() {
  const {data: Avatars, isPending} = useQuery<AvatarType>({
    queryKey: ['avatar'],
    queryFn: async () => await API.get('/avatars').then(res => res.data),
  });

  return {Avatars, isPending};
}
