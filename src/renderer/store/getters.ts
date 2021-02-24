import type {GetterTree} from 'vuex';
import type {Getters}    from './getterTypes';
import type {State}      from './store';

export const getters: GetterTree<State, State> & Getters = {
    counter: state => {
        return state.count;
    },
};
