import {ActionTypes, Actions} from './actionTypes';
import {MutationTypes}        from './mutationTypes';
import type {ActionTree}           from 'vuex';
import type {State}                from './store';

export const actions: ActionTree<State, State> & Actions = {
    [ActionTypes.INC_COUNTER]({commit}){
        commit(MutationTypes.INC_COUNTER, {amount: 1});
    },
};
