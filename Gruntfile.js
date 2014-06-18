module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      lib: {
        src: [
          'bower_components/lodash/dist/lodash.js',
          'bower_components/angular/angular.js',
          'bower_components/firebase/firebase.js',
          'bower_components/angularfire/angularfire.js',
        ],
        dest: '.tmp/concat/lib/main.js'
      },

      js: {
        src: [
          '.tmp/concat/lib/main.js',
          'src/js/whiteboard.js',   
          'src/js/roomservice.js',
          'src/js/testctrl.js'
        ],
        dest: '.tmp/concat/js/main.js',
      },
      css: {
        src: [
          'src/css/style.css'
        ],
        dest: '.tmp/concat/css/style.css'
      }
    },

    uglify: {
      options: {},
      js: {
        files: [
          {
            expand: true,
            cwd: '.tmp/concat/js/',
            src: '**/*.js',
            dest: '.tmp/uglify'
          }
        ]
      }
    },

    cssmin: {
      options: {},
      css: {
        files: [
          {
            expand: true,
            cwd: '.tmp/concat/css',
            src: '**/*.css',
            dest: '.tmp/cssmin'
        }
        ]
      }
    },

    copy: {
      html: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: '**/*.html',
            dest: 'dist/'
          }
        ]
      },
      tmpjs: {
        files: [
          {
            expand: true,
            cwd: '.tmp/concat/js',
            src: '**/*.js',
            dest: 'dist/js'
          }
        ]
      },
      js: {
        files: [
          {
            expand: true,
            cwd: '.tmp/uglify',
            src: '**/*.js',
            dest: 'dist/js'
          }
        ]
      },
      css: {
        files: [
          {
            expand: true,
            cwd: '.tmp/cssmin',
            src: '**/*.css',
            dest: 'dist/css'
          }
        ]
      },
      tmpcss: {
        files: [
          {
            expand: true,
            cwd: '.tmp/concat/css',
            src: '**/*.css',
            dest: 'dist/css'
          }
        ]
      }
    },

    watch: {
      scripts: {
        files: ['src/**'],
        tasks: ['dev'],
        atBegin: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('build', ['concat', 'uglify', 'cssmin', 'copy:html', 'copy:css', 'copy:js']);
  grunt.registerTask('dev', ['concat', 'copy:html', 'copy:tmpcss', 'copy:tmpjs']);
  grunt.registerTask('server', ['dev', 'watch']);
  grunt.registerTask('heroku', ['build']);
  grunt.registerTask('default', ['build']);
};
