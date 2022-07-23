var that;
class Opera {
  constructor(id) {
    that = this;
    //获取元素
    this.main = document.querySelector(id);
    this.nav = this.main.querySelectorAll(".nav");
    this.content = this.main.querySelectorAll(".content");
    this.addT = this.main.querySelector('.add');
    //nav 的父元素
    this.top = this.main.querySelector('.top');
    this.bottom = this.main.querySelector('.bottom');
    this.init();
  }
  init () {//事件绑定
    this.updateNode();
    this.addT.onclick = this.add;//添加事件
    for (var i = 0; i < this.nav.length; i++) {
      this.nav[i].index = i;
      this.nav[i].onclick = this.toggleTab;
      this.remove[i].onclick = this.removeTab;
      this.span[i].ondblclick = this.editTab;
      this.content[i].ondblclick = this.editTab;
    }
  }
  //动态获取元素
  updateNode () {
    this.nav = this.main.querySelectorAll(".nav");
    this.content = this.main.querySelectorAll(".content");
    this.remove = this.main.querySelectorAll('.nav .position');
    this.span = this.main.querySelectorAll(".nav span:first-child");
  }
  clearClass () {
    for (var i = 0; i < this.nav.length; i++) {
      this.nav[i].className = 'nav';
      this.content[i].className = 'content';
    }
  }

  add () {
    //创建div
    that.clearClass();
    var random = Math.random();
    var nav = '<div class="nav"><span>新增</span><span class="position">x</span>';
    var div = '<div class="content show">' + random + '</div>';
    //追加到父元素
    that.top.insertAdjacentHTML('beforeend', nav);
    that.bottom.insertAdjacentHTML('beforeend', div);
    that.init();
  }

  removeTab (e) {
    e.stopPropagation();//阻止冒泡防止触发切换事件
    var index = this.parentNode.index;
    // console.log(index);
    that.nav[index].remove();
    that.content[index].remove();
    that.init();
    if (document.querySelector('.current')) return;//如果当前有current类，则不修改删除后的当前current变换，如果没有，则显示删除元素的上一个元素
    //当删除选中状态的nav，让其前一个li处于选定状态
    index--;
    that.nav[index] && that.nav[index].click();
  }
  delete () { }

  editTab () {
    //双击禁止选定文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    //获取input中的内容
    var text = this.innerHTML;
    //插入到调用者中
    this.innerHTML = '<input type="text" / value="' + text + '">';
    var input = this.children[0];
    input.select();
    //当离开文本框,把input里的value给span
    input.onblur = function() {
      this.parentNode.innerHTML = this.value;
    }
    //按下回车也可以把文本框的value给span
    input.onkeyup = function(e){
      if(e.keyCode === 13){
        this.blur();
      }
    }
  }

  //切换功能
  toggleTab () {
    // console.log(this.index);
    that.clearClass();//排他
    this.className = "nav current";
    that.content[this.index].className = 'content show';


  }

}
var tab = new Opera(".bigDiv");