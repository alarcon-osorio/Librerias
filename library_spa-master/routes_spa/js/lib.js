(function(window, document){
    'use strict';   //modo estricto

    var home = function(){
        var element = null,
            framework = null,
            routes = {},
            library = {
                getID: function(id){
                    element  = document.getElementById(id);
                    return this;
                },

                get: function(id){
                    return document.getElementById(id);
                },

                noSubmit: function(){
                        element.addEventListener('submit', function(e){
                        e.preventDefault();
                    }, false);
                    return this;
                },

                getCtrl: function(){
                    return controller;
                },

                path: function(){
                    framework = element;
                    return this;
                },

                route: function(route, template, controller, load ){
                    routes[route] = {
                        'template': template,
                        'controller': controller,
                        'load': load
                    }
                    return this;
                },

                roadHandler: function(){
                    var hash = window.location.hash.substring(1) || '/',
                        destination = routes[hash];     
                    var xhr = new XMLHttpRequest();      
                    
                    if(destination && destination.template){
                        if(destination.controller){
                            controller = controllers[destination.controller].controller;
                        }
                        xhr.addEventListener('load', function(){
                            framework.innerHTML = this.responseText;
                            setTimeout(function(){
                                if(typeof(destination.load) == 'function'){
                                    destination.load();
                                }
                            }, 500);                           
                        }, false);
                        xhr.open('get', destination.template, true);
                        xhr.send(null);
                    }else{
                        window.location.hash = '#/';
                    }
                }

            };
            return library;     
    } 

    if(typeof window.library === 'undefined'){
        window.library =  window._ = home(); //Se llama como objeto global
        window.addEventListener('load', _.roadHandler, false);
        window.addEventListener('hashchange', _.roadHandler, false);
    }else{
        console.log('Nueva llamada de libreria');
    }
    
//Rutas
library.getID('views').path()
.route('/', 'views/home.html', null, null)
.route('/create-owners', 'views/create_owners.html', null, null)
.route('/list-owners', 'views/list_owners.html', null, null)
.route('/update-owners', 'views/update_owners.html', null, null)
.route('/create-visitors', 'views/create_visitors.html', null, null)
.route('/list-visitors', 'views/list_visitors.html', null, null)
.route('/update-visitors', 'views/update_visitors.html', null, null);  

})(window, document);
