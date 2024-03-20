import { useState } from "react";
import { useUser } from "../utils/useUser";

const educationData = [
  {
    id: 1,
    title: "Backend Programming",
    academy: "CoderHouse Course",
    dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    startYear: "2014",
    endYear: "2016",
  },
  {
    id: 2,
    title: "Faculty of Design",
    academy: "Lviv National Academy of Arts",
    dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    startYear: "2012",
    endYear: "2014",
  },
  {
    id: 3,
    title: "High School",
    academy: "IT Future",
    dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    startYear: "2010",
    endYear: "2012",
  },
];

const experienceData = [
  {
    id: 1,
    title: "UI Head & Manager",
    company: "Soft Tech Inc.",
    dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    startYear: "2020",
    endYear: false,
  },
  {
    id: 2,
    title: "UI / UX Specialist",
    company: "Kana Design Studio",
    dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    startYear: "2018",
    endYear: "2020",
  },
  {
    id: 3,
    title: "Plugins Developer",
    company: "Fiverr.com",
    dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    startYear: "2016",
    endYear: "2018",
  },
];

const Resume = () => {
  const [educationToggle, setEducationToggle] = useState(1);
  const [experienceToggle, setExperienceToggle] = useState(1);

  const { user } = useUser();
  const userTimeLine = user?.timeline ? user.timeline.sort((a, b) => a.sequence - b.sequence).filter(a => a.enabled) : [];
  const educationTimeline = userTimeLine.filter(a => a.forEducation).sort((a, b) => a.sequence - b.sequence);
  const experienceTimeline = userTimeLine.filter(a => !a.forEducation).sort((a, b) => a.sequence - b.sequence);

  console.log("Education timeline", educationTimeline)
  console.log("Experience timeline", experienceTimeline)


  return (
    <section className="lui-section lui-gradient-bottom" id="resume-section">
      {/* Heading */}
      <div className="lui-heading">
        <div className="container">
          <div className="m-titles align-center">
            <h2
              className="m-title splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span> Resume </span>
            </h2>
            <div
              className="m-subtitle splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span>
                {" "}
                my <b>Story</b>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* History */}
      <div className="v-line v-line-left">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <h5
                className="history-title scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <span> Education </span>
              </h5>
              <div className="history-items">
                {educationTimeline.map((education, i) => {
                  const startYear = new Date(education.startDate).getFullYear();
                  const endYear = new Date(education.endDate).getFullYear();
                  console.log(startYear, endYear)
                  return (
                    <div
                      key={education._id}
                      className={`history-item lui-collapse-item scroll-animate ${educationToggle === education._id ? "opened" : ""
                        }`}
                      data-animate="active"
                    >
                      <h6
                        className={`name lui-collapse-btn ${educationToggle == education._id ? "active" : ""
                          }`}
                        onClick={() =>
                          setEducationToggle(
                            educationToggle == education._id ? null : education._id
                          )
                        }
                      >
                        <span> {education.company_name}, {education.jobLocation} </span>
                      </h6>
                      <div className="history-content">
                        <div className="subname">
                          <span> {education.jobTitle} </span>
                        </div>
                        <div className="date lui-subtitle">
                          <span>
                            {/* {education.} */}
                            {startYear} - {endYear || "Present"}
                          </span>
                        </div>
                        <div className="text">
                          {education.summary && (
                            <div>
                              <p>{education.summary}</p>
                            </div>
                          )}

                          {education.bulletPoints && (
                            <div>
                              <ul>
                                {education?.bulletPoints.map(((point, index) => <li key={`${education._id}-bullet-${index}`} >{point}</li>))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                }

                )}
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <h5
                className="history-title scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <span> Experience </span>
              </h5>
              <div className="history-items">
                {experienceTimeline.map((experience) => {

                  const startYear = new Date(experience.startDate).getFullYear();
                  const endYear = new Date(experience.endDate).getFullYear();
                  return (
                    <div
                      className={`history-item lui-collapse-item scroll-animate ${experience._id == experienceToggle ? "opened" : ""
                        }`}
                      data-animate="active"
                      key={experience._id}
                    >
                      <h6
                        className={`name lui-collapse-btn ${experienceToggle == experience._id ? " active" : ""
                          }`}
                        onClick={() => setExperienceToggle(experience._id)}
                      >
                        <span> {experience.jobTitle}, {experience.jobLocation} </span>
                      </h6>
                      <div className="history-content">
                        <div className="subname">
                          <span> {experience.company_name} </span>
                        </div>
                        <div className="date lui-subtitle">
                          <span>
                            {" "}
                            {startYear} -{" "}
                            {endYear ? (
                              endYear
                            ) : (
                              <b>Present</b>
                            )}
                          </span>
                        </div>
                        <div className="text">
                          {experience.summary && (
                            <div>
                              <p>{experience.summary}</p>
                            </div>
                          )}

                          {experience.bulletPoints && (
                            <div>
                              <ul>
                                {experience?.bulletPoints.map(((point, index) => <li key={`${experience._id}-bullet-${index}`} >{point}</li>))}
                              </ul>
                            </div>
                          )}

                        </div>
                      </div>
                    </div>
                  )
                }

                )}
              </div>
            </div>
          </div>
          <div className="lui-bgtitle">
            <span> History </span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Resume;
