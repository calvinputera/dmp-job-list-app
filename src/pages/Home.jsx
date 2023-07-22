import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import { FiSearch, FiChevronUp } from "react-icons/fi";
import { Oval } from "react-loader-spinner";
import axios from "axios";

const Home = ({ setIsAuth }) => {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [showToTop, setShowToTop] = useState(false);

  const navigate = useNavigate();

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
        // console.log(resp.data);
        setJobs((prev) => [...prev, ...resp.data]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // alert(err);
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
        // setTitle("");
        // setLocation("");
        // console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
        // alert(err);
      });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowToTop(true);
      } else {
        setShowToTop(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <Navbar />
      <div className="p-5">
        <div className="w-full flex flex-col gap-4 justify-center items-center bg-black p-8 rounded-2xl">
          <input
            type="text"
            placeholder="Filter by title, companies"
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Filter by location"
            onChange={(e) => setLocation(e.target.value)}
            className="input input-bordered w-full"
          />
          <button
            className="btn btn-outline border-2 text-white border-white bg-none rounded-lg w-full hover:bg-secondBlack"
            onClick={searchJob}
          >
            <FiSearch size={20} />
            Search
          </button>
        </div>
        <div className="flex flex-col flex-wrap gap-5 mt-5">
          {jobs.map((el) => (
            <div className="flex flex-col justify-between h-36 border-4 border-black rounded-xl p-4">
              <div className="flex flex-col gap-1">
                <p className="font-semibold">{el?.title}</p>
                <p className="text-doveGray text-xs">
                  {el?.company} - {el?.location}
                </p>
                <p className="text-doveGray text-xs">{el?.type}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-doveGray text-xs">
                  Posted{" "}
                  {new Date(el?.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </p>
                <button
                  className="text-sm font-medium p-2 rounded-md bg-black text-white hover:opacity-80 duration-100"
                  onClick={() => navigate(`/job/${el?.id}`)}
                >
                  Go To Detail
                </button>
              </div>
            </div>
          ))}
        </div>
        {isLoading && (
          <div className="flex justify-center">
            <Oval
              height={35}
              width={35}
              color="#DDDDDD"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#272A2A"
              strokeWidth={4}
              strokeWidthSecondary={4}
            />
          </div>
        )}
        {showToTop && (
          <button
            className="fixed flex flex-col justify-center items-center bottom-5 right-5 bg-black text-sm text-white px-4 py-2 w-14 h-14 text-center rounded-full shadow-xl hover:bg-pureBlack"
            onClick={scrollToTop}
          >
            <FiChevronUp size={25} />
          </button>
        )}
      </div>
    </>
  );
};

export default Home;
