import { useEffect, useState } from "react";
import "../App.css";
import { postData, updateData } from "../api/postApi";

const InputField = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(updateDataApi).length === 0;

  // get the upated data and add into input field

  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const addPostData = async () => {
    const res = await postData(addData);
    console.log("Res", res);

    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({
        title: "",
        body: "",
      });
    }
  };
  // update post data

  const updatePostData = async () => {
    try {
      const res = await updateData(updateDataApi.id, addData);
      if (res.status === 200) {
        setData((prev) => {
          return prev.map((item) => {
            return item.id === res.data.id ? res.data : item;
          });
        });
        setAddData({
          title: "",
          body: "",
        });
        setUpdateDataApi({});
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "ADD") {
      addPostData();
    } else if (action === "EDIT") {
      updatePostData();
    }
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="input-field">
        <div>
          <label htmlFor="title"></label>
          <input
            type="text"
            name="title"
            id="title"
            autoComplete="off"
            value={addData.title}
            onChange={handleInputChange}
            placeholder="Add Title"
          />
        </div>

        <div>
          <label htmlFor="body"></label>
          <input
            type="text"
            name="body"
            id="body"
            autoComplete="off"
            value={addData.body}
            onChange={handleInputChange}
            placeholder="Add Body"
          />
        </div>
        <button type="submit" value={isEmpty ? "ADD" : "EDIT"}>
          {isEmpty ? "ADD" : "EDIT"}
        </button>
      </div>
    </form>
  );
};
export default InputField;
