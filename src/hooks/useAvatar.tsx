import {useQuery} from '@tanstack/react-query';
import {API_GOLANG, API} from '../libs/api';
import {AvatarType, AvatarUser} from '../types/Avatar';

export function useAvatar() {
  const {data: Avatars, isPending} = useQuery<AvatarType>({
    queryKey: ['avatar'],
    queryFn: async () => await API_GOLANG.get('/avatars').then(res => res.data),
  });
  const {data: AvatarsUser} = useQuery<any>({
    queryKey: ['useravatars'],
    queryFn: async () =>
      await API.get('/user/avatars').then(res => res.data.data),
  });

  return {Avatars, isPending, AvatarsUser};
}
