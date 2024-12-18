import { useState } from "react";
import { useApi } from '../../client';


const TextView = () => {
  const {api, response, isLoading} = useApi('treesitter.filePaths');
  if(isLoading){
    return (
      <div>
        <button onClick={() => api({name: 'bruce'})}>Click me</button>
          <p>loading....</p>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => api({name: 'bruce'})}>Click me</button>
        <p>{response}</p>
    </div>
  );
};

export default TextView;
