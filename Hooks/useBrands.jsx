// /* eslint-disable no-unreachable */
// /* eslint-disable no-undef */
import { useQuery } from "@tanstack/react-query";
import axios from 'axios' ;

export default function useCategories(){
     function getBrands(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    }


    let brandsinfo = useQuery({
        queryKey: ["recentBrands"],
        queryFn: getBrands,
        staleTime: 200000,
        gcTime: 4000,
         select: (response)=> response.data.data,
        retry: 4,
        retryDelay: 6000,
        refetchInterval: 20000,
    })

    return brandsinfo
}
