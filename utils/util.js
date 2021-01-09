
function promiseic(fnc){
  return function(params = {}){
    return new Promise((resolve,reject)=>{
      let obj = Object.assign(params,{
        success(res){
          resolve(res.data)
        },
        fail(err){
          reject(err)
        }
      })
      fnc(obj)
    })
  }
}

const combination = function (arr, size) {
  var r = []; 

  function _(t, a, n) { 
      if (n === 0) {
          r[r.length] = t;
          return;
      }
      for (var i = 0, l = a.length - n; i <= l; i++) {
          var b = t.slice();
          b.push(a[i]);
          _(b, a.slice(i + 1), n - 1);
      }
  }

  _([], arr, size);
  return r;
}

function getHeight(tabHeight=0){
  return new Promise((resolve,reject)=>{
    wx.getSystemInfo({
        success(res){
          let heightRpx = px2rpx(res.windowWidth,res.windowHeight)
          resolve(heightRpx-tabHeight)
        }
    })
  })
}
function px2rpx(widthPx,heightPX){
  return (750/widthPx)*heightPX
}
export {
  promiseic,
  combination,
  getHeight
}