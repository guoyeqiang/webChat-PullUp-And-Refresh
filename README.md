# webChat-PullUp-And-Refresh
微信小程序的上拉加载下拉刷新实现方式

第一种实现方式：(view)使用框架页面提供的onReachBottom、onPullDownRefresh完成下拉上拉共存。
第二种实现方式：(scroll-view)结合组件属性bindscrolltolower、bindscrolltoupper实现下拉上拉共存(模拟器成功的实现共存,可能模拟器存在bug吧-----猜测、真机不行)，会存出现该问题：“使用bindscrolltolower，必须搭配使用的scroll-view会导致小程序"enablePullDownRefresh": true下拉不能使用。”请使用第一种方式。

注：
第一种方式的实现onPullDownRefresh存在一个bug，在执行下拉刷新时会执行上拉加载onReachBottom，建议定义一个变量来控制，具体细节请看方式一的代码。此bug官方给出的回复为正在修复中(2018.01.01)。



 
 
