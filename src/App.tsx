import { observer } from 'mobx-react-lite'; 
import { RoutesPath } from './Routes/RoutesPath';
import Bg from './components/background/bg';

import './App.css';



function AppComponent() {


  return (
    <div className='z-10'>
        <RoutesPath/>
    </div>

 

  );
}

export const App = observer(AppComponent);
