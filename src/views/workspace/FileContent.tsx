import { Link } from 'react-router'
import { useApi } from '../../client'

const FileContent = () => {
    const {api, isLoading, response} = useApi('treesitter.contents')
  return (
    <div>
        <Link to='/'>BACK TO HOME</Link>
        <p>Enter file path: </p>
        <input id="relativeFilePath" placeholder='eg: /apps/vsc-ext/src/routers/files.ts'></input>
        <button onClick={() => {
          const relativeFilePath = (document.getElementById("relativeFilePath") as HTMLInputElement).value;
            api({filePath: relativeFilePath})
        }}>Get content</button>
        <p>{response}</p>
    </div>
  )
}

export default FileContent
