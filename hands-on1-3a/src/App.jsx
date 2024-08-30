import logo from './logo.svg';
import './App.css';
import Name from './component/Name/Name';
import Section from './component/Section/Section';
import Description from './component/Description/Description';

function App() {
  const userInformation = {
    firstName: "John Marvin",
    lastName: "Selosa ",
    section: "BSIT 3A",
    description: "humble"
  }
  return (
    <div className="App">
      <Name firstName={userInformation.firstName} lastName={userInformation.lastName}/>
      <Section section={userInformation.section}/>
      <Description description={userInformation.description}/>
    </div>
  );
}

export default App;
