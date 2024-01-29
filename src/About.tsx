import React, {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import "./App.css";

interface User {
  id: number;
  data: string;
  item: string;
  [key: string]: string | number;
}

const About: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [data, setData] = useState<User[]>([{ id: 1, data: "", item: "" }]);
  const [selected, setSelected] = useState<any>("");
  const [selecteds, setSelecteds] = useState<any>("");
  const [selectedPin, setSelectedPin] = useState<any>("");
  const [val, setVal] = useState<User[]>([]);
  const [file, setFile] = useState<any>("");
  const [date, setDate] = useState<any>("");

  const handleDelete = () => {
    setShow(true);
    console.log("Show");
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  const handleDropdown = () => {
    setVal([...val, selected, selected, selectedPin]);
    console.log(val);
  };

  const datas = [
    {
      state: "Karnataka",
      city: ["Gulbarga", "Bidar", "Yadgir"],
      pin: [32, 35, 31],
    },
    { state: "Mumbai", city: ["Pune"], pin: [345] },
    { state: "Hydrabad", city: ["Telengana"], pin: [6785] },
    { state: "Dheli", city: ["Madhya Pradesh"], pin: [234] },
  ];

  const handleInput = (event: ChangeEvent<HTMLInputElement>, i: number) => {
    const result = event.target.name;
    const result1 = event.target.value;
    const field = result as keyof User;
    const newTodos = [...data];
    newTodos[i][field] = result1;
    setData(newTodos);
  };

  const handleDynamic = () => {
    setData([...data, { id: data.length + 1, data: "", item: "" }]);
  };

  const handleDeleteDynamic = (i: number) => {
    data.splice(i, 1);
    setData([...data]);
  };

  const submit: MouseEventHandler<HTMLButtonElement> = (e) => {
    const dataRequest = {
      date: date,
      bio: data.map((op, i) => ({
        data: op.item,
      })),
    };

    console.log(dataRequest);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    if (target) {
      const file = target.files;
      if (file) {
        setFile(URL.createObjectURL(file[0]));
      }
    }
  };
  const setDates = () => {
    setDate([...date]);
  };

  return (
    <>
      <button onClick={handleDynamic} className="btn ">
        +
      </button>
      <div className="col">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-control w-25 mt-2"
        />
        {data.map((op: User, index: number) => (
          <form className="form-inline" key={op.id}>
            <div className="form-group">
              <input
                type="text"
                className="form-control w-25 ms-4"
                value={op.item}
                name="item"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInput(e, index)
                }
              />
            </div>
            <button
              onClick={() => handleDeleteDynamic(index)}
              className="btn  ms-2"
            >
              -
            </button>
          </form>
        ))}
      </div>
      <div>
        <button onClick={submit}>Save</button>
      </div>

      <div>
        <select
          className=""
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option>Select State</option>
          {datas.map((op, i) => (
            <option value={i}>{op.state}</option>
          ))}
        </select>

        <select
          className=""
          value={selecteds}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setSelecteds(e.target.value)
          }
        >
          {datas[selected] &&
            datas[selected].city.map((op, i) => (
              <option value={i}>{op}</option>
            ))}
        </select>

        <select
          className=""
          value={selectedPin}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setSelectedPin(e.target.value)
          }
        >
          {datas[selected] &&
            datas[selected].pin.map((op, i) => <option value={i}>{op}</option>)}
        </select>
      </div>
      <input type="file" onChange={handleChange} />

      {!show ? (
        <img src={file} alt="" />
      ) : (
        <img
          src="assets/images/bs-images/img-2x1.png"
          className="img-fluid"
          alt="img-fluid"
        ></img>
      )}
    </>
  );
};

export default About;
