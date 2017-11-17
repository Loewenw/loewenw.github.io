
  // niceScroll
  $("html").niceScroll();
    
    
  // Stick menu
  $(".nav-menu").sticky({topSpacing:0});//���Թ���




  // Menu Scroll to content and Active menu
  var lastId,
    topMenu = $("#menu"),
    topMenuHeight = topMenu.outerHeight()+145,
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

   $('a[href*=#]').bind('click', function(e) {
	e.preventDefault();
       
	var target = $(this).attr("href");

	$('html, body').stop().animate({ scrollTop: $(target).offset().top-140 }, 1000, function() {});
			
	return false;
   });

  $('.arrow-down').bind('click', function() {

      $('html, body').stop().animate({ scrollTop: $("#photo").offset().top-70 }, 1000);

      return false;
  });

  $(window).scroll(function(){
   var fromTop = $(this).scrollTop()+topMenuHeight;
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });

   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   }                   
  });  
  

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    
    $(".footer").css( "position", "relative" );
    $(".contact").css( "marginBottom", "0" );

}
else 
{

  // FadeTo elements
  if ( $(window).width() > 1023) {  

    tiles = $("h2, h3, .column-one, .column-two, .column-three, .grid li, .contact .content .form, .contact .content .contact-text ").fadeTo(0, 0);

    $(window).scroll(function(d,h) {
      tiles.each(function(i) {
          a = $(this).offset().top + $(this).height();
          b = $(window).scrollTop() + $(window).height();
          if (a < b) $(this).fadeTo(1000,1);
      });
    });

  }

}



  //Menu mobile click
  $( ".icon" ).click(function() {
    $( " ul.nav-click" ).slideToggle( "slow", function() {
    // Animation complete.
    });
  });


$(window).load(function(){

$(".preloader").delay(1000).fadeOut("slow")

  // Parallax
  if ($('.parallax-background').length) {
    $(".parallax-background").parallax();
  }
  
  // Parallax
  if ($('.parallax-background-partners').length) {
    $(".parallax-background-partners").parallax();
  }
  if ($('.parallax-background-partner').length) {
    $(".parallax-background-partner").parallax();
  }
  Stars(100);
  begin();
});

  /*********************�ǿ�************************/
  var canvas = document.getElementById("canvas");
  canvas.width = document.getElementById("home").width;
  canvas.height = document.getElementById("home").height;
  //console.log(canvas.width);
  //console.log(canvas.height);
  var ctx = canvas.getContext('2d');
