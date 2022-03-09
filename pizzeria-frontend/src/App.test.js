import  { configure, render, mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Order from './components/Order';
import Build from './components/Build';
import ReactTestRenderer from 'react-test-renderer';


configure({ adapter: new Adapter()});

describe('<Foo />', () => {
    it('renders order component', () => {
      const tree = ReactTestRenderer.create(<Order/>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  
    it('renders build component', () => {
        const tree = ReactTestRenderer.create(<Build/>).toJSON();
        expect(tree).toMatchSnapshot();
      });
  });