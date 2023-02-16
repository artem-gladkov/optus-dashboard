import { observer } from 'mobx-react-lite'; 
import { RoutesPath } from './Routes/RoutesPath';

import './App.css';


function AppComponent() {

  return (
 
        <RoutesPath/>
 

  );
}

export const App = observer(AppComponent);
