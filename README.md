
 # traversal.js
***

 ## 背景
  我们经常会处理一些有规律的树形结构的数据，往往我们会使用遍历去找寻我们需要的数据。很多时候我们为了快速的完成任务，我们会采用最简单直接的方法去解决，那就是使用递归，但是使用递归有时候会造成尾递归，当数据量比较大的时候，就会形成爆栈；而且递归的方式属于深度遍历的一种，但是有时候，广度遍历效率更高，当然，每次开发如果都要去评估两种方法之间的差距的话，这都是一件麻烦的事，所以具体使用的时候，我们可以直接使用两者，然后进行对比，在实际开发中选择更恰当的那个。这个库比较简单，纯当自己学习使用，但是如果不小心帮助到了你，那真是太幸运了。（本库参照的另外一名作者，在它的基础上改了点东西，加了些自己需要的功能，就相当于是重复造了个自己的轮子吧）

## 使用说明
***

兼容commonjs AMD 以及普通的加载方式

### commonjs/AMD
```
npm install tree-traversal
```
```
var traversal = require('path/to/data-traversal');
```
### 普通引用
```
<script src="path/to/data-traversal/traversal.js"></script>
```
```
var traversal = window.traversal;
```

## 示例
 ***
```
//数据源
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
```
### 普通方法
```
// BFS
var result = ''
traversal.breath({
data: data,
callback: function (temp) {
  result+=temp.id 
}
})
console.log(result) // '1234567891011'
```
```
// DFS
var result = ''
traversal.depth({
data: data,
callback: function (temp) {
  result+=temp.id 
}
})
console.log(result) // '1245836791011'
```
### 说明
 #### traversal.breath 和 traversal.depth接收的参数都是一样的
 ```
 options = {
 data: data, //数据源
 callback: function (temp) {}  //每次遍历的回调对象  temp表示当前正在遍历的对象
 }
 ```
 
 ### 路径方法
 ```
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
 var result = traversal.path(options);
 console.log([ 1, 3, 7, 9, 10 ])
 ```
 #### 说明
 该方法用于保存指定值的路径，返回的是一个数组，当然你可以对返回的数据进行自己想要的处理，这只是一个简单的返回。**参数说明如下**

 ```
 options = {
   data: data,  // 数据源
   matchValue: '10',  // 要比较的值
   matchKey: 'id',  // 要进行比较的值的key 
   storeKey: 'value',  // 要存储的值的key
   loopKey: 'children',  // 子节点名 默认值为children
   callback: function (temp) {  // 结束的回调 temp表示当前找到了的数据对象
     console.log(temp.id)
    }
 }
 ```
