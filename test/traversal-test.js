/**
 * @file traversal.spec.js
 * @author clarkt(clarktanglei@163.com)
 */
var traversal = require('../traversal');
var expect = require('chai').expect;
var data = [{
    id: '1',
    value: 1,
    children: [
        {
            id: '2',
            value: 2,
            children: [{
                    id: '4',
                    value: 4,
                },
                {
                    id: '5',
                    value: 5,
                    children: [{
                        id: '8',
                        value: 8,
                    }]
                }
            ]
        },
        {
            id: '3',
            value: 3,
            children: [{
                    id: '6',
                    value: 6,
                },
                {
                    id: '7',
                    value: 7,
                    children: [{
                        id: '9',
                        value: 9,
                        children: [{
                                id: '10',
                                value: 10,
                            },
                            {
                                id: '11',
                                value: 11,
                            }
                        ]
                    }]
                }
            ]
        }
    ]
}];

describe('test breadth', function () {
    it('test normal traversal', function () {
        var result = '';
        var options = {
            data: data,
            callback: function (temp) {
                result += temp.id
            }
        }
        traversal.breadth(options);
        expect(result).to.be.equal('1234567891011');
    });

    it('test traversal with isContinue', function () {
        var options = {
            data: data,
            callback: function (temp, res, e) {
                result += temp.id + ' ';
                if (temp.id === '8') {
                    e.break = true
                }
            }
        }
        var result = '';
        traversal.breadth(options);
        expect(result).to.be.equal('1 2 3 4 5 6 7 8 ');
    });

    it('test traversal with result', function () {
        var isContinue = true
        var options = {
            data: data,
            callback: function (temp, res = 0, e) {
                if (temp.id === '10') {
                    e.break = true
                } else {
                    res += (+temp.id);
                }
                return res;
            }
        }
        var result = traversal.breadth(options);
        expect(result).to.be.equal(45);
    });
});

describe('test depth', function () {
    it('test normal traversal', function () {
        var result = '';
        var options = {
            data: data,
            callback: function (temp) {
                result += temp.id + ' '
            }
        }
        traversal.depth(options);
        expect(result).to.be.equal('1 2 4 5 8 3 6 7 9 10 11 ');
    });

    it('test traversal with break', function () {
        var result = '';
        var options = {
            data: data,
            callback: function (temp, res, e) {
                result += temp.id + ' '
                if (temp.id === '8') {
                    e.break = true
                }
            }
        }
        traversal.depth(options);
        expect(result).to.be.equal('1 2 4 5 8 ');
    });

    it('test traversal with result', function () {
        var options = {
            data: data,
            callback: function (temp, res = 0, e) {
                res += (+temp.id)
                if (temp.id === '11') {
                    e.break = true
                }
                return res;
            }
        }
        var result = traversal.depth(options)
        expect(result).to.be.equal(66);
    });
});


describe('test path', function () {
    it('test normal path situation1', function () {
        var options = {
            data: data,
            matchValue: '3',
            matchKey: 'id',
            storeKey: 'value',
            loopKey: 'children',
            callback: function (temp) {
                console.log(temp.id)
            }
        }
        var path = traversal.path(options);
        expect(path.join('-')).to.be.equal('1-3');
    });

    it('test normal path situation2', function () {
        var options = {
            data: data,
            matchValue: '10',
            matchKey: 'id',
            storeKey: 'value',
            loopKey: 'children',
            callback: function (temp) {
                console.log(temp.id)
            }
        }
        var path = traversal.path(options);
        expect(path.join('-')).to.be.equal('1-3-7-9-10');
    });

    it('test normal path situation3', function () {
        var options = {
            data: data,
            matchValue: '5',
            matchKey: 'id',
            storeKey: 'value',
            loopKey: 'children',
            callback: function (temp) {
                console.log(temp.id)
            }
        }
        var path = traversal.path(options);
        expect(path.join('-')).to.be.equal('1-2-5');
    });

    it('test normal path situation4', function () {
        var options = {
            data: data,
            matchValue: '8',
            matchKey: 'id',
            storeKey: 'value',
            loopKey: 'children',
            callback: function (temp) {
                console.log(temp.value)
            }
        }
        var path = traversal.path(options);
        expect(path.join('-')).to.be.equal('1-2-5-8');
    });
});