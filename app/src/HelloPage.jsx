
import { Link } from 'react-router-dom';
import './HelloPage.css'; 

export const HelloPage = () => { //don't forget to export this is very important 
    return (
        <div className="hello-page"> 
            <h1>Welcome to Notes App</h1>
            <div className="hello-content">
                <h1>This is the best App for Notes</h1>
                <p>I'm Testing</p>
            </div>
            <div className="navigation-links">
                <h2>Landing Page</h2>
                <Link to="/">Notes</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              
            </div>
           
        </div>
    );
};

export default HelloPage;
