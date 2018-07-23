import React from 'react';

import { shallow } from 'enzyme';
import sinon from 'sinon';
import Section from './Section';

const validProps = {
  title: 'title',
  subtitle: 'subtitle',
  content: <div />,
  link: 'link',
  expandable: true,
  expanded: false,
  action() {
    return true;
  },
};

const incompleteProps = {
  title: 'title',
};

const invalidProps = {
  title: 'title',
  subtitle: 'subtitle',
  content: 'div',
  link: 'link',
  expandable: true,
  expanded: false,
  action() {
    return true;
  },
};

describe('action', () => {
  const action = sinon.spy(validProps, 'action');
  afterEach(() => {
    action.resetHistory();
  });
  it('should call action once when clicking the link', () => {
    const wrapper = shallow(<Section {...validProps} />);
    const target = wrapper.find('#link');
    target.simulate('click');
    expect(action.callCount).toBe(1);
  });
});

// describe('rendering', () => {
//   const props = {
//     title: 'Testing',
//     content: <div />,
//     dismiss() {
//       return true;
//     },
//   };
//   const clickEvent = {
//     stopPropagation() {
//       return true;
//     },
//   };
//   const dismiss = sinon.spy(props, 'dismiss');

//   afterEach(() => {
//     dismiss.resetHistory();
//   });

//   it('should call dismiss once when clicking the x in the top left corner', () => {
//     const wrapper = shallow(<Modal {...props} />);
//     const target = wrapper.find('#dismiss');
//     target.className = 'dismiss';
//     clickEvent.target = target;
//     target.simulate('click', clickEvent);
//     expect(dismiss.callCount).toBe(1);
//   });

//   it('should call dismiss once when clicking the backdrop', () => {
//     const wrapper = shallow(<Modal {...props} />);
//     const target = wrapper.find('#backdrop');
//     target.className = 'backdrop';
//     clickEvent.target = target;
//     target.simulate('click', clickEvent);
//     expect(dismiss.callCount).toBe(1);
//   });

//   it('should call dismiss zero times when clicking the frame', () => {
//     const wrapper = shallow(<Modal {...props} />);
//     const target = wrapper.find('#frame');
//     target.className = 'frame';
//     clickEvent.target = target;
//     target.simulate('click', clickEvent);
//     expect(dismiss.callCount).toBe(0);
//   });
// });

describe('PropTypes', () => {
  const error = sinon.spy(console, 'error');
  afterEach(() => {
    error.resetHistory();
  });
  it('should NOT throw an error when given only some props', () => {
    shallow(<Section {...incompleteProps} />);
    expect(error.callCount).toBe(0);
  });
  it('should throw an error when given a prop of invalid type', () => {
    shallow(<Section {...invalidProps} />);
    expect(error.callCount).toBe(1);
  });
});
