import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  FiGlobe,
  FiMapPin,
  FiNavigation,
  FiExternalLink,
  FiChevronLeft,
  FiChevronUp
} from "react-icons/fi";
import { Oval } from "react-loader-spinner";

const JobsDetail = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobCreated, setJobCreated] = useState("");
  const [jobLinkApply, setJobLinkApply] = useState("");
  const [webCompany, setWebCompany] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [showToTop, setShowToTop] = useState(false);

  const [apply, setApply] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `http://dev3.dansmultipro.co.id/api/recruitment/positions/${params.id}`
      )
      .then((resp) => {
        setCompanyName(resp.data.company);
        setJobDesc(resp.data.description);
        setApply(resp.data.how_to_apply);
        setJobCreated(resp.data.created_at);
        setJobLinkApply(resp.data.url);
        setJobType(resp.data.type);
        setJobTitle(resp.data.title);
        setJobLocation(resp.data.location);
        setWebCompany(resp.data.company_url);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
        setIsLoading(false);
      });
  }, []);

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
        <button
          className="border-2 border-black rounded-full py-1 px-3 flex items-center mb-4 hover:bg-silver duration-150"
          onClick={() => navigate(-1)}
        >
          <FiChevronLeft size={20} /> Back
        </button>
        <header className="bg-black text-white rounded-xl p-4 flex flex-col gap-3 mb-5">
          <h3 className="text-xl font-bold">{jobTitle}</h3>
          <div className="flex gap-3">
            <a
              href={webCompany}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline"
            >
              <FiGlobe /> {companyName}
            </a>
            <p className="flex gap-1 items-center">
              <FiMapPin /> {jobLocation}
            </p>
            <p className="flex gap-1 items-center">
              <FiNavigation /> {jobType}
            </p>
          </div>
          <div className="flex justify-between items-center mt-5">
            <p className="text-sm">
              Posted{" "}
              {new Date(jobCreated).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            </p>
            <a
              href={jobLinkApply}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-white p-2 rounded-md text-black text-sm font-medium hover:bg-opacity-80 duration-150"
            >
              <FiExternalLink size={20} />
              Apply Now
            </a>
          </div>
        </header>
        <h3 className="font-bold text-xl mt-8 mb-2">Description:</h3>
        <div dangerouslySetInnerHTML={{ __html: jobDesc }}></div>
        <h3 className="font-bold text-xl mt-8 mb-2">How To Apply:</h3>
        <div dangerouslySetInnerHTML={{ __html: apply }}></div>
      </div>
      {showToTop && (
        <button
          className="fixed flex flex-col justify-center items-center bottom-5 right-5 bg-black text-sm text-white px-4 py-2 w-14 h-14 text-center rounded-full shadow-xl hover:bg-pureBlack"
          onClick={scrollToTop}
        >
          <FiChevronUp size={25} />
        </button>
      )}
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
    </>
  );
};

export default JobsDetail;
