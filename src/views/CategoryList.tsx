import { useState } from "react";
import { useApi } from '../client';


const CategoryList = () => {
  const [num, setNum] = useState<number>(0)
  const {api, response, isLoading} = useApi('greeting.get');
  if(isLoading){
    return (
      <div>
        <button onClick={() => api({name: 'bruce'})}>Click me</button>
          <p>loading....</p>
          <p key={num}>number...{num}</p>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => api({name: 'bruce'})}>Click me</button>
        <p>{response}</p>
        <p key={num}>number...{num}</p>
    </div>
  );
};

export default CategoryList;
