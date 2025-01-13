import { useEffect, useState } from "react";
import api from "../../utils/api";

const List = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    api
      .get("/ice-creams")
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message));
  }, []);
  return <div>List</div>;
};

export default List;
