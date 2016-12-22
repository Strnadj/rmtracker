import Immutable from 'immutable';
import { START_TRACKING, STOP_TRACKING } from '../constants/actions';

const initialState = Immutable.fromJS({
  active: {
    from: null,
    project_id: null,
    issue_id: null,
    description: null
  },
  history: [] // Contains { from, to, project_id, description }
});

export default function tracking(state = initialState, action) {
  switch(action.type) {

    default:
      return state;
  }
}
