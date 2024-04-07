import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const SidebarSection = ({ handleDisplayRoute, content, sectionHeading }) => {
  return (
    <div className='sidebar-section'>
      <p className='sidebar-section-heading'>{sectionHeading}</p>
      <div className='sidebar-section-contents'>
        {content.map((item) =>
          item.name === 'Sign In' ? (
            // can't render Sign in as a Link because I'll programmatically be changing routes
            <div
              onClick={() => handleDisplayRoute(item.name)}
              key={item.name}
              className='section-content'>
              <FontAwesomeIcon className='awesome' icon={item.icon} />
              <p>{item.name}</p>
            </div>
          ) : item.name === 'Sign Out' ? (
            // can't render Sign in as a Link because I'll programmatically be changing routes
            <div
              onClick={() => handleDisplayRoute(item.name)}
              key={item.name}
              className='section-content'>
              <FontAwesomeIcon className='awesome' icon={item.icon} />
              <p>{item.name}</p>
            </div>
          ) : (
            <Link
              onClick={() => handleDisplayRoute(item.name)}
              key={item.name}
              to={item.to}
              className='section-content'>
              <FontAwesomeIcon className='awesome' icon={item.icon} />
              <p>{item.name}</p>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default SidebarSection;
