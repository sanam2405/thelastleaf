import "./App.css";
import { Leaf } from "./components/Leaf";

function App() {
  return (
    <>
      <Leaf
        numberOfLeaves={7}
        leafPath="/thelastleaf.png"
        customStyles={{
          backgroundColor: "lightblue",
          width: "100vw",
          height: "100vh",
        }}
        leafStyles={{ width: "100px", height: "auto" }}
        interactive={true}
      >
        <div
          className="flex
          justify-center
          items-center"
        >
          {" "}
          <i> The Last Leaf </i>
        </div>
      </Leaf>
    </>
  );
}

export default App;
