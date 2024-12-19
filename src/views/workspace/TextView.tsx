import { Link } from 'react-router';
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
  console.log("files:", response)
  return (
    <div>
      <Link to='/'>BACK TO HOME</Link>
      <button onClick={() => api({name: 'bruce'})}>Click me</button>
        <h1>FILES INCLUDE: </h1>
        <br/>
        <p>{`${response?.join('\n')}`}</p>
    </div>
  );
};

export default TextView;
