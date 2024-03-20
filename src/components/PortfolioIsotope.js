import Isotope from "isotope-layout";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { useUser } from "../utils/useUser";
const PortfolioIsotope = ({ noViewMore }) => {
  const { user } = useUser();
  // Extract projects and skills for filtering
  const userProjects = user?.projects ? user.projects.sort((a, b) => a.sequence - b.sequence).filter(a => a.enabled) : [];
  const filterItems = [];
  userProjects.forEach(project => project?.techStack.forEach(techStack => {
    if (!filterItems.includes(techStack.trim())) {
      filterItems.push(techStack.trim())
    }
  }));

  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");
  useEffect(() => {
    isotope.current = new Isotope(".works-items", {
      itemSelector: ".works-col",
      //    layoutMode: "fitRows",
      percentPosition: true,
      masonry: {
        columnWidth: ".works-col",
      },
      animationOptions: {
        duration: 750,
        easing: "linear",
        queue: false,
      },
    });
    return () => isotope.current.destroy();
  });
  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);
  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
  };
  const activeBtn = (value) => (value === filterKey ? "active" : "");
  return (
    <Fragment>
      <div className="works-box">
        <div
          className="filter-links scrolla-element-anim-1 scroll-animate"
          data-animate="active"
        >
          <a
            className={`c-pointer lui-subtitle ${activeBtn("*")}`}
            onClick={handleFilterKeyChange("*")}
            data-href=".works-col"
          >
            All
          </a>
          {filterItems.map((item, index) => (
            <a
              className={`c-pointer lui-subtitle ${activeBtn(
                `sorting-${item}`
              )}`}
              onClick={handleFilterKeyChange(`sorting-${item}`)}
              data-href={`.sorting-${item}`}
            >
              {item}
            </a>
          ))}
        </div>
        <div className="works-items works-masonry-items row">
          {userProjects.map((project, index) => {
            const techStack = project.techStack.map(tech => `sorting-${tech.trim()}`).join(" ");
            const displayTechStack = project.techStack.map(tech => tech.trim()).join(", ");

            if (index < 6 || noViewMore) {
              return (
                <div key={`project-item-${project._id}`} className={`works-col col-xs-12 col-sm-12 col-md-12 col-lg-12 ${techStack}`}>
                  <div
                    className="works-item scrolla-element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="image">
                      <div className="img">
                        <Link legacyBehavior href="/work-single">
                          <a>
                            <img
                              decoding="async"
                              src={project?.image?.url}
                              alt={project?.title}
                            // src="assets/images/work4.jpeg"
                            // alt="Zorro"
                            />
                            <span className="overlay" />
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className="desc">
                      <span className="category"> {displayTechStack} </span>
                      <h5 className="name">
                        <Link legacyBehavior href="/work-single">
                          <a>{project.title}</a>
                        </Link>
                      </h5>
                      <div className="text">
                        <p>
                          {project?.description ? project.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore."}
                        </p>
                      </div>

                      <Link legacyBehavior href={project.githubUrl ? PortfolioIsotope.githubUrl : "/work-single"}>
                        <a className="lnk">{project.githubUrl ? "View Live Project" : "See Project"}</a>
                      </Link>

                    </div>
                    <div
                      className="bg-img"
                      style={{
                        backgroundImage: "url(assets/images/pat-2.png)",
                      }}
                    />
                  </div>
                </div>
              )
            }
          })}

        </div>
        {!noViewMore && (
          <div className="load-more-link">
            <Link legacyBehavior href="/works">
              <a
                className="btn scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <span>View More</span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default PortfolioIsotope;
