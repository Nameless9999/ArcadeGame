
//严格模式
"use strict";
// 随机数函数，产生一个最大值与最小值之间的值，方便后面设置速度
function customRandom(min,max){
	var co=max-min+1;
	return Math.floor(Math.random()*co+min);
}
var Character=function(x,y,sprite){
	this.x=x;
	this.y=y;
	this.sprite=sprite;
}
Character.prototype.render=function(){
	ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
}
//创建Enemy类和相应的刷新（update）渲染（render）方法





var enemyY=[68,151,234];
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里,其中敌人的横坐标都为0，纵坐标为了方便做碰撞，设为三排石头的纵坐标，随机生成。
    var index=Math.floor(Math.random()*enemyY.length);
  	this.speed=customRandom(100,350);
	this.x=0;
	this.y=enemyY[index];
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite='images/enemy-bug.png';
};		

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙

Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
	this.x+=this.speed*dt;
	if(this.x>490){
//虫子超出画布，则回到起点		
		this.x=0;
		var index=Math.floor(Math.random()*enemyY.length);
		this.y=enemyY[index];
	}
	//判定是否碰撞，碰撞则游戏重新开始，这个写进Player的update（）函数里面、或者单独写一个函数添加到update（）方法里去
	if(this.y==player.y){
		if(Math.abs(this.x-player.x)<74){
		alert("You Died");
		player.x=200;
		player.y=400;
	}

}	
};

// 此为游戏必须的函数，用来在屏幕上画出敌人
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(){
	this.x=200;
	this.y=400;
	this.sprite="images/char-boy.png";
}


Player.prototype.update=function(){
	if(this.x>420) this.x=0;
    if(this.x<-20) this.x=420;
    if(this.y>450)  this.y=400;
	if(this.y<0){
		alert("MissonComplete!!");
		this.x=200;
		this.y=400;
	}
}

Player.prototype.render=function(){
	ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
}
//记录键盘的输入，只记录上下左右四个方向键
Player.prototype.handleInput=function(key){
	switch(key){
	case 37:this.x-=101;break;
	case 39:this.x+=101;break;
	case 38:this.y-=83;break;
	case 40:this.y+=83;break;
	default:return false;
	}
}
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var player=new Player,
	allEnemies = new Array(customRandom(3,6)),
	i;

for(i=0;i<allEnemies.length;i++){
	allEnemies[i]=new Enemy();
}

//监听游戏玩家的键盘点击事件并将按键送到 handleInput()
document.addEventListener('keydown', function(e) {
    player.handleInput(e.keyCode);
});
