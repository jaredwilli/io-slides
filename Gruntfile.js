module.exports = function(grunt) {
	"use strict";

	require('matchdep').filterDev('grunt-!(cli)').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		connect: {
			server: {
				options: {
					port: 8911,
					base: 'slides',
					livereload: 35729
				}
			}
		},
		exec: {
			markdown: {
				cmd: 'cd scripts/md && python render.py'
			},
			less: {
				cmd: 'cd theme/less && lessc custom.less custom.css'
			}
		},
		watch: {
			all: {
				files: [
                    'scripts/md/slides.md', 
                    'scripts/md/base.html',
                    'theme/less/custom.less'
                ],
				tasks: [
                    'exec:less',
                    'exec:markdown'
                ],
			},
			options: {
				livereload: 35729
			}
		}
	});

	grunt.registerTask('default', [
        'exec:less',
        'exec:markdown', 
        'connect', 
        'watch'
    ]);
};