module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    var fs = require("fs");

    var buildRoot = 'build/';

    grunt.initConfig({
        clean: {
            build: [buildRoot]
        },
        shell: {
            server: {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: "tsc src/server/app.ts -m commonjs --out build/app.js --outDir build"
            }
        },
        copy: {
            qunit: {
                files: [ { expand: true, cwd: 'ThirdParty/Sudoku/qunit/', src: ['**'], dest: buildRoot + 'qunit' } ]
            },
            underscore: {
                files: [ { expand: true, cwd: 'ThirdParty/Sudoku/underscore/', src: ['**'], dest: buildRoot + 'underscore' } ]
            },
            testsHtml: {
                files: [ { expand: true, cwd: 'tests', src: ['tests.html'], dest: buildRoot } ]
            }
        },
        typescript: {
            sudokuExGui: {
                src: ['src/**/*.ts'],
                dest: buildRoot + "/js/sudokuEx.gui.js",
                options: {
                    module: 'amd',
                    target: 'es5',
                    sourceMap: true,
                    declaration: true
                },
            },
            sudokuExBase: {
                src: ['ThirdParty/SudokuEx.Base/src/**/*.ts'],
                dest: "ThirdParty/SudokuEx.Base/build/js/sudokuEx.base.js",
                options: {
                    module: 'amd',
                    target: 'es5',
                    sourceMap: true,
                    declaration: true
                }
            },
            tests: {
                src: ['tests/**/*.ts'],
                dest: buildRoot + "/js/sudokuEx.gui.tests.js",
                options: {
                    module: 'amd',
                    target: 'es5',
                    sourceMap: false
                }

            }
        },
        qunit: {
            all: [buildRoot + 'tests.html']
        }
    });

    grunt.registerTask('default', ['typescript:sudokuExBase', 'typescript:sudokuExGui']);
};