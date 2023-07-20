import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [user, setUser] = useState({});
  const [catsList, setCatsList] = useState([]);
  const api = import.meta.env.VITE_URL_BACKEND || "http://localhost:3000/";

  useEffect(() => {
    axios
      .get(api)
      .then(function (response) {
        setText(response.data);
        axios
          .get(api + "users")
          .then(function (response) {
            setUser(response.data[0]);
          })
          .catch(function (error) {
            alert(error);
          });
        axios
          .get(api + "cats")
          .then(function (response) {
            setCatsList(response.data);
          })
          .catch(function (error) {
            alert(error);
          });
      })
      .catch(function (error) {
        alert(error);
      });
  }, []);

  return (
    <div className="app">
      <h3>{text}</h3>
      <h3>User: {user?.name}</h3>
      <div className="card-list">
        {catsList.length > 0 ? (
          catsList.map((cat) => {
            return (
              <div key={cat.id} className="card">
                <img src={cat.url} alt="img of cat" />
                <div className="card-content">
                  <h3>{cat.id}</h3>
                  <p>id</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
