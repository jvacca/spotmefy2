import queue from './QueueReducers';
import fetchedData from './FetchDataReducers'
import {combineReducers} from 'redux';

export default combineReducers({
  queue,
  fetchedData
})