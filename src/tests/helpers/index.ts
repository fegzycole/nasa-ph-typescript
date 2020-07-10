import { createStore, applyMiddleware } from 'redux';
import { ShallowWrapper } from 'enzyme';

import { middlewares } from '../../redux/store';
import rootReducer, { StoreState } from '../../redux/reducers';

export const storeFactory = (initialState: StoreState) => {
  const createStoreWithMiddleWare = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleWare(rootReducer, initialState);
};

export const findByTestAttribute = (component: ShallowWrapper, attribute: string) => {
  const wrapper = component.find(attribute);
  return wrapper;
};
