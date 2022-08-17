import { useState } from "react";
export const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data,setData] = useState<any>([])
  const refetch = async (url:string,body={}) => {   
      setData([])   
    try {
      setIsError(false)
      setIsLoading(true);
      const requestInfo = await fetch(url,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
          method:"POST",
          body:JSON.stringify(body)
      });
      const waitForInformation = await requestInfo.json();
      if(waitForInformation.error){
        setIsError(true)
      }else{
        setData(waitForInformation);
      }
      
    } catch (e) {
        setData([]);
      setIsError(true);
    } finally {
      setIsLoading(false);
      
    }
  };
    return{isLoading,isError,data,refetch}
}