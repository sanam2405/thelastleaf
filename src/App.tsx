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
        leafStyles={{
          SMALL_SCREEN: {
            width: "75px",
            height: "auto",
          },
          LARGE_SCREEN: {
            width: "100px",
            height: "auto",
          },
        }}
        interactive={true}
        leafMotion={{ SMALL_SCREEN: 35, LARGE_SCREEN: 10 }}
      >
        <div className="flex justify-center items-center">
          <i>The Last Leaf</i>
        </div>
      </Leaf>
    </>
  );
}

export default App;