//$(window).resize = function(){
//    canvas.width = document.getElementById("home").width;
//    canvas.height = document.getElementById("home").height;
//    console.log($("#home").width);
//    console.log(canvas.height);
//}
  $(window).resize(resizeCanvas);
  function resizeCanvas(){
      $('#canvas').attr("width", $(window).get(0).innerWidth);
      $('#canvas').attr("height", $(window).get(0).innerHeight);
      //context.fillRect(0, 0, canvas.width(), canvas.height());
  }
  resizeCanvas();
  window.requestAnimationFrame = function(){
      return window.requestAnimationFrame
          ||window.webkitRequestAnimationFrame
          ||window.mozRequestAnimationFrame
          ||window.msRequestAnimationFrame
          ||window.oRequestAnimationFrame
          ||function(callback){
              window.setTimeout(callback, 1000/60);
          }
  }();
  function star(x, y, r, twinkle){
      this.x = x;
      this.y = y;
      this.r = r;
      this.isTwinkle = twinkle;//��˸����
  }
  function meteor(x, y, r, len, opacity){
      this.x = x;
      this.y = y;
      this.r = r;
      this.len = len;//����β�ͳ���
      this.opacity = opacity;
      this.angle1 = Math.acos((1900 - x)/Math.sqrt(Math.pow(1900 - x, 2) + Math.pow(700 - y, 2)));//����ͷ��Բ���γɵĽǶ�
      this.angle2 = Math.atan(len/Math.sqrt(Math.pow(1900 - x, 2) + Math.pow(700 - y, 2)));//����β��Բ���γɵĽǶ�
      this.appendageX = null;
      this.appendageY = null;//����β����
  }
  function random(min, max){
      return Math.floor(Math.random() * (max-min+1) + min);
  }
  var stars = [], meteors = [], grd;
  function Stars(x){
      for(var i=0; i<x; i++){
          stars.push(new star(random(0, canvas.width), random(0, canvas.height*0.7), random(1, 3), random(0, 2) - 1));
      }
  }
  function drawMeteor(){
      var R,angle,dir;
      if(Math.random() > 0.97 && meteors.length <= 15)
          meteors.push(new meteor(random(300, 1900), 0, 1, random(80, 150), 1));
      if(meteors.length){
          for(var i=0; i<meteors.length; i++){
              //console.log(meteors[i].angle);
              //R = Math.sqrt(Math.pow(meteors[i].x-1900, 2) + Math.pow(meteors[i].y-700, 2));
              //angle = meteors[i].angle1 + meteors[i].angle2;
              //dir = angle>Math.PI/2 ? 1 : -1;
              //console.log(angle);
              //console.log(dir);
              //meteors[i].appendageY =600 - Math.abs(Math.sin(angle)) * Math.sqrt(Math.pow(R, 2) + Math.pow(meteors[i].len, 2));
              //meteors[i].appendageX =1900 + dir * Math.abs(Math.cos(angle)) * Math.sqrt(Math.pow(R, 2) + Math.pow(meteors[i].len, 2));

              ctx.beginPath();
              grd = ctx.createRadialGradient(meteors[i].x, meteors[i].y, meteors[i].r, meteors[i].x, meteors[i].y, meteors[i].r + meteors[i].len);
              grd.addColorStop(0, 'rgba(250,250,250,' + meteors[i].opacity + ')');
              grd.addColorStop(0.4, 'rgba(200,200,200,' + meteors[i].opacity*0.7 + ')');
              grd.addColorStop(0.8, 'rgba(130,130,130,' + meteors[i].opacity*0.4 + ')');
              grd.addColorStop(1, 'rgba(10,10,10,' + meteors[i].opacity*0.1 + ')');
              ctx.fillStyle = grd;
              ctx.arc(meteors[i].x, meteors[i].y, meteors[i].r, Math.PI/4, Math.PI*5/4);
              //ctx.lineTo(meteors[i].appendageX, meteors[i].appendageY);
              ctx.lineTo(meteors[i].x+meteors[i].len, meteors[i].y-meteors[i].len);
              ctx.fill();
              ctx.closePath();
              //meteors[i].angle1 -= Math.PI/1440;
              //console.log(meteors[i].angle);

              //meteors[i].x = Math.floor(1900 - R * Math.cos(meteors[i].angle1));
              //meteors[i].y = Math.floor(700 - R * Math.sin(meteors[i].angle1));

              meteors[i].x--;
              meteors[i].y++;
              // console.log(meteors[i].x);
              meteors[i].opacity -= 0.002;
              if(meteors[i].x<=0 || meteors[i].y>=600 || meteors[i].opacity<=0 || meteors[i].angle1<=0){
                  meteors.splice(i, 1);
                  // debugger;
              }

          }
      }
  }
  function twinkle(){

      for(var i=0; i<stars.length; i++){
          ctx.beginPath();
          grd = ctx.createRadialGradient(stars[i].x, stars[i].y, stars[i].r*0.5, stars[i].x, stars[i].y, stars[i].r);
          grd.addColorStop(0, 'rgba(250,250,250,1)');
          grd.addColorStop(1, 'rgba(10,10,10,0.3)');
          ctx.fillStyle = grd;
          ctx.arc(stars[i].x, stars[i].y, stars[i].r, 0, Math.PI*2);
          ctx.fill();
          ctx.closePath();

          if(stars[i].isTwinkle){
              stars[i].r += stars[i].isTwinkle * 0.1;
              if(stars[i].r<=0){
                  stars.splice(i, 1);
                  stars.push(new star(random(0, canvas.width), random(0, canvas.height*0.7), random(1, 3), random(0, 2) - 1));
              }
          }else{
              stars[i].isTwinkle = random(0, 2) - 1;
          }
          if(stars[i].r>=4){
              stars[i].isTwinkle = -1;
          }
      }
  }
  function begin(){
      requestAnimationFrame(begin);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      twinkle();
      drawMeteor();
  }
