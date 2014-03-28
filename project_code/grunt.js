module.exports = function(grunt) {
  grunt.initConfig({
      lint: {
        all: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
      },
      concat:{
        app:{
          src:["app/controllers/**","app/models/**","app/js/router.js"],
          dest:"../server/public/js/main.js"
        },
        libs:{
          src:[
              "libs/jquery.js",
              "libs/underscore.js",
              //"libs/text.js",        
              "libs/backbone.js",
              "libs/others/*.js"
          ],
          dest:"../server/public/js/libs.js"
        }
      },
      watch: {
        app: {
          files: '<config:concat.app.src>',
          tasks: 'concat'
        }
      },      
      server: {
        port: 8080,
        base: '.'
      }    
    });
    grunt.registerTask('default', 'concat lint server watch');        
};