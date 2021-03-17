import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Characters, Comics, CharacterInfo, ComicInfo} from './routes';
import { NavHeader, Footer } from './components';

function App() {
  return (
    <Router >
      <NavHeader />
    
      <Switch>
        <Route path="/comics">
          <div style={{backgroundColor: 'black'}}>
          <Comics />
          </div>
        </Route>

        <Route path="/characters">
          <Characters />
        </Route>

        <Route path="/char-info">
          <CharacterInfo
          title='character name'
          image='http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg'
          />
        </Route>

        <Route path="/comic-info">
          <ComicInfo />
        </Route>

        <Route path="/">
          <Characters />
        </Route>

      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
