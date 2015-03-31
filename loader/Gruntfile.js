module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            pre: [
                'dist'
            ],
            post: [
                'dist/loader.js',
                'dist/loader.min.js'
            ]
        },
        concat: {
            dev: {
                src: [
                    'vendor/require.js',
                    'dist/loader.js'
                ],
                dest: '../toneden.loader.js'
            },
            production: {
                src: [
                    'dist/loader.min.js'
                ],
                dest: '../toneden.loader.js'
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: './js',
                    name: 'main',
                    optimize: 'none',
                    out: 'dist/loader.js'
                }
            }
        },
        uglify: {
            production: {
                src: [
                    'vendor/require.js',
                    'dist/loader.js'
                ],
                dest: 'dist/loader.min.js'
            }
        },
        watch: {
            files: [
                'js/**'
            ],
            tasks: 'dev'
        }
    });

    grunt.registerTask('wrap', 'Wraps files in an IIFE.', function() {
        var path = '../toneden.loader.js';
        var before = '(function() {\n';
        var after = '\n})();';
        var content = grunt.file.read(path);

        grunt.file.write(path, before + content + after);
    });

    grunt.registerTask('build', [
        'requirejs',
        'uglify:production',
        'concat:production'
    ]);

    grunt.registerTask('default', [
        'clean:pre',
        'build',
        'clean:post',
        'wrap'
    ]);

    grunt.registerTask('dev', [
        'clean:pre',
        'requirejs',
        'concat:dev',
        'clean:post',
        'wrap'
    ]);

    grunt.loadNpmTasks('grunt-contrib');
};
