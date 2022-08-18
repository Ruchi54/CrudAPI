import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter,
  Link,
  Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import "../Styles/Home.css";
import Dialog from "./Dialog";

const Home = () => {
  //Popup box
  //const [open, Setisopen] = useState(false);
  const [open, Setisopen] = useState({
    show: false,
  });

  const togglePopup = () => {
    Setisopen(!open);
  };

  let history = useNavigate();

  const [user, setUser] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get("https://gorest.co.in/public/v2/users", {
      headers: {
        Authorization: `Bearer c46c8176c189a01803d43cac358c36f5f778aff6736d80dd6e0199445626e3fb`,
      },
    });

    setUser(result.data);
  };

  const deleteUser = async (id) => {
    //alert("Are you sure?");
    await axios
      .delete(`https://gorest.co.in/public/v2/users/${id}`, {
        headers: {
          Authorization: `Bearer c46c8176c189a01803d43cac358c36f5f778aff6736d80dd6e0199445626e3fb`,
        },
      })
      .then((resp) => {
        console.log("Resp", resp);
      })
      .catch((error) => {
        console.log(error);
      });

    loadUser();
    //history("/");
  };

  return (
    <>
      {/*<div className="add_user">
          <Link to="/user/add">
            <button>Add user</button>
          </Link>
  </div>*/}

      <h2>User Page</h2>
      <div>
        <table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Email</td>
              <td>Gender</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>

          {user.map((data) => {
            const color =
              data.status === "active" ? "rgb(76, 178, 76)" : "#ff6fb7";
            const bgcolor =
              data.status === "active"
                ? "rgb(223, 239, 223)"
                : "rgb(239, 197, 233)";
            return (
              <>
                <tbody>
                  <tr>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.gender}</td>
                    <td>
                      <span
                        class="badge "
                        style={{
                          color: `${color}`,
                          backgroundColor: `${bgcolor}`,
                        }}
                      >
                        {data.status}
                      </span>
                    </td>

                    <td>
                      <Link to={`user/edit/${data.id}`}>
                        <button className="edit_button">Edit</button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="delete_button"
                        onClick={() => deleteUser(data.id)}
                        //onClick={togglePopup}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
        {/*{open && (
          <Dialog
            handleClose={togglePopup}
            content={
              <>
                <>
                  <div>Are you sure to delete</div>
                  <button onClick={() => deleteUser(data.id)}>Yes</button>
                </>
              </>
            }
          />
          )}*/}
      </div>
    </>
  );
};

export default Home;
