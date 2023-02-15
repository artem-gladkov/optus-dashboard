import { observer } from 'mobx-react-lite'; 
import { RoutesPath } from './Routes/RoutesPath';

import './App.css';


function AppComponent() {

  return (
   <div >
        <RoutesPath/>
    </div> 

  );
}

export const App = observer(AppComponent);
