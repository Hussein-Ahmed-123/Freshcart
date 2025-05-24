/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useProducts() {
    function getProducts(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      }
    
      let productInfo = useQuery({
        queryKey: ["recentProduct"],
        queryFn: getProducts,
        staleTime: 200000,
        gcTime: 4000,
        select: (data)=> data.data.data,
        retry: 4,
        retryDelay: 6000,
        refetchInterval: 20000,
      });

      return productInfo
}
