import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BugerBuilder />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <BurgerBuilder 
        onInitIngredients = {() => {}}
        onIngredientAdded={() => {}}
        onIngredientRemoved={() => {}} />
    );
  });

  it('should render <BuildControls /> when recieving ingredients', () => {
    wrapper.setProps({ ingredients: { salad: 1, cheese: 1, bacon: 1, meat: 1 }, totalPrice: 8.00 });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
})