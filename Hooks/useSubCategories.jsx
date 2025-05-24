import { useQuery } from "@tanstack/react-query";
import axios from 'axios' ;

export default function useSubCategories(){
     function getSubCategories(){
         return axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`)
    }


    let subcategoryinfo = useQuery({
        queryKey: ["recentSubCategories"],
        queryFn: getSubCategories,
        staleTime: 200000,
        gcTime: 4000,
         select: (res)=> res.data.data,
        retry: 4,
        retryDelay: 6000,
        refetchInterval: 20000,
    })

    return subcategoryinfo
}