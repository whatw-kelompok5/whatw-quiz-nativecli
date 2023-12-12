import {useQuery} from '@tanstack/react-query';
import {API} from '../libs/api';

export function useDiamond() {
  const {data: Diamonds, isPending} = useQuery<any>({
    queryKey: ['diamond'],
    queryFn: async () => await API.get('/diamond').then(res => res.data),
  });

  return {Diamonds, isPending};
}
