import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import axios from "axios";

const Home = ({ setIsAuth }) => {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      window.location.pathname = "/login";
    });
  };

  useEffect(() => {
    if (!setIsAuth) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?page=${page}`
      )
      .then((resp) => {
        console.log(resp.data);
        setJobs((prev) => [...prev, ...resp.data]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const searchJob = () => {
    axios
      .get(
        `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?description=${title}&location=${location}`
      )
      .then((resp) => {
        setJobs(resp.data);
        setTitle("");
        setLocation("");
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      Isi HOME
      <button onClick={signUserOut}>Keluar</button>
      <p>Job find {jobs.length}</p>
      <div>
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={searchJob}>Cari</button>
        {jobs.map((el) => (
          <>
            <p onClick={() => navigate(`/job/${el?.id}`)}>{el?.company}</p>
            <br />
          </>
        ))}
        {isLoading && <p>Loading...</p>}
      </div>
    </>
  );
};

export default Home;
