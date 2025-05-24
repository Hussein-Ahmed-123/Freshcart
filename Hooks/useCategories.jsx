// /* eslint-disable no-unreachable */
// /* eslint-disable no-undef */
 import { useQuery } from "@tanstack/react-query";
 import axios from 'axios' ;

 export default function useCategories(){
      function getCategories(){
          return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
     }


     let categoryinfo = useQuery({
         queryKey: ["recentCategories"],
         queryFn: getCategories,
         staleTime: 200000,
         gcTime: 4000,
          select: (res)=> res.data.data,
         retry: 4,
         retryDelay: 6000,
         refetchInterval: 20000,
     })

     return categoryinfo
 }
