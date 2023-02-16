import ReactDOM from 'react-dom/client';
import {App} from './App';
import { BrowserRouter } from 'react-router-dom';
import { spy } from 'mobx';
import './index.css';


// spy((event)=>{
//   if(event.type === 'action'){
//     console.log(event);
//   }
// })


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>

);


