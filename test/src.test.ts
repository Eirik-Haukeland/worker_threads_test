import { describe, it } from "node:test";
import { isTest } from "../src/index.ts";
import assert from "node:assert";

describe('calling isTest', () => {
    it('with test as true shuld return: "is test"', () => {      
        assert.strictEqual(isTest(true), 'is test')
    })
    it('with test as true shuld return: "not implemented"', {todo: true}, () => {      
        assert.strictEqual(isTest(false), 'not implemented')
    })
})