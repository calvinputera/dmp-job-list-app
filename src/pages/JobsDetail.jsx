import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobsDetail = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobDesc, setJobDesc] = useState("");

  const params = useParams();

  useEffect(() => {
    axios
      .get(
        `http://dev3.dansmultipro.co.id/api/recruitment/positions/${params.id}`
      )
      .then((resp) => {
        console.log(resp.data);
        setCompanyName(resp.data.company);
        setJobDesc(resp.data.description);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      JobsDetail
      <p>{companyName}</p>
      <div dangerouslySetInnerHTML={{ __html: jobDesc }}></div>
    </div>
  );
};

export default JobsDetail;
