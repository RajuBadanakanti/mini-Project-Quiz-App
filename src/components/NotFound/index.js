import './index.css'

// Generated from Cloudnary
const notFoundImgURL =
  'https://res.cloudinary.com/dnh9hnjbx/image/upload/v1730445159/Group_7504_fcsp4m.png'

const NotFound = () => (
  <div className="bg-not-found-container">
    <div className="not-found-content">
      <img src={notFoundImgURL} alt="not found" className="not-found-img" />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound
