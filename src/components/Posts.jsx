import { useEffect, useState } from "react";
import { deleteData, getData } from "../api/postApi";
import "../App.css";
import InputField from "../components/InputField";

const Posts = () => {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});
  const getPostData = async () => {
    try {
      const res = await getData();
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);
  // function to delete

  const deleteHandle = async (id) => {
    try {
      const res = await deleteData(id);
      if (res.status === 200) {
        const updatedNewData = data.filter((curEle) => {
          return curEle.id !== id;
        });
        // console.log("update", updatedNewData)
        setData(updatedNewData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle update data
  const handleUpdatePost = (item) => {
    setUpdateDataApi(item);
  };
  return (
    <>
      <section>
        <InputField
          data={data}
          setData={setData}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdateDataApi}
        />
      </section>
      <section className="section-post">
        <ul>
          {data.map((item) => {
            const { id, body, title } = item;
            return (
              <li key={id}>
                <p>{id}.</p>
                <p>Title : {title}</p>
                <p>Body : {body}</p>
                <button onClick={() => handleUpdatePost(item)}>Edit</button>
                <button onClick={() => deleteHandle(id)} className="btn-red">
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};
export default Posts;
