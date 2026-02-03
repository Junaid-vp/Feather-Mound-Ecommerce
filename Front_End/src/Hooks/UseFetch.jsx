import { useEffect, useRef, useState } from "react";
import { api } from "../Api/Axios";

function useFetch(url) {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    

    const fetchData = async () => {
      try {
        const res = await api.get(url);
        setDatas(res?.data?.Products || []);
      } catch (err) {
        console.error( err);
      }
    };

    fetchData();
  }, [url]);

  return { datas };
}

export default useFetch;

