import React, { useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, updateUser } from "./userReduser";
import { Card } from "react-bootstrap";
import "./App.css";
import Swal from "sweetalert2";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { log } from "console";

interface User {
  id: number;
  item: string;
}

const Home: React.FC = () => {
  const users = useSelector((state: any) => state.users);
  const [data, setData] = useState<User[]>(users);
  const dispatch = useDispatch();
  const [item, setItem] = useState<string>("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [serchBy, setSearchBy] = useState<string>("");
  const [uitem, setUitem] = useState<string>("");
  const [editItemId, setEditItemId] = useState<number | null>(null);

  useEffect(() => {
    setData(users);
  }, [users]);

  const total = data.length;
  console.log(total);

  const filterData = data.filter(
    (name: User) =>
      name.id.toString().includes(serchBy.toString()) ||
      name.item.toLowerCase().includes(serchBy.toLowerCase())
  );

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    setShow1(true);
    // const isItemExist = data.some((user: User) => user.item === item);
    // if (isItemExist) {
    //   toast.warn(`${item} already exists`, {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //     transition: Bounce,
    //   });
    // } else if (item.length === 0) {
    //   toast.warn("Please enter item", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //     transition: Bounce,
    //   });
    // } else {
    //   dispatch(addUser({ id: data.length + 1, item }));
    //   toast.success("Item added successfully", {
    //     position: "top-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //     transition: Bounce,
    //   });
    //   setItem("");
    // }
  };

  const handleAdds = (e: FormEvent) => {
    e.preventDefault();
    const isItemExist = data.some((user: User) => user.item === item);
    if (isItemExist) {
      toast.warn(`${item} already exists`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else if (item.length === 0) {
      toast.warn("Please enter item", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      dispatch(addUser({ id: data.length + 1, item }));
      toast.success("Item added successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setItem("");
    }
    setShow1(false);
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser({ id: id }));
        toast.success("Item deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    });
  };

  const handleEdit = (id: number) => {
    const userToUpdate = data.find((user: User) => user.id === id);
    console.log(updateUser);

    setUitem(userToUpdate?.item as any);
    setEditItemId(id);
    setShow(true);
  };
  console.log(uitem);

  const handleUpdate = () => {
    dispatch(
      updateUser({
        id: editItemId,
        item: uitem,
      })
    );
    toast.success("Item spdate successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    setShow(false);
  };

  const handleUp = (index: number) => {
    if (index > 0) {
      const updatedData = [...data];
      const temp = updatedData[index];
      updatedData[index] = updatedData[index - 1];
      updatedData[index - 1] = temp;
      setData(updatedData);
    }
  };

  const handledown = (index: number) => {
    if (index < users.length - 1) {
      const updatedData = [...users];
      const temp = updatedData[index];
      updatedData[index] = updatedData[index + 1];
      updatedData[index + 1] = temp;
      setData(updatedData);
    }
  };

  return (
    <div className="container">
      <Card className="text-center mt-4">
        <Card.Header style={{ background: "#F5EEE6" }}>
          <h2>To-Do List</h2>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleAdd}>
            <input
              type="text"
              className=" form-control w-50 mt-2 mb-4"
              placeholder="Search items"
              style={{ height: "3rem" }}
              value={serchBy}
              onChange={(e) => setSearchBy(e.target.value)}
            />
            <div className="d-flex justify-content-start">
              {/* <input
                type="text"
                className="form-control w-25 mt-2"
                style={{ height: "3rem" }}
                placeholder="Enter item"
                value={item}
                onChange={(e) => setItem(e.target.value)}
              /> */}
              <button type="submit" className="btn btn-info my-3  mb-4">
                Add Item
              </button>
            </div>
          </form>
          {filterData.length === 0 ? (
            <p>Item is Not Found</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>SI No</th>
                  <th>ID</th>
                  <th>Item</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filterData.map((val: User, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{val.id}</td>
                    <td>{val.item}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEdit(val.id)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => handleDelete(val.id)}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-light ms-2"
                        onClick={() => handleUp(index)}
                      >
                        <i className="bi bi-caret-up-fill"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-light ms-2"
                        onClick={() => handledown(index)}
                      >
                        <i className="bi bi-caret-down-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card.Body>
        <h4>Total Item: {total}</h4>
      </Card>
      {show ? (
        <div className="editCard ">
          <div className="text-white ">
            <Card className="text-center" style={{ width: "24rem" }}>
              <Card.Body>
                <Card.Title>
                  <h4>Up-Date Item</h4>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <input
                    type="text"
                    className="form-control"
                    value={uitem}
                    onChange={(e) => setUitem(e.target.value)}
                  />
                </Card.Subtitle>
                <Card.Text>
                  <button className="btn btn-success" onClick={handleUpdate}>
                    Update
                  </button>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      ) : null}

      {show1 ? (
        <div className="editCard ">
          <div className="text-white ">
            <Card className="text-center" style={{ width: "24rem" }}>
              <Card.Body>
                <Card.Title>
                  <h4>Add New Item</h4>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <input
                    type="text"
                    className="form-control"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                  />
                </Card.Subtitle>
                <Card.Text>
                  <button className="btn btn-success" onClick={handleAdds}>
                    Submit
                  </button>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      ) : null}

      <Link to="/about">About</Link>
      <ToastContainer />
    </div>
  );
};

export default Home;
