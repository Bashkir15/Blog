import React from 'react'
import {mergeObj} from './utils'

const t = require('transducers.js');
const {map, filter, compose} = t;

const fields = {
	PROMISE: '@@dispatch/promise',
	SEQ_ID: '@@dispatch/seqId'
};

let seqId = 1;

function promiseMiddleware({dispatch}) {
	return next => action => {
		if(!action[fields.PROMISE]) {
			return next(action);
		}

		const promiseInst = action[fields.PROMISE];
		const id = seqId++;

		action = mergeObj(t.filter(action, x => x[0] !== fields.PROMISE),
			{[fields.SEQ_ID]: id});

		dispatch(mergeObj(action, {status: "start"}));

		return new Promise(function (resolve, reject) {
			promiseInst.then(value => {
				setTimeout(() => {
					dispatch(mergeObj(action), {
						status: "done",
						value: value
					});

					resolve(value);
				}, 0);
			}).catch(error => {
				setTimeout(() => {
					dispatch(mergeObj(action, {
						status: "error",
						value: error
					}));

					reject(error);
				}, 0);
			});
		});
	};
}

module.exports = {
	fields,
	promiseMiddleware
}