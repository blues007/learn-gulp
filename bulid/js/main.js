var a="learn-gulp",c="are you ok355?";$(function(){console.log("document"),console.log("cccc333"),console.log(c),$(".navList li").each(function(e,o){window.location.href.indexOf($(this).find("a").attr("href"))>-1&&$(this).addClass("selected").siblings().removeClass("selected")}),$(".J_accountTab li").on("click",function(){$(this).addClass("active").siblings().removeClass("active"),$(".boxContainer").hide().eq($(".J_accountTab li").index(this)).show()})});