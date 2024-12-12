import Header from './components/Header';
import Entry from './components/Entry';
import Data from './data';

export default function App() {
  const entries = Data.map((data) => (
    <Entry 
      key={data.id}
      {...data}
    />
  ))
  return (
    <>
      <Header/>
      {entries}
    </>
  )
}