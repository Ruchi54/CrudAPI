import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  let history = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    email: "",
    status: "",
    gender: "",
    //male: "",
    //female: "",
  });

  const { name, email, status, gender } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    //console.log("Users", user);
    await axios
      .put(`https://gorest.co.in/public/v2/users/${id}`, user, {
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

    history("/");
  };

  const loadUser = async () => {
    const result = await axios.get(
      `https://gorest.co.in/public/v2/users/${id}`,
      {
        headers: {
          Authorization: `Bearer c46c8176c189a01803d43cac358c36f5f778aff6736d80dd6e0199445626e3fb`,
        },
      }
    );

    setUser(result.data);
  };

  //console.log("ID", id);

  return (
    <>
      <h2>Edit User</h2>
      <div style={{ width: "30%", marginLeft: "35%", marginTop: "50px" }}>
        <form className="row g-3" onSubmit={submitForm}>
          <div>
            <label for="inputEmail4" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              name="name"
              onChange={(e) => onInputChange(e)}
              value={name}
            />
          </div>
          <div>
            <label for="inputPassword4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputPassword4"
              name="email"
              onChange={(e) => onInputChange(e)}
              value={email}
            />
          </div>

          <div>
            <label for="inputState" className="form-label">
              Status
            </label>
            <select
              id="inputState"
              name="status"
              className="form-select"
              onChange={(e) => onInputChange(e)}
              value={status}
            >
              <option selected>Choose...</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="col-12">
            <input
              class="form-check-input"
              type="radio"
              //name="flexRadioDefault"
              name="gender"
              id="flexRadioDefault1"
              onChange={(e) => onInputChange(e)}
              value="male"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Male
            </label>
          </div>
          <div className="col-12">
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              id="flexRadioDefault1"
              onChange={(e) => onInputChange(e)}
              value="female"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Female
            </label>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditUser;
