import {Environment} from './environment.dev';

export const ApiEndpoints = {
  apiGetFood:     Environment.api.url + '/food',
  apiGetFoods:     Environment.api.url + '/food/all',
  apiSearchFood:     Environment.api.url + '/food/search',
  apiPostFood:     Environment.api.url + '/food/save',
  apiPutFood:     Environment.api.url + '/food/update',
  apiDeleteFood:     Environment.api.url + '/delete',
};
