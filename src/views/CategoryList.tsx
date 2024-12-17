import { useEffect, useState } from "react";
import { vscode } from '../client';


const CategoryList = () => {
  const [num, setNum] = useState<number>(0)
  useEffect(() => {

    // client listen for reply
    window.addEventListener('message', event => {

      const message = event.data; // The JSON data our extension sent

      switch (message.command) {
          case 'refactor':
              setNum(Math.random() * 100)
              break;
      }
  });
  })
  return (
    <div>
      <button onClick={
        () => {vscode.postMessage({
              command: 'alert',
              text: 'hello from client'
          })
        }
}>Click me</button>
        <p key={num}>number...{num}</p>
    </div>
  );
};

export default CategoryList;
