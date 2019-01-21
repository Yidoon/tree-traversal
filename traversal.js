/**
 * @file traversal.js 遍历方法
 * @author Yidoon)
 */

(function () {
  // var pathArr = [];
  // var isTarget = false;
  var traversal = {
    /**
     * 非递归广度遍历数据
     *
     * @param {Object} options 参数对象
     * @param {Array} option.data 数据源数组
     * @param {Function(temp, res, isContinue)} option.callback 每次遍历的回调函数
     * @param {Object} function[temp] 当前遍历的对象
     * @param {*} function[res] 返回值
     * @param {Object} event 控制是否继续遍历
     * @param {String} option.key 子节点字段名 默认值为children
     * @return {*} 结果
     */
    breadth: function (options) {
      var data = options.data;
      var callback = options.callback;
      var key = options.key || 'children';
      // 浅拷贝数据源
      var queue = data.slice();
      var event = {}
      var res
      while (queue.length) {
        var obj = queue.shift();

        if (obj && obj[key] && obj[key].length) {
          queue = queue.concat(obj[key]);
        }
        res = callback(obj, res, event);
        //  当用户手动break时，终止遍历
        if (event.break) {
          return res;
        }
      }
      return res;
    },
    /**
     * 非递归广度遍历数据
     *
     * @param {Object} options 参数对象
     * @param {Array} option.data 数据源数组
     * @param {Function(temp, res, isContinue)} option.callback 每次遍历的回调函数
     * @param {Object} function[temp] 当前遍历的对象
     * @param {*} function[res] 返回值
     * @param {Object} event 控制是否继续遍历
     * @param {String} option.key 子节点字段名 默认值为children
     * @return {*} 结果
     */
    depth: function (options) {
      var data = options.data;
      var callback = options.callback;
      var key = options.key || 'children';
      // 入栈
      var stack = data.slice().reverse();
      var event = {};
      var res

      while (stack.length) {
        var obj = stack.pop();

        if (obj && obj[key] && obj[key].length) {
          stack = stack.concat(obj[key].slice().reverse());
        }

        res = callback(obj, res, event);

        // 当用户手动break时，终止遍历
        if (event.break) {
          return res;
        }
      }

      return res;
    },
    /**
     * 递归寻找路径
     *
     * @param {Object} options 参数对象
     * @param {Array} option.data 数据源数组
     * @param {String} option.matchValue 要进行比较的值的key
     * @param {*} option.matchKey 要比较的值
     * @param {String} option.storeKey 要存储的值的key
     * @param {String} option.loopKey 子节点字段名 默认值为children
     * @param {Function} option.callback 结束的回调
     * @return {Array} 结果数组，由data[storeKey]的组成
     */
    path: function (options) {
      // 结果数组
      var pathArr = [];
      // 是否找到目标
      var isTarget = false;
      loopFind(options)
      function loopFind (options) {
        // 数据源数组
      var data = options.data
      // 要比较的值
      var matchValue = options.matchValue
      // 要进行比较的值的key
      var matchKey = options.matchKey
      // 要存储的值的key
      var storeKey = options.storeKey
      // 子节点字段名 默认值为children
      var loopKey = options.loopKey || 'children:';
      // 每次遍历时的回调
      var callback = options.callback
        if (isTarget) {
          return pathArr
        }
        for (var i = 0; i < data.length; i++) {
          if (data[i][matchKey] === matchValue) {
            pathArr.push(data[i][storeKey])
            isTarget = true;
            callback(data[i])
            return pathArr;
          }
          if (data[i][loopKey] && data[i][loopKey].length && !isTarget) {
            pathArr.push(data[i][storeKey]);
            var options = {
              data: data[i][loopKey],
              matchValue: matchValue,
              matchKey: matchKey,
              storeKey: storeKey,
              loopKey: loopKey,
              callback: callback
          }
          loopFind(options)
          }
        }
        if (!isTarget) {
          pathArr.pop();
        } else {
          return pathArr
        }
      }
      return pathArr;
    }
  }

  if (typeof module !== undefined && typeof exports === 'object') {
    module.exports = traversal;
  } else if (typeof define === 'function' && (define.amd || define.cmd)) {
    define(function () {
      return traversal;
    })
  } else {
    this.traversal = traversal;
  }
}).call(this);