import { Button } from 'reactstrap';
import Quote from './Quotes/InspirationalQuote';
import CreateFood from './CreateFood';

const Navbar = (props) => {
  return (
    <div>
        <CreateFood token={props.token} />
        <Button onClick={props.clickLogout}>Logout</Button>
        <Quote />
    </div>
  );
};

export default Navbar;