import test from 'node:test';
import assert from 'node:assert/strict';
import { classify, authorized } from './index.js';
test('classifies private IPv4',()=>assert.equal(classify('192.168.1.10'),'local/intranet'));
test('classifies public IPv4',()=>assert.equal(classify('8.8.8.8'),'public'));
test('blocks non-allowlisted public targets',()=>assert.equal(authorized('8.8.8.8',{public:{allowlistedTargets:[]}}),false));
test('allows explicitly allowlisted public targets',()=>assert.equal(authorized('8.8.8.8',{public:{allowlistedTargets:['8.8.8.8']}}),true));
