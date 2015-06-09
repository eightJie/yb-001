module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js']
    },

    copy: {
    },

    uglify: {
    },

    less: {
      dev: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: [
        {
          expand: true,
          ext: '.css',
          src: 'lib/**/*.less'
        },
        {
          expand: true,
          ext: '.css',
          src: 'common/**/*.less'
        },
        {
          expand: true,
          ext: '.css',
          src: 'src/gf/*.less'
        }]
      }
    },

    watch: {
      styles: {
        files: ['lib/**/*.less', 'common/**/*.less', 'src/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    },

  });

  // 加载任务插件。
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['copy', 'uglify']);

};