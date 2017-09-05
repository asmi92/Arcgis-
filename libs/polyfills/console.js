<<<<<<< HEAD
(function(con) {
  'use strict';
  try{
    var prop, method;
    var empty = {};
    var dummy = function() {};
    var properties = 'memory'.split(',');
    var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
       'groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,' +
       'table,time,timeEnd,timeStamp,trace,warn').split(',');
    prop = properties.pop();
    while (prop) {
      con[prop] = con[prop] || empty;
      prop = properties.pop();
    }
    method = methods.pop();
    while (method) {
      con[method] = con[method] || dummy;
      method = methods.pop();
    }
  }catch(err){
    alert(err);
  }
=======
(function(con) {
  'use strict';
  try{
    var prop, method;
    var empty = {};
    var dummy = function() {};
    var properties = 'memory'.split(',');
    var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
       'groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,' +
       'table,time,timeEnd,timeStamp,trace,warn').split(',');
    prop = properties.pop();
    while (prop) {
      con[prop] = con[prop] || empty;
      prop = properties.pop();
    }
    method = methods.pop();
    while (method) {
      con[method] = con[method] || dummy;
      method = methods.pop();
    }
  }catch(err){
    alert(err);
  }
>>>>>>> 2014f2a2f2a93a3c26c491b423f9b078d38216b1
})(this.console || (window.console = {}));