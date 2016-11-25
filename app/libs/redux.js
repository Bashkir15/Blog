import React from 'react'
import t from 'transducers.js'

const { map, filter, compose } = t;

const fields = {
	PROMISE: '@@dispatch/promise',
	SEQ_ID: '@@dispatch/seqId'
};

let seqId = 1;


const promiseMiddleware = store => next => action => {
	if (isPromise(action.payload)) {
		store.dispatch({type: 'ASYNC_START', subtype: action.type});
		action.payload.then(
			res => {
				action.payload = res;
				store.dispatch(action);
			},
			error => {
				action.error = true;
				action.payload = error.response.body;
				store.dispatch(action);
			}
		);

		return;
	}

	next(action);
};

function isPromise(v) {
	return v && typeof v.then === 'function';
}

export {
	promiseMiddleware
};

