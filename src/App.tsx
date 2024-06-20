import "./App.css";
import { Leaf } from "./components/Leaf";

function App() {
  return (
    <>
      <Leaf numberOfLeaves={7} leafPath="/thelastleaf.png">
        <div>Hello</div>
      </Leaf>
    </>
  );
}

export default App;
