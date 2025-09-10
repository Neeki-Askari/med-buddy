import Header from './components/Header';
import Medications from './components/Medications';

function App({user}) {
  console.log('user: ', user)

  return (
      <div className='App'>
        <Header />
        <Medications />
      </div>
  );
}

export default App;
