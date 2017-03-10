Handlebars.registerHelper('when', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  else{
    return options.inverse(this);
  }
});
Handlebars.registerHelper('listItem', function (from, context, options){
    var item = "";
    for (var i = from;i<context.length; i++) {
        item = item + options.fn(context[i]);
    }
    return item;
});

function getTemplateAjax(path, target, jsonData) {
  var source;
  var template;

  $.ajax({
    url: path, //ex. js/templates/mytemplate.handlebars
    cache: true,
    success: function(data) {
      source    = data;
      template  = Handlebars.compile(source);
      $(target).html(template(jsonData));
    }
  });
}
function loadNews(){
  var rt = ($(window).width() - ($( "#new" ).offset().left + $( "#new" ).outerWidth()));
  $( "#new" )
            .css({display:'block'})
            .animate({
              maxWidth: "82%",

            }, 300 )
            .css({backgroundColor:"#fff"})
            .removeClass('col-md-7');
  getTemplateAjax('/templates/news.handlebars','#new',{})
}


var navData = {
    logo: '/img/logo.jpg' ,
    links: [
            {title:'Home',href:'#',onClick:"loadHome()"},
            {title:'Blog',href:'#' ,onClick:"loadNews()"},
            {title:'Trending',href:'#',onClick:"loadTrending()"},
            {title:'Updates',href:'#',onClick:"loadNews()"},
            {title:'Whats Hot',href:'#',onClick:"loadHot()"},
            {title:'News',href:'#',onClick:"loadNews()"},
            {title:'Enquire',href:'#',onClick:"loadEnquiries()"},
            {title:'About us',href:'#',onClick:"loadAbout()"}
         ]
}

var CarouselData = {
    images:[
      {src:'/img/g.jpg',caption:'Design Indaba to beshosted at Nelson Mandela Metropolitan University'},
      {src:'/img/h.jpg',caption:'Fashion ya Kasi'},
      {src:'/img/k.jpg',caption:'Hottest DJ in East London'},
      {src:'/img/l.jpg',caption:'Frenzy with the ladies'},
      {src:'/img/b.jpg',caption:'Flexy'},
      {src:'/img/c.jpg',caption:'Proper heavens'},
    ]
}
var HotCarouselData = {
    images:[
      {hot:'hot',src:'/img/7.jpg',caption:'Design Indaba to beshosted at Nelson Mandela Metropolitan University'},
      {hot:'hot',src:'/img/10.jpg',caption:'Fashion ya Kasi'},
      {hot:'hot',src:'/img/7.jpg',caption:'Hottest DJ in East London'},
      {hot:'hot',src:'/img/1.jpg',caption:'Frenzy with the ladies'},
      {hot:'hot',src:'/img/6.jpg',caption:'Flexy'},
      {hot:'hot',src:'/img/c.jpg',caption:'Proper heavens'},
    ]
}
var CarouselData2 = {
    images:[
      {src:'/img/m.jpg',caption:'Moments before Pressure'},
      {src:'/img/n.jpg',caption:'Serios with Tau'},
      {src:'/img/o.jpg',caption:'We di it twice'},
      {src:'/img/p.jpg',caption:'When its got you'},
      {src:'/img/q.jpg',caption:'Flexy skills'},
      {src:'/img/r.jpg',caption:'Proper heavens'},
      {src:'/img/f.jpg',caption:'Da Les Lit at NMMU'},
      {src:'/img/h.jpg',caption:'Fashion ya Kasi'},
      {src:'/img/k.jpg',caption:'Hottest DJ in East London'},
      {src:'/img/l.jpg',caption:'Frenzy with the ladies'},
      {src:'/img/b.jpg',caption:'Flexy'},
      {src:'/img/c.jpg',caption:'Proper heavens'},
    ]
}
function loadTrending(){
  $( "#new" )
            .css({display:'block'})
            .animate({
              maxWidth: "82%",
            }, 100 )
            .css({backgroundColor:"#fff"})
            .removeClass('col-md-7');
  getTemplateAjax('/templates/trending.handlebars','#new',CarouselData2)
}
function loadEnquiries(){
  $( "#new" )
            .css({display:'block'})
            .animate({
              maxWidth: "82%",
            }, 100 )
            .css({backgroundColor:"#fff"})
            .removeClass('col-md-7');
  getTemplateAjax('/templates/enquiries.handlebars','#new',{})
}
function loadAbout(){
  $( "#new" )
            .css({
              width: "toggle",

            }, 100 )
            .animate({
              width: "toggle",

            }, 300 )
            .css({backgroundColor:"#fff"})
            .removeClass('col-md-7');
}
function loadHome(){
  $('#new')
      .addClass('col-md-7')
      .css({display:'block'})
      .animate({
        maxWidth: "82%",
        display:'block'
      }, 100 )
      .removeClass('col-md-12');
  getTemplateAjax('/templates/nav.handlebars','#us',navData)
  getTemplateAjax('/templates/carousel.handlebars','#new',CarouselData)
}
function loadHot(){
  $('#new')
      .css({display:'block'})
      .animate({
        maxWidth: "82%",
        display:'block'
      }, 100 )
      .removeClass('çol-md-7')
      .addClass('col-md-12')
  getTemplateAjax('/templates/nav.handlebars','#us',navData)
  getTemplateAjax('/templates/carousel.handlebars','#new',HotCarouselData)
}
getTemplateAjax('/templates/nav.handlebars','#us',navData)
getTemplateAjax('/templates/carousel.handlebars','#new',CarouselData)
getTemplateAjax('/templates/about.handlebars','#about',{})
